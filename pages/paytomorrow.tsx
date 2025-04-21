import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { useSnackbar } from 'nextjs-toast';
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const snackbar = useSnackbar();

  async function checkForm() {
    let personalInfo = {
      firstName: firstName,
      lastName: lastName,
      cellPhone: cellPhone,
      email: email,
    };
    if (
      !!personalInfo.firstName &&
      personalInfo.firstName !== '' &&
      !!personalInfo.lastName &&
      personalInfo.lastName !== '' &&
      !!personalInfo.cellPhone &&
      personalInfo.cellPhone !== '' &&
      !!personalInfo.email &&
      personalInfo.email !== ''
    ) {
      // PLEASE ADD YOUR PUBLIC ID HERE

      setLoading(true);

      setLoading(true);
      const body = JSON.stringify({ ...personalInfo });
      const res = await (
        await fetch('/api/paytomorrow', { method: 'POST', body })
      ).json();
      setFirstName('');
      setLastName('');
      setCellPhone('');
      setEmail('');
      snackbar.showMessage(
        'Your pre approval has been submitted',
        'success',
        'filled'
      );
      setLoading(false);
    } else {
      console.log('error PAY');
    }
  }
  return (
    <>
      <SeoHeader seo={seo.finance} />
      <div>
        <main className="w-full">
          {/* Main banner with solid image */}
          <div className="flex lg:h-72 h-40 items-center justify-center bg-paytomorrow">
            <div className="text-center text-white max-w-7xl m-auto">
              {/*Title*/}
              <div className="flex flex-wrap justify-center items-center">
                <h4
                  className={`lg:text-6xl text-4xl tracking-wider italic font-bebas font-bold`}
                >
                  PayTomorrow
                </h4>
              </div>
            </div>
          </div>
          {/* Main banner with solid image */}

          <div className="grid grid-cols-5 max-w-7xl gap-x-10 lg:px-14 px-10 lg:py-20 py-10 justify-center items-center m-auto">
            <div className="text-left py-10 lg:col-span-3 col-span-5 lg:order-1 order-last">
              <h5 className="text-black lg:text-3xl text-2xl tracking-wider font-bold font-bebas italic pb-2">
                Applying with PayTomorrow will not affect <br></br>your credit
                score
              </h5>
              <h5 className="text-black-373933 tracking-wide font-roboto text-lg px-18">
                We provide easy and affordable financing through our partner
                PayTomorrow, so you can buy today and PayTomorrow!
              </h5>
            </div>
            <div className="lg:col-span-2 col-span-5 m-auto w-full lg:order-last order-1">
              <Image
                src="/paytomorrow/paytomorrow.svg"
                alt=""
                className="lg:w-96 w-52 lg:m-auto"
                width={384}
                height={73}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-7xl m-auto lg:py-20 py-10 lg:px-0 px-10">
              <div className="w-full text-center">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider pb-4">
                  Why PayTomorrow
                </h4>
              </div>
              <div className="lg:px-14 px-0 lg:pt-2 pt-0 lg:pb-10 pb-0 justify-center items-center m-auto">
                <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-5 justify-center text-center">
                  <div>
                    <div className="">
                      <Image
                        src="/paytomorrow/debit-card.png"
                        className="object-contain m-auto"
                        width={102}
                        height={102}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1">
                        Won't affect your credit
                      </h5>
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        PayTomorrow's soft credit check will not affect your
                        credit score to apply.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <Image
                        src="/paytomorrow/money.png"
                        className="object-contain m-auto"
                        width={102}
                        height={102}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1">
                        Affordable monthly payments
                      </h5>

                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        PayTomorrow offers flexible financing options with fair
                        and transparent pricing.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <Image
                        src="/paytomorrow/debit-card.png"
                        className="object-contain m-auto"
                        width={102}
                        height={102}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-1">
                        Instant Evaluations
                      </h5>

                      <p className="text-black text-base tracking-wider font-roboto pb-2">
                        PayTomorrow instantly evaluates your credit profile and
                        presents you with a customized offer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full text-center">
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: `<div class="card mb-4 box-shadow">
                            
                            <div class="card-body">
                                <p class="text-center price hidden">$2,314.00</p>
                                <p class="text-muted text-center mpe __pt-mpe">
            <span class="__pt-mpe-text-or hidden">or</span> <span class="__pt-mpe-text-as-low-as hidden">as low as</span> <span class="__pt-mpe-text-amount hidden">$135.00</span><span class="__pt-mpe-text-cycle hidden">/mo</span> <span class="__pt-mpe-text-with hidden">with</span> 
            <span class="__pt-logo">
             <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326 48">
                    <defs>
                        <style>.cls-1{fill:#43A8FB}.cls-2{fill:#152456}</style>
                    </defs>
                    <path class="cls-1" d="M0,4A3,3,0,0,1,.8,1.54a4.49,4.49,0,0,1,2.06-1C3.43.42,4.45.31,5.94.18S9.54,0,12.3,0q8.47,0,12.61,3.34A10.86,10.86,0,0,1,29,12.24a13.14,13.14,0,0,1-.88,4.85A9.68,9.68,0,0,1,25.38,21a13.44,13.44,0,0,1-5,2.57,26.06,26.06,0,0,1-7.47.93c-.74,0-1.49,0-2.25-.08l-2.09-.16c-.64,0-1.19-.11-1.65-.19A7.64,7.64,0,0,0,6.1,24V36.87H0ZM6.1,18.6l2.06.29a32.1,32.1,0,0,0,4.35.24,19.15,19.15,0,0,0,4.87-.53,8.08,8.08,0,0,0,3.1-1.49,5.35,5.35,0,0,0,1.62-2.2,7.35,7.35,0,0,0,.47-2.67,8,8,0,0,0-.42-2.57,4.84,4.84,0,0,0-1.59-2.2,8.84,8.84,0,0,0-3.2-1.54,19.8,19.8,0,0,0-5.22-.58c-1.7,0-3.06,0-4.08.11a14.92,14.92,0,0,0-2,.21Z"></path>
                    <path class="cls-1" d="M54.73,36.77c-.35.07-.91.15-1.67.24s-1.65.17-2.67.26-2.17.17-3.45.24-2.59.11-4,.11a26.1,26.1,0,0,1-6.75-.72A11.39,11.39,0,0,1,32.08,35,6.13,6.13,0,0,1,30,32.24,9.51,9.51,0,0,1,29.46,29a10.13,10.13,0,0,1,.66-3.81,6.39,6.39,0,0,1,2.18-2.76,10.69,10.69,0,0,1,3.94-1.67,27.29,27.29,0,0,1,5.94-.55c1.34,0,2.61,0,3.81.13s2.1.17,2.7.24a6.77,6.77,0,0,0-.61-3.07,4.7,4.7,0,0,0-1.66-1.91,6.74,6.74,0,0,0-2.55-1,18.36,18.36,0,0,0-3.28-.27,14,14,0,0,0-4.85.69,10.1,10.1,0,0,0-2.41,1.16,6.8,6.8,0,0,1-.88-1A3.05,3.05,0,0,1,32.3,12a3.38,3.38,0,0,1,1.4-1.27,9.38,9.38,0,0,1,2.7-.88,24.2,24.2,0,0,1,4.29-.31,25.06,25.06,0,0,1,5.7.6,12.56,12.56,0,0,1,4.42,1.94,8.87,8.87,0,0,1,2.89,3.5,12.09,12.09,0,0,1,1,5.24ZM48.75,25c-.36-.07-1-.18-2-.32a33.34,33.34,0,0,0-4.37-.21,9.84,9.84,0,0,0-5.25,1.08A3.83,3.83,0,0,0,35.5,29a4.18,4.18,0,0,0,.35,1.75A3,3,0,0,0,37,32.08a6.64,6.64,0,0,0,2.3.85,19.29,19.29,0,0,0,3.63.29A30.18,30.18,0,0,0,46.84,33c.95-.12,1.59-.22,1.91-.29Z"></path>
                    <path class="cls-1" d="M58.81,13.09A2.55,2.55,0,0,1,59.66,11,3.58,3.58,0,0,1,62,10.28a6.33,6.33,0,0,1,1.78.24c.54.16.91.27,1.08.34V25a7.19,7.19,0,0,0,1.67,5c1.11,1.23,2.84,1.85,5.17,1.85A6.82,6.82,0,0,0,76.77,30a7.56,7.56,0,0,0,1.86-5.54V13.09A2.55,2.55,0,0,1,79.48,11a3.58,3.58,0,0,1,2.33-.69,6.31,6.31,0,0,1,1.77.24c.55.16.91.27,1.09.34V34.07a17.87,17.87,0,0,1-1,6.38,10.77,10.77,0,0,1-7.31,6.78,20.42,20.42,0,0,1-5.78.77,30.14,30.14,0,0,1-4-.24c-1.2-.16-2.27-.34-3.2-.55s-1.71-.42-2.31-.61-1-.35-1.27-.45c.28-.75.55-1.5.79-2.25s.5-1.52.75-2.26c.24.11.63.25,1.16.43s1.17.34,1.91.5,1.58.29,2.51.4a28.31,28.31,0,0,0,3,.16,14.07,14.07,0,0,0,3.71-.45,6.33,6.33,0,0,0,2.78-1.57,7.23,7.23,0,0,0,1.75-2.94,14.8,14.8,0,0,0,.61-4.58,7.11,7.11,0,0,1-3.32,2.46,12.84,12.84,0,0,1-5,.93,14.86,14.86,0,0,1-4.71-.72A10.37,10.37,0,0,1,62.1,34.2a9.28,9.28,0,0,1-2.41-3.36,11.38,11.38,0,0,1-.88-4.61Z"></path>
                    <path class="cls-2" d="M88.91,5.56a2.55,2.55,0,0,1,.84-2.14,3.74,3.74,0,0,1,2.34-.67A6.31,6.31,0,0,1,93.86,3c.55.16.91.28,1.09.35v6.94h7.68a3.44,3.44,0,0,1,2.46.71,2.85,2.85,0,0,1,.72,2.1,4.94,4.94,0,0,1-.27,1.66,7.88,7.88,0,0,1-.42,1.09H95V27.65a5.8,5.8,0,0,0,.37,2.26,3.44,3.44,0,0,0,1,1.4,3.74,3.74,0,0,0,1.54.74,7.28,7.28,0,0,0,1.83.22,8.38,8.38,0,0,0,2.86-.48,8.29,8.29,0,0,0,1.9-.9l2.44,4c-.28.22-.68.48-1.19.8a10.67,10.67,0,0,1-1.88.9,16.44,16.44,0,0,1-2.49.71,14.25,14.25,0,0,1-3,.3c-3.11,0-5.46-.81-7-2.41a8.62,8.62,0,0,1-2.38-6.34Z"></path>
                    <path class="cls-2" d="M121.44,9.54a15.37,15.37,0,0,1,5.74,1.06,13.91,13.91,0,0,1,4.64,2.94A13.37,13.37,0,0,1,134.89,18,13.75,13.75,0,0,1,136,23.58a13.63,13.63,0,0,1-1.12,5.53,13.37,13.37,0,0,1-3.07,4.45,14.31,14.31,0,0,1-4.64,3,15.68,15.68,0,0,1-11.49,0,14.31,14.31,0,0,1-4.64-3A13.37,13.37,0,0,1,108,29.11a13.8,13.8,0,0,1-1.11-5.53A13.91,13.91,0,0,1,108,18a13.37,13.37,0,0,1,3.07-4.45,13.91,13.91,0,0,1,4.64-2.94A15.39,15.39,0,0,1,121.44,9.54Zm0,22.73a8.15,8.15,0,0,0,3.33-.67,7.6,7.6,0,0,0,2.63-1.85A8.62,8.62,0,0,0,129.09,27a9.23,9.23,0,0,0,.61-3.41,9.63,9.63,0,0,0-.61-3.47,8.34,8.34,0,0,0-1.69-2.79,7.79,7.79,0,0,0-2.63-1.82,8.71,8.71,0,0,0-6.7,0,7.73,7.73,0,0,0-2.59,1.82,8.36,8.36,0,0,0-1.7,2.79,9.63,9.63,0,0,0-.61,3.47,9.23,9.23,0,0,0,.61,3.41,8.64,8.64,0,0,0,1.7,2.76,7.53,7.53,0,0,0,2.59,1.85A8.18,8.18,0,0,0,121.44,32.27Z"></path>
                    <path class="cls-2" d="M139,19.76a10.34,10.34,0,0,1,.9-4.45,8.93,8.93,0,0,1,2.47-3.18A10.85,10.85,0,0,1,146,10.2a15.42,15.42,0,0,1,4.61-.66,13.71,13.71,0,0,1,5.88,1.21,9.78,9.78,0,0,1,4.13,3.61,10,10,0,0,1,4.08-3.61,13.25,13.25,0,0,1,5.78-1.21,15.88,15.88,0,0,1,4.55.63,10.37,10.37,0,0,1,3.66,1.91,9.2,9.2,0,0,1,2.44,3.18,10.31,10.31,0,0,1,.9,4.45V36.87h-6V21.77q0-3.64-1.65-5.21A6.14,6.14,0,0,0,169.91,15a6.33,6.33,0,0,0-4.53,1.75q-1.81,1.76-1.82,5.67V36.87h-6V22.41q0-3.91-1.83-5.67A6.33,6.33,0,0,0,151.16,15a6.24,6.24,0,0,0-4.45,1.59Q145,18.17,145,21.83v15h-6Z"></path>
                    <path class="cls-2" d="M199.58,9.54a15.39,15.39,0,0,1,5.75,1.06A13.91,13.91,0,0,1,210,13.54,13.52,13.52,0,0,1,213,18a13.91,13.91,0,0,1,1.11,5.59A13.8,13.8,0,0,1,213,29.11,13.52,13.52,0,0,1,210,33.56a14.31,14.31,0,0,1-4.64,3,15.68,15.68,0,0,1-11.49,0,14.31,14.31,0,0,1-4.64-3,13.37,13.37,0,0,1-3.07-4.45A13.63,13.63,0,0,1,185,23.58,13.75,13.75,0,0,1,186.13,18a13.37,13.37,0,0,1,3.07-4.45,13.91,13.91,0,0,1,4.64-2.94A15.33,15.33,0,0,1,199.58,9.54Zm0,22.73a8.2,8.2,0,0,0,3.34-.67,7.46,7.46,0,0,0,2.62-1.85,8.64,8.64,0,0,0,1.7-2.76,9.23,9.23,0,0,0,.61-3.41,9.63,9.63,0,0,0-.61-3.47,8.36,8.36,0,0,0-1.7-2.79,7.66,7.66,0,0,0-2.62-1.82,8.71,8.71,0,0,0-6.7,0,7.87,7.87,0,0,0-2.6,1.82,8.34,8.34,0,0,0-1.69,2.79,9.63,9.63,0,0,0-.61,3.47,9.23,9.23,0,0,0,.61,3.41,8.62,8.62,0,0,0,1.69,2.76,7.67,7.67,0,0,0,2.6,1.85A8.16,8.16,0,0,0,199.58,32.27Z"></path>
                    <path class="cls-2" d="M217.12,19.76a9.63,9.63,0,0,1,3-7.55c2-1.78,4.76-2.67,8.3-2.67a13.71,13.71,0,0,1,5.43.92,3,3,0,0,1,2.09,2.84,3.45,3.45,0,0,1-.5,1.75,3.66,3.66,0,0,1-.83,1.06,13.94,13.94,0,0,0-2.22-.8,11.1,11.1,0,0,0-3-.37q-6.2,0-6.2,6.57V36.87h-6Z"></path>
                    <path class="cls-2" d="M236,19.76a9.63,9.63,0,0,1,3-7.55c2-1.78,4.76-2.67,8.3-2.67a13.71,13.71,0,0,1,5.43.92,3,3,0,0,1,2.09,2.84,3.45,3.45,0,0,1-.5,1.75,3.87,3.87,0,0,1-.82,1.06,14.46,14.46,0,0,0-2.23-.8,11.1,11.1,0,0,0-3-.37q-6.19,0-6.2,6.57V36.87h-6Z"></path>
                    <path class="cls-2" d="M268.88,9.54a15.39,15.39,0,0,1,5.75,1.06,14,14,0,0,1,4.64,2.94A13.52,13.52,0,0,1,282.34,18a13.91,13.91,0,0,1,1.11,5.59,13.8,13.8,0,0,1-1.11,5.53,13.52,13.52,0,0,1-3.07,4.45,14.42,14.42,0,0,1-4.64,3,15.71,15.71,0,0,1-11.5,0,14.26,14.26,0,0,1-4.63-3,13.37,13.37,0,0,1-3.07-4.45,13.63,13.63,0,0,1-1.12-5.53A13.75,13.75,0,0,1,255.43,18a13.37,13.37,0,0,1,3.07-4.45,13.87,13.87,0,0,1,4.63-2.94A15.42,15.42,0,0,1,268.88,9.54Zm0,22.73a8.2,8.2,0,0,0,3.34-.67,7.56,7.56,0,0,0,2.62-1.85,8.64,8.64,0,0,0,1.7-2.76,9.44,9.44,0,0,0,.61-3.41,9.85,9.85,0,0,0-.61-3.47,8.36,8.36,0,0,0-1.7-2.79,7.75,7.75,0,0,0-2.62-1.82,8.71,8.71,0,0,0-6.7,0,7.87,7.87,0,0,0-2.6,1.82,8.34,8.34,0,0,0-1.69,2.79,9.63,9.63,0,0,0-.61,3.47,9.23,9.23,0,0,0,.61,3.41,8.62,8.62,0,0,0,1.69,2.76,7.67,7.67,0,0,0,2.6,1.85A8.13,8.13,0,0,0,268.88,32.27Z"></path>
                    <path class="cls-2" d="M292.4,36.87q-2.59-6.09-4.26-10.33c-1.11-2.82-2-5.16-2.65-7s-1.11-3.28-1.38-4.29a10,10,0,0,1-.39-2.14,2.74,2.74,0,0,1,3-2.81,6.26,6.26,0,0,1,1.82.21,6.82,6.82,0,0,1,.88.32q.63,2.32,1.43,4.95T292.51,21c.57,1.73,1.12,3.38,1.67,4.95l1.46,4.21c.39-1.09.8-2.34,1.24-3.76s.9-2.86,1.38-4.37.94-3,1.4-4.55.89-3,1.28-4.37a4.61,4.61,0,0,1,1.19-2.1,3.56,3.56,0,0,1,2.46-.71,6,6,0,0,1,1.91.29,10.9,10.9,0,0,1,1.06.4q.69,2.38,1.48,5t1.59,5.17c.53,1.69,1.05,3.32,1.56,4.87s1,2.94,1.41,4.13c.92-2.43,1.86-5.1,2.83-8s1.86-5.8,2.68-8.69a5.58,5.58,0,0,1,1.24-2.41,3.2,3.2,0,0,1,2.36-.77,5.08,5.08,0,0,1,2.33.47,7.63,7.63,0,0,1,1,.59q-.44,1.74-1.48,4.82c-.71,2.05-1.51,4.26-2.39,6.65s-1.82,4.82-2.81,7.31-1.92,4.74-2.8,6.75h-6.26c-.28-.74-.66-1.82-1.13-3.25s-1-3-1.57-4.69-1.12-3.44-1.67-5.22-1.05-3.42-1.51-4.9c-.46,1.48-1,3.12-1.51,4.9s-1.09,3.52-1.64,5.22-1,3.26-1.51,4.69-.83,2.51-1.11,3.25Z"></path>
                </svg>
            </span> 
      
            <a class="__pt-info-link hidden">More info</a>
          </p>
                            </div>
                        </div>`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full m-auto lg:pt-36 lg:pb-20">
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:max-w-6xl lg:p-16 p-8 lg:rounded-3xl m-auto bg-paytomorrow relative">
              <div className="col-span-2">
                <h5 className="lg:text-3xl text-xl tracking-wider font-bold font-bebas italic pb-1 text-white">
                  Check your rate now without affecting your credit!
                </h5>
                <form className="space-y-5" action="#" method="POST">
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-roboto font-medium tracking-wide text-white"
                      >
                        First Name *
                      </label>
                      <div className="mt-1">
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.currentTarget.value)}
                          type="text"
                          className="appearance-none block w-full px-3 py-2 text-white sm:text-sm h-12 rounded-md bg-transparent border border-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-roboto font-medium tracking-wide text-white"
                      >
                        Last Name *
                      </label>
                      <div className="mt-1">
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.currentTarget.value)}
                          type="text"
                          autoComplete="name"
                          className="appearance-none block w-full px-3 py-2 text-white sm:text-sm h-12 rounded-md bg-transparent border border-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-roboto font-medium tracking-wide text-white"
                      >
                        Email *
                      </label>
                      <div className="mt-1">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          type="email"
                          autoComplete="name"
                          className="appearance-none block w-full px-3 py-2 text-white sm:text-sm h-12 rounded-md bg-transparent border border-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-roboto font-medium tracking-wide text-white"
                      >
                        Phone Number *
                      </label>
                      <div className="mt-1">
                        <input
                          value={cellPhone}
                          onChange={(e) => setCellPhone(e.currentTarget.value)}
                          type="tel"
                          autoComplete="name"
                          className="appearance-none block w-full px-3 py-2 text-white sm:text-sm h-12 rounded-md bg-transparent border border-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    {!loading && (
                      <button
                        type="button"
                        onClick={() => checkForm()}
                        className="px-5 py-3 rounded-md text-sm font-medium text-paytomorrow bg-white hover:bg-paytomorrow border hover:border-white hover:text-white duration-200"
                      >
                        Get pre-approval
                      </button>
                    )}
                    {loading && (
                      <button
                        type="button"
                        className="px-5 py-3 rounded-md text-sm font-medium text-paytomorrow bg-white hover:bg-paytomorrow border hover:border-white hover:text-white duration-200"
                      >
                        Processing
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className="lg:z-30 lg:flex hidden flex-wrap right-0 lg:-top-36 top-1 absolute">
                <Image
                  src="/paytomorrow/mobile.png"
                  className="object-contain m-auto lg:w-96 w-32"
                  width={384}
                  height={532}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />
              </div>
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-5xl m-auto lg:py-20 py-10">
              <div className="w-full text-center">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider pb-4">
                  FAQs
                </h4>
              </div>
              <div className="lg:px-14 px-7 lg:pb-20 pb-5 justify-center items-center m-auto">
                <div className="pb-2 border-b">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    Who is PayTomorrow?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    PayTomorrow offers financing for customers of all credit
                    types. We’ve partnered with PayTomorrow to allow more of our
                    customers the opportunity to get approved for financing.
                  </p>
                </div>
                <div className="pb-2 pt-2 border-b">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    How does the application process work?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Simply select PayTomorrow as a payment option in the
                    shopping cart.
                  </p>
                </div>
                <div className="pb-2 pt-2">
                  <h5 className="text-black lg:text-lg text-base font-bold font-roboto italic">
                    Will applying through PayTomorrow affect my credit score?
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    No. Checking out with PayTomorrow will not result in a hard
                    inquiry to your TransUnion report as we use a soft credit
                    pull
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
