import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface AccordionProps {
  question: string;
  answer: string;
  type?: string;
}

interface SquatBoxFaqProps {
  title1: string;
  title2: string;
  accordion: AccordionProps[];
}

export default function SquatBoxFaq({
  title1,
  title2,
  accordion,
}: SquatBoxFaqProps) {
  const [active, setActive] = useState(-1);

  function toggleAccordion(index: number) {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  }

  const mapDisplayed = () => {
    return accordion;
  };

  // const [type, setType] = useState(filter[0]);
  const [displayed, setDisplayed] = useState(mapDisplayed());

  useEffect(() => {
    setDisplayed(mapDisplayed());
  }, []);

  return (
    <>
      <section className="w-full max-w-7xl m-auto px-6">
        <div className="flex flex-row justify-center">
          <div className="w-full">
            <div className="lg:text-center text-left font-playfair text-3xl lg:text-5xl font-bold max-w-7xl pb-10">
              <h3 className=" text-red-bc2026 pr-1">FAQ</h3>
            </div>

            <div className="lg:px-8 pt-3 lg:pt-0 gap-5 space-y-3">
              {displayed.map((a, i) => {
                return (
                  <div
                    className="border px-5 border-gray-300 rounded-md"
                    key={i}
                  >
                    <button
                      className="py-3 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between w-full"
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="flex flex-row justify-between w-full ">
                        <h4 className="inline-block font-montserrat font-semibold lg:text-lg text-base text-gray-800 hover:text-red-hover text-left ">
                          {a.question}
                        </h4>
                        <img
                          onClick={() => toggleAccordion(i)}
                          src={`${
                            active === i
                              ? '/svg/substraction.svg'
                              : '/svg/sum.svg'
                          }`}
                          width="16px"
                          height="27px"
                          alt=""
                        />
                      </div>
                    </button>
                    {active === i && (
                      <div>
                        <div className="overflow-auto transition-height duration-700 ease-in-out faqs-container">
                          <div
                            className="pb-4 text-gray-600 font-montserrat text-base squat-faq"
                            dangerouslySetInnerHTML={{ __html: a.answer }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
