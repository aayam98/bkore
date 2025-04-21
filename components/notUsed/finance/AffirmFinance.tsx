import Link from "next/link";

export default function AffirmFinance() {
  return (
    <>
       <div>
        <main className="w-full">
          {/* Main banner with solid image */}
          <div className="flex h-96  pt-72 pb-10  items-center justify-center bg-affirm">
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
            <div className="text-left py-10 col-span-3">
              <h5 className="text-black text-3xl tracking-wider font-bold font-bebas italic pb-2">
                Make 4 interest-free payments with Affirm
              </h5>
              <h5 className="text-black-373933 tracking-wide font-roboto text-lg px-18">
                When inspiration strikes, say yes with confidence—knowing you’ll
                never pay a penny more than your purchase price.
              </h5>
              <p className="text-black-373933 tracking-wide font-roboto lg:text-lg text-base px-18 pt-1">
                Apply with Affirm to see if you qualify for their 0% financing
                for up to 36 months!
              </p>
            </div>
            <div className="col-span-2 m-auto w-full">
              <img
                src="/affirm/affirmlogo.svg"
                alt=""
                className="w-96 m-auto"
              />
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-7xl m-auto lg:py-20 py-10 lg:px-0 px-10">
              <div className="w-full text-center pt-10">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider pb-4">
                  Buying with Affirm is simple.
                </h4>
              </div>
              <div className="px-14 pt-2 pb-10 justify-center items-center m-auto">
                <div className="grid grid-cols-3 gap-10 justify-center text-center">
                  <div>
                    <div className="">
                      <h5 className="text-black text-xl tracking-wider font-bold font-bebas italic pb-8">
                        1. Fill your cart
                      </h5>
                      <img
                        src="/affirm/step1.jpg"
                        className="object-contain w-60 m-auto"
                      />
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
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
                      <img
                        src="/affirm/step2.jpg"
                        className="object-contain w-60 m-auto"
                      />
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
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
                      <img
                        src="/affirm/step3.jpg"
                        className="object-contain w-60 m-auto"
                      />
                      <p className="text-black text-base tracking-wider font-roboto pb-2">
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
                  <img
                    className="object-contain w-60 m-auto"
                    src="/affirm/buynow.webp"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full m-auto py-20">
            <div className="grid max-w-7xl gap-x-10 px-14 pt-20 m-auto">
              <img src="/affirm/banner.jpg" alt="" className="w-full" />
            </div>
            <div className="lg:w-1/2 w-full text-center pt-5 lg:pb-10 m-auto">
              <h4 className="font-roboto italic text-sm font-normal tracking-wider pb-4">
                Payment options are offered by Affirm and are subject to an
                eligibility check. Options depend on your purchase amount, and a
                down payment may be required. CA residents: Loans by Affirm Loan
                Services, LLC are made or arranged pursuant to a California
                Finance Lender license. For licenses and disclosures, see
                affirm.com/licenses.
              </h4>
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="max-w-5xl m-auto py-20">
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
}
