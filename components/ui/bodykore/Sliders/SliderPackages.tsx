import routes from '@config/routes';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import BreadPayment from '../Cards/BreadPayment';
import BreadPaymentsButton from '../Cards/BreadPaymentC';

interface SliderCardProps {
  id: string;
  slug: string;
  title: string;
  price: string;
  affirmPrice?: string;
  affirmIcon?: string;
  url?: string;
  available: boolean;
  options: String[];
}

interface SliderPackagesProps {
  title1?: string;
  color1?: string;
  title2?: string;
  color2?: string;
  description?: string;
  btnText?: string;
  btnBorder?: string;
  border?: string;
  style?: string;
  link?: string;
  cards: SliderCardProps[];
}

const SliderPackages = ({
  title1,
  color1,
  title2,
  color2,
  description,
  btnText,
  btnBorder,
  border,
  style,
  link,
  cards,
}: SliderPackagesProps) => {
  const sliderRef = useRef<any>();
  const [slideBgColor, setSlideBgColor] = useState(0.5);

  const animateSlide = (bgColor: number) => {
    switch (style) {
      case 'zoom':
        setSlideBgColor(bgColor);
        break;
    }
  };

  const addProduct = async (id: string) => {
    return;
  };

  return (
    <section className="w-full max-w-6xl m-auto px-6">
      <div className="flex flex-row lg:pb-2 pb-0 gap-8 lg:px-16 items-center">
        <div className="flex w-1/2">
          <span
            className={`${color2} lg:text-4xl text-2xl font-bebas font-bold italic`}
          >
            <span
              className={`${color1} lg:text-4xl text-2xl font-bebas font-bold italic pr-2`}
            >
              {title1}
            </span>
            {title2}
          </span>
        </div>

        <div className="flex justify-end items-center w-1/2">
          <Link href={link || '#'} passHref>
            <button
              className={`px-5 py-2 bg-transparent text-black-373933 ${border} ${btnBorder} hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg font-bebas`}
              style={{ letterSpacing: '1px' }}
            >
              <span className="">{btnText}</span>
            </button>
          </Link>
        </div>
      </div>
      <p className="font-roboto text-black-1c2023 lg:w-2/3 pb-8 text-center lg:text-left">
        {description}
      </p>

      <Splide
        ref={sliderRef}
        options={{
          pagination: false,
          gap: '1rem',
          type: 'loop',
          width: '100%',
          autoWidth: false,
        }}
        onMoved={(splide) => {
          // Update the bar width. CSS is found on components.css
          const end = splide.Components.Controller.getEnd() + 1;
        }}
      >
        {cards.map((item, index) => {
          return (
            <SplideSlide key={index}>
              <div className="w-full" />
              <div className="flex justify-center">
                <Link href={`${routes.products.path}/${item.slug}`} passHref>
                  <div
                    className="bg-no-repeat bg-center bg-cover flex justify-center items-center cursor-pointer mb-5"
                    style={{
                      backgroundImage: `url('${item.url}')`,
                      height: '350px',
                      width: '600px',
                    }}
                  ></div>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-between pb-5 px-16">
                <h5
                  className="text-3xl font-bebas text-black-1c2023"
                  style={{ letterSpacing: '0.5px' }}
                >
                  {item.title}
                </h5>
                <h5 className="font-bebas text-red-bc2026 text-3xl font-bold italic pr-2">
                  ${item.price}0
                </h5>
              </div>
              <div className="flex flex-row px-4">
                <BreadPaymentsButton
                  id={item.id}
                  price={parseFloat(item.price)}
                />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

export default SliderPackages;
