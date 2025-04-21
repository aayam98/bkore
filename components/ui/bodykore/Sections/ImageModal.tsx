import React, { useRef } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Image from 'next/image';
import ReactPlayer from 'react-player';

type ImageModal = {
  title: string;
  image?: string;
  description: string;
  closeModal: () => void;
  showModal: boolean;
  fileType: string;
};

export default function ImageModal({
  title,
  image,
  description,
  closeModal,
  showModal,
  fileType,
}: ImageModal) {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{ zIndex: 99999 }}
          >
            <div className="relative w-auto my-6 mx-auto lg:max-w-3xl max-w-sm p-3">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between py-3 pl-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base lg:text-2xl font-semibold">
                    {title}
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
                  className="relative p-6 flex-auto overflow-y-scroll"
                >
                  {fileType == 'image' && image && (
                    <Image
                      src={image}
                      height={400}
                      width={800}
                      alt="image"
                      objectFit="contain"
                    />
                  )}
                  {fileType == 'video' && image && (
                    <ReactPlayer
                      url={image}
                      controls={true}
                      width="w-full"
                      height="auto"
                    />
                    // <Image
                    //   src={image}
                    //   height={400}
                    //   width={800}
                    //   alt="image"
                    //   objectFit="contain"
                    // />
                  )}

                  <div
                    className="font-roboto text-sm lg:text-base"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  ></div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-overlay bg-black"></div>
        </>
      ) : null}
    </>
  );
}
