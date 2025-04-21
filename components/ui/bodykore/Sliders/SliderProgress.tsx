import React, { useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Slider from 'react-slick';

interface BgImageProps {
  url?: string;
  title?: string;
  link?: string;
}

interface SliderPorgressProps {
  title1?: string;
  title2?: string;
  color1?: string;
  color2?: string;
  description?: string;
  btnText?: string;
  bgImage: BgImageProps[];
  id?: string;
  link: string;
  gap?: string;
  width?: string;
  textPosition?: string;
  pb?: string;
}

const SliderProgress = ({
  title1,
  title2,
  color1,
  color2,
  bgImage,
  id,
}: SliderPorgressProps) => {
  const router = useRouter();
  const viewMore = () => {
    router.push(`/inspiration?category=${title1?.toLowerCase()} gyms`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: bgImage.length >= 2 ? 2 : bgImage.length,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: bgImage.length >= 1 ? 1 : bgImage.length,
          slidesToScroll: 1,
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
    <section id={id}>
      <div className="w-full max-w-7xl m-auto lg:py-5">
        <div className="grid grid-cols-3 pb-3 items-center">
          <div className="col-span-2 py-2">
            <p
              className={`${color2} text-2xl lg:text-5xl font-bebas font-bold italic w-full`}
            >
              <span
                className={`${color1} text-2xl lg:text-5xl font-bebas font-bold italic lg:pr-2 pr-1`}
              >
                {title1}
              </span>
              {title2}
            </p>
          </div>
          <div className="flex justify-end">
            {router.asPath == '/inspiration' && (
              <button
                onClick={viewMore}
                className="h-10 px-5 text-black-373933 tracking-wider border border-black-373933 hover:bg-red-bc2026 rounded-lg font-bebas text-base"
              >
                View More
              </button>
            )}
          </div>
        </div>
        <Slider {...settings}>
          {bgImage.map((b, i) => {
            {
              return b.link !== undefined ? (
                <div key={i} className="px-1">
                  <a href={b.link}>
                    {/* <div
                      className={`bg-no-repeat bg-contain cursor-pointer w-full h-64 relative`}
                      style={{
                        backgroundImage: `url('${b.url}')`,
                      }}
                    > */}
                    <div>
                      <Image
                        src={b.url as string}
                        height={260}
                        width={419}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <h4
                        className="cursor-pointer text-2xl font-bebas italic font-normal text-white absolute bottom-3 px-3"
                        style={{ letterSpacing: '1px' }}
                      >
                        {b.title}
                      </h4>
                    </div>
                  </a>
                </div>
              ) : (
                <div key={i}>
                  <div
                    className={`bg-no-repeat bg-center bg-cover w-full h-96`}
                    style={{
                      backgroundImage: `url('${b.url}')`,
                    }}
                  >
                    <div
                      className={`flex justify-center items-end h-96 w-full`}
                    ></div>
                  </div>
                </div>
              );
            }
          })}
        </Slider>
      </div>
    </section>
  );
};

export default SliderProgress;
