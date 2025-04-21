import React from 'react';
import PackageCard from '../Cards/PackageCard';

const Packages = () => {
  return (
    <section className="bg-black py-20 h-full lg:px-10 px-4  ">
      <div className="max-w-8xl m-auto">
        <p className="text-red-bc2026 text-center font-montserrat lg:text-2xl text-lg">
          Choose the Perfect BodyKore Setup to Meet Your Guests' Needs
        </p>
        <div className=" flex justify-center">
          <h1 className="uppercase lg:text-6xl text-3xl text-white leading-none font-Archivo mt-5 font-bold text-center flex flex-col">
            <span>tailored fitness packages</span>
            <span> for every hospitality space</span>
          </h1>
        </div>
        <PackageCard />
      </div>
    </section>
  );
};

export default Packages;
