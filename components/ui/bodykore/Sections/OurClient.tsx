import Image from 'next/image';
import React from 'react';

const OurClient = () => {
  return (
    <div>
      <div className="py-24 bg-black">
        <div className="max-w-8xl m-auto lg:px-12 px-4">
          <div className="text-center">
            <h5 className="text-red-bc2026 text-2xl font-montserrat font-semibold pb-5">
              Our Clients
            </h5>
            <h2 className="text-white lg:text-6xl text-3xl font-Archivo font-black capitalize leading-tight pb-10 flex flex-col">
              <span>DON’T JUST TAKE</span>
              <span>OUR WORD FOR IT</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-20 px-4 lg:pt-10">
            <div className="text-center lg:py-0 py-5">
              <div className="flex flex-row items-center justify-center gap-2 pb-3">
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
              </div>
              <div className="flex flex-col h-full">
                <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                  As the manager of a boutique hotel, our partnership with
                  BodyKore has significantly elevated our guest experience. The
                  quality and variety of their strength training and functional
                  fitness equipment have transformed our fitness center into a
                  space our guests rave about. It's an investment that has paid
                  dividends in guest satisfaction and loyalty.
                </p>
                <h4 className="text-white text-2xl font-montserrat font-black capitalize leading-tight lg:mt-auto">
                  ALEXANDRA M.
                </h4>
                <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                  Boutique Hotel Manager
                </h5>
              </div>
            </div>
            <div className="text-center lg:py-0 py-5">
              <div className="flex flex-row items-center justify-center gap-2 pb-3">
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
              </div>
              <div className="flex flex-col h-full">
                <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                  In the competitive hospitality industry, differentiating our
                  services is crucial. BodyKore's equipment has given us that
                  edge, allowing us to offer a top-tier fitness facility that
                  impresses even our most fitness-savvy guests. The feedback has
                  been overwhelmingly positive, making it a standout feature in
                  our guest amenities.
                </p>
                <h4 className="text-white text-2xl font-montserrat font-black capitalize leading-tight lg:mt-auto">
                  RAJIV S.
                </h4>
                <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                  Resort Owner
                </h5>
              </div>
            </div>

            <div className="text-center lg:py-0 py-5">
              <div className="flex flex-row items-center justify-center gap-2 pb-3">
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
                <Image
                  className="rounded-lg"
                  src={`/svg/star2.svg`}
                  height={25}
                  width={25}
                  objectFit="cover"
                ></Image>
              </div>
              <div className="flex flex-col h-full">
                <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                  Working with BodyKore to outfit our hotel gym was a seamless
                  experience. They understood our need for equipment that not
                  only fits our space but also aligns with our brand's
                  aesthetic. The custom solutions provided have made our fitness
                  center a highlight of our hotel, appreciated by guests for
                  both its functionality and design.
                </p>
                <h4 className="text-white text-2xl font-montserrat font-black capitalize leading-tight lg:mt-auto">
                  MICHELLE L.
                </h4>
                <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                  Hotel Operations Director
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClient;
