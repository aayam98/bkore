import React from 'react';
const HospitalityBanner = () => {
  return (
    <section>
      <div className="relative">
        <div className="flex lg:flex-row flex-col">
          <div className="bg-black lg:h-screen h-opt5top md:w-full lg:w-1/2 flex flex-col justify-center lg:px-10">
            <h6
              className={` text-red-bc2026 hover:text-red-hover font-montserrat tracking-wider text-xl text-center font-bold`}
            >
              Premium Fitness Equipment
            </h6>
            <h1 className="text-white text-center lg:text-8xl text-3xl font-bold uppercase mt-4 leading-none font-montserrat ">
              Elevate Your Guest Experience
            </h1>
            <div className="px-12 py-4 flex flex-col justify-center items-center">
              <p className=" lg:text-3xl sm:text-2xl font-montserrat text-white-f2f9fa text-center">
                Offer your guests an unparalleled fitness experience with
                BodyKore’s state-of-the-art gym equipment
              </p>
              <a href="#booknow">
                <button className="bg-red-bc2026 uppercase text-white text-1xl font-bold py-3 lg:px-8 px-10 mt-5">
                  Request a consultation
                </button>
              </a>
            </div>
          </div>
          <div className="premiumBanner lg:h-screen h-96 lg:w-1/2 w-full0"></div>
        </div>
      </div>
    </section>
  );
};
export default HospitalityBanner;
