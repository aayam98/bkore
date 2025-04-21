import { CardProps } from '@components/ui/bodykore/Cards/SellCardsaddon';
import { DynamicPages, getSearchItems, Subcategory } from 'services/graphCMS';
import {
  getCollectionsHeader,
  getShopifyCollectionQuery,
} from 'services/shopify/storefront';
import { getStrapiCategories } from 'services/strapi';
import { mediaUrl } from './baseUrls';

export interface CategoryData {
  title: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface HeaderData {
  categories: CategoryData[];
  pages: DynamicPages;
  cartsAddon: CardProps[];
}

export const getHeader = async (): Promise<HeaderData> => {
  const res = await getCollectionsHeader('packages');
  const smartSled = await getCollectionsHeader('smart-sled');
  const strapiCategory = await getStrapiCategories();
  const cartsAddonRes = await getShopifyCollectionQuery('tag:carts');

  const headerCat = res.collections.edges;
  const headerCartAddon = cartsAddonRes!;
  headerCat.sort((a, b) =>
    a.node.handle === 'packages' ? -1 : b.node.handle === 'packages' ? 1 : 0
  );

  let subcategories: { name: string; slug: string; image: string }[];

  const categories = await Promise.all(
    strapiCategory.data.map(async (item) => {
      if (item.attributes.title == 'Packages') {
        headerCat.map(async (item) => {
          subcategories = res.collection.products.edges.map((item) => {
            return {
              name: item.node.title,
              slug: item.node.handle,
              image: item.node.featuredImage?.url,
            };
          });
        });
      } else if (item.attributes.title == 'Smart Sled') {
        headerCat.map(async (item) => {
          subcategories = smartSled.collection.products.edges.map((item) => {
            return {
              name: item.node.title,
              slug: item.node.handle,
              image: item.node.featuredImage?.url,
            };
          });
        });
      } else {
        subcategories = item.attributes.subcategories.data.map((ele) => {
          return {
            name: ele.attributes.title,
            slug: ele.attributes.slug,
            image: ele.attributes.image.data
              ? mediaUrl + ele.attributes.image.data.attributes.url
              : mediaUrl +
                '/uploads/F8_S_Ske_Dz_Q0m_DRRHE_Zm_Oy_91cc7aa5be.jpeg',
          };
        });
      }

      return {
        title: item.attributes.title,
        slug: item.attributes.slug,
        image: item.attributes.image.data
          ? 'https://cms.bodykore.com' +
            item.attributes.image.data.attributes.url
          : '',
        subcategories: subcategories,
      };
    })
  );

  const cartsAddon = await Promise.all(
    headerCartAddon.products.edges.map((item) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      // comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.node.description,
      available: item.node.availableForSale,
      cursor: item.cursor,
    }))
  );

  const pages = await getSearchItems();
  return { categories, pages, cartsAddon };
};
