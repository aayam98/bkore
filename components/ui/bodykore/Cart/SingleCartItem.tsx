import { mapCheckout } from '@utils/checkout';
import { useEffect, useState } from 'react';
import { useSetAtom } from "jotai";
import {
  removeItemFromCheckout,
  updateQuantityCheckout,
} from 'services/shopify/storefront';
import { canCheckoutState, cartAddOn, cartItemsState, cartTotalState } from 'state/atoms';

export interface SingleItemCartProps {
  available: boolean;
  shippingDays?: number;
  name: string;
  option?: string;
  price: number;
  saved?: number;
  amount: number;
  image?: string;
  lineId: string;
  cartId: string;
  id?: string;
  tags: string[];
  productId?: string;
  currentlyNotInStock: boolean;
  customAttributes: {
    key: string;
    value: string;
  }[];
}
// Changed option to indicate selected variant.
// Changed amount to indicate quantity in the cart,
// change the selector UI to a number input.

function isCF2104Product(addOn: { name: string; productId: string; }[], searchName: string): boolean {
  return addOn.some(item => item.name.includes(searchName.trim()));
}

export default function SingleCartItem({
  name,
  option,
  price,
  saved,
  amount,
  image,
  lineId,
  cartId,
  id,
  tags,
  currentlyNotInStock,
  customAttributes,
}: SingleItemCartProps) {
  const setCartItems = useSetAtom(cartItemsState);
  const setCartTotal = useSetAtom(cartTotalState);
  const setAddOn = useSetAtom(cartAddOn);
  const [variant, setVariant] = useState(customAttributes.length > 0 ? customAttributes[0].value : '');
  const setCanCheckout = useSetAtom(canCheckoutState);
  const [quantity, setQuantity] = useState(1);

  const removeLine = async () => {
    const res = await removeItemFromCheckout(cartId, lineId);
    let localName = "";
    if (name === 'Squat Box- Belt Squat Platform- MX1182' || name === 'Essentials Kit' || name === 'Home Kit' || name === 'Gym Kit') {
      setCanCheckout(true);
    }
    if (name.split('-').length > 1) {
      localName = name.split('-')[name.split('-').length - 1];
    }
    if (res.checkout !== undefined) {
      setCartItems(mapCheckout(res.checkout));
      setCartTotal(res.checkout.subtotalPriceV2.amount);
      if (localStorage.getItem('addons')) {
        let addons = JSON.parse(localStorage.getItem('addons')!);
        if (res.checkout.lineItems.edges.length === 1 && isCF2104Product(addons, localName)) {
          // Find the index of the addon that matches the localName
          const addonIndex = addons.findIndex((addon: { name: string }) => addon.name.includes(localName.trim()));
          if (addonIndex !== -1) { // Ensure that the addon was found
            setAddOn(JSON.parse(localStorage.getItem('addons')!));

            // Remove the specific item from the checkout
            let response = await removeItemFromCheckout(cartId, addons[addonIndex].productId);

            // Remove only the specific productId from 'addons' in localStorage
            const updatedAddons = addons.filter((_addon: any, index: any) => index !== addonIndex);
            localStorage.setItem('addons', JSON.stringify(updatedAddons));

            // If the response is valid, update the cart items and total
            if (response.checkout !== undefined) {
              setCartItems(mapCheckout(response.checkout));
              setCartTotal(response.checkout.subtotalPriceV2.amount);
            }
          }
        }
      }
    }
  };

  const updateLine = async (quantity: number) => {
    if (quantity === 0) {
      // Dont allow 0 to avoid accidental removal,
      // as the item would disapear from the cart
      return;
    }
    const res = await updateQuantityCheckout(cartId, lineId, quantity, variant);
    if (res.checkout !== undefined) {
      setCartItems(mapCheckout(res.checkout));
      setCartTotal(res.checkout.subtotalPriceV2.amount);
    }
  };

  // useEffect(() => {
  //   if (name === 'Squat Box- Belt Squat Platform- MX1182' || name === 'Essentials Kit' || name === 'Home Kit' || name === 'Gym Kit') {
  //     if (variant.trim() === '') {
  //       setCanCheckout(false);
  //     } else {
  //       setCanCheckout(true);
  //     }
  //   }

  // }, [variant]);
  return (
    <>
      <div className="">
        <div className="border border-gray-300 mb-2 p-2 rounded-lg">
          <div className="flex flex-row gap-2 justify-between">
            <div className="w-2/12 relative">
              {image ? <img src={image} alt="" /> : null}
            </div>
            <div className="w-10/12 px-1">
              <div className="flex flex-row w-full justify-between">
                <div className="w-8/12">
                  <h4 className="font-normal font-roboto tracking-wide lg:text-base text-sm cursor-pointer">
                    {name}
                  </h4>
                  {option !== 'Default Title' && <small className="font-medium">

                    ({option})
                  </small>}
                  <p className="text-base text-gray-700 ">
                    Quantity
                    <input
                      className="w-16 h-8 rounded-md text-gray-700 border p-2 mx-2"
                      type={'number'}
                      min="1"
                      step="1"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      defaultValue={amount}
                      onChange={(event) => {
                        updateLine(+event.target.value);
                      }}
                    ></input>
                  </p>
                </div>
                <div className="w-4/12 justify-between flex flex-col">
                  <div>
                    <p className="font-roboto text-base font-semibold text-gray-700 text-right w-full">
                      ${price.toFixed(2)}

                      {tags != undefined && currentlyNotInStock &&
                        tags.filter((tag) => tag.includes('PRE_ORDER')).length >
                        0 && <p className="text-red-500"> (Pre Order)</p>}
                    </p>
                    {saved != 0 && (
                      <p className="font-roboto text-sm text-white bg-red-bc2026 px-1.5 rounded-md">
                        Save ${saved}.00
                      </p>
                    )}
                  </div>

                </div>

              </div>
              {/* {(name === 'Squat Box- Belt Squat Platform- MX1182' || name === 'Essentials Kit' || name === 'Home Kit' || name === 'Gym Kit') && (
                <div className="flex flex-col">
                  <span>
                    Available Size: S/M or L/XL <span className="text-sm italic">(Note: Please input required size)</span>
                  </span>
                  <input
                    type="text"
                    onChange={async (e) => {
                      const value = e.currentTarget.value.trim(); // Trim whitespace for better validation
                      setVariant(value);
                      setCanCheckout(value !== ''); // Enable/disable checkout based on input value
                      await updateQuantityCheckout(cartId, lineId, quantity, e.currentTarget.value.trim());
                    }}
                    value={variant}
                    placeholder="Enter Size"
                    required
                    className={`h-8 rounded-md text-gray-700 border p-2 mt-2 ${variant === '' ? 'border-red-bc2026' : ''
                      }`}
                  />
                  {variant === '' && (
                    <span className="text-sm text-red-bc2026">Please enter size</span>
                  )}
                </div>
              )} */}
              <button
                type="button"
                onClick={removeLine}
                className="cursor-pointer text-red-bc2026 text-base font-roboto font-medium text-right w-full"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
