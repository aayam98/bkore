import Link from "next/link";

export default function BreadFinance() {
  return (
    <>
        <div>
        <main className="w-full ">
          {/* Main banner with solid image */}
          <div className="flex h-96  pt-72 pb-10 items-center justify-center bg-breadpay">
            <div className="text-center text-mysynchronySec max-w-7xl m-auto ">
              {/*Title*/}
              <div className="flex flex-wrap justify-center items-center">
                <h4
                  className={`lg:text-6xl text-4xl tracking-wider italic font-bebas font-bold`}
                >
                  Bread Pay
                </h4>
              </div>
            </div>
          </div>
          {/* Main banner with solid image */}

          <div className="grid grid-cols-5 max-w-7xl gap-x-10 lg:px-14 px-10 lg:py-20 py-10 justify-center items-center m-auto">
            <div className="text-left py-10 col-span-3">
              <h5 className="text-black text-3xl tracking-wider font-bold font-bebas italic pb-2">
                Financing Available
              </h5>
             
              <h5 className="text-black-373933 tracking-wide font-roboto text-lg px-18">
                Clear, transparent terms. Fair rates. No prepayment penalties.
              </h5>
              <p className="text-black-373933 tracking-wide font-roboto lg:text-lg text-base px-18 pt-1">
                Finance your gym equipment your way with bread pay. 
              </p>
            
            </div>
            <div className="col-span-2 m-auto w-full">
              <img src="/bread/breadpay.svg" alt="" className="w-96 m-auto" />
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-7xl m-auto lg:py-20 py-10 lg:px-0 px-10">
              <div className="w-full text-center pt-10">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider">
                  Pay Over Time
                </h4>
                <p className="text-gray-700 font-roboto italic text-lg tracking-wider pb-4">
                  Through Bread Pay™, we offer easy and affordable financing
                  options so you can pay for your purchase over time.
                </p>
              </div>
              <div className="px-14 pt-2 pb-10 justify-center items-center m-auto">
                <div className="grid grid-cols-3 gap-10 justify-center text-center">
                  <div>
                    <img
                      src="/bread/affordable-monthly-plans.svg"
                      className="object-contain m-auto"
                    />
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic py-2">
                      Affordable Monthly Plans
                    </h5>

                    <p className="text-black text-base tracking-wider font-roboto pb-2">
                      Buy now and pay for your purchase over time at competitive
                      interest rates.
                    </p>
                  </div>

                  <div>
                    <img
                      src="/bread/no-prepayment-penalties.svg"
                      className="object-contain m-auto"
                    />
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic py-2">
                      No Prepayment Penalties
                    </h5>

                    <p className="text-black text-base tracking-wider font-roboto pb-2">
                      Pay for your purchase with monthly payments and prepay at
                      any time without penalty.
                    </p>
                  </div>
                  <div>
                    <img
                      src="/bread/easy-application.svg"
                      className="object-contain m-auto"
                    />
                    <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic py-2">
                      Easy Application
                    </h5>

                    <p className="text-black text-base tracking-wider font-roboto pb-2">
                      Get a decision in seconds with no obligation to buy.
                      Checking your rate won't affect your credit score. Your
                      data is safe and encrypted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full text-center pb-10">
                <Link href="https://payments.breadfinancial.com/help-center/">
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium text-white bg-bread-59bec9 hover:bg-mysynchronySec border border-bread-59bec9 hover:border-mysynchronySec hover:text-white duration-200"
                  >
                    LEARN MORE
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full m-auto py-20">
            <div className="grid max-w-7xl gap-x-10 px-14 m-auto">
              <h5 className="text-black text-3xl tracking-wider font-bold font-bebas italic py-2 text-center">
                Check your rate in seconds without leaving our site
              </h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `
         
  <div class="bread-rate-box bread-section bread-style max-w-5xl m-auto text-center">
    <div class="bread-content-inner bread-check-your-rate flex justify-center">
    
      <div
      class="bread-promo one w-64 px-10 rounded-md text-sm font-medium text-white bg-bread-59bec9 hover:bg-mysynchronySec border border-bread-59bec9 hover:border-mysynchronySec hover:text-white duration-200"
      data-custom="true"
      data-button-location="financing"
    >
      GET YOUR RATE
    </div>
    </div>
  </div>
        
         `,
                }}
              />
            </div>
            <div className="lg:w-1/2 w-full text-center pt-5 lg:pb-10 m-auto">
              <h4 className="font-roboto italic text-sm font-normal tracking-wider pb-4">
                Subject to approval of credit application. Bread Pay™ loans are
                made by Comenity Capital Bank, a Bread Financial™ company.
              </h4>
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-5xl m-auto">
              <div className="w-full text-center py-20">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider">
                  QUESTIONS?
                </h4>
                <p className="text-gray-700 font-roboto italic text-lg tracking-wider pb-4">
                  Visit the Bread Pay help center.
                </p>
                <Link href="https://payments.breadfinancial.com/help-center/">
                  <button
                    type="submit"
                    data-custom="true"
                    data-button-location="financing"
                    className="w-64 m-auto px-10 py-4 rounded-md text-sm font-medium text-mysynchronySec border border-mysynchronySec"
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
}
