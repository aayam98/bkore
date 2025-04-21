import routes from '@config/routes';
import { mapCheckout } from '@utils/checkout';
import { initWishlist } from '@utils/wishlist';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSetAtom } from "jotai";
import { addItemToCheckout, createCheckout } from 'services/shopify/storefront';
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';
import Slider from 'react-slick';
import Link from 'next/link';
import { useSnackbar } from 'nextjs-toast';
import BreadPayment from './BreadPayment';

export interface CardProps {
  id: string;
  slug: string;
  bgImg?: string;
  title: string;
  price: string;
  comparePrice?: string;
  description?: string;
  available: boolean;
}

interface SellCardsportfolioProps {
  title?: string;
  gap?: string;
  cards: CardProps[];
  slide?: boolean;
}
export default function SellCardsportfolio({
  title,
  cards,
  slide,
}: SellCardsportfolioProps) {
  const snackbar = useSnackbar();
  const setCartItems = useSetAtom(cartItemsState);
  const setcheckoutUrl = useSetAtom(checkoutUrlState);
  const setCartTotal = useSetAtom(cartTotalState);
  const addProduct = async (id: string) => {
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

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const fetchWishlist = async () => {
    setWishlist(await initWishlist());
  };

  useEffect(() => {
    // Cookies.set('customerId', '6154246979804', {expires: 90})
    fetchWishlist();
  }, []);

  const sliderRef = useRef<any>();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cards.length > 4 ? 4 : cards.length,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: false,
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
      <div className="max-w-7xl m-auto px-6">
        <h3
          className={`text-black-1c2023 lg:text-4xl text-3xl font-bebas font-bold italic text-left md:text-left`}
        >
          {' '}
          {title}
        </h3>
        {slide && (
          <>
            <Slider {...settings}>
              {cards.map((item, index) => {
                return (
                  <div key={index} className="px-4 lg:px-0 pb-5">
                    <div
                      className="bg-white border"
                      style={{
                        padding: '0 0 5px',
                        background: '',
                        margin: '0 5px',
                        border: '2px solid #e2e2e2;',
                      }}
                    >
                      <div
                        className={`flex justify-center bg-no-repeat bg-center h-48 bg-cover relative`}
                      >
                        <Link
                          href={`${routes.products.path}/${item.slug}`}
                          className="relative h-full w-full"
                        >
                          <div>
                            {item.bgImg !== undefined ? (
                              <Image
                                src={item.bgImg}
                                height={192}
                                width={296}
                                placeholder="blur"
                                blurDataURL="/loading.png"
                                objectFit="contain"
                                objectPosition="absolute"
                              />
                            ) : null}
                            {item.comparePrice !== undefined ? (
                              <div className="flex justify-center items-center bg-red-bc2026 w-32 h-8 z-10 absolute">
                                <h5 className="font-bebas text-white">
                                  DROPPED PRICE
                                </h5>
                              </div>
                            ) : null}
                            <div />
                          </div>
                        </Link>
                      </div>

                      <div className="px-3">
                        <h3 className="text-black-1c2023 font-bebas tracking-wider font-bold text-xl leading-8 py-3 px-5 text-center h-20 cursor-pointer">
                          {item.title}
                        </h3>
                        <div className="w-full h-20 justify-center items-center flex flex-wrap">
                          <div>
                            <p className="font-bebas text-xl text-red-bc2026 line-through text-center tracking-wide">
                              {item.comparePrice !== undefined
                                ? `was $${item.comparePrice}`
                                : null}
                            </p>
                            <p className="font-bebas font-bold text-3xl text-black-373933 text-center">
                              ${item.price}0
                            </p>
                          </div>
                        </div>

                        <button
                          className={`w-full h-12 mb-2 border-2 border-black-373933 hover:bg-red-bc2026 hover:border-red-bc2026 hover:-translate-x-10 rounded-md font-bebas ${
                            item.available
                              ? 'bg-black-373933 text-white'
                              : 'cursor-default'
                          }`}
                          style={{ letterSpacing: '1.5px' }}
                          onClick={() => {
                            addProduct(item.id);
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
                            <span className="w-full">
                              {item.available ? 'ADD TO CART' : 'OUT OF STOCK'}
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </>
        )}

        {slide == undefined && (
          <div className={`grid gap-x-4 gap-y-8 md:grid-cols-4 sm:grid-cols-1`}>
            {cards.map((item, index) => {
              return (
                <div key={index} className="px-1 lg:px-0">
                  <div className="shadow-lg bg-white">
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
                          <div className="flex justify-center items-center bg-red-bc2026 w-32 h-8 z-10 absolute">
                            <h5 className="font-bebas text-white">
                              DROPPED PRICE
                            </h5>
                          </div>
                        ) : null}
                        <div />
                      </a>
                    </div>

                    <div className="px-3">
                      <div className="flex items-center h-20">
                        <div className="w-2/3">
                          <h3 className="text-black-1c2023 font-roboto font-bold pt-5">
                            {item.title.length >= 30
                              ? item.title.slice(0, 30) + '...'
                              : item.title}
                          </h3>
                        </div>
                        <div className="flex justify-center items-center shadow-lg bg-white h-9 w-32 mt-6">
                          <span className="font-bebas italic font-bold text-red-bc2026 line-through pr-4">
                            {item.comparePrice !== undefined
                              ? `$${item.comparePrice}`
                              : null}
                          </span>
                          <span className="font-bebas italic font-bold text-2xl text-black-373933">
                            ${item.price}0
                          </span>
                        </div>
                      </div>

                      <button
                        className={`w-full h-12 mb-2 border-2 border-black-373933 hover:bg-black hover:-translate-x-10 rounded-md font-bebas ${
                          item.available
                            ? 'bg-black-373933 text-white'
                            : 'cursor-default'
                        }`}
                        style={{ letterSpacing: '1.5px' }}
                        onClick={() => {
                          addProduct(item.id);
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

                          <span className="w-full">
                            {item.available ? 'ADD TO CART' : 'OUT OF STOCK'}
                          </span>
                        </div>
                      </button>

                      <BreadPayment
                        price={item.price as unknown as number}
                        title={item.title}
                        key={item.id}
                        id={item.id}
                        image={''}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
