import { gql } from 'graphql-request';
import getStorefront from './config';
import { getCheckout } from './checkout';

const storefront = getStorefront();

interface CartUserError {
  code?: string;
  field: string[];
  meassage: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        estimatedCost: {
          subtotalAmount: {
            amount: string;
            currencyCode: string;
          };
        };
        customAttributes:{
          key: string;
          value: string;
        }[],
        merchandise: {
          id: string;
          availableForSale: boolean;
          currentlyNotInStock: boolean;
          title: string;
          product: {
            tags: string[];
            title: string;
            featuredImage?: {
              url: string;
            };
          };
          priceV2: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
  estimatedCost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CartChangeResponse {
  cart?: Cart;
  userErrors: CartUserError[];
}

export const createCart = async (
  merchandiseId?: string,
  quantity: number = 1,
  customerAccessToken?: string
): Promise<CartChangeResponse> => {
  const mutation = gql`
    mutation CreateCart($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                      tags
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  let variables: any = { input: {} };
  if (merchandiseId !== undefined) {
    variables.input.lines = [{ merchandiseId, quantity }];
  }
  if (customerAccessToken !== undefined) {
    variables.input.buyerIdentity = { customerAccessToken };
  }
  try {
    const res = await storefront.request(mutation, variables);
    return res.cartCreate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { userErrors: [] };
  }
};

export const getCart = async (cartId: string): Promise<any> => {
  const query = gql`
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        buyerIdentity {
          email
        }
        cost {
          subtotalAmount {
            amount
          }
        }
        checkoutUrl
        note
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  availableForSale
                  quantityAvailable
                  title
                  product {
                    id
                    title
                    featuredImage {
                      url
                    }
                    tags
                  }
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await storefront.request(query, { cartId });
    
    if (!res.cart) {
      console.error(`Cart with ID ${cartId} not found`);
      return null;
    }

    // Map the Cart response to match the expected Checkout response structure
    return {
      id: res.cart.id,
      email: res.cart.buyerIdentity?.email,
      subtotalPriceV2: {
        amount: res.cart.cost.subtotalAmount.amount
      },
      webUrl: res.cart.checkoutUrl,
      note: res.cart.note,
      lineItems: {
        edges: res.cart.lines.edges.map((edge: any) => ({
          node: {
            id: edge.node.id,
            quantity: edge.node.quantity,
            variant: {
              id: edge.node.merchandise.id,
              availableForSale: edge.node.merchandise.availableForSale,
              currentlyNotInStock: edge.node.merchandise.quantityAvailable <= 0,
              title: edge.node.merchandise.title,
              product: {
                id: edge.node.merchandise.product.id,
                title: edge.node.merchandise.product.title,
                featuredImage: {
                  url: edge.node.merchandise.product.featuredImage?.url
                },
                tags: edge.node.merchandise.product.tags
              },
              priceV2: {
                amount: edge.node.merchandise.price.amount
              },
              compareAtPriceV2: edge.node.merchandise.compareAtPrice ? {
                amount: edge.node.merchandise.compareAtPrice.amount,
                currencyCode: edge.node.merchandise.compareAtPrice.currencyCode
              } : null
            },
            customAttributes: edge.node.attributes.map((attr: any) => ({
              key: attr.key,
              value: attr.value
            }))
          }
        }))
      }
    };
  } catch (error) {
    console.error('Error fetching cart:', JSON.stringify(error, undefined, 2));
    return null;
  }
};

export const updateItemQuantity = async (
  cartId: string,
  id: string,
  quantity: number
): Promise<CartChangeResponse> => {
  const mutation = gql`
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [
      {
        id,
        quantity,
      },
    ],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.cartLinesUpdate;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { userErrors: [] };
  }
};

export const removeItemFromCart = async (
  cartId: string,
  id: string
): Promise<CartChangeResponse> => {
  const mutation = gql`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId,
    lineIds: [id],
  };
  try {
    const res = await storefront.request(mutation, variables);
    return res.cartLinesRemove;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { userErrors: [] };
  }
};
export const addItemToCart = async (
  cartId: string,
  merchandiseId: string,
  quantity: number = 1
): Promise<CartChangeResponse> => {
  // First, get the current cart to ensure we have the latest state
  // You'll need to implement or use the same getCheckout function as addItemToCheckout
  const currentCart = await getCheckout(cartId);
  if (!currentCart) {
    console.error('Could not retrieve current cart');
    return { 
      cart: undefined,
      userErrors: [{ 
        code: 'INTERNAL_ERROR', 
        field: [], 
        meassage: 'Failed to get current cart' 
      }]
    };
  }

  const mutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    availableForSale
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  
  // Ensure quantity is always at least 1
  const safeQuantity = quantity || 1;
  
  const variables = {
    cartId,
    lines: [
      {
        merchandiseId,
        quantity: safeQuantity,
      },
    ],
  };
  
  try {
    // Log the operation for debugging
    console.log(`Adding item to cart (ID: ${cartId})`, {
      merchandiseId,
      quantity: safeQuantity,
      currentItemCount: currentCart.lineItems?.edges?.length || 0
    });

    const res = await storefront.request(mutation, variables);
    
    // Log the result for debugging
    console.log(`Cart after adding item:`, {
      cartId: res.cartLinesAdd?.cart?.id,
      itemCount: res.cartLinesAdd?.cart?.lines?.edges?.length || 0,
      hasErrors: res.cartLinesAdd?.userErrors?.length > 0
    });
    
    if (res.cartLinesAdd?.userErrors?.length > 0) {
      console.error('Cart add errors:', res.cartLinesAdd.userErrors);
    }
    
    return res.cartLinesAdd;
  } catch (error) {
    console.error('Cart add error:', JSON.stringify(error, undefined, 2));
    return { 
      cart: undefined,
      userErrors: [{ 
        code: 'INTERNAL_ERROR', 
        field: [], 
        meassage: 'Failed to get current cart' 
      }]
    };
  }
};