import '@splidejs/splide/dist/css/splide.min.css';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { ProductStrapi } from 'services/strapi';
import Image from 'next/image';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import { mediaUrl } from '@utils/baseUrls';

interface BgImageProps {
  url: string;
  btn3d?: boolean;
}

interface ImgPagSliderProps {
  bgImage: BgImageProps[];
  id?: string;
  productStrapi: ProductStrapi;
  activeBg?: string;
  title?: string;
}
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer lg:mr-0  mr-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="40"
        height="40"
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
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer lg:ml-0 ml-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
       width="40"
        height="40"
        fill="currentColor"
      >
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
      </svg>
    </button>
  );
};
const ImgPagSlider = ({
  bgImage,
  productStrapi,
  activeBg,
  title
}: ImgPagSliderProps) => {
  const sliderRef = useRef<any>();

  if (typeof window !== 'undefined') {
    var thumbnails = document.getElementsByClassName('thumbnail');
    var current: Element; // Keeps the current thumbnail
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
     nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
  };
  const settingsNav = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: bgImage.length >= 5 ? 5 : bgImage.length,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: false,
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
          slidesToShow: bgImage.length >= 4 ? 4 : bgImage.length,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: bgImage.length >= 4 ? 4 : bgImage.length,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const [nav1, setNav1] = React.useState<any>(null);
  const [nav2, setNav2] = React.useState<any>(null);

  const [showModal, setShowModal] = React.useState<Boolean>(false);

  let slider1 = React.useRef() as
    | React.MutableRefObject<HTMLInputElement>
    | any;
  let slider2 = React.useRef() as
    | React.MutableRefObject<HTMLInputElement>
    | any;

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setphotoIndex] = useState(0);
  return (
    <section className="w-full max-w-7xl m-auto">
      <>
        {isOpen && (
          <Lightbox
            mainSrc={bgImage[photoIndex].url}
            nextSrc={bgImage[(photoIndex + 1) % bgImage.length].url}
            prevSrc={
              bgImage[(photoIndex + bgImage.length - 1) % bgImage.length].url
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setphotoIndex((photoIndex + bgImage.length - 1) % bgImage.length)
            }
            onMoveNextRequest={() =>
              setphotoIndex((photoIndex + 1) % bgImage.length)
            }
          />
        )}
        {productStrapi.attributes.file3d.data != null && (
          <button
            className="flex items-center justify-center gap-2 absolute bg-white rounded-xl h-9 w-24 border-2 shadow-2xl mt-4 ml-4 z-50"
            style={{ zIndex: 999 }}
            type="button"
            onClick={() => setShowModal(true)}
          >
            <Image
              src="/svg/3d.svg"
              width="24"
              height="24"
            />
            <h3 className="text-black-373933 font-roboto text-sm">View</h3>
          </button>
        )}

        <Slider
          className="z-50 custom-slider" // Add a custom class for additional styling
          {...settings}
          asNavFor={nav2}
          ref={(el) => (slider1 = el)}
        >
          {bgImage.map((b, i) => {
            return (
              <div
                key={i + 'sl'}
                className="flex justify-center items-center h-full"
              >
                <img
                  className="w-full max-h-sliderImage object-contain cursor-pointer"
                  src={activeBg && activeBg !== '' ? activeBg : b.url ? b.url : ''}
                  alt={title + '-' + i}
                  onClick={() => {
                    setIsOpen(true);
                    setphotoIndex(i);
                  }}
                  // height={740}
                  // width={1200}
                  // objectFit='cover'
                  // placeholder="blur"
                  // blurDataURL="/loading.png"
                />
              </div>
            );
          })}
        </Slider>

        <div className="flex">
          <div
            className={
              productStrapi.attributes.file3d.data != null ? 'w-full' : 'w-full'
            }
          >
            <Slider
              {...settingsNav}
              asNavFor={nav1}
              ref={(el) => (slider2 = el)}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {bgImage.map((b, i) => {
                return (
                  <div key={i + 'ba'} className="p-1 sm:p-1">
                    <Image
                      className="object-contain pr-1 cursor-pointer w-auto h-40 m-auto"
                      src={b.url}
                      alt={title + '-' + i}
                      height={160}
                      width={185}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                  </div>
                );
              })}
            </Slider>
          </div>

          {productStrapi.attributes.file3d.data != null && (
            <div className="w-1/4" style={{ zIndex: 999999 }}>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                    <div
                      className="relative w-auto my-6 mx-auto max-w-3xl bg-gray-200 overflow-hidden"
                      style={{ width: 700 }}
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
                        {/*header*/}
                        <div
                          className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t z-50"
                          onClick={() => {
                            setShowModal(false);
                          }}
                        >
                          <p className="font-semibold justify-end flex w-full cursor-pointer">
                            Close
                          </p>
                        </div>
                        {/*body*/}

                        <div className="relative p-6 flex-auto">
                          <div className="w-full border-b sm:mt-0 py-10">
                            <div className="flex-row lg:flex-row flex-wrap md:max-w-7xl justify-center md:justify-center m-auto">
                              {/*Images SECTION*/}
                              {/* <div className="bg-gray-200"> */}

                              <ThreeDComponent>
                                <iframe
                                  src={`https://threed.bodykore.com/?${mediaUrl +
                                    productStrapi.attributes.file3d.data
                                      .attributes.url
                                    }`}
                                  frameBorder="0"
                                  height={600}
                                  width={600}
                                ></iframe>
                              </ThreeDComponent>

                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </>
    </section>
  );
};

export default ImgPagSlider;
const ThreeDComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
