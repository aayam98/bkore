/* eslint-disable @next/next/no-img-element */
import React, { createRef, useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
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

const BestSeller = ({ style, bgImage, height }: SliderProps) => {
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
  return (
    <section className="w-full max-w-7xl m-auto">
      <div className="flex flex-row space-x-2">
        <span
          className={`text-gray-700 text-3xl lg:text-5xl font-bebas font-bold italic`}
        >
          Best
        </span>
        <span
          className={`text-red-bc2026 text-3xl lg:text-5xl font-bebas font-bold italic`}
        >
          SELLERS
        </span>
      </div>

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
                className={`${height} relative w-full bg-opacity-25 rounded-lg hover:bg-opacity-0 transition duration-500 `}
              >
                <Image
                  // ref={myRefs.current[i]}
                  src={b.url!}
                  className="rounded-lg relative"
                  width={500}
                  height={500}
                  alt={b.downTitle}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={50}
                  objectFit="contain"
                  placeholder="blur"
                  blurDataURL="/loading.png"
                  style={
                    {
                      // borderRadius: '10px 10px 0 0'
                    }
                  }
                />
                <div className="w-full h-full absolute block top-0 framegradient rounded-lg" />
                {/* <div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div> */}
                {b.downTitle !== undefined ? (
                  <a href={b.link}>
                    <div className="absolute flex items-end h-full bottom-0 py-2 px-5">
                      <h3 className="cursor-pointer text-2xl font-bebas font-normAL italic text-white tracking-wide">
                        {b.downTitle.slice(0, 36)} ...
                      </h3>
                    </div>
                  </a>
                ) : null}
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

export default BestSeller;
