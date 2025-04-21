import '@splidejs/splide/dist/css/splide.min.css';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { FaRegPlayCircle } from 'react-icons/fa';

interface PortGalleryProps {
  images: { img: string }[];
  video: string;
}

const ProductImgSlider = ({ images, video }: PortGalleryProps) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [slider1, setSlider1] = useState<Slider | null>(null);
  const [slider2, setSlider2] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slider1 && slider2) {
      setNav1(slider1);
      setNav2(slider2);
    }
  }, [slider1, slider2]);

  const handleThumbnailClick = (index: number) => {
    if (slider1) {
      slider1.slickGoTo(video ? index + 1 : index);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: false,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  const settingsNav = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(5, images.length),
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: false,
    vertical: true,
    verticalSwiping: true,
    swipe: true,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, images.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(3, images.length),
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  return (
    <section className="w-full max-w-7xl m-auto">
      <>
        <div className="flex lg:flex-row flex-col gap-2 overflow-hidden">
          <div className="port-slider1">
            
            <Slider
              className="z-50 flex"
              {...settings}
              asNavFor={nav2 ?? undefined}
              ref={(slider) => setSlider1(slider)}
            >
              {video && (
                <div>
                  <ReactPlayer
                    className="video_player_index"
                    url={video}
                    loop={true}
                    controls={true}
                    width="1000px"
                    height="700px"
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                    onPlay={() => {}}
                  />
                </div>
              )}
              {images.map((imgs, i) => (
                <div key={i}>
                  <Image
                    className="h-72 object-center w-full object-cover"
                    height={700}
                    width={1000}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                    src={imgs.img}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div
            className=" thumbnail-slide overflow-hidden "
            style={{ maxHeight: '700px' }}
          >
            <Slider
              {...settingsNav}
              asNavFor={nav1 ?? undefined}
              ref={(slider) => setSlider2(slider)}
            >
              {video && (
                <div
                  className="relative lg:h-32 h-24"
                  onClick={() => handleThumbnailClick(-1)}
                >
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <FaRegPlayCircle color="white" size={40} />
                  </div>
                  {currentSlide === 0 && (
                    <div className="absolute inset-0 border-4 rounded-sm border-red-hover"></div>
                  )}
                </div> 
              )}
              {images.map((imgs, i) => (
                <div
                  className="relative lg:h-32 h-24"
                  key={i}
                  onClick={() => handleThumbnailClick(i)}
                >
                  <Image
                    className="object-cover w-full h-full rounded-sm"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="/loading.png"
                    src={imgs.img}
                    alt=""
                  />
                  {currentSlide === (video ? i + 1 : i) && (
                    <div className="absolute inset-0 border-4 rounded-sm border-red-hover"></div>
                  )}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </>
    </section>
  );
};

export default ProductImgSlider;
