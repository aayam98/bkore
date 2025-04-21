/* eslint-disable @next/next/no-img-element */
import React, { createRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';

interface BgImageProps {
  url?: string;
  topTitle?: string;
  downTitle?: string;
  link?: string;
}

interface SliderProps {
  title1?: string;
  color1?: string;
  title2?: string;
  color2?: string;
  description?: string;
  btnText?: string;
  btnBorder?: string;
  border?: string;
  style?: string;
  bgImage: BgImageProps[];
  link?: string;
  height?: string;
}

const CartSlider = ({
  title1,
  color1,
  title2,
  color2,
  description,
  btnText,
  btnBorder,
  border,
  style,
  bgImage,
  link,
  height,
}: SliderProps) => {
  const sliderRef = useRef<any>();
  const [slideBgColor, setSlideBgColor] = useState(0.5);
  const myRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    myRefs.current = bgImage.map(
      (element, i) => myRefs.current[i] ?? createRef()
    );
  }, []);

  const animateSlide = (bgColor: number) => {
    switch (style) {
      case 'zoom':
        setSlideBgColor(bgColor);
        break;
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: bgImage.length >= 3 ? 3 : bgImage.length,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: bgImage.length >= 2 ? 2 : bgImage.length,
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
      <div className="">
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3">
            <span
              className={`${color2} text-4xl lg:text-5xl font-bebas font-bold italic`}
            >
              <span
                className={`${color1} text-4xl lg:text-5xl font-bebas font-bold italic pr-2`}
              >
                {title1}
              </span>
              {title2}
            </span>
          </div>
          <div className="flex justify-end">
            <Link href={link || '#'} passHref>
              <button
                className={`px-7 bg-red-bc2026 hover:bg-red-hover py-2 text-white hover:text-white rounded-lg font-bebas`}
                style={{ letterSpacing: '1px' }}
              >
                <span className="font-medium">{btnText}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <p className="font-roboto text-black-1c2023 lg:w-2/3 text-center lg:text-left pb-5">
        {description}
      </p>
      <Slider {...settings}>
        {bgImage.map((b, i) => {
          return (

            <div key={i} className="flex px-1 cursor-pointer">
              <Link href={b.link!} target='_blank' className='cursor-pointer' passHref>
                <div className={`${height} relative w-full transition duration-500`}>
                  <Image
                    //@ts-ignore
                    ref={myRefs.current[i]}
                    className={`object-cover w-full h-80 transform transition duration-500`}
                    src={b.url as string}
                    alt=""
                    width={376}
                    height={320}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className="w-full h-full absolute block bottom-0 " />
                  {b.link !== undefined ? (
                    <>
                      {b.topTitle !== undefined ? (

                        <div className="absolute flex ml-10 mt-5 bottom-0 ">
                          <h3
                            className="cursor-pointer text-4xl font-bebas font-bold italic text-gray-100 tracking-widest"
                            style={{ letterSpacing: '1px' }}
                          >
                            {b.topTitle}
                          </h3>
                        </div>

                      ) : null}
                      {b.downTitle !== undefined ? (

                        <div className="absolute flex items-end h-full ml-7 pb-7 bottom-0">
                          <h2 className="cursor-pointer text-xl font-bebas font-bold italic text-white tracking-wide">
                            {b.downTitle.slice(0, 36)} ...
                          </h2>
                        </div>

                      ) : null}
                    </>
                  ) : (
                    <>
                      {b.topTitle !== undefined ? (
                        <div className="absolute flex ml-10 mt-5">
                          <h5
                            className="text-5xl font-bebas font-bold italic absolute text-white"
                            style={{ letterSpacing: '1px' }}
                          >
                            {b.topTitle}
                          </h5>
                        </div>
                      ) : null}
                      {b.downTitle !== undefined ? (
                        <div className="absolute flex items-end h-full ml-7 pb-7">
                          <h5
                            className="text-xl font-roboto text-white"
                            style={{ letterSpacing: '1px' }}
                          >
                            {b.downTitle}
                          </h5>
                        </div>
                      ) : null}
                    </>
                  )}
                </div></Link>
            </div>

          );
        })}
      </Slider>
    </>
  );
};

export default CartSlider;
