import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
interface InspiredSpacesProps {
  slider: {
    id: number;
    title?: string;
    link?: string;
    image: string;
  }[];
  card?: Boolean;
}
const InspiredSpaces = ({ slider, card }: InspiredSpacesProps) => {
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
            <Link href={ele.link!} key={index}>
              <div key={index}>
                <a href={'ele.link'}>
                  <Image
                    src={ele.image}
                    alt=""
                    className="lg:h-80 h-60 object-cover w-full p-1"
                    width={368}
                    height={320}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  {ele.title && (
                    <p className="relative bottom-10 left-5 text-xl tracking-wider font-bebas text-white font-thin">
                      {ele.title}
                    </p>
                  )}
                </a>
              </div>
            </Link>
          ))}
        </Slider>
      )}
      {card && (
        <Slider {...settings}>
          {slider.map((ele, index) => (
            <div className="lg:p-2 p-0" key={index}>
              <a href={ele.link}>
                <div className="h-80 lg:mb-0 text-gray-800 text-center">
                  <div className="flex justify-center">
                    {ele.image && (
                      <Image
                        src={ele.image}
                        className="w-full"
                        width={368}
                        height={245}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                    )}
                  </div>
                  {ele.title && (
                    <h5 className="tracking-wide text-2xl font-bebas italic text-left text-white leading-none pt-5">
                      {ele.title}
                    </h5>
                  )}
                </div>
              </a>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default InspiredSpaces;
