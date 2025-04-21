/* eslint-disable @next/next/no-img-element */
import React, { createRef, useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import routes from '@config/routes';
import { SubcategoryStrapi } from 'services/strapi';

interface BgImageProps {
  subCategories: SubcategoryStrapi[];
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

const Slider = ({
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
    // console.log(myRefs.current)
  }, []);
  // const [imgZooms, setImgZooms] = useState(new Array(bgImage.length).fill(false));

  const animateSlide = (bgColor: number) => {
    switch (style) {
      case 'zoom':
        setSlideBgColor(bgColor);
        break;
    }
  };
  return (
    <section className="w-full max-w-7xl m-auto">
      <div className="grid lg:grid-cols-6 grid-cols-2">
        <div className="lg:col-span-5 text-left text-4xl lg:text-5xl font-bebas font-bold italic">
          {title1 == 'Best' && (
            <h1 className={`${color2}`}>
              <span className={`${color1} pr-2`}>{title1}</span>
              {title2}
            </h1>
          )}
          {title1 != 'Best' && (
            <h2 className={`${color2}`}>
              <span className={`${color1} pr-2`}>{title1}</span>
              {title2}
            </h2>
          )}
        </div>
        {btnText != '' && (
          <div className="lg:py-0 flex justify-end">
            <a href={link || '#'}>
              <button
                className={`px-6 py-3 mb-2 bg-transparent text-black-373933 ${border} ${btnBorder} hover:text-red-bc2026 hover:border-red-bc2026 rounded-lg font-bebas`}
                style={{ letterSpacing: '1px' }}
              >
                <span className="font-bold">{btnText}</span>
              </button>
            </a>
          </div>
        )}
      </div>
      <p className="font-roboto text-black-1c2023 text-left pb-5">
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
          perPage: 3,
          breakpoints: {
            640: {
              perPage: 1,
            },
          },
          perMove: 1,
        }}
        renderControls={() => (
          <div className="slider-progress">
            <div className="slider-progress-bar"></div>
          </div>
        )}
        onMoved={(splide) => {
          // Update the bar width. CSS is found on components.css
          const end = splide.Components.Controller.getEnd() + 1;
          const bar =
            sliderRef.current.splideRef.current.getElementsByClassName(
              'slider-progress-bar'
            )[0];
          bar.style.width = String((100 * (splide.index + 1)) / end) + '%';
        }}
      >
        {bgImage.map((b, i) => {
          return (
            <SplideSlide key={i} className="flex">
              <div
                className={`${height} relative w-full bg-black bg-opacity-25 hover:bg-opacity-0 transition duration-500`}
              >
                <img
                  //@ts-ignore
                  ref={myRefs.current[i]}
                  className={`object-cover w-full h-full transform transition duration-500`}
                  src={b.url}
                  alt=""
                  style={{}}
                />
                <div
                  className="w-full h-full absolute block top-0 bg-gradient-to-t from-black to-transparent opacity-60"
                  // onMouseEnter={() => triggerZoom(true, i)}
                  // onMouseLeave={() => triggerZoom(false, i)}
                />
                {b.link !== undefined ? (
                  <>
                    {b.topTitle !== undefined ? (
                      <div className="absolute ml-14 mt-5 top-0">
                        <h3
                          className="cursor-pointer lg:text-4xl text-2xl font-bebas font-bold italic text-white tracking-wide"
                          style={{ letterSpacing: '1px' }}
                        >
                          <a href={b.link}>{b.topTitle}</a>
                        </h3>
                        <ul className="text-lg tracking-wider transition h-60 overflow-y-scroll no-scrollbar text-white font-bebas italic">
                          {b.subCategories &&
                            b.subCategories.map((sub, i) => {
                              return (
                                <li className="" key={i}>
                                  {b.topTitle == 'Packages' && (
                                    <a
                                      href={`${routes.products.path}/${sub.slug}`}
                                    >
                                      <a className="lg:text-2xl text-lg tracking-wide font-normal pr-2">
                                        - {sub.title}
                                      </a>
                                    </a>
                                  )}
                                  {b.topTitle != 'Packages' && (
                                    <a
                                      href={`${
                                        routes.products.path
                                      }-category/${b
                                        .topTitle!.replaceAll(' ', '-')
                                        .toLowerCase()}/${sub.title
                                        .replaceAll(' ', '-')
                                        .toLowerCase()}`}
                                    >
                                      <a className="lg:text-2xl text-lg tracking-wide font-normal pr-2">
                                        - {sub.title}
                                      </a>
                                    </a>
                                  )}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    ) : null}
                    {b.downTitle !== undefined ? (
                      <a href={b.link}>
                        <div className="absolute flex items-end h-full ml-7 pb-7 bottom-0">
                          <h3 className="cursor-pointer text-2xl font-bebas font-normAL italic text-white tracking-wide">
                            {b.downTitle.slice(0, 36)} ...
                          </h3>
                        </div>
                      </a>
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
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

export default Slider;
