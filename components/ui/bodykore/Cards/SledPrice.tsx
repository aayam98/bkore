import React from 'react';
import BreadPayment from './BreadPaymentC';
import { CardProps } from './SellCards';
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

const SledProductCard = (item: CardProps) => {
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
      <section className="max-w-7xl m-auto bg-gray-200">
        <div className="p-4 grid grid-cols-1 gap-3">
          <div className="flex justify-between bg-gray-200">
            <div className="flex items-center gap-x-4">
              <span className="font-bebas italic font-bold text-4xl text-black-373933 product-price affirmproduct">
                ${item.price}0
              </span>

              <span className="font-roboto italic text-lg text-white pr-4 bg-red pl-3 rounded-md">
                {item.comparePrice !== undefined ? (
                  <h6 className="">
                    Save ${parseInt(item.price) - parseInt(item.comparePrice)}
                  </h6>
                ) : null}
              </span>
            </div>
          </div>
          <p className="text-md">
            Qty :
            <input
              className="w-20 text-gray-700 py-2 px-4 ml-2 leading-tight"
              type={'number'}
              min="1"
              step="1"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              defaultValue={quantity}
              onChange={(event) => {
                setQuantity(+event.target.value);
              }}
            ></input>
          </p>
          <div className="w-full">
            <BreadPayment
              price={
                item.comparePrice
                  ? parseFloat(item.comparePrice!)
                  : parseFloat(item.price)
              }
              key={item.id}
              id={item.id}
            />

            <script
              type="application/javascript"
              dangerouslySetInnerHTML={{
                __html: `
              BreadPayments.registerPlacements(
                
                  ${JSON.stringify(
                    [
                      {
                        title: item.title,
                        id: item.id,
                        comparePrice: item.comparePrice,
                        price: item.price,
                      },
                    ].map((ele) => ({
                      allowCheckout: false,
                      domID: `bread-checkout-btn-${
                        ele.id.split('/')[ele.id.split('/').length - 1]
                      }`,
                      financingType: 'installment',
                      locationType: 'product',
                      order: {
                        items: [
                          {
                            name: `${ele.title}`,
                            category: '',
                            unitPrice: {
                              value: ele.comparePrice
                                ? parseFloat(ele.comparePrice) * 100
                                : parseFloat(ele.price) * 100,
                              currency: 'USD',
                            },
                            unitTax: { value: 0, currency: 'USD' },
                            brand: ele.title,
                            quantity: 1,
                            shippingDescription: 'Ground',
                            shippingProvider: 'UPS',
                            shippingCost: { value: 0, currency: 'USD' },
                          },
                        ],
                        subTotal: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalPrice: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalTax: { value: 0, currency: 'USD' },
                        totalShipping: { value: 0, currency: 'USD' },
                        totalDiscounts: { value: 0, currency: 'USD' },
                      },
                    }))
                  )}
                );
              BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {
                console.log(installmentResult);
              });   
              BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {
                console.log("Checkout Successful");
                console.log(installmentResult);
              });
           `,
              }}
            />
          </div>

          <div className="">
            <button
              className={`w-full h-12 mb-2 border-2 border-black-373933 hover:border-red-bc2026 hover:bg-red-bc2026 hover:-translate-x-10 rounded-md font-bebas ${
                item.available ? 'bg-black-373933 text-white' : 'cursor-default'
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
                  {item.available
                    ? item.tags &&
                      item.tags!.filter((tag) => tag.includes('PRE_ORDER'))
                        .length > 0 && (
                        <h6 className="font-bebas text-white">Pre Order</h6>
                      )
                      ? 'PRE ORDER'
                      : 'ADD TO CART'
                    : 'OUT OF STOCK'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SledProductCard;
