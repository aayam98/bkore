import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import React from 'react';
import Lightbox from 'react-image-lightbox';
import Slider from 'react-slick';

interface WarrantyProps {
  images: {
    attributes: { url: string };
  }[];
}

const Warranty = ({ images }: WarrantyProps) => {
  const [isOpenWarranty, setIsOpenWarranty] = React.useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length >= 1 ? 1 : images.length,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length >= 1 ? 1 : images.length,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: images.length >= 1 ? 1 : images.length,
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
        },
      },
    ],
  };
  let slider1 = React.useRef() as
    | React.MutableRefObject<HTMLInputElement>
    | any;
  return (
    <>
      <Slider {...settings} ref={(el) => (slider1 = el)}>
        {images.map((ele, i) => {
          return (
            <div className="m-auto max-w-7xl text-center" key={i}>
              {isOpenWarranty && (
                <Lightbox
                  mainSrc={mediaUrl + ele.attributes.url}
                  onCloseRequest={() => setIsOpenWarranty(false)}
                />
              )}
              {/* <Image
                src={ele ? mediaUrl + ele.attributes.url : imageNotFound}
                height={881}
                width={550}
                placeholder="blur"
                blurDataURL="/loading.png"
                onClick={() => setIsOpenWarranty(true)}
                className="object-contain"
              /> */}
              <img
                src={ele ? mediaUrl + ele.attributes.url : imageNotFound}
                alt=""
                placeholder="blur"
                className='w-full object-contain'
                onClick={() => setIsOpenWarranty(true)}
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Warranty;
