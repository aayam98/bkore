import SledCol from '@components/ui/bodykore/Sections/SledCol';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { Subscription } from '@components/ui/bodykore/Subscription';
import ReactPlayer from 'react-player';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};

interface SmartSledParams {
  header: HeaderData;
}

const SmartSled = ({ header }: SmartSledParams) => {
  return (
    <>
      <SeoHeader seo={seo.home} />
      <div>
        <main className="w-full pb-2">
          <div className="relative flex justify-center">
            <ReactPlayer
              style={{ objectFit: 'cover' }}
              className="lg:h-full h-screen w-full videoBox"
              url={
                'https://cms.bodykore.com/uploads/Hero_Video_for_Sled_8227bea6be.mp4'
              }
              playing={true}
              loop={true}
              controls={false}
              volume={0}
              width="100%"
              height="700px"
              playsInline={true}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
              onPlay={() => {}}
            />

            <div className="max-w-7xl m-auto flex justify-start items-center z-50 absolute lg:bottom-1/3 lg:mt-10">
              <div className="lg:w-3/6 sm:w-full lg:px-0 sm:px-10 lg:mt-16 relative lg:top-48 top-24">
                <h6 className="text-white text-sm lg:text-lg font-roboto font-thin tracking-tight uppercase text-left lg:px-0 px-5 pb-5">
                  Introducing the
                  <span className=" text-white text-sm lg:text-lg font-roboto tracking-tight font-bold pl-1">
                    BodyKore Smart Sled *
                  </span>
                </h6>
                <img
                  className="pb-4 lg:px-0 px-5"
                  src="/Sled/bigtext.svg"
                  alt=""
                  style={{
                    width: '67%',
                  }}
                />
                <p className="font-roboto font-thin text-lg lg:text-lg tracking-tight text-white leading-relaxed text-left pb-5 lg:pb-10 lg:px-0 px-5">
                  This revolutionary multi-planar sled with smart <br></br>
                  technology takes training to unbeatable heights.
                </p>
                <p className="font-roboto font-thin text-white text-lg lg:text-lg leading-relaxed text-left pt-5 lg:px-0 px-6">
                  Sign Up for Product Release Info and First Dibs
                </p>
                <div className="lg:px-0 px-5">
                  <Subscription />
                </div>
                <p className="font-roboto text-xs lg:text-xs font-thin text-white tracking-wide pt-28 lg:px-0 px-5">
                  *Product depicted in video is prototype model. Finished
                  product rendering below.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-black py-8">
            <div className="text-center font-bebas text-3xl lg:text-5xl font-normal tracking-wide italic m-auto lg:px-0 px-5">
              <h3 className="text-white pr-2">
                Train smarter, not harder – COMING SOON!
              </h3>
            </div>
          </div>

          <div className="pb-10 px-8">
            <SledCol
              title1="BODYKORE SMART SLED"
              title2="For the High-Performance Athlete"
              text="The BodyKore Smart Sled was created to take athletes to a whole new level of training. With its advanced technology and futuristic look, one coach has already dubbed it the “Tesla of Fitness.” Here are some highlights of this dynamic training tool."
              texthead="DIGITIZED RESISTANCE"
              textpara="Convenience is king. The BodyKore Smart Sled uses digitized resistance (dual magnetic motors) to adjust workout intensity with 3x more resistance than any other sled on the market (without any weights)."
              texthead1="MULTI-PLANAR MOVEMENTS"
              textpara1="Other sleds move in one direction. Not this one. Each wheel can be adjusted to its own resistance to allow athletes to train at a more competitive level."
              texthead2="LIVE DATA FEEDBACK"
              textpara2="Unlike other sleds, the BodyKore Smart Sled provides performance feedback in real time. Athletes and coaches can monitor progress, track stats and make necessary adjustments to reach goals."
              texthead3="APP CONTROLLED"
              textpara3="The BodyKore Smart Sled is controlled through a proprietary app using the Bluetooth feature to digitally reduce or intensify resistance during a workout. This makes training far more convenient, faster and efficient (especially when training in pairs)."
              texthead4="OTHER PRODUCT FEATURES"
              textpara4={[
                'Electrostatic Paint',
                'All Terrain Wheels for Indoor/Outdoor Use',
                'Dual Weight Pegs for Up To 1000 lbs Additional Resistance',
                'Ergonomic Handles',
                'Four Modes',
              ]}
              img="/Sled/sledside1.jpg"
            />
          </div>
          <div className="bg-black py-16 text-white">
            <div className="flex flex-col justify-center items-center text-center font-bebas text-2xl lg:text-5xl font-normal tracking-wide italic m-auto px-4 lg:px-0">
              <h3 className="pr-2 lg:w-2/4 w-full text-center leading-tight">
                See what coaches, trainers and athletes are saying about the
                BodyKore Smart Sled
              </h3>
              <p className="font-roboto font-thin not-italic text-white text-sm lg:text-sm leading-normal text-center">
                From real individuals who have tested the BodyKore Smart Sled
                prototype.
              </p>
            </div>
            <div className="my-10 px-10 lg:px-6 mx-auto max-w-7xl">
              <section className="text-gray-800 text-center">
                <div className="grid md:grid-cols-3 gap-x-3 lg:gap-x-6">
                  <div className="bg-white p-10 mb-5 lg:mb-0">
                    <p className="font-bebas leading-tight">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="quote-left"
                        className="w-6 pr-2 inline-block"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                        ></path>
                      </svg>
                    </p>
                    <p className="mb-4 h-28">
                      When this one comes out, it’s going to be the number one
                      product. ... You have something here that is going to
                      revolutionize the whole sled market.
                    </p>
                    <div className="flex justify-center mb-2">
                      <Image
                        src="/Sled/corey.png"
                        className="rounded-full shadow-lg w-16"
                        width={64}
                        height={64}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                    </div>
                    <h5 className="text-xl tracking-wide font-bebas">
                      Coach Corey Beasley
                    </h5>
                  </div>
                  <div className="bg-white p-10 mb-5 lg:mb-0">
                    <p className="font-bebas leading-tight">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="quote-left"
                        className="w-6 pr-2 inline-block"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                        ></path>
                      </svg>
                    </p>
                    <p className="mb-4 h-28">
                      At first glance, it’s just super built. You can tell. The
                      change of direction and having to react ... adds an
                      element of complexity that I haven’t seen on other sleds.
                    </p>
                    <div className="flex justify-center mb-2">
                      <Image
                        src="/Sled/danny.png"
                        className="rounded-full shadow-lg w-16"
                        width={64}
                        height={64}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                    </div>
                    <h5 className="text-xl tracking-wide font-bebas">
                      Trainer Danny Osle
                    </h5>
                  </div>
                  <div className="bg-white p-10 mb-5 lg:mb-0">
                    <p className="font-bebas leading-tight">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="quote-left"
                        className="w-6 pr-2 inline-block"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                        ></path>
                      </svg>
                    </p>
                    <p className="mb-4 h-28">
                      It’s different! I felt like I was trying to control a bull
                      or something!
                    </p>
                    <div className="flex justify-center mb-2">
                      <Image
                        src="/Sled/mma.png"
                        className="rounded-full shadow-lg w-16"
                        width={64}
                        height={64}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                    </div>
                    <h5 className="text-xl tracking-wide font-bebas">
                      MMA fighter
                    </h5>
                  </div>
                </div>
              </section>
            </div>
            <div className="flex flex-col justify-center items-center text-center font-bebas text-2xl lg:text-5xl font-normal tracking-wide italic m-auto px-4 lg:px-0">
              <h3 className="pr-2 lg:w-2/4 w-full text-center leading-tight">
                Enter your Email to get notified of the release.
              </h3>
              <p className="font-roboto py-5 font-thin not-italic text-white text-sm lg:text-sm leading-normal text-center">
                Yes! Sign Me Up for More Info, Updates and To Preorder the
                BodyKore Smart Sled.
              </p>
            </div>
            <div className="m-auto max-w-7xl justify-center items-center flex">
              <Subscription />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SmartSled;
