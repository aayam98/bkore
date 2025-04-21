import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';

interface SliderCardProps {
  slider: {
    id: number;
    title?: string;
    job?: string;
    description?: string;
    image: string;
    image2: string;
  }[];
  card?: Boolean;
}

const SliderCard = ({ slider, card }: SliderCardProps) => {
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
    <div>
      {!card && (
        <Slider {...settings}>
          {slider.map((ele, index) => (
            <div key={index}>
              <Image
                src={ele.image}
                alt=""
                className="lg:h-80 h-60 object-cover w-full p-1 "
                width={405}
                height={320}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
              {ele.title && (
                <p className="relative bottom-10 left-5 text-xl tracking-wider font-bebas text-white font-thin">
                  {ele.title}
                </p>
              )}
              {ele.description && (
                <p className="relative bottom-10 left-5 text-xl tracking-wider font-bebas text-white font-thin">
                  {ele.description}
                </p>
              )}
            </div>
          ))}
        </Slider>
      )}
      {card && (
        <Slider {...settings}>
          {slider.map((ele, index) => (
            <div className="lg:p-2 p-0" key={index}>
              <div className="bg-white py-5 px-10 rounded-lg text-gray-800 text-center">
                <p className="font-bebas leading-tight">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="quote-left"
                    className="w-6 pr-2 inline-block"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </p>
                {ele.description && <p className="h-24">{ele.description}</p>}
                <div className="flex justify-center mb-2">
                  {ele.image && (
                    <Image
                      src={ele.image}
                      className="rounded-full shadow-lg  object-cover"
                      width={80}
                      height={80}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                  )}
                </div>
                {ele.title && (
                  <h5 className="text-xl tracking-wide font-bebas italic">
                    {ele.title}
                  </h5>
                )}
                {ele.job && (
                  <h5 className="text-sm tracking-wide font-roboto">
                    {ele.job}
                  </h5>
                )}
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SliderCard;
