import { mediaUrl } from '@utils/baseUrls';
import Image from 'next/image';
import React from 'react';
import Lightbox from 'react-image-lightbox';

interface SpecImageProps {
  image: {
    attributes: { url: string };
  };
}

const SpecImage = ({ image }: SpecImageProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={mediaUrl + image.attributes.url}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
      <div onClick={() => setIsOpen(true)}>
        <Image
          src={mediaUrl + image.attributes.url}
          className="object-cover"
          alt={`specification`}
          height={560}
          width={600}
          placeholder="blur"
          blurDataURL="/loading.png"
          objectFit="contain"
        />
      </div>
    </>
  );
};

export default SpecImage;
