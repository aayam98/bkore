import Image from 'next/image';
import React from 'react';
import BreadPayment from './BreadPayment';
import { CardProps } from './SellCards';
import routes from '@config/routes';
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

const ProductCard = (item: CardProps) => {
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
      const res = await addItemToCheckout(checkoutId, id);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
      }
    } else {
      const res = await createCheckout(id, email);
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
  return (
    <div className="px-1 lg:px-0">
      <div className="border">
        <div
          className={`flex justify-between bg-no-repeat bg-center h-48 bg-cover relative`}
        >
          <a
            href={`${routes.products.path}/${item.slug}`}
            className="relative h-full w-full"
          >
            {item.bgImg !== undefined ? (
              <Image
                placeholder="blur"
                blurDataURL="/loading.png"
                src={item.bgImg}
                layout="fill"
                objectFit="contain"
              />
            ) : null}
            {item.comparePrice !== undefined ? (
              <div className="flex justify-center items-center bg-red-bc2026 w-32 h-8 z-10 absolute">
                <h6 className="font-bebas text-white">
                  Save ${parseInt(item.price) - parseInt(item.comparePrice)}
                </h6>
              </div>
            ) : null}
            <div />
          </a>
        </div>

        <div className="px-3">
          <a href={`${routes.products.path}/${item.slug}`} className="text-black-1c2023 hover:underline font-bebas tracking-wider font-bold text-xl leading-8 py-3 px-5 text-center h-20 cursor-pointer">
            {item.title}
          </a>
          <div className="w-full h-20 justify-center items-center flex flex-wrap">
            <div>
              <p className="font-bebas text-xl text-red-bc2026 line-through text-center tracking-wide">
                {item.comparePrice !== undefined ? `was $${item.price}0` : null}
              </p>
              {item.comparePrice === undefined && (
                <p className="font-bebas font-bold text-3xl text-black-373933 text-center">
                  ${parseFloat(item.price).toFixed(2)}
                </p>
              )}
              {item.comparePrice !== undefined && (
                <p className="font-bebas font-bold text-3xl text-black-373933 text-center">

                  ${parseFloat(item.comparePrice).toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <BreadPayment
            price={
              item.comparePrice
                ? (item.comparePrice as unknown as number)
                : (item.price as unknown as number)
            }
            title={item.title}
            key={item.id}
            id={item.id}
            image={item.bgImg!}
          />
          {item.tags &&
            item.tags!.filter((tag) => tag.includes('specialOrder'))
              .length > 0 && <div className="lg:col-span-4 col-span-2 flex justify-center relative">
              <p className={`lg:text-sm text-sm font-roboto tracking-wide italic text-center md:text-left`}>Note: Limited Availability - Inquire to Order</p>
            </div>}
          {item.tags &&
            item.tags!.filter((tag) => tag.includes('specialOrder'))
              .length == 0 && <button
                className={`w-full h-12 mb-2 border-2 border-red-bc2026 hover:border-red-hover hover:bg-red-hover hover:-translate-x-10 rounded-md font-bebas ${item.available ? 'bg-red-bc2026 text-white' : 'cursor-default'
                  }`}
                style={{ letterSpacing: '1.5px' }}
                onClick={() => {
                  addProduct(item.id, item.tags!);
                }}
                disabled={!item.available}
              >
              <div className="flex justify-between px-20 items-center">
                {item.available ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.193"
                    height="16.193"
                    viewBox="0 0 16.193 16.193"
                  >
                    <path
                      id="Icon_material-add-shopping-cart"
                      data-name="Icon material-add-shopping-cart"
                      d="M9.532,7.669h1.606V5.355h2.41V3.813h-2.41V1.5H9.532V3.813H7.122V5.355h2.41Zm-3.213,6.94A1.543,1.543,0,1,0,7.926,16.15,1.573,1.573,0,0,0,6.319,14.608Zm8.032,0a1.543,1.543,0,1,0,1.606,1.542A1.573,1.573,0,0,0,14.351,14.608ZM6.456,12.1l.024-.093L7.2,10.753h5.984a1.61,1.61,0,0,0,1.406-.794l3.1-5.405-1.4-.74h-.008L15.4,5.355,13.187,9.211H7.548L7.444,9l-1.8-3.647L4.881,3.813,4.126,2.271H1.5V3.813H3.106L6,9.666,4.914,11.555a1.445,1.445,0,0,0-.2.74,1.58,1.58,0,0,0,1.606,1.542h9.638V12.3h-9.3A.2.2,0,0,1,6.456,12.1Z"
                      transform="translate(-1.5 -1.5)"
                      fill="#fff"
                    />
                  </svg>
                ) : null}

                <span className="w-full">

                  {item.variants.filter((variant: any) => variant.node.quantityAvailable > 0)[0] != undefined
                    ?
                    'ADD TO CART'
                    : item.tags &&
                      item.tags!.filter((tag) => tag.includes('PRE_ORDER'))
                        .length > 0 && (
                        <h6 className="font-bebas text-white">Pre Order</h6>
                      )
                      ? 'PRE ORDER'
                      : 'ADD TO CART'}
                </span>
              </div>
            </button>}

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
