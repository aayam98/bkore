import { gql } from 'graphql-request';
import getStorefront from './config';
import getAdminClient from './configAdmin';

const storefront = getStorefront();
const adminApi = getAdminClient();

export enum Sort {
  TitleAsc,
  TitleDesc,
  PriceAsc,
  PriceDesc,
  BestSelling,
}

export interface Filters {
  title?: string;
  type?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductInfo {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;

  metafield?: {
    value: string;
  };
  featuredImage?: {
    url: string;
    height?: string;
    width?: string;
  };
  images: {
    edges: {
      node: {
        url: string;
        height?: number;
        width?: number;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        compareAtPriceV2?: {
          amount: string;
          currencyCode: string;
        };
        quantityAvailable: number;
      };
    }[];
  };
  tags: string[];
}

export interface GetAllProductsResponse {
  pageInfo: any;
  edges: {
    cursor: string;
    node: ProductInfo;
  }[];
}

export const getAllProducts = async (
  numProducts: number,
  cursor?: string,
  { title, type, tag, minPrice, maxPrice }: Filters = {},
  sort?: Sort
): Promise<GetAllProductsResponse> => {
  const query = gql`
    query AllProducts(
      $numProducts: Int!
      $cursor: String
      $query: String
      $sortKey: ProductSortKeys
      $reverse: Boolean
    ) {
      products(
        first: $numProducts
        after: $cursor
        query: $query
        sortKey: $sortKey
        reverse: $reverse
      ) {
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            description
            descriptionHtml
            availableForSale
            featuredImage {
              url
              height
              width
            }
            images(first: 10) {
              edges {
                node {
                  url
                  height
                  width
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  quantityAvailable
                }
              }
            }
            tags
          }
        }
      }
    }
  `;
  let filters = '';
  if (title !== undefined) {
    filters += `title:${title}* `;
  }
  if (type !== undefined) {
    filters += `product_type:${type} `;
  }
  if (tag !== undefined) {
    filters += `tag:${tag} `;
  }
  if (minPrice !== undefined) {
    filters += `variants.price:>=${minPrice.toFixed(1)} `;
  }
  if (maxPrice !== undefined) {
    filters += `variants.price:<=${maxPrice.toFixed(1)} `;
  }
  let sortKey, reverse;
  switch (sort) {
    case Sort.TitleAsc:
      reverse = false;
      sortKey = 'TITLE';
      break;
    case Sort.TitleDesc:
      reverse = true;
      sortKey = 'TITLE';
      break;
    case Sort.PriceAsc:
      reverse = false;
      sortKey = 'PRICE';
      break;
    case Sort.PriceDesc:
      reverse = true;
      sortKey = 'PRICE';
      break;
    case Sort.BestSelling:
      reverse = false;
      sortKey = 'BEST_SELLING';
      break;
    default:
      break;
  }
  const variables = {
    numProducts,
    cursor,
    query: filters,
    // filters !== '' ? filters + ' AND NOT tag:assembly' : 'NOT tag:assembly AND NOT tag:ATTACHMENTS',
    sortKey,
    reverse,
  };
  const res = await storefront.request(query, variables);
  return res.products;
};

export const getAllProductsSiteMap = async (
  numProducts: number,
  cursor?: string
): Promise<GetAllProductsResponse> => {
  const query = gql`
    query AllProducts($numProducts: Int!, $cursor: String) {
      products(first: $numProducts, after: $cursor) {
        edges {
          cursor
          node {
            id
            handle
            title
          }
        }
      }
    }
  `;

  const variables = {
    numProducts,
    cursor,
  };
  const res = await storefront.request(query, variables);
  return res.products;
};

export const getCountOfAllProducts = async ({
  title,
  type,
  tag,
  minPrice,
  maxPrice,
}: Filters = {}): Promise<number> => {
  const query = gql`
    query AllProducts($query: String) {
      products(first: 250, query: $query) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  let filters = '';
  if (title !== undefined) {
    filters += `title:${title}* `;
  }
  if (type !== undefined) {
    filters += `product_type:${type} `;
  }
  if (tag !== undefined) {
    filters += `tag:${tag} `;
  }
  if (minPrice !== undefined) {
    filters += `variants.price:>=${minPrice.toFixed(1)} `;
  }
  if (maxPrice !== undefined) {
    filters += `variants.price:<=${maxPrice.toFixed(1)} `;
  }
  const variables = {
    query: filters !== '' ? filters : undefined,
  };
  const res = await storefront.request(query, variables);
  return res.products.edges.length;
};

interface ProductSlug {
  node: {
    handle: string;
  };
}

export const getAllProductsSlug = async (): Promise<ProductSlug[]> => {
  const query = gql`
    query AllProductsSlug {
      products(first: 100) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `;
  const res = await storefront.request(query);
  return res.products.edges;
};

/**
 * Unlike allProducts, it can only filter by price.
 * @param handle
 * @param numProducts
 * @param cursor
 * @param param3
 * @param sort
 * @returns
 */
export const getProductsOfCollection = async (
  handle: string,
  numProducts: number,
  cursor?: string,
  { minPrice, maxPrice }: Filters = {},
  sort?: Sort
): Promise<GetAllProductsResponse> => {
  const query = gql`
    query ProductsOfCollection(
      $handle: String!
      $numProducts: Int!
      $cursor: String
      $filters: [ProductFilter!]
      $sortKey: ProductCollectionSortKeys
      $reverse: Boolean
    ) {
      collection(handle: $handle) {
        products(
          first: $numProducts
          after: $cursor
          filters: $filters
          sortKey: $sortKey
          reverse: $reverse
        ) {
          pageInfo {
            hasPreviousPage
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              handle
              title
              description
              availableForSale
              featuredImage {
                url
                height
                width
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  let sortKey, reverse;
  switch (sort) {
    case Sort.TitleAsc:
      reverse = false;
      sortKey = 'TITLE';
      break;
    case Sort.TitleDesc:
      reverse = true;
      sortKey = 'TITLE';
      break;
    case Sort.PriceAsc:
      reverse = false;
      sortKey = 'PRICE';
      break;
    case Sort.PriceDesc:
      reverse = true;
      sortKey = 'PRICE';
      break;
    case Sort.BestSelling:
      reverse = false;
      sortKey = 'BEST_SELLING';
      break;
    default:
      break;
  }
  const filters = [
    {
      price: {
        min: minPrice,
        max: maxPrice,
      },
    },
  ];
  const variables = {
    handle,
    numProducts,
    cursor,
    filters,
    sortKey,
    reverse,
  };
  const res = await storefront.request(query, variables);
  return res.collection.products;
};

export const getCountOfProductsOfCollection = async (
  handle: string,
  { minPrice, maxPrice }: Filters = {}
): Promise<number> => {
  const query = gql`
    query ProductsOfCollection($handle: String!, $filters: [ProductFilter!]) {
      collection(handle: $handle) {
        products(first: 250, filters: $filters) {
          edges {
            node {
              handle
            }
          }
        }
      }
    }
  `;
  const filters = [
    {
      price: {
        min: minPrice,
        max: maxPrice,
      },
    },
  ];
  const variables = {
    handle,
    query: filters,
  };
  const res = await storefront.request(query, variables);
  return res.collection.products.edges.length;
};

export const getProductsWithTitle = async (term: string) => {
  const query = gql`
    query ProductsWithTitle($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            productType
          }
        }
      }
    }
  `;
  const variables = {
    query: `title:*${term}*`,
  };
  const res = await storefront.request(query, variables);
  return res.products;
};

export interface Product {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  description: string;
  seo: {
    title: string;
    description: string;
  };
  images: {
    edges: {
      node: {
        url: string;
        height?: number;
        width?: number;
      };
    }[];
  };
  collections: {
    edges: {
      node: {
        title: string;
        handle: string;
      };
    }[];
  };
  productType: string;
  descSummary?: {
    value: string;
  };
  descFeatures?: {
    value: string;
  };
  descImage?: {
    value: string;
  };
  highList?: {
    value: string;
  };
  highImages?: {
    value: string;
  };
  keyFactor?: {
    value: string;
  };
  specList?: {
    value: string;
  };
  specImages?: {
    value: string;
  };
  setupProducts?: {
    value: string;
  };
  addonweights?: {
    value: string;
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        image?: {
          url: string;
        };
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        compareAtPriceV2?: {
          amount: string;
          currencyCode: string;
        };
        quantityAvailable: number;
      };
    }[];
  };
  tags: string[];
}

export const getProduct = async (
  handle: string
): Promise<Product | undefined> => {
  const query = gql`
    query SingleProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        availableForSale
        description
        seo {
          title
          description
        }
        images(first: 10) {
          edges {
            node {
              url
              height
              width
            }
          }
        }
        collections(first: 1) {
          edges {
            node {
              title
              handle
            }
          }
        }
        productType
        addonweights: metafield(namespace: "custom", key: "addonweights") {
          value
        }
        descSummary: metafield(
          namespace: "global"
          key: "Description-Summary"
        ) {
          value
        }
        descFeatures: metafield(
          namespace: "global"
          key: "Description-Features"
        ) {
          value
        }
        setupProducts: metafield(namespace: "custom", key: "setupproducts") {
          value
        }

        descImage: metafield(namespace: "global", key: "Description-Image") {
          value
        }
        highList: metafield(namespace: "global", key: "Highlights-List") {
          value
        }
        highImages: metafield(namespace: "global", key: "Highlights-Images") {
          value
        }
        keyFactor: metafield(
          namespace: "global"
          key: "Key-Factor-Perfomance"
        ) {
          value
        }
        specList: metafield(namespace: "global", key: "Specification-List") {
          value
        }
        specImages: metafield(
          namespace: "global"
          key: "Specification-Images"
        ) {
          value
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              image {
                url
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        tags
      }
    }
  `;
  const variables = {
    handle,
  };

  const res = await storefront.request(query, variables);
  return res?.product === null ? undefined : res.product;
};

export const getProductCard = async (handle: string): Promise<ProductInfo | undefined> => {
  const query = gql`
    query SingleProductCard($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          height
          width
        }
        variants(first: 1) {
          edges {
            node {
              id
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        tags
      }
    }
  `;
  const variables = {
    handle,
  };
  const res = await storefront.request(query, variables);
  return res?.product === null ? undefined : res.product;
};

/**
 * Returns a maximum of 10 products, but it may also be empty.
 * @param productId
 * @returns
 */
export const getProductRecommendations = async (
  productId: string
): Promise<ProductInfo[]> => {
  const query = gql`
    query ProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          height
          width
        }
        variants(first: 1) {
          edges {
            node {
              id
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        tags
      }
    }
  `;
  const variables = {
    productId,
  };
  const res = await storefront.request(query, variables);
  return res.productRecommendations;
};

export interface Collection {
  node: {
    title: string;
    handle: string;
    products: {
      edges: {
        node: {
          productType: string;
        };
      }[];
    };
  };
}

export const getProductCollections = async (): Promise<Collection[]> => {
  const query = gql`
    query ProductCollections {
      collections(first: 100) {
        edges {
          node {
            title
            handle
            products(first: 10) {
              edges {
                node {
                  productType
                }
              }
            }
          }
        }
      }
    }
  `;
  const res = await storefront.request(query);
  return res.collections.edges;
};
export interface ProductSearchInfo {
  node: {
    variants: {
      edges: {
        node: {
          id: any;
          quantityAvailable: any;
          priceV2: any;
          compareAtPriceV2: any;
        };
      }[];
    };
    tags: any;
    availableForSale: any;
    description: any;
    priceRangeV2: any;
    id: any;
    handle: string;
    title: string;
    featuredImage: {
      url: string;
    };
  };
}

export const searchProducts = async (
  numProducts: number,
  term: string
): Promise<ProductSearchInfo[]> => {
  const query = gql`
    query AllProducts(
      $numProducts: Int!
      $cursor: String
      $query: String
      $sortKey: ProductSortKeys
      $reverse: Boolean
    ) {
      products(
        first: $numProducts
        after: $cursor
        query: $query
        sortKey: $sortKey
        reverse: $reverse
      ) {
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            description
            descriptionHtml
            availableForSale
            featuredImage {
              url
              height
              width
            }
            images(first: 10) {
              edges {
                node {
                  url
                  height
                  width
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  quantityAvailable
                }
              }
            }
            tags
          }
        }
      }
    }
  `;
  const variables = {
    numProducts,
    query: term,
  };
  try {
    const res = await storefront.request(query, variables);
    try {
      if (typeof window !== 'undefined') {
        import('react-facebook-pixel')
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.init('3048042495310496');
            ReactPixel.trackCustom('Search', variables);
            ReactPixel.trackSingle(
              '3048042495310496',
              'Search',
              JSON.stringify(variables)
            );
          });
      }
    } catch (error) {
      console.error('error');
    }

    return res.products.edges;
  } catch (error) {
    console.error('error');
    return [];
  }
};


export interface CollectionHeader {
  collections: {
    edges: {
      node: {
        title: string;
        handle: string;
        image: {
          url: string;
        };
      };
    }[];
  };
  collection: {
    products: {
      edges: {
        node: {
          title: string;
          handle: string;
          featuredImage: {
            url: string;
            height: number;
            width: number;
          };
        };
      }[];
    };
  };
}

export const getCollectionsHeader = async (
  handle: string
): Promise<CollectionHeader> => {
  const query = gql`
    query CollectionsHeader($handle: String!) {
      collections(first: 100, sortKey: TITLE) {
        edges {
          node {
            title
            handle
            image {
              url
            }
          }
        }
      }
      collection(handle: $handle) {
        products(first: 6, sortKey: BEST_SELLING) {
          edges {
            node {
              title
              handle
              featuredImage {
                url
                height
                width
              }
            }
          }
        }
      }
    }
  `;
  const variables = { handle };
  const res = await storefront.request(query, variables);
  return res;
};

export interface ShopifyCollectionPage {
  title: string;
  descriptionHtml: HTMLElement;
  seo: {
    title: string;
    description: string;
  };
  products: {
    edges: {
      node: ProductInfo;
    }[];
  };
}

export const getShopifyCollectionPage = async (
  handle: string
): Promise<ShopifyCollectionPage | undefined> => {
  const query = gql`
    query CollectionPage($handle: String!) {
      collection(handle: $handle) {
        title
        descriptionHtml
        seo {
          title
          description
        }
        products(first: 10, sortKey: BEST_SELLING) {
          edges {
            node {
              id
              handle
              title
              description
              availableForSale
              metafield(namespace: "global", key: "Bundle-Items") {
                value
              }
              featuredImage {
                url
                height
                width
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    handle,
  };
  const res = await storefront.request(query, variables);

  return res.collection || undefined;
};

export interface ShopifyProductQuery {
  products: {
    edges: {
      node: ProductInfo;
      cursor: string;
    }[];
  };
}

export const getShopifyCollectionQuery = async (
  search: string
): Promise<ShopifyProductQuery | undefined> => {
  const query = gql`
    query QueryProduct($search: String!) {
      products(first: 10, query: $search) {
        edges {
          cursor
          node {
            id
            handle
            title
            description
            availableForSale

            featuredImage {
              url
              height
              width
            }

            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    search,
  };

  const res = await storefront.request(query, variables);
  return res;
};

interface ProductInside {
  variants: any;
  description: string | undefined;
  handle: string;
  id: string;
  title: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  featuredImage: {
    url: string;
  };
}

export interface ShopifyCompareProduct {
  product1: ProductInside;
  product2: ProductInside;
  product3: ProductInside;
}

export interface ShopifyAddOnProduct {
  product1: ProductInside;
  product2: ProductInside;
  product3: ProductInside;
  product4: ProductInside;
  product5: ProductInside;
  product6: ProductInside;
  product7: ProductInside;
  product8: ProductInside;
  product9: ProductInside;
  product10: ProductInside;
}

export const getCompareProductsShopify = async (
  handle1: string,
  handle2: string,
  handle3: string
): Promise<ShopifyCompareProduct> => {
  const query = gql`
    query CompareProduct($handle1: String, $handle2: String, $handle3: String) {
      product1: product(handle: $handle1) {
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          url
        }
      }
      product2: product(handle: $handle2) {
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          url
        }
      }
      product3: product(handle: $handle3) {
        title
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          url
        }
      }
    }
  `;
  const variables = {
    handle1,
    handle2,
    handle3,
  };
  const res = await storefront.request(query, variables);
  return res;
};

export const getAddOnProductsShopify = async (
  handle1: string,
  handle2: string,
  handle3: string,
  handle4: string,
  handle5: string,
  handle6: string,
  handle7: string,
  handle8: string,
  handle9: string,
  handle10: string
): Promise<ShopifyAddOnProduct> => {
  const query = gql`
    query CompareProduct(
      $handle1: String
      $handle2: String
      $handle3: String
      $handle4: String
      $handle5: String
      $handle6: String
      $handle7: String
      $handle8: String
      $handle9: String
      $handle10: String
    ) {
      product1: product(handle: $handle1) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product2: product(handle: $handle2) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product3: product(handle: $handle3) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product4: product(handle: $handle4) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product5: product(handle: $handle5) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product6: product(handle: $handle6) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product7: product(handle: $handle7) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product8: product(handle: $handle8) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product9: product(handle: $handle9) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
      product10: product(handle: $handle10) {
        title
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        featuredImage {
          url
        }
        description
        handle
      }
    }
  `;
  const variables = {
    handle1,
    handle2,
    handle3,
    handle4,
    handle5,
    handle6,
    handle7,
    handle8,
    handle9,
    handle10,
  };
  const res = await storefront.request(query, variables);
  return res;
};

export const getBestSellingProducts = async (
  limit: number = 10
): Promise<GetAllProductsResponse> => {
  const query = gql`
    query BestSellingProducts($limit: Int!) {
      products(
        first: $limit, 
        sortKey: BEST_SELLING, 
        query: "NOT tag:assembly AND NOT tag:weightstack AND NOT tag:add-ons AND NOT tag:ATTACHMENTS"
      ) {
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            description
            descriptionHtml
            availableForSale
            featuredImage {
              url
              height
              width
            }
            images(first: 10) {
              edges {
                node {
                  url
                  height
                  width
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  quantityAvailable
                }
              }
            }
            tags
          }
        }
      }
    }
  `;

  const variables = {
    limit
  };

  const res = await storefront.request(query, variables);
  return res;
};