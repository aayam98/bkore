import Image from 'next/image';

interface IconsProps {
  icon: string;
  title: string;
}
interface AmbBannerProps {
  title1: string;
  title2: string;
  description: string;
  iconsRow1: IconsProps[];
  iconsRow2: IconsProps[];
}

export default function AmbBanner({
  title1,
  title2,
  description,
  iconsRow1,
  iconsRow2,
}: AmbBannerProps) {
  return (
    <>
      <section className="w-full">
        <div className="h-4 bg-red-bc2026"></div>
        <div className="h-fit bg-black justify-center text-center lg:py-24 py-10">
          <div className="flex flex-wrap justify-center max-w-7xl m-auto">
            <span className="text-red-bc2026 text-5xl font-bebas font-bold italic">
              <span className="text-white-f2f9fa text-5xl pr-2 font-bebas font-bold italic">
                {title1}
              </span>
              {title2}
            </span>
          </div>
          <p className="text-white-f2f9fa px-5 lg:px-64 lg:pt-6 pt-3 text-md font-roboto leading-7">
            {description}
          </p>
          <div className="flex flex-wrap justify-center pt-16 max-w-7xl m-auto">
            {iconsRow1.map((icon, i) => {
              return (
                <div className="lg:w-1/3 w-full px-10" key={i}>
                  <div className="flex justify-center">
                    <Image src={icon.icon} alt="" width={70} height={70} />
                  </div>
                  <h3 className="font-bebas text-3xl font-semibold italic text-white text-center pt-5 tracking-wider">
                    {icon.title}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center pt-16 max-w-7xl m-auto pb-16">
            {iconsRow2.map((icon, i) => {
              return (
                <div className="lg:w-1/3 sm:w-full px-10" key={i}>
                  <div className="flex justify-center">
                    <Image src={icon.icon} alt="" width={70} height={70} />
                  </div>
                  <h3 className="font-bebas text-3xl font-semibold italic text-white text-center pt-5 tracking-wider">
                    {icon.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full h-4 bg-red-bc2026"></div>
      </section>
    </>
  );
}
