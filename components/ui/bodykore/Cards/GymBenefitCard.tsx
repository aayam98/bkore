import Image from 'next/image';
import React from 'react';
import star3 from '../../../../public/svg/star3.svg';
import design from '../../../../public/svg/design.svg';
import versatility from '../../../../public/svg/personButtno.svg';
import fingerPrint from '../../../../public/svg/fingerPrint.svg';

const GymBenefitCard = () => {
  return (
    <>
      <div className="bg-black">
        <div className="max-w-8xl m-auto py-10">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-7  py-7 px-3">
            <div className="flex flex-col justify-center items-center h-full">
              <Image
                placeholder="blur"
                blurDataURL="/loading.png"
                src={star3}
                alt=""
                height={70}
                width={70}
              />
              <h2 className="uppercase text-white font-bold lg:text-xl text-2xl mt-auto">
                quality + durability
              </h2>
              <p className="text-center text-gray-char lg:text-xl text-sm font-montserrat">
                Engineered for high demands, BodyKore equipment ensures lasting
                performance and guest satisfaction.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <Image
                placeholder="blur"
                blurDataURL="/loading.png"
                src={design}
                alt=""
                height={65}
                width={65}
              />
              <h2 className="uppercase text-white font-bold lg:text-xl text-2xl mt-auto">
                DESIGN + AESTHETICS
              </h2>
              <p className="text-center  text-gray-char lg:text-xl text-sm font-montserrat">
                Our modern designs enhance your property's visual appeal and
                create an inviting fitness space workout experience.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <Image
                placeholder="blur"
                blurDataURL="/loading.png"
                src={versatility}
                alt=""
                height={55}
                width={55}
              />
              <h2 className="uppercase text-white font-bold lg:text-xl text-2xl mt-auto">
                VERSATILITY
              </h2>
              <p className="text-center  text-gray-char lg:text-xl text-sm font-montserrat">
                From cardio to strength training, our equipment caters to all
                fitness levels, offering a complete workout experience.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <Image
                placeholder="blur"
                blurDataURL="/loading.png"
                src={fingerPrint}
                alt=""
                height={65}
                width={65}
              />
              <h2 className="uppercase text-white font-bold lg:text-xl text-2xl mt-auto">
                CUSTOMIZATION
              </h2>
              <p className="text-center  text-gray-char lg:text-xl text-sm font-montserrat">
                Customize colors and finishes to align with your hotel's
                branding, enhancing guest experience and brand consistency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GymBenefitCard;
