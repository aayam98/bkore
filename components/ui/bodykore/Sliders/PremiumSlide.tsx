import Image from 'next/image';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

const PremiumSlide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: false,
    autoplay: true,
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

  const targetRef = useRef<HTMLDivElement>(null);
  const [sliderImages, setSliderImages] = useState([
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/Arrive-Longmont-Hospitality-Gym7.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/Arrive-Longmont-Hospitality-Gym5.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/arrive-longmont.jpg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/Arrive-Longmont-Hospitality-Gym6.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/Arrive-Longmont-Hospitality-Gym3.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/Arrive-Longmont-Hospitality-Gym4.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/Arrive-Longmont-Hospitality-Gym2.jpeg',
    },
  ]);
  return (
    <div>
      <div className="py-14" ref={targetRef}>
        <div className="m-auto px-0">
          <Slider className="z-50" {...settings}>
            {sliderImages.map((el, i) => (
              <div className="p-2" key={i}>
                <Image
                  key={i}
                  src={el.url}
                  height={420}
                  width={650}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                  objectFit="cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PremiumSlide;
