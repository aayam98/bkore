import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { useRef } from 'react';
import Blacktitle from '../Text/Titles/featurestitle';
import Slider from 'react-slick';

interface ImageProps {
  title: string;
  subFeatures: ImageSubProps[];
}

interface ImageSubProps {
  img: string;
  title?: string;
  description?: string;
}

interface ImgDescriptionSinglePageProps {
  images: ImageProps[];
  imgHeight: string;
  imgWidth: string;
  textSize?: string;
}
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
      </svg>
    </button>
  );
};
export default function ImgDescriptionSinglePage({
  images,
  textSize,
}: ImgDescriptionSinglePageProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      images.length > 0 && images[0].subFeatures.length > 3
        ? 3
        : images.length > 0
          ? images[0].subFeatures.length
          : 0,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      {images.map((img, i) => {
        return (
          <div key={i} className="pb-5">
          <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2">
            {' '}
            {img.title}
          </h3>
          <div className="mx-[-8px]">
            <Slider {...settings}>
              {img.subFeatures.map((ele, i) => {
                return (
                  <div className="px-2" key={i}>
                    <div className="border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-[350px] sm:h-[370px] md:h-[380px] lg:h-[360px]">
                      {/* Responsive image container */}
                      <div className="w-full h-[220px] sm:h-[240px] md:h-[250px] lg:h-[240px] relative overflow-hidden">
                        <Image
                          src={ele.img}
                          className="rounded-t-lg"
                          height={303}
                          width={433}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                          alt={ele.title || "Feature image"}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={80}
                          style={{
                            objectFit: "cover",
                            height: "100%",
                            width: "100%"
                          }}
                        />
                      </div>
                      
                      {/* Optimized text container with responsive height */}
                      <div className="p-3 md:p-4 h-20 overflow-hidden">
                        <p className="text-sm sm:text-base font-medium font-roboto tracking-wide text-gray-700 line-clamp-2 mb-1 sm:mb-2">
                          {ele.title}
                        </p>
                        {ele.description && (
                          <div
                            className="text-xs sm:text-sm font-roboto text-gray-600 overflow-hidden line-clamp-3 sm:line-clamp-2 md:line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: ele.description,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        );
      })}
    </>
  );
}
