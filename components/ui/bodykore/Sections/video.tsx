import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';

interface VidoProps {
  url: string;
  title: string;
  video_categories: {
    data: {
      attributes: {
        title: string;
      };
    }[];
  };
}

interface VideoProps {
  title1?: string;
  videos: VidoProps[];
  id?: string;
  selectedVideoCategory?: string;
}

const Video = ({ title1, videos, id, selectedVideoCategory }: VideoProps) => {
  const [videosComponent, setVideosComponent] = useState<VidoProps[]>([]);
  useEffect(() => {
    setVideosComponent(() => {
      if (selectedVideoCategory != 'all') {
        return videos.filter((video) => video.video_categories.data.some((category) => category.attributes.title === selectedVideoCategory));
      }
      return videos;

    });
  }, [videos, selectedVideoCategory]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: videosComponent.length > 1 ? 2 : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  const [loading, setLoading] = useState(true);
  return (
    <div id={id} className={videosComponent.length > 1 ? 'w-full' : 'w-1/2'}>
      <Slider {...settings}>
        {videosComponent.map((video, i) => {
          return (

            <div className="grid grid-cols-3 pr-3" key={i}>
              <div className='player-wrapper2'>
                {loading && (
                  <div className="loader-container bg-black text-white" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                  }}>
                    {/* You can use any loading indicator, here is an example using react-loader-spinner */}
                    loading...
                  </div>
                )}
                <ReactPlayer
                  className="react-player2"
                  url={video.url}
                  loop={true}
                  controls={true}
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => { }}
                  onReady={() => setLoading(false)}
                />
                {/* <h5
                  key={i}
                  className=" font-medium font-roboto py-2 tracking-normal text-left text-lg text-gray-700"
                >
                    {video.title}
                  </h5> */}
              </div>
            </div>

          );
        })}
      </Slider>
    </div>
  );
};
export default Video;
