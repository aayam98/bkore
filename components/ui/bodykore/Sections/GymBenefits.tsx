import React from 'react';
import GymBenefitCard from '../Cards/GymBenefitCard';
const GymBenefits = () => {
  return (
    <>
    <section className="py-16 max-w-8xl m-auto">
      <p className="text-red-bc2026 text-center font-montserrat lg:text-2xl text-lg">
        Why Choose BodyKore for Your Hotel Gym?
      </p>
      <div className="lg:px-12 px-4">
        <h1 className="uppercase lg:text-6xl text-3xl leading-none font-Archivo mt-5 font-bold  text-center lg:flex lg:flex-col ">
          <span> premium equipment for unmatched</span>{' '}
          <span>guest satisfaction</span>
        </h1>
      </div>
      
    </section>
    <GymBenefitCard />
    </>
  );
};

export default GymBenefits;
