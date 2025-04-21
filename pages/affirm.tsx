import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import Image from 'next/image';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};
interface FinanceParams {
  header: HeaderData;
}
const Finance = ({ header }: FinanceParams) => {
  useEffect(() => {}, []);
  return (
    <>
      <SeoHeader seo={seo.finance} />
      <div>
        <main className="w-full">
          {/* Main banner with solid image */}
          <div className="flex lg:h-72 h-40 items-center justify-center bg-affirm">
            <div className="text-center text-white max-w-7xl m-auto">
              {/*Title*/}
              <div className="flex flex-wrap justify-center items-center">
                <h4
                  className={`lg:text-6xl text-4xl tracking-wider italic font-bebas font-bold`}
                >
                  Affirm
                </h4>
              </div>
            </div>
          </div>
          {/* Main banner with solid image */}

          <div className="grid grid-cols-5 max-w-7xl gap-x-10 lg:px-14 px-10 lg:py-20 py-10 justify-center items-center m-auto">
            <div className="text-left py-10 lg:col-span-3 col-span-5 lg:order-1 order-last">
              <h5 className="text-gray-700 lg:text-xl text-xl tracking-wider font-bold font-bebas italic">
                Make 4 interest-free payments with Affirm
              </h5>
              <h5 className="text-red-bc2026 lg:text-4xl text-2xl leading-10 tracking-wider font-bold font-bebas italic pb-3">
                Pay monthly with Affirm, <br></br>no credit card or credit
                needed.
              </h5>
              <h5 className="text-black-373933 tracking-wide leading-6 font-roboto text-lg font-medium px-18 pb-2">
                Paying $63.18 a month feels better than $700 ,<br></br> over 12
                months with a 15% APR.
              </h5>
              <h5 className="text-black-373933 tracking-wide font-roboto text-base px-18">
                With Affirm, there are no late fees, service fees, prepayment
                fees, or any hidden fees. When inspiration strikes, say yes with
                confidence
              </h5>
            </div>
            <div className="lg:col-span-2 col-span-5 m-auto w-full lg:order-last order-1">
              <Image
                src="/affirm/affirmlogo.svg"
                alt=""
                className="lg:w-96 w-52 lg:m-auto"
                width={384}
                height={153}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-7xl m-auto lg:py-20 py-10 lg:px-0 px-10">
              <div className="w-full text-center">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider pb-4">
                  Buying with Affirm is simple.
                </h4>
              </div>
              <div className="lg:px-14 px-0 lg:pt-2 pt-0 lg:pb-10 pb-0 justify-center items-center m-auto">
                <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-5 justify-center text-center">
                  <div>
                    <div className="">
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-8">
                        1. Fill your cart
                      </h5>
                      <Image
                        src="/affirm/step1.jpg"
                        className="object-contain w-60 m-auto"
                        width={240}
                        height={416}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <p className="text-black text-base tracking-wider font-roboto pb-2 pt-3">
                        Select Affirm at checkout, then enter a few pieces of
                        info for a real-time decision.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-8">
                        2. Complete your ourchase
                      </h5>
                      <Image
                        src="/affirm/step2.jpg"
                        className="object-contain w-60 m-auto"
                        width={240}
                        height={416}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <p className="text-black text-base tracking-wider font-roboto pb-2 pt-3">
                        Select Affirm at checkout, then enter a few pieces of
                        info for a real-time decision.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-8">
                        3. Pay over time
                      </h5>
                      <Image
                        src="/affirm/step3.jpg"
                        className="object-contain w-60 m-auto"
                        width={240}
                        height={416}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <p className="text-black text-base tracking-wider font-roboto pb-2 pt-3">
                        Select Affirm at checkout, then enter a few pieces of
                        info for a real-time decision.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-center pb-10">
                <a
                  className="affirm-site-modal"
                  data-page-type="banner"
                  style={{ cursor: 'pointer' }}
                  aria-label='
     <img class="affirmlog" src="https://cdn-assets.affirm.com/images/buttons/checkout/42x205-white.svg">
     - Affirm Financing (opens in modal)'
                >
                  <Image
                    className="object-contain w-60 m-auto"
                    src="/affirm/buynow.webp"
                    width={240}
                    height={48}
                  />
                </a>
                <p className="text-black-373933 tracking-wide font-roboto text-sm italic px-18 pt-2">
                  Apply with Affirm to see if you qualify for their 0% APR
                  financing for up to 36 months!
                </p>
                <h4 className="font-roboto italic text-sm font-normal tracking-wider pb-4">
                  Payment options are offered by Affirm and are subject to an
                  eligibility check. Options depend on your purchase amount, and
                  a down payment may be required. CA residents: Loans by Affirm
                  Loan Services, LLC are made or arranged pursuant to a
                  California Finance Lender license. For licenses and
                  disclosures, see affirm.com/licenses.
                </h4>
              </div>
            </div>
          </div>

          <div className=" bg-white">
            <div className="max-w-5xl m-auto lg:py-20 py-10">
              <div className="w-full text-center">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider pb-4">
                  FAQs
                </h4>
              </div>
              <div className="lg:px-14 px-7 lg:pb-20 pb-10 justify-center items-center m-auto">
                <div className="pb-2 border-b">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    Can I pay off my purchase early?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Yes! There’s no penalty for paying early.
                  </p>
                </div>
                <div className="pb-2 pt-2 border-b">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    How do I make my payments?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    You can make or schedule payments at affirm.com or in the
                    Affirm app for iOS or Android. Affirm will send you email
                    and text reminders before payments are due.
                  </p>
                </div>
                <div className="pb-2 pt-2 border-b">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    Can I return an item I bought with Affirm?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Yes—you can return an item you bought with Affirm by
                    initiating the return process with the store.
                  </p>
                </div>
                <div className="pb-2 pt-2 border-b">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    Does checking my eligibility affect my credit score?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    No—your credit score won’t be affected when you create an
                    Affirm account or check your eligibility. If you decide to
                    buy with Affirm, this may impact your credit score. You can
                    find more information in Affirm’s Help Center.
                  </p>
                </div>
                <div className="pb-2 pt-2 border-b">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    Do I need a mobile number to use Affirm?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Yes, you’ll need a mobile phone number from the U.S. or U.S.
                    territories. This helps Affirm verify it’s really you who is
                    creating your account and signing in.
                  </p>
                </div>
                <div className="pb-2 pt-2">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    Where can I learn more about Affirm?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    You can visit their website at affirm.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Finance;
