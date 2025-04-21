import React from 'react';

const SupportServicesCard = () => {
  const card = [
    {
      title: `INSTALLATION SERVICES`,
      text: 'BodyKore ensures seamless setup with our nationwide network of certified installers, guaranteeing a professional installation experience.',
    },
    {
      title: 'MAINTENANCE + SUPPORT',
      text: 'Our commitment extends beyond installation, offering a lifetime warranty on equipment frames and access to expert maintenance to ensure your equipment’s longevity.',
    },
    {
      title: 'STAFF TRAINING',
      text: 'Empower your team with our comprehensive training resources, including an extensive video library and technical guides, ensuring they’re equipped to maintain and troubleshoot with confidence.',
    },
  ];
  return (
    <div>
      <div className="bg-red-bc2026 py-20 ">
        <h6 className="text-center text-3xl font-roboto font-bold">
          Discover More with Our Brochure
        </h6>
        <h1 className="text-center flex flex-col text-white lg:text-6xl text-3xl leading-tight my-4 font-bold font-montserrat">
          <span>DETAILED INSIGHTS</span>
          <span>ON BODYKORE'S</span>
          <span>FITNESS SOLUTIONS</span>
        </h1>
        <div className="flex justify-center pt-4">
          <button className="uppercase text-white border-2 border-white bg-black py-3 px-9 font-bold font-montserrat text-lg">
            Download Brochure
          </button>
        </div>
      </div>
      <div className="lg:px-16 px-4 py-16 max-w-8xl m-auto">
        <div className="leading-10 pb-10">
          <p className="text-red-bc2026 lg:text-xl text-lg leading-snug font-montserrat">
            From Installation to Operation We've Got You Covered
          </p>
          <h1 className="lg:text-6xl text-4xl font-bold font-montserrat leading-none">
            INTEGRATION + SUPPORT
          </h1>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 ">
          {card.map((item, index) => {
            return (
              <div
                key={index}
                className="border-2 border-black p-7 flex flex-col"
              >
                <h3 className="text-red-bc2026 text-4xl font-bold leading-none h-24">
                  {item.title}
                </h3>
                <p className="text-lg font-montserrat">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SupportServicesCard;
