import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface FinanceAccordionProps {
  question: string;
  answer: string;
  type?: string;
}

interface FinanceProps {
  title1: string;
  title2: string;
}

export default function HomeSection3({ title1, title2 }: FinanceProps) {
  const [active, setActive] = useState(-1);
  const [height, setHeight] = useState('0px');
  const [rotate, setRotate] = useState('transform duration-700 ease');
  const [accordion, setAccordion] = useState<FinanceAccordionProps[]>([
    {
      question: 'What is Affirm?',
      answer:
        'Affirm is a financing alternative to credit cards and other credit payment products. Affirm offers real-time financing for purchases online. With Affirm, you can buy and receive your purchase now, and pay for it in fixed monthly installments.',
    },
    {
      question: 'How does Affirm work?',
      answer:
        'Here are the steps in the Affirm loan application process:<br>Select to pay with Affirm at checkout<br>Affirm will prompt you to enter a few pieces of information – your name, email, mobile phone number, date of birth, and the last four digits of your social security number. Please ensure that all of this information is your own and is consistent information otherwise you may experience difficulty with your checkout.<br>To ensure that you’re the person making the purchase, Affirm will send a text message to your cell phone with a unique authorization code.<br>Enter the authorization code into the application form.<br>Within a few seconds, Affirm will notify you of the loan amount you’re approved for, the interest rate, and the number of months you will have to pay off your loan. You will have the option to choose to pay off your loan over time. Affirm will also state the amount of your fixed, monthly payments and the total amount of interest you’ll pay over the course of the loan.<br>If you would like to accept Affirm’s financing offer, click “Confirm Loan” and you’re done.<br><br>Going forward, you’ll get monthly email and SMS reminders about your upcoming payments. You can also set up autopay to avoid missing a payment. Your first monthly payment will be due 30 days from the date we the merchant completes processing your order.',
    },
    {
      question: 'Does Affirm perform a credit check?',
      answer:
        'Yes, when you first create an Affirm account, Affirm performs a ‘soft’ credit check to help verify your identity and determine your eligibility for financing. This ‘soft’ credit check will not affect your credit score.',
    },
    {
      question: 'How do I make my payments?',
      answer:
        'Before each payment is due, Affirm will send you reminders via email and SMS that will include the installment amount that is coming due and the due date. You can also sign up for autopay so you don’t risk missing a payment.<br><br>Please follow these steps to make a payment:<br>Go to www.affirm.com/account<br>You will be prompted to enter in your mobile number where you will be sent a personalized security pin.Enter this security pin into the form on the next page and click “Sign In.”<br>You’ll now see a list of your loans and payments coming due. Click on the loan payment you would like to make.<br>You can make a payment utilizing a debit card or ACH bank transfer.',
    },
    {
      question: 'What fees does Affirm charge me?',
      answer:
        'Affirm payment subject to credit check and approval. Down payment may be required. For purchases under $100, limited payment options are available. Affirm loans are made by Cross River Bank, a New Jersey State Chartered Commercial Bank, Member FDIC. See www.affirm.com/faqs for details.',
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
                      <Image
                        onClick={() => toggleAccordion(i)}
                        src={`${
                          active === i
                            ? '/svg/substraction.svg'
                            : '/svg/sum.svg'
                        }`}
                        width={16}
                        height={16}
                        alt=""
                      />
                      <p className="inline-block italic bold font-bebas text-lg tracking-wide text-black-373933 text-left">
                        {a.question}
                      </p>
                    </div>
                  </button>
                  <div
                    ref={contentSpace}
                    style={{ display: `${active === i ? 'block' : 'none'}` }}
                    className="overflow-auto transition-height duration-700 ease-in-out faqs-container"
                  >
                    <div
                      className="pl-8 pb-4 text-gray-500 text-base text-left tracking-wide"
                      dangerouslySetInnerHTML={{ __html: a.answer }}
                    />
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
