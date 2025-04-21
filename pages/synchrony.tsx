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
  useEffect(() => { }, []);
  return (
    <>
      <SeoHeader seo={seo.finance} />
      <div>
        <main className="w-full">
          {/* Main banner with solid image */}
          <div className="flex lg:h-72 h-40 items-center justify-center bg-mysynchrony">
            <div className="text-center text-white max-w-7xl m-auto">
              {/*Title*/}
              <div className="flex flex-wrap justify-center items-center">
                <h4
                  className={`lg:text-6xl text-4xl tracking-wider italic font-bebas font-bold`}
                >
                  synchrony
                </h4>
              </div>
            </div>
          </div>
          {/* Main banner with solid image */}

          <div className="grid grid-cols-5 max-w-7xl gap-x-10 lg:px-14 px-10 lg:py-20 py-10 justify-center items-center m-auto">
            <div className="text-left py-10 lg:col-span-3 col-span-5 lg:order-1 order-last">
              <h5 className="text-black lg:text-3xl text-2xl tracking-wider font-bold font-bebas italic pb-2">
                APPLY TODAY, TAKE TIME TO PAY
              </h5>
              <h5 className="text-black-373933 tracking-wide font-roboto text-lg px-18">
                With promotional financing from BODYKORE INC, major purchases
                don’t have to wait.* Get what you want now and pay over time.
              </h5>
            </div>
            <div className="lg:col-span-2 col-span-5 m-auto w-full lg:order-last order-1">
              <Image
                src="/synchrony/synchrony.svg"
                alt=""
                className="lg:w-96 w-52 lg:m-auto"
                height={82}
                width={384}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-7xl m-auto lg:py-20 py-10 lg:px-0 px-10">
              <div className="w-full text-center">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider">
                  HOW IT WORKS
                </h4>
                <p className="text-gray-700 font-roboto italic text-lg tracking-wider pb-4">
                  Applying is convenient, fast and safe!
                </p>
              </div>
              <div className="lg:px-14 px-0 lg:pt-2 pt-0 lg:pb-10 pb-0 justify-center items-center m-auto">
                <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-5 justify-center text-center">
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <Image
                        src="/synchrony/applynow.svg"
                        className="object-contain m-auto w-28 pb-3"
                        height={124}
                        width={112}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1 w-full">
                        APPLY TODAY
                      </h5>
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        Fill out a secure online application.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <Image
                        src="/synchrony/getdesc.svg"
                        className="object-contain m-auto w-28 pb-3"
                        height={124}
                        width={112}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1 w-full">
                        GET A DECISION
                      </h5>
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        You’ll get an instant credit decision after you submit
                        the application.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <Image
                        src="/synchrony/startshopping.svg"
                        className="object-contain m-auto w-28 pb-3"
                        height={124}
                        width={112}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1 w-full">
                        START SHOPPING
                      </h5>
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        If you’re approved, you’ll receive a temporary account
                        number so you can start shopping right away.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-center lg:pb-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="https://www.synchrony.com/MMC/GX220565800"
                  target="_blank" rel="noreferrer"
                >
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium text-black-1c2023 bg-mysynchrony hover:bg-white border border-mysynchronySec hover:border-mysynchronySec hover:text-mysynchronySec duration-200"
                  >
                    APPLY NOW
                  </button>
                </Link>
                {/* <Link
                   href="https://www.synchrony.com/MMC/GX220565800"
                  target="_blank" rel="noreferrer"
                >
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium text-mysynchronySec bg-white hover:bg-mysynchronySec border border-mysynchronySec hover:border-paytomorrow hover:text-mysynchrony duration-200"
                  >
                    APPLY NOW
                  </button>
                </Link> */}
              </div>
            </div>
          </div>

          <div className=" bg-white">
            <div className="max-w-5xl m-auto">
              <div className="w-full text-center lg:py-20 py-10">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider">
                  HERE TO HELP
                </h4>
                <p className="text-gray-700 font-roboto italic text-lg tracking-wider pb-4">
                  Have a question about your account?
                </p>
                <Link
                  href="https://www.synchrony.com/MMC/GX220565800"
                  target="_blank" rel="noreferrer"
                >
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium text-black-1c2023 bg-mysynchrony hover:bg-white border border-mysynchronySec hover:border-mysynchronySec hover:text-mysynchronySec duration-200"
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