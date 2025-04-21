import React, { useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Technologies } from './Product';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Image from 'next/image';

type TechnologModal = {
  technology?: Technologies;
  closeModal: () => void;
  showModal: boolean;
};

export default function TechnologyModal({
  technology,
  closeModal,
  showModal,
}: TechnologModal) {
  const sliderRef = useRef<any>();
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" style={{zIndex:99999}}>
            <div className="relative w-auto my-6 mx-auto max-w-3xl p-3">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between py-3 pl-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-base lg:text-2xl font-semibold">
                    {technology?.title}
                  </h3>
                  <button
                    className="pr-5 pt-2 ml-auto  border-0 text-black float-right text-2xl leading-none"
                    onClick={() => closeModal()}
                  >
                    <IoIosCloseCircleOutline style={{ color: '#000' }} />
                  </button>
                </div>
                {/*body*/}
                <div
                  className="relative p-6 flex-auto overflow-y-scroll h-96 lg:h-CatBanner"
                >
                      {technology?.image.map((b, i) => (
                          <div key={i}>
                            <Image
                              src={b!}
                              height={400}
                              width={800}
                              alt="image"
                              objectFit="contain"
                            />
                          </div>
                      ))}
                  

                  <div className='font-roboto text-sm lg:text-base'
                    dangerouslySetInnerHTML={{
                      __html: technology!.description,
                    }}
                  ></div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
