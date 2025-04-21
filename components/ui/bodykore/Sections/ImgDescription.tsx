import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';
import { useRef } from 'react';
import Slider from 'react-slick';

interface ImageProps {
  img: string;
  title?: string;
  description: string;
}

interface ImgDescriptionProps {
  images: ImageProps[];
  imgHeight: string;
  imgWidth: string;
  textSize?: string;
}

export default function ImgDescription({
  images,
  textSize,
}: ImgDescriptionProps) {
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
          slidesToShow: images.length >= 3 ? 3 : images.length,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: images.length >= 2 ? 2 : images.length,
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
      <section className="max-w-7xl m-auto">
        <Slider {...settings}>
          {images.map((img, i) => {
            return (
              <div
                key={i}
                className="flex justify-center items-start"
                data-splide-interval="9000"
              >
                <div className="px-2" key={i}>
                  <div className="flex justify-center">
                    <Image
                      className={`w-full mb-5 object-contain`}
                      src={img.img}
                      alt=""
                      width={368}
                      height={252}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                  </div>
                  <h2 className="text-base font-roboto mt-2 tracking-wide text-gray-700">
                    {img.title}
                  </h2>
                  <div
                    className={`lg:${textSize} text-base font-roboto text-black-1c2023 text-left`}
                    dangerouslySetInnerHTML={{ __html: img.description }}
                  ></div>
                </div>
              </div>
            );
          })}
        </Slider>
      </section>
    </>
  );
}
