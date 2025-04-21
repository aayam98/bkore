import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { lazy } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';

interface MainHeroBannerProps {
  slider: {
    id: number;
    title?: string;
    description?: string;
    link?: string;
    image: string;
    buttontext?: string;
    video?: string;
  }[];
  card?: Boolean;
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="shadow-md hover:shadow-lg transition-shadow absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full text-black cursor-pointer"
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
      className="shadow-md hover:shadow-lg transition-shadow absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full text-black cursor-pointer"
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

const MainHeroBanner = ({ slider, card }: MainHeroBannerProps) => {
  const settings = {
    dots: false,
    infinite: true,
    pauseOnHover: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 6000,
        },
      },
    ],
  };
  const router = useRouter();
  return (
    <div>
      <Slider {...settings}>
        {slider.map((ele, index) => (
          <div className="" key={index}>
            <a className={`link`} href={ele.link}>

              {!ele.video && <Image
                alt={ele.title}
                src={ele.image}
                width={500}
                height={250}
                layout="responsive"
                sizes="100vw"
                objectFit="cover"
                placeholder="blur"
                blurDataURL="/loading.png"
                priority
              />}

              {ele.video && <ReactPlayer
                className="video_player_index"
                url={ele.video}
                loop={true}
                controls={true}
                width="100%"
                height={250}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                    },
                  },
                }}
                onPlay={() => { }}
              />}

              <div className="w-full h-full absolute block top-0 bg-black bg-opacity-0" />
              <div className="absolute lg:pl-32 px-5 lg:bottom-20 bottom-10 grid gap-y-1">
                <h3 className="font-bebas italic lg:text-6xl text-lg text-white leading-none">
                  {ele.title}
                </h3>
                <p className="font-roboto text-white lg:text-xl text-sm font-normal pb-2 lg:leading-7 leading-normal lg:w-opt8top w-96">
                  {ele.description}
                </p>

                {ele.buttontext && ele.buttontext.length > 0 && (
                  <Link href={ele.link!} passHref>
                    <button
                      type="submit"
                      className="w-40 lg:py-3 py-1 lg:px-6 px-3 font-roboto rounded-md font-normal tracking-wide lg:text-lg text-base text-white bg-red-bc2026 hover:bg-red-hover"
                    >
                      {ele.buttontext}
                    </button>
                  </Link>
                )}
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainHeroBanner;
