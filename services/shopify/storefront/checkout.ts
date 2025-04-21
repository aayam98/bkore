import { gql } from 'graphql-request';
import getStorefront from './config';
import { isCartId } from '@utils/checkout';
import { getCart } from './cart';

const storefront = getStorefront();

interface CheckoutUserError {
  code?: string;
  field: string[];
  meassage: string;
}

export interface Checkout {
  id: string;
  email?: string;
  webUrl: string;
  subtotalPriceV2: {
    amount: string;
  };
  note: string;
  lineItems: {
    edges: {
      node: {
        id: string;
        quantity: number;
        customAttributes: {
          key: string;
          value: string;
        }[];
        variant: {
          currentlyNotInStock: boolean;
          id: string;
          availableForSale: boolean;
          title: string;
          product: {
            title: string;
            featuredImage?: {
              url: string;
            };
            tags: string[];
            id: string;
          };
          priceV2: {
            amount: string;
          };
          compareAtPriceV2: {
            amount: string;
          };
        };
      };
    }[];
  };
}
export interface CheckoutResponse {
  checkout?: Checkout;
  checkoutUserErrors: CheckoutUserError[];
}

/**
 * Carts are persistent and don't expire like checkouts.
 */
export const createCheckout = async (
  variantId: string,
  email?: string,
  quantity: number = 1,
  variant?: string
): Promise<CheckoutResponse> => {
  const mutation = gql`
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
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
                attributes {
                  key
                  value
                }
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
              }
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
    input: {
      buyerIdentity: email ? { email } : undefined,
      lines: [
        {
          merchandiseId: variantId,
          quantity: quantity,
          attributes: variant ? [{ key: 'Variant', value: variant }] : [],
        },
      ],
    },
  };

  try {
    const res = await storefront.request(mutation, variables);
    
    // Remap the cartCreate response to match the checkoutCreate response structure
    return {
      checkout: res.cartCreate.cart ? {
        id: res.cartCreate.cart.id,
        email: res.cartCreate.cart.buyerIdentity?.email,
        subtotalPriceV2: {
          amount: res.cartCreate.cart.cost.subtotalAmount.amount
        },
        webUrl: res.cartCreate.cart.checkoutUrl,
        note: res.cartCreate.cart.note,
        lineItems: {
          edges: res.cartCreate.cart.lines.edges.map((edge: { node: { id: any; quantity: any; attributes: any[]; merchandise: { id: any; availableForSale: any; quantityAvailable: number; title: any; product: { id: any; title: any; featuredImage: { url: any; }; tags: any; }; price: { amount: any; }; compareAtPrice: { amount: any; currencyCode: any; }; }; }; }) => ({
            node: {
              id: edge.node.id,
              quantity: edge.node.quantity,
              customAttributes: edge.node.attributes.map(attr => ({
                key: attr.key,
                value: attr.value
              })),
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
              }
            }
          }))
        }
      } : undefined,
      checkoutUserErrors: res.cartCreate.userErrors.map((error: { code: any; field: any; message: any; }) => ({
        code: error.code,
        field: error.field,
        message: error.message
      }))
    };
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};
export const getCheckout = async (
  checkoutId: string
): Promise<Checkout | undefined> => {
  // Don't attempt to use checkout API with cart IDs
  if (isCartId(checkoutId)) {
    console.log('Cart ID detected, using cart API instead');
    return getCart(checkoutId);
  }

  const query = gql`
    query getCheckout($checkoutId: ID!) {
      node(id: $checkoutId) {
        ... on Checkout {
          id
          email
          subtotalPriceV2 {
            amount
          }
          totalPriceV2 {
            amount
          }
          lineItemsSubtotalPrice {
            amount
          }
          webUrl
          lineItems(first: 100) {
            edges {
              node {
                id
                quantity
                variant {
                  id
                  availableForSale
                  currentlyNotInStock
                  title
                  product {
                    id
                    title
                    featuredImage {
                      url
                    }
                    tags
                  }
                  priceV2 {
                    amount
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                }
                customAttributes {
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    checkoutId,
  };
  try {
    const res = await storefront.request(query, variables);
    return res.node === null ? undefined : res.node;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return undefined;
  }
};

export const updateCheckoutEmail = async (
  checkoutId: string,
  email: string
): Promise<boolean> => {
  const mutation = gql`
    mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
      checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
        checkout {
          id
          email
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    checkoutId,
    email,
  };
  try {
    const res = await storefront.request(mutation, variables);
    return (
      res.checkoutEmailUpdateV2.checkout !== null
      // res.checkoutEmailUpdateV2.checkoutUserErrors === []
    );
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return false;
  }
};

export const addItemToCheckout = async (
  checkoutId: string,
  variantId: string,
  quantity: number = 1,
  variant?: string
): Promise<CheckoutResponse> => {
  // First, get the current cart to ensure we have the latest state
  const currentCart = await getCheckout(checkoutId);
  if (!currentCart) {
    console.error('Could not retrieve current cart');
    return { checkoutUserErrors: [] };
  }

  const mutation = gql`
    mutation cartLinesAdd(
      $cartId: ID!
      $lines: [CartLineInput!]!
    ) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
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
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId: checkoutId,
    lines: [
      {
        merchandiseId: variantId,
        quantity: quantity,
        attributes: variant != undefined ? [{ key: 'Variant', value: variant }] : [],
      },
    ],
  };
  
  try {
    // Log the state before the operation
    console.log('Adding item to cart:', {
      cartId: checkoutId,
      newItem: {
        merchandiseId: variantId,
        quantity: quantity,
        attributes: variant != undefined ? [{ key: 'Variant', value: variant }] : [],
      },
      currentItemCount: currentCart.lineItems?.edges?.length || 0
    });

    const res = await storefront.request(mutation, variables);
    
    // Log the response to see what we got back
    console.log('Cart after adding item:', {
      returnedItemCount: res.cartLinesAdd?.cart?.lines?.edges?.length || 0
    });
    
    try {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init('3048042495310496');
          ReactPixel.trackSingle(
            '3048042495310496',
            'AddToCart',
            JSON.stringify(variables)
          );
        });
    } catch (error) {
      console.log('Facebook pixel error:', error);
    }

    // Remap the cartLinesAdd response to match the checkoutLineItemsAdd response structure
    return {
      checkout: res.cartLinesAdd.cart ? {
        id: res.cartLinesAdd.cart.id,
        email: res.cartLinesAdd.cart.buyerIdentity?.email,
        subtotalPriceV2: {
          amount: res.cartLinesAdd.cart.cost.subtotalAmount.amount
        },
        webUrl: res.cartLinesAdd.cart.checkoutUrl,
        note: res.cartLinesAdd.cart.note,
        lineItems: {
          edges: res.cartLinesAdd.cart.lines.edges.map((edge: { node: { id: any; quantity: any; merchandise: { id: any; availableForSale: any; quantityAvailable: number; title: any; product: { id: any; title: any; featuredImage: { url: any; }; tags: any; }; price: { amount: any; }; compareAtPrice: { amount: any; currencyCode: any; }; }; attributes: { key: any; value: any; }[]; }; }) => ({
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
              customAttributes: edge.node.attributes.map((attr: { key: any; value: any; }) => ({
                key: attr.key,
                value: attr.value
              }))
            }
          }))
        }
      } : undefined,
      checkoutUserErrors: res.cartLinesAdd.userErrors.map((error: { code: any; field: any; message: any; }) => ({
        code: error.code,
        field: error.field,
        message: error.message
      }))
    };
  } catch (error) {
    console.error('Cart add error:', JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};

export const removeItemFromCheckout = async (
  checkoutId: string,
  lineId: string
): Promise<CheckoutResponse> => {
  const mutation = gql`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(
        cartId: $cartId
        lineIds: $lineIds
      ) {
        cart {
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
                    title
                    product {
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
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId: checkoutId,
    lineIds: [lineId],
  };
  try {
    const res = await storefront.request(mutation, variables);
    
    // Remap the cartLinesRemove response to match the checkoutLineItemsRemove response structure
    return {
      checkout: res.cartLinesRemove.cart ? {
        id: res.cartLinesRemove.cart.id,
        email: res.cartLinesRemove.cart.buyerIdentity?.email,
        subtotalPriceV2: {
          amount: res.cartLinesRemove.cart.cost.subtotalAmount.amount
        },
        webUrl: res.cartLinesRemove.cart.checkoutUrl,
        note: res.cartLinesRemove.cart.note,
        lineItems: {
          edges: res.cartLinesRemove.cart.lines.edges.map((edge: { node: { id: any; quantity: any; merchandise: { id: any; availableForSale: any; title: any; product: { title: any; featuredImage: { url: any; }; tags: any; }; price: { amount: any; }; compareAtPrice: { amount: any; currencyCode: any; }; }; attributes: { key: any; value: any; }[]; }; }) => ({
            node: {
              id: edge.node.id,
              quantity: edge.node.quantity,
              variant: {
                id: edge.node.merchandise.id,
                availableForSale: edge.node.merchandise.availableForSale,
                title: edge.node.merchandise.title,
                product: {
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
              customAttributes: edge.node.attributes.map((attr: { key: any; value: any; }) => ({
                key: attr.key,
                value: attr.value
              }))
            }
          }))
        }
      } : undefined,
      checkoutUserErrors: res.cartLinesRemove.userErrors.map((error: { code: any; field: any; message: any; }) => ({
        code: error.code,
        field: error.field,
        message: error.message
      }))
    };
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};

export const updateQuantityCheckout = async (
  checkoutId: string,
  lineId: string,
  quantity: number,
  variant?: string
): Promise<CheckoutResponse> => {
  const mutation = gql`
    mutation cartLinesUpdate(
      $cartId: ID!
      $lines: [CartLineUpdateInput!]!
    ) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
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
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
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
        userErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId: checkoutId,
    lines: [
      {
        quantity,
        id: lineId,
        attributes:
          variant !== '' ? [{ key: 'Variant', value: variant }] : [],
      },
    ],
  };
  try {
    const res = await storefront.request(mutation, variables);
    
    // Remap the cartLinesUpdate response to match the checkoutLineItemsUpdate response structure
    return {
      checkout: res.cartLinesUpdate.cart ? {
        id: res.cartLinesUpdate.cart.id,
        email: res.cartLinesUpdate.cart.buyerIdentity?.email,
        subtotalPriceV2: {
          amount: res.cartLinesUpdate.cart.cost.subtotalAmount.amount
        },
        webUrl: res.cartLinesUpdate.cart.checkoutUrl,
        note: res.cartLinesUpdate.cart.note,
        lineItems: {
          edges: res.cartLinesUpdate.cart.lines.edges.map((edge: { node: { id: any; quantity: any; merchandise: { id: any; availableForSale: any; title: any; product: { title: any; featuredImage: { url: any; }; }; price: { amount: any; }; compareAtPrice: { amount: any; currencyCode: any; }; }; attributes: { key: any; value: any; }[]; }; }) => ({
            node: {
              id: edge.node.id,
              quantity: edge.node.quantity,
              variant: {
                id: edge.node.merchandise.id,
                availableForSale: edge.node.merchandise.availableForSale,
                title: edge.node.merchandise.title,
                product: {
                  title: edge.node.merchandise.product.title,
                  featuredImage: {
                    url: edge.node.merchandise.product.featuredImage?.url
                  }
                },
                priceV2: {
                  amount: edge.node.merchandise.price.amount
                },
                compareAtPriceV2: edge.node.merchandise.compareAtPrice ? {
                  amount: edge.node.merchandise.compareAtPrice.amount,
                  currencyCode: edge.node.merchandise.compareAtPrice.currencyCode
                } : null
              },
              customAttributes: edge.node.attributes.map((attr: { key: any; value: any; }) => ({
                key: attr.key,
                value: attr.value
              }))
            }
          }))
        }
      } : undefined,
      checkoutUserErrors: res.cartLinesUpdate.userErrors.map((error: { code: any; field: any; message: any; }) => ({
        code: error.code,
        field: error.field,
        message: error.message
      }))
    };
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    return { checkoutUserErrors: [] };
  }
};
