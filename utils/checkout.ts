import { SingleItemCartProps } from '@components/ui/bodykore/Cart/SingleCartItem';
import { Checkout } from 'services/shopify/storefront';

export const mapCheckout = (checkout: Checkout): SingleItemCartProps[] => {
  const res = checkout.lineItems.edges.map((item) => ({
    name: item.node.variant.product.title,
    amount: item.node.quantity,
    available: item.node.variant.availableForSale,
    option: item.node.variant.title,
    price: item.node.variant.compareAtPriceV2 != null ? +item.node.variant.compareAtPriceV2.amount * item.node.quantity : +item.node.variant.priceV2.amount * item.node.quantity,
    saved: item.node.variant.compareAtPriceV2 != null ? (+item.node.variant.priceV2.amount * item.node.quantity) - (+item.node.variant.compareAtPriceV2.amount * item.node.quantity) : 0,
    image: item.node.variant.product.featuredImage?.url,
    lineId: item.node.id,
    cartId: checkout.id,
    id:item.node.variant.id,
    productId:item.node.variant.product.id,
    tags:item.node.variant.product.tags,
    currentlyNotInStock: item.node.variant.currentlyNotInStock,
    customAttributes: item.node.customAttributes
  }));
  return res;
};


export const isCartId = (id: string): boolean => {
  // Cart IDs typically start with "gid://shopify/Cart/"
  return id.includes('/Cart/');
};