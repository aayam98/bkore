import React from 'react';
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
  };
};

interface FinanceParams {
  header: HeaderData;
}

const Finance = ({ header }: FinanceParams) => {
  return (
    <>
      <SeoHeader seo={seo.finance} />
      <div>
        <main className="w-full">
          {/* Main banner with solid image */}
          <div className="flex lg:h-72 h-40 items-center justify-center bg-wegetfinancing">
            <div className="text-center text-white max-w-7xl m-auto">
              {/*Title*/}
              <div className="flex flex-wrap justify-center items-center">
                <h4
                  className={`lg:text-6xl text-4xl tracking-wider italic font-bebas font-bold`}
                >
                  WeGetFinancing
                </h4>
              </div>
            </div>
          </div>
          {/* Main banner with solid image */}
          <div className="grid grid-cols-5 max-w-7xl gap-x-10 lg:px-14 px-10 lg:py-20 py-10 justify-center items-center m-auto">
            <div className="text-left py-10 lg:col-span-3 col-span-5 lg:order-1 order-last">
              <h5 className="text-black lg:text-3xl text-2xl tracking-wider font-bold font-bebas italic pb-2">
                Get instantaneous credit.
                <br></br>
                The best terms according to your credit profile.
              </h5>
              <div className="bg-wegetfinancing text-white px-6 py-3 mt-2 rounded-md font-roboto text-lg w-36">
                <Link
                  href="https://cdn.wegetfinancing.com/integration/OWNmNGNiNWFjMTdlZDRmNWZhNzc0ZGFiZmZiMGI5NGI=/landing"
                  target="_blank" rel="noreferrer"
                >
                  Apply Now
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 col-span-5 m-auto w-full lg:order-last order-1">
              <Image
                src="/finance/wegetfinance.svg"
                alt=""
                width={384}
                height={86}
                placeholder="blur"
                blurDataURL="/loading.png"
                className="lg:w-96 w-52 lg:m-auto"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Finance;
