import Link from "next/link";

export default function SynchronyFinance() {
  return (
    <>
          <div>
        <main className="w-full">
          {/* Main banner with solid image */}
          <div className="flex h-96   pt-72 pb-10  items-center justify-center bg-mysynchrony">
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
            <div className="text-left py-10 col-span-3">
              <h5 className="text-black text-3xl tracking-wider font-bold font-bebas italic pb-2">
                APPLY TODAY, TAKE TIME TO PAY
              </h5>
              <h5 className="text-black-373933 tracking-wide font-roboto text-lg px-18">
                With promotional financing from BODYKORE INC, major purchases
                don’t have to wait.* Get what you want now and pay over time.
              </h5>
            </div>
            <div className="col-span-2 m-auto w-full">
              <img
                src="/synchrony/synchrony.svg"
                alt=""
                className="w-96 m-auto"
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
              <div className="px-14 pt-2 pb-10 justify-center items-center m-auto">
                <div className="grid grid-cols-3 gap-10 justify-center items-center align-middle text-center">
                  <div>
                    <div className="m-auto flex flex-wrap justify-center">
                      <img
                        src="/synchrony/applynow.svg"
                        className="object-contain m-auto w-28 pb-3"
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
                      <img
                        src="/synchrony/getdesc.svg"
                        className="object-contain m-auto w-28 pb-3"
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
                      <img
                        src="/synchrony/startshopping.svg"
                        className="object-contain m-auto w-28 pb-3"
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
              <div className="w-full text-center pb-10 flex justify-center gap-3">
                <Link href="https://etail.mysynchrony.com/eapply/eapply.action">
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium text-black-1c2023 bg-mysynchrony hover:bg-white border border-mysynchronySec hover:border-mysynchronySec hover:text-mysynchronySec duration-200"
                  >
                    SEE IF YOU PREQUALIFY
                  </button>
                </Link>
                <Link href="https://etail.mysynchrony.com/eapply/eapply.action">
                  <button
                    type="submit"
                    className="w-64 px-10 py-4 rounded-md text-sm font-medium text-mysynchronySec bg-white hover:bg-mysynchronySec border border-mysynchronySec hover:border-paytomorrow hover:text-mysynchrony duration-200"
                  >
                    APPLY NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className=" bg-white">
            <div className="max-w-5xl m-auto">
              <div className="w-full text-center py-20">
                <h4 className="font-bebas italic text-3xl font-bold tracking-wider">
                  HERE TO HELP
                </h4>
                <p className="text-gray-700 font-roboto italic text-lg tracking-wider pb-4">
                  Have a question about your account?
                </p>
                <Link href="https://etail.mysynchrony.com/eapply/eapply.action">
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
}
