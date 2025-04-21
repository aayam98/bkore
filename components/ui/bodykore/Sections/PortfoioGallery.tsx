import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ReactPlayer from 'react-player';
interface PortGalleryProps {
  images: { img: string }[];
  imgHeight: string;
  imgWidth: string;
  video: string;
}
import Slider from 'react-slick';
import ProductImgSlider from '../Sliders/ProductImgSlider';

export default function PortfolioGallery({ images, video }: PortGalleryProps) {
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
    centerMode: true,
    centerPadding: '10px',
  };

  return (
    <>
      <section className="max-w-7xl m-auto p-5">
        <ProductImgSlider images={images} video={video} />
      </section>
    </>
  );
}
