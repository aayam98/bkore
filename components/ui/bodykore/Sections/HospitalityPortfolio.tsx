import Image from 'next/image';
import React, { useState } from 'react';
import SquatBoxFaq from './SquatBoxFaq';
import { FAQStrapi } from 'services/strapi/faq';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import HospatalityFAQ from './HospatalityFAQ';

const HospitalityPortfolio = () => {
  const [modalLighBox, setModalLighBox] = useState(false);
  const [modalContent, setModalContent] = useState({
    url: '',
  });
  const [threeDs, setThreeDs] = useState([
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/05/Beverly_01_ae10f73abc-1024x631.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/05/Gym_above_the_stars_2_4ffaeacb2a-1024x682.webp',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/05/brentwood_11_d76dcf34f9-1024x683.jpg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/RMC-hospitality-2-910x1024.jpg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/06/RMC-hospitality-910x1024.jpg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/03/Summit_Personal_Training_1_831fe6b707-1024x683.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/03/Gracie_Gym_OC_06_7146e44344.jpeg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/04/bootybybarbell-3-1024x683.jpg',
    },
    {
      url: 'https://www.fitnesssled.com/wp-content/uploads/2024/03/arrive-1024x682.jpeg',
    },
  ]);

  return (
    <div>
      <div className="pt-12 pb-10 max-w-8xl m-auto">
        <div className="lg:px-20 px-4">
          <h2 className="text-gray-900 lg:text-6xl text-3xl font-bebas font-bold">
            HOSPITALITY PORTFOLIO
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:px-20 px-4">
          {threeDs.map((ele, index) => (
            <Image
              key={index}
              src={ele.url}
              className="hover:opacity-75"
              height={350}
              width={500}
              placeholder="blur"
              blurDataURL="/loading.png"
              objectFit="cover"
              onClick={() => {
                setModalLighBox(true);
                setModalContent(ele);
              }}
            ></Image>
          ))}
        </div>
      </div>

      <HospatalityFAQ />
      {modalLighBox && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{ zIndex: 99999 }}
          >
            <div className="relative w-auto mx-auto max-w-5xl p-3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-start py-3 pl-5 border-b border-solid border-slate-200 rounded-t">
                  <button
                    className="pr-5 pt-2 ml-auto  border-0 text-black float-right text-2xl leading-none"
                    onClick={() => setModalLighBox(false)}
                  >
                    <IoIosCloseCircleOutline style={{ color: '#000' }} />
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-scroll">
                  <div className="">
                    <Image
                      className=""
                      src={modalContent?.url}
                      height={600}
                      width={1000}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                      alt="image"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default HospitalityPortfolio;
