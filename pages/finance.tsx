import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
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
      <div className="flex lg:h-96 h-48 items-center justify-center bg-bgImage bg-no-repeat w-full bg-cover">
        <div className="text-center text-white max-w-7xl m-auto">
          {/*Title*/}
          <div className="flex flex-wrap justify-center items-center">
            <h4
              className={`text-5xl tracking-wider italic font-bebas font-bold w-full`}
            >
              Finance
            </h4>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="max-w-6xl m-auto px-6">
          <div>
            <h4
              className={`lg:text-5xl text-3xl tracking-wider italic font-bebas font-bold w-full lg:leading-normal leading-9`}
            >
              Compare Finance Programs, Rates and Lenders
            </h4>
            <p className="font-roboto text-base text-gray-700 lg:w-2/3">
              BodyKore is working with a number of lenders to help provide
              payment options for the full spectrum of credit profiles. Check
              out our options below:
            </p>
          </div>
          <div className="pt-6 pb-2">
            <div className="grid lg:grid-cols-9 grid-cols-1 gap-x-2 text-lg font-roboto font-semibold tracking-wide py-3 border-b align-middle">
              <div className="lg:col-span-2">Lender</div>
              <div className="lg:col-span-4">Promotional Rate </div>
              <div className="lg:col-span-2">Loan Amount </div>
              <div className="lg:col-span-1"></div>
            </div>
           
            <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-x-2 gap-y-1 text-base font-roboto font-normal tracking-wide py-5 border-b align-middle items-center">
              <div className="lg:col-span-2 lg:pb-0 pb-3">
                <Image
                  src="/affirm/affirmlogo.svg"
                  alt=""
                  className="w-32"
                  width={128}
                  height={51}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />{' '}
              </div>
              <div className="lg:col-span-4">0% APR for up to 36 months. </div>
              <div className="lg:col-span-2">$100 - $5000 </div>
              <a href="/affirm" target="_blank" rel="noreferrer">
                <button className="bg-red-bc2026 hover:bg-red-hover w-full py-2 text-white rounded-md col-span-1">
                  Learn More
                </button>
              </a>
            </div>
            <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-x-2 gap-y-1 text-base font-roboto font-normal tracking-wide py-5 border-b align-middle items-center">
              <div className="lg:col-span-2 lg:pb-0 pb-3">
                <Image
                  src="/synchrony/synchrony.svg"
                  alt=""
                  className="w-32"
                  width={128}
                  height={27}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />{' '}
              </div>
              <div className="lg:col-span-4">0% APR for up to 18 Months.</div>
              <div className="lg:col-span-2">$100 - $25000</div>
              <a href="/synchrony" target="_blank" rel="noreferrer">
                <button className="bg-red-bc2026 hover:bg-red-hover w-full py-2 text-white rounded-md col-span-1">
                  Learn More
                </button>
              </a>
            </div>
            {/* <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-x-2 gap-y-1 text-base font-roboto font-normal tracking-wide py-5 border-b align-middle items-center">
              <div className="lg:col-span-2 lg:pb-0 pb-3">
                <Image
                  src="/truemed.png"
                  alt=""
                  className="w-32"
                  width={128}
                  height={22}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />{' '}
              </div>
              <div className="lg:col-span-4">0% APR for up to 24 Months.</div>
              <div className="lg:col-span-2">$200 - $15000</div>
              <a href="/weGetFinance" target="_blank" rel="noreferrer">
                <button className="bg-red-bc2026 hover:bg-red-hover w-full py-2 text-white rounded-md col-span-1">
                  Learn More
                </button>
              </a>
            </div> */}
            <div className="grid lg:grid-cols-9 grid-cols-1 lg:gap-x-2 gap-y-1 text-base font-roboto font-normal tracking-wide py-5 border-b align-middle items-center">
              <div className="lg:col-span-2 lg:pb-0 pb-3">
                <Image
                  src="/finance/wegetfinance.svg"
                  alt=""
                  className="w-32"
                  width={128}
                  height={28}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />{' '}
              </div>
              <div className="lg:col-span-4">0% APR for up to 24 Months.</div>
              <div className="lg:col-span-2">$200 - $15000</div>
              <a href="/weGetFinance" target="_blank" rel="noreferrer">
                <button className="bg-red-bc2026 hover:bg-red-hover w-full py-2 text-white rounded-md col-span-1">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Finance;
