import React from 'react';
import Cookies from 'js-cookie';
import { useSnackbar } from 'nextjs-toast';
import { useAtom, useSetAtom } from 'jotai';
import {
  cartAddOn,
  cartItemsState,
  cartTotalState,
  checkoutUrlState,
} from 'state/atoms';
import { addItemToCheckout, createCheckout } from 'services/shopify/storefront';
import { mapCheckout } from '@utils/checkout';

interface Props {
  id: string;
  price: string;
  tags: string[];
  comparePrice: string;
}

const AddToCartButton = (item: Props) => {
  const snackbar = useSnackbar();
  const setCartItems = useSetAtom(cartItemsState);
  const setcheckoutUrl = useSetAtom(checkoutUrlState);
  const setCartTotal = useSetAtom(cartTotalState);
  const setAddOn = useSetAtom(cartAddOn);
  const setAddOns = useAtom(cartAddOn);
  const addProduct = async (id: string, tags: string[]) => {
    const addOnList: {
      productId: string;
      name: string;
    }[] = [];

    if (localStorage.getItem('addons')) {
      if (localStorage.getItem('addons')! != undefined) {
        setAddOns[0]!.forEach((ele: any) => {
          addOnList.push(ele);
        });
      }
    }

    tags.forEach((ele) => {
      if (ele.split('-').length > 1) {
        addOnList.push({ name: ele, productId: id });
      }
    });
    localStorage.setItem('addons', JSON.stringify(addOnList));
    if (localStorage.getItem('addons')) {
      setAddOn(JSON.parse(localStorage.getItem('addons')!));
    }

    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');

    let checkout;
    if (checkoutId !== undefined) {
      const res = await addItemToCheckout(checkoutId, id, quantity);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
      }
    } else {
      const res = await createCheckout(id, email, quantity);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
        Cookies.set('checkoutId', checkout.id, { expires: 90 });
      }
    }
    snackbar.showMessage('Successfully Added to cart', 'success', 'filled');
    if (checkout !== undefined) {
      setCartItems(mapCheckout(checkout));
      setcheckoutUrl(checkout.webUrl);
      setCartTotal(checkout.subtotalPriceV2.amount);
    } else {
      console.error('Failed to add product');
      snackbar.showMessage('Failed to add product', 'error', 'filled');
    }
  };
  const [quantity, setQuantity] = React.useState(1);
  return (
    <>
      <button
        className="h-14 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-normal text-white-f2f9fa tracking-wide"
        onClick={() => {
          addProduct(item.id, item.tags!);
        }}
      >
        <div className="flex justify-between lg:px-16 px-6 items-center">
          <span className="w-full">Buy Now</span>
        </div>
      </button>
    </>
  );
};
export default AddToCartButton;
