import Link from 'next/link';

interface MainBannerParams {
  title: string;
  description?: string;
  bgImage?: string;
  buttonsText?: {
    text: string;
    color: string;
    link?: string;
  }[];
  width?: string;
}

export default function MainBanner({
  title,
  description,
  buttonsText = [],
  bgImage,
  width,
}: MainBannerParams) {
  const scrollDown = () => {
    const element = document.getElementById('belowBanner');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/*Main Image*/}

      <div
        className="bg-no-repeat w-full bg-top bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgb(0 0 0 / 20%), rgb(0 0 0 / 80%)), url('${bgImage}'`,
        }}
      >
        <div className="grid grid-cols-1 justify-center items-center align-middle text-center m-auto w-full lg:py-28 py-10">
          <h1
            className={`lg:text-main-banner-title text-3xl tracking-wide italic font-bebas font-bold lg:pt-0 text-white`}
          >
            {title}
          </h1>
          <p className="font-roboto text-white flex justify-center items-center align-middle lg:w-1/2 w-full px-5 m-auto">
            {description}
          </p>
        </div>
        <div className="animate-bounce flex justify-center text-white pb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 cursor-pointer"
            onClick={() => scrollDown()}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 17l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
