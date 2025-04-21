import routes from '@config/routes';
import { mapCheckout } from '@utils/checkout';
import { initWishlist } from '@utils/wishlist';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import {
  ProductInfo,
  addItemToCheckout,
  createCheckout,
  getProductRecommendations,
} from 'services/shopify/storefront';
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';
import { useSnackbar } from 'nextjs-toast';
import Slider from 'react-slick';

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

interface SellCardsProps {
  title?: string;
  gap?: string;
  cards?: CardProps[] | undefined;
  id: string;
}

export default function SellCards({ cards, id }: SellCardsProps) {
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
    slidesToShow: 1,
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

  const [products, setProducts] = useState<ProductInfo[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      if (id == null) return;
      setProducts(await getProductRecommendations(id));
    };
    fetchProducts();
  }, []);

  const mapProducts = (): CardProps[] => {
    return products
      .filter((el) => el.tags[0] != 'assembly')
      .map((item) => ({
        id: item.variants.edges[0].node.id,
        slug: item.handle,
        bgImg: item.featuredImage?.url,
        title: item.title,
        price: item.variants.edges[0].node.priceV2.amount,
        comparePrice: item.variants.edges[0].node.compareAtPriceV2?.amount,
        description: item.description,
        available: item.availableForSale,
        tags: item.tags,
      }));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-1">
        <div className={`px-2`}>
          {cards![0] != null && (
            <h3 className="pb-3 text-2xl font-bebas font-bold italic text-black-373933 tracking-wider">
              Add Attachment
            </h3>
          )}
          <Slider {...settings}>
            {cards &&
              cards.map((item, index) => {
                return (
                  item != null && (
                    <div key={index} className="">
                      <div className="border rounded-lg border-gray-300 py-2">
                        <div
                          className={`grid lg:grid-cols-4 grid-cols-1 px-8 lg:gap-6 gap-2`}
                        >
                          <a
                            href={`${routes.products.path}/${item.slug}`}
                            className="relative h-16 w-20 border border-gray-200"
                          >
                            {item.bgImg !== undefined ? (
                              <Image
                                src={item.bgImg}
                                objectFit="contain"
                                objectPosition="absolute"
                                height={100}
                                width={100}
                                placeholder='blur'
                                blurDataURL="/loading.png"
                              />
                            ) : null}
                          </a>
                          <div className="lg:col-span-3 flex flex-col gap-2">
                            <h5 className="text-black-1c2023 font-roboto flex flex-col font-bold w-full px-2">
                              <span className="block text-sm">
                                {item.title}
                              </span>
                              <span className="font-roboto text-red-bc2026 line-through pr-4">
                                {item.comparePrice !== '' &&
                                  `$${item.comparePrice}`}
                              </span>

                              <span className="font-roboto text-lg text-black-373933">
                                ${item.price}0
                              </span>
                            </h5>
                            <button
                              className={`w-full h-auto mb-2 py-2 hover:bg-red-hover  hover:-translate-x-10 rounded-md font-bebas ${item.available
                                  ? 'bg-black-373933 text-white'
                                  : 'cursor-default'
                                }`}
                              style={{ letterSpacing: '1.5px' }}
                              onClick={() => {
                                addProduct(item.id);
                              }}
                              disabled={!item.available}
                            >
                              <div className="flex justify-between items-center">
                                <span className="w-full">
                                  {item.available
                                    ? 'ADD TO CART'
                                    : 'OUT OF STOCK'}
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-center w-[100%] m-auto"></div>
                      </div>
                    </div>
                  )
                );
              })}
          </Slider>
        </div>
        <div className={`px-5`}>
          {mapProducts()[0] != null && (
            <h5 className="text-xl font-bebas font-bold italic text-black-373933 tracking-wider">
              Similar Products
            </h5>
          )}
          <Slider {...settings}>
            {mapProducts() &&
              mapProducts().map((item, index) => {
                return (
                  item != null && (
                    <div key={index} className="">
                      <div className="border rounded-lg border-gray-300 py-1">
                        <div className={`grid grid-cols-7 px-3 lg:gap-4 gap-2`}>
                          <a
                            href={`${routes.products.path}/${item.slug}`}
                            className="relative col-span-2"
                          >
                            {item.bgImg !== undefined ? (
                              <Image
                                src={item.bgImg}
                                objectFit="contain"
                                objectPosition="absolute"
                                height={100}
                                width={100}
                              />
                            ) : null}
                          </a>
                          <div className="col-span-5 flex flex-col gap-2">
                            <h4 className="font-normal font-roboto tracking-wide lg:text-base text-sm">
                              {item.title}
                              <span className="font-bebas italic font-bold text-red-bc2026 line-through pr-4">
                                {item.comparePrice !== undefined
                                  ? `was $${item.price}0`
                                  : null}
                              </span>
                              {item.comparePrice !== undefined && (
                                <span className="font-roboto text-lg text-black-373933">
                                  ${item.comparePrice}0
                                </span>
                              )}
                              {item.comparePrice == undefined && (
                                <span className="font-roboto text-lg text-black-373933">
                                  ${item.price}0
                                </span>
                              )}
                            </h4>
                            <button
                              className={`w-full h-auto mb-2 py-2 hover:bg-red-hover  hover:-translate-x-10 rounded-md font-bebas ${item.available
                                  ? 'bg-black-373933 text-white'
                                  : 'cursor-default'
                                }`}
                              style={{ letterSpacing: '1.5px' }}
                              onClick={() => {
                                addProduct(item.id);
                              }}
                              disabled={!item.available}
                            >
                              <div className="flex justify-between items-center">
                                <span className="w-full">
                                  {item.available
                                    ? 'Add To Cart'
                                    : 'Out Of Stock'}
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </Slider>
        </div>
      </div>
    </>
  );
}
