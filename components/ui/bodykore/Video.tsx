import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

interface VidProps {
  url: string;
  title: string;
}

interface VideoProps {
  title1?: string;
  title2?: string;
  description?: string;
  videos: VidProps[];
  id?: string;
}
import Slider from 'react-slick';
const Video = ({ title1, title2, description, videos, id }: VideoProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: videos.length > 6 ? 6 : videos.length,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <section id={id} className="max-w-8xl m-auto pb-5">
      <div
        className="flex justify-center lg:justify-start lg:pl-14"
        style={{ letterSpacing: '1px' }}
      >
        <h3 className="text-red-bc2026 text-2xl font-bebas font-bold italic">
          {title1}
        </h3>
        <h3 className="text-black-373933 text-2xl pl-1 font-bebas font-bold italic">
          {title2}
        </h3>
      </div>
      <div className="lg:pl-14">
        <p className="text-black-1c2023 text-center lg:text-left">
          {description}
        </p>
      </div>
      <div className=" lg:justify-start gap-4 px-8 lg:px-0 lg:pl-14">
        {videos.length > 6 && (
          <Slider {...settings}>
            {videos.map((video, i) => {
              return (
                <div className="py-1 w-52" key={i}>
                  <ReactPlayer
                    className="video_player_index"
                    url={video.url}
                    loop={true}
                    controls={true}
                    width="208px"
                    height="118px"
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                    onPlay={() => {}}
                  />
                  <h5
                    key={i}
                    className="font-roboto text-sm text-black-373933 pt-2 text-left w-52"
                  >
                    {video.title}
                  </h5>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
      {videos.length < 6 && (
        <div className="flex flex-wrap lg:justify-start gap-4 px-8 lg:px-0 lg:pl-14">
          {videos.map((video, i) => {
            return (
              <div className="py-1 w-52" key={i}>
                <ReactPlayer
                  className="video_player_index"
                  url={video.url}
                  loop={true}
                  controls={true}
                  width="208px"
                  height="118px"
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => {}}
                />
                <h5
                  key={i}
                  className="font-roboto text-sm text-black-373933 pt-2 text-left w-52"
                >
                  {video.title}
                </h5>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Video;
