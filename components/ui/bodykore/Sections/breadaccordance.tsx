import React, { useEffect, useRef, useState } from 'react';

interface BreadAccordionProps {
  question: string;
  answer: string;
  type?: string;
}

interface FinanceProps {
  title1: string;
  title2: string;
}

export default function BreadAccordion({
  title1,
  title2,
}: FinanceProps) {
  const [active, setActive] = useState(-1);
  const [height, setHeight] = useState('0px');
  const [rotate, setRotate] = useState('transform duration-700 ease');
  const [accordion,setAccordion] = useState<BreadAccordionProps[]>([
    {
      question: 'How do I buy with Bread?',
      answer: 'You can apply via the website of any participating store.<br><br>Step 1 : Shop Online<br>Add items to your cart and provide a few pieces of information to begin the checkout process.<br>Step 2:<br>Select Pay-Over-Time at Checkout<br>Step 3:<br>Get a decision quickly without affecting your credit score. Confirm your plan.',
    },
    {
      question: 'Where do I apply?',
      answer: 'You can apply via the website of any participating online store.<br>When you’re ready to buy, click on Bread’s® financing button to get your rate in seconds.<br>If you pre-qualify, you will be presented with the financing terms offered and sample payment amounts. Add the item to the retailer’s shopping cart and choose Bread® or “Pay Over Time” as your preferred method of payment when you check out.',
    },
    {
      question: 'Why buy with Bread?',
      answer: 'We are committed to delivering a dignified customer experience and treating you with respect. Bread® loans include straightforward, easy-to-understand terms. Our goal is to make your purchases more manageable by helping you pay in a way that fits your budget.      ',
    },
    {
      question: 'Is Bread secure?',
      answer: 'Safeguarding your information is of the utmost importance to us. We are committed to keeping your personal information secure. Data is encrypted in transit and at rest.      ',
    },
    
   
    
  ]);
  const contentSpace = useRef<HTMLDivElement>(null);

  function toggleAccordion(index: number) {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  }

  useEffect(() => {
    if (contentSpace && contentSpace.current) {
      setHeight(`${contentSpace.current.scrollHeight}px`);
      setRotate(
        active
          ? 'transform duration-700 ease'
          : 'transform duration-700 ease rotate-180'
      );
    }

  }, [active]);
  return (
    <>
      <section className="w-full max-w-7xl m-auto">
        <div className="flex flex-row justify-start">
            <div className="px-8 lg:px-0 pt-8 lg:pt-0 w-full">
              {accordion.map((a, i) => {
                return (
                  <div className="flex flex-col" key={i}>
                    <button
                      className="py-3 appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          onClick={() => toggleAccordion(i)}
                          src={`${
                            active === i ? '/svg/substraction.svg' : '/svg/sum.svg'
                          }`}
                          height="30px"
                          alt=""
                        />
                        <p className="inline-block italic bold font-bebas text-lg tracking-wide text-black-373933 text-left">
                          {a.question}
                        </p>
                      </div>
                    </button>
                    <div
                      ref={contentSpace}
                      style={{ display: `${active === i ? "block" : 'none'}` }}
                      className="overflow-auto transition-height duration-700 ease-in-out faqs-container"
                    >
                     
                      <div className="pl-8 pb-4 text-gray-500 text-base text-left tracking-wide" dangerouslySetInnerHTML={{__html: a.answer}} />
                    </div>
                    <div className="border-b border-gray-200"></div>
                  </div>
                );
              })}
            </div>
        </div>
      </section>
    </>
  );
}
