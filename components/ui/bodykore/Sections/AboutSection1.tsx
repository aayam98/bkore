import Image from 'next/image';

interface OptionsProps {
  icon: string;
  title: string;
  width?: string;
  height?: string;
}
interface OurVisionProps {
  //card: cardProps[],
  title1: string;
  title2: string;
  description: string;
  options: OptionsProps[];
}

export default function OurVision({
  title1,
  title2,
  description,
  options,
}: OurVisionProps) {
  return (
    <>
      <section className="max-w-7xl m-auto lg:px-10 pb-10">
        <div id="belowBanner" className="w-full h-fit max-w-7xl m-auto pt-14">
          <div className="text-center">
            <div
              className="flex justify-center font-bebas text-5xl font-bold italic"
              style={{ letterSpacing: '1px' }}
            >
              <h3 className="text-black-373933 pr-2">{title1}</h3>
              <h3 className=" text-red-bc2026 pr-1">{title2}</h3>
            </div>
            <p className="px-5 sm:px-20 pt-8 font-roboto text-black-1c2023">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center py-5 lg:py-10 gap-6 lg:gap-24 xl:gap-32 text-black">
            {options.map((o, i) => {
              return (
                <div className="flex flex-col" key={i}>
                  <div className="flex justify-center items-end h-12 w-full">
                    <Image
                      src={o.icon}
                      className="w-full"
                      style={{ maxWidth: o.width, height: o.height }}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="w-full flex items-center justify-center h-12 pt-4">
                    <p className="font-acumin-pro">{o.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
