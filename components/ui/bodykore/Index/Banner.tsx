import Image from "next/image";

type BannerProps = {
  scrollToDiv: (index: number) => void;
};
const Banner = ({ scrollToDiv }: BannerProps) => {
  const attachments = [
    {
      index: 0,
      title: 'Dip Bar',
      image: '/attachments/Dip-Bar.png',
      link: '/dipbar',
    },
    {
      index: 1,
      title: 'Inverted Leg Press Plate',
      image: '/attachments/Inverted-Foot-Plate.png',
      link: '/invertedlegpress',
    },
    {
      index: 2,
      title: 'J Hooks',
      image: '/attachments/J-Hooks.png',
      link: '/jhooks',
    },
    {
      index: 3,
      title: 'Jammer Arms',
      image: '/attachments/Jammer-Arms.png',
      link: '/jammerarms',
    },
    {
      index: 4,
      title: 'Leg Extension/Curl Seat',
      image: '/attachments/Leg-ExtensionCurl-Seat.webp',
      link: '/lefextension',
    },
    {
      index: 5,
      title: 'Safety Spotter Arms',
      image: '/attachments/Safety-Spotters.png',
      link: '/safetyspotterarms',
    },
    {
      index: 6,
      title: 'Landmine',
      image: '/attachments/Landmine.png',
      link: '/landmine',
    },

    {
      index: 7,
      title: 'Dual Pulley System',
      image: '/attachments/Adjustable-Dual-Pulley-System-Universal-Trainer.jpg',
      link: '/dualpulley',
    },

    {
      index: 8,
      title: 'Lat Pull Down Seat',
      image: '/attachments/Lat-Pull-Down-Seat.png',
      link: '/latpulldownseat',
    },
    {
      index: 9,
      title: 'Low Row Footplate',
      image: '/attachments/Low-Row-Footplate.png',
      link: '/lowrowfootplate',
    },
  ];
  return (
    <div>
      <div className="lg:hidden">
        <img src={`/banner_mobile.png`} width={'100%'} alt="" height={500} className="w-full "/>
      </div>
      <div
        className="w-full pb-40 hidden lg:block"
        style={{
          background: `radial-gradient(65.19% 100% at 50% 50%, rgb(255 255 255 / 40%) 0%, rgb(255 255 255) 80.31%), url(/pattern.svg)`,
        }}
      >
        <div className="flex py-10 gap-5 justify-between align-top items-start w-full h-fit 2xl:max-w-8xl lg:max-w-5xl m-auto ">
          <div className="flex flex-col gap-5">
            {attachments.slice(0, 5).map((attachment, index) => {
              const mlClasses = [
                '2xl:left-16 lg:left-10',
                'left-0',
                '2xl:-left-4 lg:-left-10',
                'left-0',
                '2xl:left-16 lg:left-10',
              ];
              return (
                <div
                  className={`pl-20 2xl:w-72 lg:w-64 relative ${mlClasses[index % mlClasses.length]
                    }`}
                  key={index}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToDiv(attachment.index)}>
                    <div className="grid grid-cols-2 2xl:gap-x-28 lg:gap-x-1 items-center">
                      <div className="hexagon-border flex items-center justify-center">
                        <div className="hexagon flex items-center justify-center overflow-hidden">
                          <img
                            src={attachment.image}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="">
                        <h1 className="text-2xl w-36 font-bebas text-gray-700">
                          {attachment.title}
                        </h1>
                      </div>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="primary relative">
            <img
              src="/attachments/MX1162.svg"
              alt=""
              className="object-cover w-full mb-10"
            />
            <div className="w-10/12 m-auto absolute left-0 right-0 -bottom-32">
              <h1 className="text-center text-6xl font-bebas font-bold w-full m-auto italic leading-tight text-red-hover">
                Univeral Trainer Attachments
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-5 mr-16">
            {attachments.slice(5, 10).map((attachment, index) => {
              const mlClasses = [
                '2xl:right-16 lg:right-10',
                'right-0',
                '2xl:-right-4 lg:-right-10',
                'right-0',
                '2xl:right-16 lg:right-10',
              ];
              return (
                <div
                  className={`pr-36 2xl:w-72 lg:w-64 relative ${mlClasses[index % mlClasses.length]
                    }`}
                  key={index}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => scrollToDiv(attachment.index)}
                  >
                    <div className="grid grid-cols-2 gap-x-28 items-center">
                      <div className="">
                        <h1 className="text-2xl w-40 pr-10 text-right font-bebas text-gray-700">
                          {attachment.title}
                        </h1>
                      </div>
                      <div className="hexagon-border flex items-center justify-center">
                        <div className="hexagon flex items-center justify-center overflow-hidden">
                          <img
                            src={attachment.image}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>


                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
