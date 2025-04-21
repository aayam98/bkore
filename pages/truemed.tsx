import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import Link from 'next/link';
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
          <div style={{backgroundColor:"#183b43"}} className="flex lg:h-72 h-40 items-center  justify-center ">
            <div className="text-center text-white max-w-7xl m-auto">
              {/*Title*/}
              <div className="flex flex-wrap justify-center items-center">
                <h4
                  className={`lg:text-6xl text-4xl tracking-wider italic font-bebas font-bold`}
                >
                  Truemed
                </h4>
              </div>
            </div>
          </div>
          {/* Main banner with solid image */}

          <div className="grid grid-cols-5  max-w-7xl gap-x-10 lg:px-14 md:px-10 px-5 lg:py-20 py-10 justify-center items-center m-auto">
            <div className="text-left py-10 lg:col-span-3 col-span-5 lg:order-1 order-last">
              <div className=' flex flex-col gap-5'>

              
              <h5 className="text-black-373933 tracking-wide font-roboto text-sm md:text-lg px-18">
                BodyKore is a commercial gym equipment manufacturer that
                specializes in providing high-quality products, superb service,
                and affordable solutions for your home or commercial facility.
                Our space-saving designs and equipment packages are made to fit
                even in the most restricted of spaces, while our flexible
                payment plans can help anyone on a tight budget. Backed by an
                industry-leading ten-year warranty, our commercial-grade
                machines can be shipped nationwide with instructions for an
                easy, smooth installation.
              </h5>
              <Link
                  href="https://www.bodykore.com/?utm_source=shop_truemed"
                  target="_blank" rel="noreferrer"
                  className='mt-10'
                >
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium bg-truemed  hover:bg-truemedHover text-white border border-mysynchronySec hover:border-mysynchronySec  duration-200"
                  >
                    APPLY NOW
                  </button>
                </Link>
                  </div>
            </div>
            <div className="lg:col-span-2 lg:ml-10 col-span-5  flex justify-center items-center  m-auto w-full lg:order-last order-1">
              <Image
                src="/truemed.png"
                alt=""
                className="lg:w-96 md:w-52 w-40 lg:m-auto object-contain "
                height={82}
                width={384}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
            </div>
          </div>
          <div className=" w-full bg-gray-100">
            <div className="max-w-7xl  m-auto lg:py-20 py-10 lg:px-0 md:px-10 px-5">
              <div className="w-full text-center">
                <h4 className="font-bebas italic md:text-3xl text-2xl lg:text-5xl font-bold tracking-wider">
                  How to pay with pre-tax HSA/FSA funds
                </h4>
                    <p className="text-gray-700 font-roboto italic text-lg tracking-wider pb-1 md:pb-4">
                  Applying is convenient, fast and safe!
                </p>
              </div>
              <div className="lg:px-14 px-0 lg:pt-2 pt-0 lg:pb-10 pb-0 justify-center items-center m-auto">
                <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-5 justify-center text-center">
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <div className=" relative h-36 md:h-48 md:mb-10 w-full">
                        <Image
                          src="/checkout.svg"
                          className="object-contain m-auto  pb-3"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                      </div>
                      <h5 className="text-black text-xl  tracking-wider font-bold font-bebas italic pb-1 w-full">
                        Checkout
                      </h5>
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        Find the Truemed logo during checkout. Exit the "Shop
                        Pay" pop-up if prompted.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <div className=" relative h-36 md:h-48 md:mb-10 w-full">
                        <Image
                          src="/health.svg"
                          className="object-contain m-auto  pb-3"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                      </div>
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1 w-full">
                        Complete health assessment
                      </h5>
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        Take a quick, private health survey. A licensed provider
                        will review your answers to determine eligibility.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="m-auto flex flex-wrap  justify-center">
                      <div className=" relative h-36 md:h-48 md:mb-10 w-full">
                        <Image
                          src="/purchase.svg"
                          className="object-contain m-auto  pb-3"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                      </div>
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1 w-full">
                        Make your purchase
                      </h5>
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        Pay with your HSA/FSA card or a credit card. If you use
                        a regular credit card, follow the guide included with
                        your LMN to submit your purchase for reimbursement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-center lg:pb-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="https://www.bodykore.com/?utm_source=shop_truemed"
                  target="_blank" rel="noreferrer"
                >
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium bg-truemed  hover:bg-truemedHover text-white border border-mysynchronySec hover:border-mysynchronySec  duration-200"
                  >
                    APPLY NOW
                  </button>
                </Link>
               
              </div>
            </div>
          </div>

          <div className=" bg-white">
            <div className="max-w-7xl  m-auto">
              <div className="w-full text-center px-5 lg:py-20 py-10">

                 <div className="lg:px-14 px-0 lg:pt-2 pt-0 lg:pb-10 pb-0 justify-center items-center m-auto">
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-16 gap-5 justify-center text-center">
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <div className=" relative h-40 md:h-80 md:mb-5  w-full">
                        <Image
                          src="/hsa.webp"
                          className="object-contain m-auto h-full pb-3"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                      </div>
                      <h5 className="text-black text-2xl  tracking-wider font-bold font-bebas italic pb-1 w-full">
                      Traditional HSA/FSA spend
                      </h5>
                      <p className="text-black text-sm md:text-base tracking-wider font-roboto pb-2">
                      Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA) let you set aside pre-tax dollars for healthcare costs. However, their applications have traditionally been limited to expenses such as co-pays, deductibles, and basic medical supplies like sunscreen and bandages—leaving many meaningful health investments out of reach.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <div className=" relative h-40 md:h-80 md:mb-5 w-full ">
                        <Image
                          src="/expanded.webp"
                          className="object-contain m-auto  pb-3"
                          layout="fill"
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                      </div>
                      <h5 className="text-black text-2xl tracking-wider font-bold font-bebas italic pb-1 w-full">
                      Expanded Access with Truemed
                      </h5>
                      <p className="text-black text-sm md:text-base tracking-wider font-roboto pb-2">
                      There is a movement redefining healthcare, focusing on proactive, root-cause solutions like fitness, nutrition, and innovative health technology. When you shop with Truemed merchants, you can seamlessly qualify for a Letter of Medical Necessity (LMN), enabling you to use pre-tax HSA/FSA funds for these transformative health interventions— <strong>saving you an average of 30%.</strong>
                      </p>
                    </div>
                  </div>
               
                </div>
              </div>
                <Link
                  href="https://www.truemed.com/shop/fitness-equipment/bodykore?utm_source=shop_truemed"
                  target="_blank" rel="noreferrer"
                >
                  <button
                    // type="submit"
                    className="w-64 px-10 py-4 truemed rounded-md text-sm font-medium text-white  bg-truemed  hover:bg-truemedHover  border border-mysynchronySec hover:border-mysynchronySec  duration-200"
                  >
                    CONTACT US
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Finance;
