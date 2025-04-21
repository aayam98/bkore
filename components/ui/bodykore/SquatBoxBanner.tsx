import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Slider from 'react-slick';
import { Product } from 'services/shopify/storefront';

interface SquatBoxBannerProps {
  slider: {
    id: number;
    title?: string;
    description?: string;
    link?: string;
    image: string;
    buttontext?: string;
  }[];
  card?: Boolean;
  product?: Product;
  addProduct: (id: string, tags: string[]) => void;
  cartLoading: boolean;
}
const SquatBoxBanner = ({
  slider,
  card,
  product,
  addProduct,
  cartLoading,
}: SquatBoxBannerProps) => {
  const settings = {
    dots: false,
    infinite: true,
    pauseOnHover: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 6000,
        },
      },
    ],
  };
  const router = useRouter();
  return (
    <>
      <Slider {...settings}>
        {slider.map((ele, index) => (
          <div className="lg:h-screen h-auto relative" key={index}>
            <img
              className={`${
                ele.image == '/banner/banner_new.jpg'
                  ? 'object-contain'
                  : 'object-cover'
              } w-full lg:h-screen h-96 transform transition duration-500`}
              src={ele.image}
              alt=""
            />
            <div className="absolute top-0 bottom-0 left-0 right-0 align-middle justify-center items-center lg:h-screen h-96 flex flex-col text-center w-full">
              <h5 className="text-white lg:text-3xl text-xl font-montserrat font-semibold lg:pb-5 pb-3 shadowtext">
                {ele.title}
              </h5>
              <h2 className="text-white lg:text-6xl text-2xl font-playfair font-black capitalize leading-tight pb-10 lg:w-2/6 shadowtext1">
                {ele.description}
              </h2>

              <a
                className="transition duration-700 ease-in-out w-40 lg:py-3 py-2 lg:px-6 px-3 font-roboto uppercase font-bold tracking-wide lg:text-lg text-lg  border-2 bg-white text-red-bc2026 border-red-bc2026 hover:bg-red-hover hover:text-white hover:border-white"
                href="#productid"
              >
                {' '}
                {ele.buttontext}
              </a>

              {/* {ele.buttontext && ele.buttontext.length > 0 && !cartLoading && (
                <button
                  onClick={() => addProduct(product!.variants.edges[0].node.id, product!.tags)}
                  type="submit"
                  className="transition duration-700 ease-in-out w-40 lg:py-3 py-2 lg:px-6 px-3 font-roboto uppercase font-bold tracking-wide lg:text-lg text-lg  border-2 bg-white text-red-bc2026 border-red-bc2026 hover:bg-red-hover hover:text-white hover:border-white"
                >
                  {ele.buttontext}
                </button>
              )} */}
              {/* {
                cartLoading && <button

                  className="transition duration-700 ease-in-out w-40 lg:py-3 py-2 lg:px-6 px-3 font-roboto uppercase font-bold tracking-wide lg:text-lg text-lg  border-2 bg-white text-red-bc2026 border-red-bc2026 hover:bg-red-hover hover:text-white hover:border-white"
                >
                  Loading...
                </button>
              } */}
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SquatBoxBanner;
