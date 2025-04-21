import React from 'react';
import PremiumSlide from '../Sliders/PremiumSlide';

const TransformFitness = () => {
  return (
    <section className="pt-24">
      <p className="text-red-bc2026 text-center font-montserrat lg:text-2xl text-lg">
        See How BodyKore Enhances Hospitality Gyms
      </p>
      <div className="lg:px-12 px-4">
        <h1 className="uppercase lg:text-6xl text-3xl  leading-none font-Archivo mt-4 font-bold text-center flex flex-col">
          <span>transform your</span> <span>fitness space</span>
        </h1>
      </div>
      <PremiumSlide />
    </section>
  );
};

export default TransformFitness;
