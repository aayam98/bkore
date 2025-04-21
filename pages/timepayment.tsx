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
  return (
    <>
      <SeoHeader seo={seo.finance} />
      <div>
        <main className="w-full">
          {/* Main banner with solid image */}
          <div className="flex lg:h-72 h-40 items-center justify-center bg-timepayment">
            <div className="text-center text-white max-w-7xl m-auto">
              {/*Title*/}
              <div className="flex flex-wrap justify-center items-center">
                <h4
                  className={`lg:text-6xl text-4xl tracking-wider italic font-bebas font-bold`}
                >
                  Time Payment
                </h4>
              </div>
            </div>
          </div>
          {/* Main banner with solid image */}
          <div className="grid grid-cols-5 max-w-7xl gap-x-10 lg:px-14 px-10 lg:py-20 py-10 justify-center items-center m-auto">
            <div className="text-left py-10 lg:col-span-3 col-span-5 lg:order-1 order-last">
              <h5 className="text-black lg:text-3xl text-2xl tracking-wider font-bold font-bebas italic pb-2">
                Finance Your Equipment Needs
              </h5>
              <h5 className="text-black-373933 tracking-wide font-roboto text-lg px-18">
                Whether you’re looking to purchase equipment for commercial or
                home use, a monthly payment finance program is often the best
                way to preserve your capital. That’s why we’ve partnered with
                TimePayment to offer a variety of affordable leasing options.
              </h5>
              <p className="text-black-373933 tracking-wide font-roboto lg:text-lg text-base px-18 pt-1">
                Time Payment offers a 12 months Same As Cash promotion that
                equates to 0% financing if paid off within the first year!
              </p>
              <div className="bg-timepayment text-white px-6 py-3 mt-2 rounded-md font-roboto text-lg w-36">
                <Link
                  href="https://apply.timepayment.com/about-financing/?dealercode=0612A&apptype=B,C"
                  target="_blank" rel="noreferrer"
                >
                  Apply Now
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 col-span-5 m-auto w-full lg:order-last order-1">
              <Image
                src="https://timepayment.com/wp-content/uploads/2022/10/logo.png"
                alt=""
                className="lg:w-96 w-52 lg:m-auto"
                width={384}
                height={53}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-7xl m-auto lg:pb-0 pb-10">
              <div className="w-full text-center pt-10 px-5">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider pb-4">
                  Fast & Easy
                  <p className="font-roboto text-lg text-gray-600 tracking-wider">
                    Apply in Minutes. Instant Credit Decisions.
                  </p>
                </h4>
              </div>
              <div className="lg:px-14 px-0 lg:pt-2 pt-0 lg:pb-10 pb-0 justify-center items-center m-auto">
                <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-5 justify-center text-center px-5">
                  <div className="p-5 border rounded-xl border-gray-300 hover:shadow-lg">
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-2">
                      Step 1: Apply Online. Instant Credit Decisions.
                    </h5>
                    <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                      Submit your application for equipment lease financing
                      through your equipment seller. You will receive a
                      confirmation that your application is being processed
                      within seconds of submittal. Typically, we are able to
                      provide a definitive credit decision instantly, however
                      sometimes there is additional research required which may
                      take up to 4 business hours. In that case, we will notify
                      you of your credit decision via email.
                    </p>
                  </div>
                  <div className="p-5 border rounded-xl border-gray-300 hover:shadow-lg">
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-2">
                      Step 2: TimePayment Emails Lease Documents.
                    </h5>

                    <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                      Once you are approved, a representative will be contacting
                      you to discuss your program options – ie: the number of
                      months you’d like to take to repay, as well as the type of
                      agreement you’ll be signing. With some financial programs
                      offered by TimePayment, the equipment becomes yours when
                      you complete all payments (Lease-To-Own). In other
                      programs, the equipment can be returned at the end of the
                      contract, or at your option, it can be purchased after all
                      lease payments have been made (Fair Market Value). Be sure
                      to discuss available options with your TimePayment
                      representative.
                    </p>
                  </div>

                  <div className="p-5 border rounded-xl border-gray-300 hover:shadow-lg">
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-2">
                      Step 3: Submit Signed Documents via Email or Fax.
                    </h5>

                    <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                      Once you have selected the program and term that works
                      best for you, you will receive an email containing a link
                      to the documentation for your equipment lease. Click on
                      the link to view and execute the lease documents. You can
                      easily sign these documents electronically using any
                      desktop, tablet or smartphone device; or you can print the
                      documents for manual execution.
                    </p>
                  </div>
                  <div className="p-5 border rounded-xl border-gray-300 hover:shadow-lg">
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-2">
                      Step 4: We'll Call to Verify You Got Your Equipment.
                    </h5>

                    <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                      Following completion of documentation, you’ll need to
                      communicate with your selected vendor to arrange for
                      delivery of the equipment. That’s it! Enjoy the new
                      Equipment!
                    </p>
                  </div>
                  <div className="p-5 border rounded-xl border-gray-300 hover:shadow-lg">
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-2">
                      Step 5: Make Payments & Manage Account Online.
                    </h5>

                    <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                      Create your profile on TimePayment’s MyAccount Manager™ to
                      manage your account online, including; making payments,
                      checking your statements, requesting upgrades, and more.
                      Visit{' '}
                      <u>
                        <Link href={'https://myaccount.timepayment.com'}>
                          https://myaccount.timepayment.com
                        </Link>
                      </u>{' '}
                      and click the green “Create Account” arrow to get started.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full m-auto">
            <div className="grid lg:grid-cols-4 grid-cols-1 max-w-7xl gap-10 lg:px-14 px-7 lg:py-20 py-10 m-auto">
              <div className="col-span-2">
                <h5 className="text-black text-2xl tracking-wider font-bold font-bebas italic pb-1">
                  Advantages of Leasing Your Equipment Purchase:
                </h5>
                <h5 className="text-black-373933 tracking-wide font-roboto text-base px-18">
                  Do you need to purchase new or used equipment for your
                  business but don't have the available cash or credit you need?
                  If so, TimePayment can help. There are many benefits of
                  financing your equipment purchase through a lease with
                  TimePayment:
                </h5>
                <div className="bg-timepayment text-white px-6 py-3 mt-2 rounded-md font-roboto text-lg w-36">
                  <Link
                    href="https://apply.timepayment.com/about-financing/?dealercode=0612A&apptype=B,C"
                    target="_blank" rel="noreferrer"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="col-span-2">
                <div className="py-2">
                  <h5 className="text-black text-lg font-bold font-roboto">
                    ✓ Fast Credit Decisions
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Apply online anytime. Receive a credit decision for the
                    maximum amount you can finance in seconds. Start-ups and
                    challenged credits supported.
                  </p>
                </div>
                <div className="py-2">
                  <h5 className="text-black text-lg font-bold font-roboto">
                    ✓ Minimal Upfront Cost
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Our standard lease program only requires one advance payment
                    and the documentation fee prior to the start of the lease.
                  </p>
                </div>
                <div className="py-2">
                  <h5 className="text-black text-lg font-bold font-roboto">
                    ✓ Preserve Existing Bank & Credit Card Lines
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Leasing with TimePayment lets you acquire the equipment you
                    need affordably, while preserving your other sources of
                    credit.
                  </p>
                </div>
                <div className="py-2">
                  <h5 className="text-black text-lg font-bold font-roboto">
                    ✓ Affordable, Fixed Monthly Payments
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Know your monthly payment and term in advance so you can
                    handle your monthly cash flow more easily.
                  </p>
                </div>
                <div className="py-2">
                  <h5 className="text-black text-lg font-bold font-roboto">
                    ✓ Tax Advantages
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Lease payments may be fully tax-deductible as an operational
                    expense.
                  </p>
                </div>
                <div className="py-2">
                  <h5 className="text-black text-lg font-bold font-roboto">
                    ✓ Protect Against Obsolete Technology
                  </h5>
                  <p className="text-black-373933 tracking-wide font-roboto text-base px-18">
                    Plan for a technology upgrade with the right lease or rental
                    term. Never get stuck with obsolete equipment again.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-5xl m-auto">
              <div className="w-full text-center lg:py-20 py-10">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider">
                  Questions?
                </h4>
                <p className="text-gray-700 font-roboto italic text-lg tracking-wider px-6">
                  Contact our Client Services Team of Lessee Sales Team for
                  assistance:
                </p>
                <Link href="https://timepayment.com/contact/">
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium text-white bg-timepayment hover:bg-white border border-timepayment hover:border-timepayment hover:text-timepayment duration-200"
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
