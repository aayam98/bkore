interface FadingBannerProps {
  title?: String;
  description?: String;
  bgImage?: String;
  height: string;
}

export default function FadingBanner({
  title,
  description,
  bgImage,
  height,
}: FadingBannerProps) {
  return (
    <>
      {/*Main Image*/}
      <div
        className={`bg-no-repeat lg:h-96 h-52 w-full bg-center bg-cover ${bgImage}`}
      >
        <div
          className={`bg-gradient-to-r from-black via-black to-transparent lg:h-96 h-52 py-5 w-full flex items-center justify-center`}
        >
          <div className="text-white text-center lg:w-1/2">
            <h1 className="font-bebas lg:text-5xl text-2xl font-bold italic tracking-wider">
              {title}
            </h1>
            <p className="font-roboto text-base px-8 leading-7 tracking-wide">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
