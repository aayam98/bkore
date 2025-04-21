import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
interface ImgGalleryProps {
  images: { img: string }[];
  imgHeight: string;
  imgWidth: string;
}
import Slider from 'react-slick';

export default function ImgGallery({ images }: ImgGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setphotoIndex] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length > 3 ? 3 : images.length,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length >= 3 ? 3 : images.length,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: images.length >= 2 ? 2 : images.length,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: images.length >= 1 ? 1 : images.length,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <>
      <div className="">
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].img}
            nextSrc={images[(photoIndex + 1) % images.length].img}
            prevSrc={
              images[(photoIndex + images.length - 1) % images.length].img
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setphotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setphotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
        <div className="">
          <Slider {...settings}>
            {images.map((imgs, i) => {
              return (
                <div className="px-1" key={i}>
                  <Image
                    className="h-80 object-top w-full object-cover"
                    onClick={() => {
                      setIsOpen(true);
                      setphotoIndex(i);
                    }}
                    src={imgs.img}
                    alt=""
                    height={320}
                    width={457}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
