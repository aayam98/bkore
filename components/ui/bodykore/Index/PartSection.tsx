type PartSectionListProps = {
  scrollToDiv: (index: number) => void;
};
const PartSection = ({ scrollToDiv }: PartSectionListProps) => {
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
    <div className="w-full m-auto lg:p-20 p-5">
      <h1 className="text-center text-5xl font-bebas font-medium lg:w-3/12 w-full leading-none m-auto">
        <span className="text-red-bc2026"> UNLOCK</span> YOUR UNIVERSAL
        TRAINER'S POTENTIAL
      </h1>
      <p className="text-center text-base mt-2 font-roboto lg:w-6/12 w-full m-auto">
        Explore how to set up and use each attachment on your BodyKore Universal
        Trainer. Click any attachment below for installation tips and exercises
        to crush your workout.
      </p>
      <div className="flex py-14 gap-5 justify-between align-top items-start w-full h-fit max-w-7xl m-auto ">
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-x-14 gap-y-10 m-auto">
          {attachments.map((attachment, index) => {
            return (
              <div className={``} key={index}>
                <span
                  className="cursor-pointer"
                  onClick={() => scrollToDiv(attachment.index)}
                >
                  <div className="relative flex flex-col items-center gap-2">
                    <div className="circle-border flex items-center justify-center">
                      <div className="circle flex items-center justify-center overflow-hidden">
                        <img
                          src={attachment.image}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    <div className="inset-0 flex justify-end items-center">
                      <h1 className="text-2xl font-bebas text-center">
                        {attachment.title}
                      </h1>
                    </div>
                  </div>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PartSection;
