/* eslint-disable @next/next/no-img-element */
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  SelectorIcon,
} from '@heroicons/react/solid';
import { mapCheckout } from '@utils/checkout';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useSnackbar } from 'nextjs-toast';
import React, { Fragment, useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  Product,
  addItemToCheckout,
  createCheckout,
} from 'services/shopify/storefront';
import {
  cartAddOn,
  cartItemsState,
  cartTotalState,
  checkoutUrlState,
} from 'state/atoms';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import BreadPaymentsButton from '../Cards/BreadPaymentC';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import GoogleTag from '../GoogleTag';
import { CardProps } from '../Cards/SellCardsSingle';
import Head from 'next/head';
import { UseToster } from '@components/ui/ToasterUtil';

export type ProductCompare = {
  id: string;
  image: string;
  title: string;
  price: string;
  quantity: number;
};

export type Technologies = {
  title: string;
  description: string;
  image: string[];
  iconImage: string;
};

interface Option {
  title: string;
  id: string;
  price: string;
  prevPrice?: string;
  img?: string;
  available: boolean;
  quantityAvailable: number;
}

interface SingleProductProps {
  rating: number;
  numReviews: number;
  description?: string;
  shippingCost?: string;
  options: Option[];
  reviewOnClick: () => void;
  product: ProductCompare;
  technologies?: Technologies[];
  tags?: string[];
  setupFeeProduct?: Product;
  dimension?: string;
  diagramAct: (image: string) => void;
  addOnWeightProducts?: Product[];
  slug?: string;
  isVisible: boolean;
  cards: CardProps[];
}

