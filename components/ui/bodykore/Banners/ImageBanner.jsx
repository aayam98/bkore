import Image from 'next/image';

export default function ImageBanner({ height, bgImage, title1 }) {
  return (
    <>
      {/*Main Image*/}
      <div className={`bg-no-repeat ${height} relative`}>
        {bgImage !== undefined ? (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-10"></div>
            <Image
              src={bgImage}
              layout="fill"
              objectFit="cover"
              className="h-full w-full"
              alt="Descriptive Alt Text"
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <h1 className="text-white lg:text-5xl text-3xl font-bebas font-bold italic absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full">
              {title1}
            </h1>
          </div>
        ) : null}
      </div>
    </>
  );
}
