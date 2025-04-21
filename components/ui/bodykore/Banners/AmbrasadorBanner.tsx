import Link from 'next/link';

interface AmbrasadorBannerParams {
  title: string;
  description?: string;
  bgImage?: string;
  buttonsText?: {
    text: string;
    color: string;
    
  }[];
  link?: string;
  width?: string;
}

export default function AmbrasadorBanner({
  title,
  description,
  buttonsText = [],
  bgImage,
  width,
link,
}: AmbrasadorBannerParams) {
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
        className="bg-no-repeat h-CatBanner w-full bg-bottom bg-fixed bg-cover align-middle items-center justify-center flex p-5"
        style={{
          backgroundImage: `linear-gradient(rgb(0 0 0 / 20%), rgb(0 0 0 / 80%)), url('${bgImage}'`,
        }}
      >
        <div className="grid grid-cols-1 gap-5 text-center m-auto w-full">
          <h3
            className={`lg:text-7xl text-6xl tracking-wide font-bebas font-bold lg:pt-0 text-white leading-none`}
          >
            {title}
          </h3>
          <p className="font-bebas lg:text-5xl text-3xl text-white flex justify-center items-center align-middle m-auto">
            {description}
          </p>
          <Link target='_blank' href={`${link}`}>  
          <button
            className="w-48 lg:py-4 py-2 lg:px-10 px-3 font-roboto rounded-md font-normal lg:text-lg text-base text-white bg-red-bc2026 hover:bg-red-hover m-auto"
            style={{ letterSpacing: '2px' }}
          >
            Apply Now
          </button>
          </Link>
        </div>
      </div>
    </>
  );
}