const SingleProduct = ({
  shippingCost,
  options,
  reviewOnClick,
  product,
  tags,
  setupFeeProduct,
  dimension,
  diagramAct,
  addOnWeightProducts,
  slug,
  isVisible,
  cards,
}: SingleProductProps) => {
  const { addToaster } = UseToster();
  const snackbar = useSnackbar();
  const setCartItems = useSetAtom(cartItemsState);
  const setcheckoutUrl = useSetAtom(checkoutUrlState);
  const setCartTotal = useSetAtom(cartTotalState);
  const setAddOn = useSetAtom(cartAddOn);
  const setAddOns = useAtom(cartAddOn);
  const [checkAdd, setCheckAdd] = useState(false);
  const [checkWeight, setCheckWeight] = useState(false);
  const [modalWeight, setModalWeight] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    image: '',
  });
  const [variant, setVariant] = useState('Default'); // Initialize with a default value

  const [quantity, setQuantity] = useState(1);
  const [weightQuantity, setWeightQuantity] = useState(0);

  const [selected, setSelected] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);

  const [cartList, setCartList] = useState<any[]>([]);

  const multipleOptions = !(
    options.length === 1 && options[0].title === 'Default Title'
  );

  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const addProduct = async () => {
    setAddToCartLoading(true);
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
    tags?.forEach((ele) => {
      if (ele.split('-').length > 1) {
        addOnList.push({ name: ele, productId: options[selected].id });
      }
    });

    localStorage.setItem('addons', JSON.stringify(addOnList));
    if (localStorage.getItem('addons')) {
      setAddOn(JSON.parse(localStorage.getItem('addons')!));
    }

    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');
    let checkout;
    
    // Ensure variant is never blank
    const variantToUse = variant || "Default";
    
    try {
      if (checkoutId !== undefined) {
        const res = await addItemToCheckout(
          checkoutId,
          options[selected].id,
          quantity,
          variantToUse
        );
        if (res.checkout !== undefined) {
          checkout = res.checkout;
        }
      } else {
        const res = await createCheckout(options[selected].id, email, quantity, variantToUse);
        if (res.checkout !== undefined) {
          checkout = res.checkout;
          Cookies.set('checkoutId', checkout.id, { expires: 90 });
        }
      }

      if (checkAdd && !checkWeight) {
        if (checkoutId !== undefined) {
          const res = await addItemToCheckout(
            checkoutId,
            setupFeeProduct!.variants.edges[0].node.id,
            quantity,
            variantToUse
          );
          if (res.checkout !== undefined) {
            checkout = res.checkout;
          }

          res.checkout?.lineItems.edges?.forEach((ele) => {
            if (ele.node.variant.title == 'Default Title') {
              addOnList.push({ name: ele.node.variant.product.title, productId: ele.node.id });
            }
          });

          localStorage.setItem('addons', JSON.stringify(addOnList));
          if (localStorage.getItem('addons')) {
            setAddOn(JSON.parse(localStorage.getItem('addons')!));
          }
        } else {
          const res = await createCheckout(
            setupFeeProduct!.variants.edges[0].node.id,
            email,
            1,
            variantToUse
          );
          if (res.checkout !== undefined) {
            checkout = res.checkout;
            Cookies.set('checkoutId', checkout.id, { expires: 90 });
          }
        }
      } else if (
        checkAdd &&
        weightQuantity != 0 &&
        addOnWeightProducts !== undefined
      ) {
        if (checkoutId !== undefined) {
          const res = await addItemToCheckout(
            checkoutId,
            setupFeeProduct!.variants.edges[0].node.id,
            1,
            variantToUse
          );
          if (res.checkout !== undefined) {
            checkout = res.checkout;
          }

          for (let ele of weights) {
            if (ele.quantity > 0) {
              const resWeight = await addItemToCheckout(
                checkoutId,
                ele.id,
                ele.quantity,
                variantToUse
              );
              if (resWeight.checkout !== undefined) {
                const lineItem = resWeight.checkout?.lineItems.edges.find(
                  (item: any) => item.node.variant.id === ele.id
                )?.node;
                if (lineItem) {
                  setCartList((prev) => [...prev, JSON.stringify(lineItem)]);
                }
              }
            }
          }
        } else {
          const res = await createCheckout(
            setupFeeProduct!.variants.edges[1].node.id,
            email,
            1,
            variantToUse
          );
          if (res.checkout !== undefined) {
            checkout = res.checkout;
            Cookies.set('checkoutId', checkout.id, { expires: 90 });
          }
        }
      } else if (
        !checkAdd &&
        weightQuantity != 0 &&
        addOnWeightProducts !== undefined
      ) {
        if (checkoutId !== undefined) {
          for (let ele of weights) {
            if (ele.quantity > 0) {
              const resWeight = await addItemToCheckout(
                checkoutId,
                ele.id,
                ele.quantity,
                variantToUse
              );

              if (resWeight.checkout !== undefined) {
                checkout = resWeight.checkout;
                if (resWeight.checkout !== undefined) {
                  const lineItem = resWeight.checkout?.lineItems.edges.find(
                    (item: any) => item.node.variant.id == ele.id
                  )?.node;

                  if (lineItem) {
                    setCartList((prev) => [...prev, JSON.stringify(lineItem)]);
                  }
                }
              }
            }
          }
        } else {
          const res = await createCheckout(
            setupFeeProduct!.variants.edges[1]?.node.id,
            email,
            1,
            variantToUse
          );
          if (res.checkout !== undefined) {
            checkout = res.checkout;
            Cookies.set('checkoutId', checkout.id, { expires: 90 });
          }
        }
      }

      addToaster({
        title: 'Success',
        message: 'Successfully Added to cart',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      });
      
      if (checkout !== undefined) {
        setCartItems(mapCheckout(checkout));
        setcheckoutUrl(checkout.webUrl);
        setCartTotal(checkout.subtotalPriceV2.amount);
        Cookies.set('weightQuantity', cartList.toString(), { expires: 90 });
      } else {
        console.error('Failed to add product');
        addToaster({
          title: 'Error',
          message: 'Failed to add product',
          duration: 5000,
          onClose: function (id: number): void {
            throw new Error('Function not implemented.');
          }
        });
      }
    } catch (error) {
      console.error('Cart error:', error);
      addToaster({
        title: 'Error',
        message: 'Failed to add product to cart. Please check all fields are filled correctly.',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      });
    } finally {
      setAddToCartLoading(false);
    }
  };

  const [showModal, setShowModal] = useState({
    status: false,
    id: undefined as unknown as number,
  });

  const changeSelect = (selected: number) => {
    setSelected(selected);
    diagramAct(options[selected].img!);
  };

  const [weights, setWeights] = useState<{ id: string; quantity: number }[]>(
    []
  );

  useEffect(() => {
    if (addOnWeightProducts && addOnWeightProducts.length > 0) {
      setWeights(
        addOnWeightProducts.map((ele) => {
          return {
            id: ele.variants.edges[0].node.id,
            quantity: 0,
          };
        })
      );
    }
  }, [addOnWeightProducts]);

  useEffect(() => {
    if (weights.length > 0) {
      setWeightQuantity(
        weights.map((item) => item.quantity).reduce((prev, next) => prev + next)
      );
    }
  }, [weights]);

  return (
    <>
      {/* ---------------------Update part--------------------- */}
      <div className="grid grid-cols-1 gap-y-5  px-2">
        {/* >>>>>>>>>>>>>>>>>>>>>>>>price sections<<<<<<<<<<<<<<<<<<<< */}
        <div className="flex gap-5 items-center">
          <div>
            <h3
              className={`lg:text-3xl text-2xl  px-2 font-bebas font-bold tracking-wide italic text-left md:text-left leading-10`}
            >
              {product.title}
            </h3>
            <p className="font-bebas italic font-bold lg:text-4xl text-3xl px-2 product-price affirmproduct leading-none pt-2">
              {/* ${+options[selected].prevPrice! ? +options[selected].prevPrice! :  (+options[selected].price).toFixed(2)} */}
              $
              {+options[selected].prevPrice!
                ? +options[selected].prevPrice! + '.00'
                : (+options[selected].price).toFixed(2)}
            </p>
            {/* <p className='price-item ml2'>
           $
              {+options[selected].prevPrice!
                ? +options[selected].prevPrice! + '.00'
                : (+options[selected].price).toFixed(2)}
            </p> */}
          </div>
        </div>
        {/* >>>>>>>>>>>>>>>>>>>>>>>>price sections<<<<<<<<<<<<<<<<<<<< */}
        {/* ${isVisible && 'fixed top-56 left-1/2 w-96'} */}
        {/* >>>>>>>>>>>>>>>>>>>>>>>>Bread Payment<<<<<<<<<<<<<<<<<<<< */}
        <div className="relative  h-5"> {/*10 mb-5*/}
          {options.map((ele, index) => (
            <div
              key={index}
              className={`px-2 absolute left-0 right-0`}
              style={{
                zIndex: isVisible ? 999 : 999,
                height: selected == index ? 'auto' : 0,
                opacity: selected == index ? 1 : 0,
              }}
            >
              <BreadPaymentsButton
                id={ele.id}
                price={
                  ele.prevPrice
                    ? parseFloat(ele.prevPrice!)
                    : parseFloat(ele.price)
                }
              />
            </div>
          ))}
        </div>



        {/* >>>>>>>>>>>>>>>>>>>>>>>>Bread Payment<<<<<<<<<<<<<<<<<<<< */}

        {/* >>>>>>>>>>>>>>>>>>>>>>>>Product Variations<<<<<<<<<<<<<<<<<<<< */}
        {/* <div className='mt-16'></div> */}

        {multipleOptions && (
          <div className="w-full mt-5   px-2 relative z-30 pt-5">
            <Listbox value={selected} onChange={changeSelect}>
              <div className="relative  ">
                <Listbox.Button className="relative z-40 hover:z-50 w-full py-2 pl-3 pr-10 text-left text-gray-700 bg-gray-100 rounded-lg border border-red-bc2026 cursor-default focus:bg-white focus:border-gray-500">
                  <span className="block  truncate">
                    <div className="flex  gap-2 items-center pl-3">
                      <Image
                        src={options[selected].img || ''}
                        alt=""
                        className=""
                        height={24}
                        width={24}

                      />
                      {options[selected].title}
                    </div>
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5  text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="z-50  absolute  w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((item, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                            ? 'text-amber-900 bg-amber-100'
                            : 'text-gray-900'
                          }`
                        }
                        value={index}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              <div className="flex  items-center gap-8">
                                <Image
                                  src={item.img as string}
                                  alt=""
                                  className=""
                                  width={40}
                                  height={40}
                                />
                                {item.title}
                              </div>
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        )}

        {/* >>>>>>>>>>>>>>>>>>>>>>>>Product Variations<<<<<<<<<<<<<<<<<<<< */}

        {/* Size selector - Uncomment and use this if needed */}
        <div className="px-2 mt-5">
          {false && <p className="leading-none text-base">
            Available Size : S/M or L/XL <span className='text-sm italic'> (Note: Please select required size)</span>
            <select
              className="text-gray-700 h-12 w-full px-4 leading-tight border border-gray-300 rounded-lg mt-2"
              value={variant}
              onChange={(event) => {
                setVariant(event.target.value);
              }}
            >
              <option value="Default">Select a size</option>
              <option value="S/M">S/M</option>
              <option value="L/XL">L/XL</option>
            </select>
          </p>}
        </div>
        
        {/* >>>>>>>>>>>>>>>>>>>>>>>>Assembly Price<<<<<<<<<<<<<<<<<<<< */}
        {setupFeeProduct != undefined && (
          <div className="px-2">
            <div className="border px-4 py-3 rounded-lg">
              <div className="text-gray-700 relative border-white flex flex-wrap gap-x-3 text-base tracking-wide font-roboto">
                <input
                  type="checkbox"
                  onChange={() => setCheckAdd(!checkAdd)}
                />{' '}
                Fully Assembled (+$
                {setupFeeProduct.variants.edges[0].node.priceV2.amount}0)
                <div className="has-tooltip">
                  <span className="tooltip rounded shadow-sm bg-gray-100 text-gray-700 leading-6 font-roboto tracking-wide left-5 top-8 p-3 text-sm">
                    *This item is available to ship fully assembled. Please make
                    sure the entrance of the room exceeds the dimensions of the
                    assembled machine listed below.
                    {dimension && (
                      <span>
                        <br></br>Dimension : {dimension}
                      </span>
                    )}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* >>>>>>>>>>>>>>>>>>>>>>>>Assembly Price<<<<<<<<<<<<<<<<<<<< */}


        {/* >>>>>>>>>>>>>>>>>>>>>>>>Product Addon Weight<<<<<<<<<<<<<<<<<<<< */}
        <div className="px-2 rounded-lg  ">
          {addOnWeightProducts && addOnWeightProducts?.length > 0 ? (
            <div className="w-full border rounded-lg">
              <p className="bg-gray-200 text-gray-700 py-2 px-3 font-bebas tracking-wider italic text-lg font-bold rounded-t-lg">
                Add Add-ons <span className="font-normal"> (Optional)</span>
              </p>
              <div className="max-h-opt6top h-auto overflow-y-scroll overflow-x-hidden">
                {addOnWeightProducts.map((ele, index) => (
                  <Listbox value={ele.id} key={index}>
                    <div className="mx-2 my-2">
                      <div className="flex flex-row px-2 py-2 items-center align-middle bg-gray-100 rounded-md">
                        <a
                          href={`/product/${ele.handle}`}
                          className="flex items-start"
                        >
                          <Image
                            src={
                              ele.images.edges.length > 0
                                ? ele.images.edges[0].node.url
                                : imageNotFound
                            }
                            alt=""
                            className="h-14 w-20 object-contain border border-gray-300 rounded-md "
                            width={80}
                            height={56}
                            placeholder="blur"
                            blurDataURL="/loading.png"
                          />
                          <h5 className="w-48 font-roboto tracking-normal text-sm px-3">
                            {ele.title.replace(
                              'Olympic Rubber',
                              'lb price is per plate Olympic Rubber'
                            )}
                          </h5>
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => {
                            setModalWeight(!modalWeight);
                            setModalContent({
                              title: ele.title,
                              content: ele.description,
                              image:
                                ele.images.edges.length > 0
                                  ? ele.images.edges[0].node.url
                                  : imageNotFound,
                            });
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                        <div className="flex items-center justify-center font-medium w-20">
                          +$
                          {parseInt(ele.variants.edges[0].node.priceV2.amount)}
                        </div>
                        <input
                          className="w-16 text-gray-700 h-12 px-4 leading-tight border border-gray-300 rounded-lg"
                          type={'number'}
                          min="0"
                          step="1"
                          onInput={(event: any) => {
                            if (!/[0-9]/.test(event.currentTarget.value)) {
                              event.preventDefault();
                            }
                          }}
                          defaultValue={
                            weights.length > 0 ? weights[index].quantity : 0
                          }
                          onChange={(event) => {
                            setWeights((prev) => {
                              const temp = [...prev];
                              temp[index].quantity = +event.target.value;
                              return temp;
                            });
                          }}
                        ></input>
                      </div>
                    </div>
                  </Listbox>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        {/* >>>>>>>>>>>>>>>>>>>>>>>>Product Addon Weight<<<<<<<<<<<<<<<<<<<< */}

        {/* >>>>>>>>>>>>>>>>>>>>>>>>Total with assembly<<<<<<<<<<<<<<<<<<<< */}

        {checkAdd && !checkWeight && (
          <div className="px-2">
            <div className="font-bebas text-3xl italic border-t-2 border-b-2 border-gray-200 py-2">
              <span className="text-2xl tracking-wider font-bold">
                Total Amount :
              </span>
              <span className="text-4xl font-bold">
                $
                {+options[selected].prevPrice!
                  ? parseFloat(options[selected].prevPrice!) +
                  parseFloat(
                    setupFeeProduct!.variants.edges[0].node.priceV2.amount
                  ) +
                  '.00'
                  : parseFloat(options[selected].price) +
                  parseFloat(
                    setupFeeProduct!.variants.edges[0].node.priceV2.amount
                  )}
                .00
              </span>
            </div>
          </div>
        )}
        {checkAdd &&
          checkWeight &&
          addOnWeightProducts &&
          addOnWeightProducts?.length > 0 && (
            <div className="px-2">
              <div className="font-bebas text-3xl italic border-t-2 border-b-2 border-gray-200 py-2">
                <span className="text-2xl tracking-wider font-bold">
                  Total Amount :
                </span>
                <span className="text-4xl font-bold">
                  $
                  {+options[selected].prevPrice!
                    ? parseFloat(options[selected].prevPrice!) +
                    parseFloat(
                      setupFeeProduct!.variants.edges[0].node.priceV2.amount
                    ) +
                    parseFloat(
                      addOnWeightProducts[selectedProduct].variants.edges[0]
                        .node.priceV2.amount
                    ) *
                    weightQuantity +
                    '.00'
                    : parseFloat(options[selected].price) +
                    parseFloat(
                      setupFeeProduct!.variants.edges[0].node.priceV2.amount
                    ) +
                    parseFloat(
                      addOnWeightProducts[selectedProduct].variants.edges[0]
                        .node.priceV2.amount
                    ) *
                    weightQuantity}
                  .00
                </span>
              </div>
            </div>
          )}
        {weightQuantity > 0 && addOnWeightProducts && !checkAdd && (
          <div className="px-2">
            <div className="font-bebas text-3xl italic border-t-2 border-b-2 border-gray-200 py-2">
              <span className="text-2xl tracking-wider font-bold">
                Total Amount :
              </span>
              <span className="text-4xl font-bold">
                $
                {+options[selected].prevPrice!
                  ? parseFloat(options[selected].prevPrice!) +
                  parseFloat(
                    addOnWeightProducts[selectedProduct].variants.edges[0]
                      .node.priceV2.amount
                  ) +
                  '.00'
                  : parseFloat(options[selected].price) * quantity +
                  parseFloat(
                    addOnWeightProducts[selectedProduct].variants.edges[0]
                      .node.priceV2.amount
                  ) *
                  weightQuantity}
                .00
              </span>
            </div>
          </div>
        )}

        {/* >>>>>>>>>>>>>>>>>>>>>>>>Total with assembly<<<<<<<<<<<<<<<<<<<< */}
        <div className="grid lg:grid-cols-4 grid-cols-4 items-center align-middle px-2">
          {/* >>>>>>>>>>>>>>>>>>>>>>>>Product Quantity<<<<<<<<<<<<<<<<<<<< */}

          {tags &&
            tags!.filter((tag) => tag.includes('speicalOrder')).length >
            0 && <div className="lg:col-span-4 col-span-4 items-center align-middle mb-3">
              <span className="leading-none">
                Qty :
                <input
                  className="w-20 text-gray-700 h-12 px-4 ml-2 leading-tight border border-gray-300 rounded-lg"
                  type={'number'}
                  min="1"
                  step="1"
                  onInput={(event: any) => {
                    if (!/[0-9]/.test(event.currentTarget.value)) {
                      event.preventDefault();
                    }
                  }}
                  defaultValue={quantity}
                  onChange={(event) => {
                    setQuantity(+event.target.value);
                  }}
                ></input>
              </span>
            </div>}


          {/* >>>>>>>>>>>>>>>>>>>>>>>>Product Quantity<<<<<<<<<<<<<<<<<<<< */}
          {/* >>>>>>>>>>>>>>>>>>>>>>>>Add to cart btn<<<<<<<<<<<<<<<<<<<< */}
          {tags &&
            tags!.filter((tag) => tag.includes('specialOrder')).length >
            0 && <div className="lg:col-span-4 col-span-2  relative border-gray-400 border p-2 rounded-md">

              <p className={`lg:text-base text-sm font-roboto font-medium text-gray-600 text-center md:text-left`}>Note: Limited Availability - Inquire to Order.</p>
            <div className='grid grid-cols-2 gap-3'>
           
             <a className='bg-red-bc2026 text-white font-roboto text-center py-2 rounded-md hover:bg-red-hover' href='mailto:sales@bodykore.com'>Email</a>
             <a className='bg-red-bc2026 text-white font-roboto text-center py-2 rounded-md hover:bg-red-hover' href='tel:949-325-3088'>Call Now</a>
            </div>
            </div>}
          {tags &&
            tags!.filter((tag) => tag.includes('specialOrder')).length ==
            0 && <div className="lg:col-span-2 col-span-2 relative">
              <button
                id={`purchase${slug!}`}
                className={`w-full h-12 border-2 border-red-bc2026 hover:border-red-hover hover:bg-red-hover rounded-md font-bebas text-xl italic font-bold ${options[selected].available
                  ? 'bg-red-bc2026 text-white'
                  : 'cursor-default'
                  }`}
                style={{ letterSpacing: '1.5px' }}
                onClick={addProduct}
                disabled={!options[selected].available || addToCartLoading}
              >
                <div className="flex justify-center items-center">
                  <span className="mr-2">
                    {addToCartLoading ? 'ADDING...' : 
                      options[selected].quantityAvailable > 0
                      ? 'ADD TO CART'
                      : tags &&
                        tags!.filter((tag) => tag.includes('PRE_ORDER')).length >
                        0 ? 'PRE ORDER' : 'OUT OF STOCK'}
                  </span>
                </div>
              </button>
              {options[selected].available &&
                tags &&
                tags!.filter((tag) => tag.includes('PRE_ORDER')).length > 0 &&
                product.quantity == 0 && (
                  <h6 className="font-bebas italic text-black absolute top-15 mt-1">
                    Pre Orders may take anywhere from 4-12 weeks*
                  </h6>
                )}
              <GoogleTag
                value={
                  options[selected].prevPrice
                    ? parseFloat(options[selected].prevPrice!) * 100
                    : parseFloat(options[selected].price) * 100
                }
                id={slug!}
                tax={0}
                shipping={0}
                items={[
                  {
                    item_id: product.id,
                    item_name: product.title,
                    affiliation: 'BodyKore',
                    coupon: '',
                    discount: 0,
                    index: 0,
                    item_brand: product.title,
                    item_category: product.id,
                    item_category2: '',
                    item_category3: '',
                    item_category4: '',
                    item_category5: '',
                    item_list_id: product.id,
                    item_list_name: product.title,
                    item_variant: product.title,
                    location_id: product.id,
                    price: options[selected].prevPrice
                      ? parseFloat(options[selected].prevPrice!) * 100
                      : parseFloat(options[selected].price) * 100,
                    quantity: 1,
                  },
                ]}
              />
            </div>
          }
          {/* >>>>>>>>>>>>>>>>>>>>>>>>Add to cart btn<<<<<<<<<<<<<<<<<<<< */}
        </div>
      </div>
      {modalWeight && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{ zIndex: 99999 }}
          >
            <div className="relative w-auto mx-auto max-w-xl p-3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-start py-3 pl-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base lg:text-2xl font-semibold">
                    {modalContent?.title}
                  </h3>
                  <button
                    className="pr-5 pt-2 ml-auto  border-0 text-black float-right text-2xl leading-none"
                    onClick={() => setModalWeight(false)}
                  >
                    <IoIosCloseCircleOutline style={{ color: '#000' }} />
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-scroll">
                  <div className="">
                    <Image
                      className=""
                      src={modalContent?.image}
                      height={400}
                      width={800}
                      alt="image"
                      objectFit="contain"
                    />
                  </div>

                  <div
                    className="font-roboto text-sm lg:text-base"
                    dangerouslySetInnerHTML={{
                      __html: modalContent.content,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default SingleProduct;