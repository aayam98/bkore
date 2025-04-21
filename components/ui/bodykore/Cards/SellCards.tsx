import routes from '@config/routes';
import { mapCheckout } from '@utils/checkout';
import { initWishlist } from '@utils/wishlist';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { addItemToCheckout, createCheckout } from 'services/shopify/storefront';
import {
  cartAddOn,
  cartItemsState,
  cartTotalState,
  checkoutUrlState,
} from 'state/atoms';
import Slider from 'react-slick';
import { useSnackbar } from 'nextjs-toast';
import BreadPaymentsButton from './BreadPaymentC';
import GoogleTag from '../GoogleTag';
import { UseToster } from '@components/ui/ToasterUtil';

export interface CardProps {
  id: string;
  slug: string;
  bgImg?: string;
  title: string;
  price: string;
  comparePrice?: string;
  description?: string;
  available: boolean;
  tags?: string[];
  variants?: any;
}

interface SellCardsProps {
  title?: string;
  gap?: string;
  cards: CardProps[];
  slide?: boolean;
}
export default function SellCards({ cards, slide }: SellCardsProps) {
  const snackbar = useSnackbar();
  const { addToaster } = UseToster();
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

    tags &&
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
    addToaster({
      title: 'Success',
      message: 'Successfully Added to cart',
      duration: 5000,
      onClose: function (id: number): void {
        throw new Error('Function not implemented.');
      }
    })
    if (checkout !== undefined) {
      setCartItems(mapCheckout(checkout));
      setcheckoutUrl(checkout.webUrl);
      setCartTotal(checkout.subtotalPriceV2.amount);
    } else {
      console.error('Failed to add product');
      addToaster({
        title: 'Error',
        message: 'Failed to add product',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      })
    }
  };

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const fetchWishlist = async () => {
    setWishlist(await initWishlist());
  };
  const [carLength, setCarLength] = useState(cards.length);
  useEffect(() => {
    fetchWishlist();
    setTimeout(() => {
      setCarLength(cards.length > 4 ? 4 : cards.length);
    }, 4000);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: carLength,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-7xl  m-auto">
        {!!slide && (
          <>
            <Slider {...settings}>
              {cards.map((item, index) => {
                return (
                  <div key={index} className="relative  px-1 lg:px-0">
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
                              src={item.bgImg}
                              objectFit="contain"
                              objectPosition="absolute"
                            />
                          ) : null}
                          {item.comparePrice !== undefined ? (
                            <div className="flex justify-center items-center bg-red-bc2026 w-20 h-8 z-10 absolute">
                              <h6 className="font-bebas text-white">
                                Save $
                                {parseInt(item.price) -
                                  parseInt(item.comparePrice)}
                              </h6>
                            </div>
                          ) : null}
                          <div />
                        </a>
                      </div>

                      <div className="px-3">
                        <div className="flex items-center h-20">
                          <div className="w-2/3">
                            <h3 className="text-black-1c2023 font-roboto font-bold pt-5">
                              <a
                                href={`${routes.products.path}/${item.slug}`}
                                className="relative h-full w-full"
                              >{item.title}</a>
                            </h3>
                          </div>
                          <div
                            className="flex justify-center items-center shadow-lg bg-white h-9 w-32 mt-6"
                            style={{ width: '14rem' }}
                          >
                            <span className="font-bebas italic font-bold text-red-bc2026 line-through pr-4">
                              {item.comparePrice !== undefined
                                ? `was $${item.comparePrice}`
                                : null}
                            </span>
                            <span className="font-bebas italic font-bold text-2xl text-black-373933">
                              $
                              {item.price != undefined &&
                                parseFloat(item.price).toFixed(2)}
                            </span>
                            <span className="font-bebas italic font-bold text-red-bc2026 line-through pr-4">
                              {item.comparePrice !== undefined
                                ? `$${item.comparePrice}`
                                : null}
                            </span>
                          </div>
                        </div>

                        <button
                          id={`purchase${index.toFixed()}`}
                          className={`w-full h-12 mb-2 border-2 border-black-373933 hover:bg-black hover:-translate-x-10 rounded-md font-bebas ${item.available
                            ? 'bg-black-373933 text-white'
                            : 'cursor-default'
                            }`}
                          style={{ letterSpacing: '1.5px' }}
                          onClick={() => {
                            addProduct(item.id, item.tags!);
                          }}
                          disabled={!item.available}
                        >
                          <div className="flex justify-between px-16 items-center">
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
                            <h5 className="w-full">
                              {item.available ? 'ADD TO CART' : 'OUT OF STOCK'}
                            </h5>
                          </div>
                        </button>
                        <GoogleTag
                          value={
                            item.comparePrice
                              ? parseFloat(item.comparePrice)
                              : parseFloat(item.price)
                          }
                          id={index.toFixed()}
                          tax={0}
                          shipping={0}
                          items={[
                            {
                              item_id: item.id,
                              item_name: item.title,
                              affiliation: 'BodyKore',
                              coupon: '',
                              discount: 0,
                              index: 0,
                              item_brand: item.title,
                              item_category: item.slug,
                              item_category2: '',
                              item_category3: '',
                              item_category4: '',
                              item_category5: '',
                              item_list_id: item.id,
                              item_list_name: item.title,
                              item_variant: item.title,
                              location_id: item.id,
                              price: item.comparePrice
                                ? parseFloat(item.comparePrice) * 100
                                : parseFloat(item.price) * 100,
                              quantity: 1,
                            },
                          ]}
                        />
                        <BreadPaymentsButton
                          id={item.id}
                          price={
                            item.comparePrice
                              ? parseFloat(item.comparePrice)
                              : parseFloat(item.price)
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </>
        )}

        {slide == undefined && (
          <div
            className={`grid gap-x-4 gap-y-8 md:grid-cols-3 sm:grid-cols-1 `}
          >
            {cards.map((item, index) => {
              return (
                <div key={index} className="px-1  lg:px-0">
                  <div
                    className="bg-white border-2 rounded-lg"
                    style={{
                      padding: '0 0 5px',
                      background: '',
                      margin: '0 5px',
                      border: '',
                    }}
                  >
                    <div
                      className={`flex justify-between bg-no-repeat bg-center  h-auto lg:h-48 bg-cover relative`}
                    >
                      <a
                        href={`${routes.products.path}/${item.slug}`}
                        className="relative h-full  w-full"
                      >
                        {item.bgImg !== undefined ? (
                          <Image
                            src={item.bgImg}
                            width={500}
                            height={300}
                            className=''
                            placeholder="blur"
                            blurDataURL="/loading.png"
                            alt={item.title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={75}
                            objectFit="contain"
                          />
                        ) : null}
                        {item.comparePrice !== undefined ? (
                          <div className="flex justify-center items-center bg-red-bc2026 w-32 h-8 z-10 absolute">
                            <h6 className="font-bebas text-white">
                              Save $
                              {parseInt(item.price) -
                                parseInt(item.comparePrice)}
                            </h6>
                          </div>
                        ) : null}
                        <div />
                      </a>
                    </div>

                    <div className="px-3">
                      <div className="">
                        <h3 className="text-black-1c2023 hover:text-black-373933 font-bebas font-bold text-xl leading-8 tracking-wider  py-1 px-5 text-center cursor-pointer">
                        <a
                          href={`${routes.products.path}/${item.slug}`}
                          className="relative h-full  w-full"
                        > {item.title.length >= 29
                            ? item.title.slice(0, 29) + '...'
                            : item.title}
                            </a>
                        </h3>
                        <div className="w-full justify-center items-center flex flex-wrap">
                          <p className="font-bebas text-xl text-red-bc2026 line-through text-center tracking-wide">
                            {item.comparePrice !== undefined
                              ? `was $${item.price}0`
                              : null}
                          </p>
                          {item.comparePrice === undefined && (
                            <p className="font-bebas font-bold text-2xl text-black-373933 text-center">
                              ${item.price}0
                            </p>
                          )}
                          {item.comparePrice !== undefined && (
                            <p className="font-bebas font-bold text-2xl text-black-373933 text-center pl-2">
                              ${item.comparePrice}0
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='flex flex-row px-2 text-center items-center w-full  mb-3'>
                        <BreadPaymentsButton
                          id={item.id}
                          price={
                            item.comparePrice
                              ? parseFloat(item.comparePrice)
                              : parseFloat(item.price)
                          }
                        />
                      </div>
                      {/* </div> */}
                      {item.tags &&
                        item.tags!.filter((tag) => tag.includes('specialOrder'))
                          .length > 0 && <div className="lg:col-span-4 col-span-2 flex justify-center  relative">
                          <p className={`lg:text-sm text-sm font-roboto tracking-wide italic text-center md:text-left`}>Note: Limited Availability - Inquire to Order</p>
                        </div>}

                      {item.tags ?
                        item.tags!.filter((tag) => tag.includes('specialOrder')).length ==
                        0 && <button
                          id={`purchase${index.toFixed()}`}
                          className={`w-full h-12 mb-2 border-2 border-black-373933 hover:bg-red-bc2026 hover:border-red-bc2026 hover:-translate-x-10 rounded-md font-bebas bg-black-373933 text-white ${item.available
                            ? 'bg-red-bc2026 text-white'
                            : 'cursor-default'
                            }`}
                          style={{ letterSpacing: '1.5px' }}
                          onClick={() => {
                            addProduct(item.id, item.tags!);
                          }}
                          disabled={item.variants && item.variants.filter((variant: any) => variant.node.quantityAvailable > 0)[0] != undefined ? false : true}
                        >
                          <div className="flex justify-between px-20 items-center">
                            {item.variants && item.variants.filter((variant: any) => variant.node.quantityAvailable > 0)[0] != undefined ? (
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
                              {item.variants && item.variants.filter((variant: any) => variant.node.quantityAvailable > 0)[0] != undefined
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
                        </button> : <button
                          id={`purchase${index.toFixed()}`}
                          className={`w-full h-12 mb-2 border-2 border-black-373933 hover:bg-red-bc2026 hover:border-red-bc2026 hover:-translate-x-10 rounded-md font-bebas bg-black-373933 text-white ${item.available
                            ? 'bg-red-bc2026 text-white'
                            : 'cursor-default'
                            }`}
                          style={{ letterSpacing: '1.5px' }}
                          onClick={() =>
                            addProduct(item.id, [])
                          }
                        // disabled={item.variants && item.variants.filter((variant: any) => variant.node.quantityAvailable > 0)[0] != undefined ? false : true}
                        >
                          <div className="flex justify-between px-20 items-center">
                            {item.variants && item.variants.filter((variant: any) => variant.node.quantityAvailable > 0)[0] != undefined ? (
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
                              ADD TO CART
                            </span>
                          </div>
                        </button>}

                      <GoogleTag
                        value={
                          item.comparePrice
                            ? parseFloat(item.comparePrice)
                            : parseFloat(item.price)
                        }
                        id={index.toFixed()}
                        tax={0}
                        shipping={0}
                        items={[
                          {
                            item_id: item.id,
                            item_name: item.title,
                            affiliation: 'BodyKore',
                            coupon: '',
                            discount: 0,
                            index: 0,
                            item_brand: item.title,
                            item_category: item.slug,
                            item_category2: '',
                            item_category3: '',
                            item_category4: '',
                            item_category5: '',
                            item_list_id: item.id,
                            item_list_name: item.title,
                            item_variant: item.title,
                            location_id: item.id,
                            price: item.comparePrice
                              ? parseFloat(item.comparePrice) * 100
                              : parseFloat(item.price) * 100,
                            quantity: 1,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div >
    </>
  );
}
