import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FAQTypeStrapi } from 'services/strapi/faq';


interface HomeSection3Props {
  title1: string;
  title2: string;
  accordion: FAQTypeStrapi[];
}

export default function HomeSection3({
  title1,
  title2,
  accordion,
  // filter,
}: HomeSection3Props) {
  const [active, setActive] = useState(-1);

  function toggleAccordion(index: number) {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  }

  const mapDisplayed = () => {
    return accordion.filter((item) => item.attributes.title === type);
  };

  const [type, setType] = useState(accordion[0].attributes.title);
  const [faqs, setFaqs] = useState(accordion[0].attributes.faqs.data);
  const [displayed, setDisplayed] = useState(mapDisplayed());

  useEffect(() => {
    setDisplayed(mapDisplayed());
  }, [type]);

  return (
    <>
   
    
      <section className="w-full max-w-7xl m-auto px-6">
        <div className="flex flex-row justify-center">
          <div className="lg:w-4/12 hidden lg:block">
            {accordion.map((item, index) => (
              <h5
                key={index}
                className={`w-52 group flex items-center px-3 py-1 font-bebas text-xl tracking-wide ${item.attributes.title === type ? 'text-red-bc2026 underline' : 'text-gray-700'
                  } cursor-pointer`}
                style={{ letterSpacing: '1px' }}
                onClick={() => {
                  setType(item.attributes.title);
                  setFaqs(item.attributes.faqs.data);
                }}
              >
                {item.attributes.title}
              </h5>
            ))}
          </div>
          <div className="lg:w-8/12 lg:pr-24">
            <div className="flex lg:text-center text-left font-bebas text-3xl lg:text-5xl font-bold italic xs:pt-24 max-w-7xl m-auto">
              <h3 className="text-black-373933 pr-2">{title1}</h3>
              <h3 className=" text-red-bc2026 pr-1">{title2}</h3>
            </div>

            <div className="lg:hidden">
              <div className="my-2">
                <div
                  className="mt-1 flex flex-wrap lg:justify-center"
                  aria-labelledby="projects-headline"
                >

                  {accordion.map((item, index) => (
                    <p
                      key={index+'small'}
                      className={`group flex items-center px-3 py-1 font-bebas ${item.attributes.title === type
                          ? 'text-red-bc2026 border-b-2 border-red-bc2026'
                          : 'text-gray-700'
                        } cursor-pointer`}
                      style={{ letterSpacing: '1px' }}
                      onClick={() => {
                        setType(item.attributes.title);
                        setFaqs(item.attributes.faqs.data);
                      }}
                    >
                      {item.attributes.title}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:px-8 pt-3 lg:pt-0 gap-5 space-y-3">
              {faqs.map((a, i) => {
                return (
                  <div
                    className="flex flex-col border px-2 border-gray-300 rounded-md"
                    key={i}
                  >
                    <button
                      className="py-3 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between "
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          onClick={() => toggleAccordion(i)}
                          src={`${active === i
                              ? '/svg/substraction.svg'
                              : '/svg/sum.svg'
                            }`}
                          width={15}
                          height={15}
                          alt=""
                        />
                        <h4 className="inline-block font-bebas lg:text-xl text-lg tracking-wide text-gray-800 hover:text-red-hover text-left">
                          {a.attributes.question}
                        </h4>
                      </div>
                    </button>
                    {active === i && (
                      <div>
                        <div className="overflow-auto transition-height duration-700 ease-in-out faqs-container">
                          <div
                            className="pl-8 pb-4 text-gray-600 font-roboto text-base tracking-wide"
                            dangerouslySetInnerHTML={{ __html: a.attributes.answer }}
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
