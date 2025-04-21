import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import ReactPlayer from 'react-player';
import { getProduct, Product } from 'services/shopify/storefront';
import SledProductCard from '@components/ui/bodykore/Cards/SledPrice';
import SliderCard from '@components/ui/bodykore/SliderCard';
import AddToCartButton from '@components/ui/bodykore/Cards/AddToCartButton';
import SeoHeader from '@components/seoHeader';
import seo from '../public/SEO/en.json';
import { ProductStrapi, getStrapiProduct } from 'services/strapi';
import Image from 'next/image';
import styled from 'styled-components';
import { mediaUrl } from '@utils/baseUrls';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const product = await getProduct('smart-sled-pro');
  const productStrapi = await getStrapiProduct('smart-sled-pro');

  return {
    props: { header, product, productStrapi },
    // revalidate: 30 * 60,
  };
};

interface SmartSledParams {
  header: HeaderData;
  product: Product;
  productStrapi: ProductStrapi;
}
const SmartSled = ({ header, product, productStrapi }: SmartSledParams) => {
  const [active, setActive] = useState(-1);
  function toggleAccordion(index: number) {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  }
  //for faqs
  const mapFaqs = () => {
    return productStrapi.attributes.faqs.data.map((item) => ({
      question: item.attributes.question,
      answer: item.attributes.answer,
    }));
  };
  const [toggle, setToggle] = React.useState('');
  const [toggleAccording, setToggleAccording] = React.useState([
    {
      id: 1,
      title: 'OVERVIEW',
      description: `Intensify training and crush fitness goals with the advanced
                    Smart Sled Pro by BodyKore. This innovative take on the
                    standard push-pull sled challenges athletes to engage every
                    muscle to build explosive all-over power, strength, agility
                    and endurance. With its <u><b>patented</b></u> app-controlled features*,
                    live data feedback, multi-planar movement capabilities,
                    multiple modes of training, motorized resistance – up to
                    3x’s more than any other sled on the market! – the Smart
                    Sled Pro is intelligently designed to help athletes and
                    fitness enthusiasts train smarter and outperform those using
                    yesterday’s sled.
                    <br></br>
                    *NOTE: The Mach Fitness Lab's app for the Smart Sled Pro is
                    available in beta mode for Android users now. Apple Store
                    version will be released mid-2023. Fully functioning app
                    capabilities will roll out later this year.`,
    },
    {
      id: 2,
      title: 'SPECIFICATIONS',
      description: `
      <style>
* {
  box-sizing: border-box;
}

.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  text-align: left;
}

.flex-item-left {
  padding: 10px 0 0;
  flex: 50%;
}

.flex-item-right {
  padding: 10px 0 0;
  flex: 50%;
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
</style>

<div class="flex-container">
  <div class="flex-item-left">
  <h3 style="font-size: 18px;padding:5px 0">Resistance</h3>
  <li>Level 1- 150lbs</li>
  <li>Level 2- 300lbs</li>
  <li>Level 3- 450lbs</li>
  <li>Level 4- 600lbs</li>
  <li>Level 5- 700lbs</li>
  </div>
  <div class="flex-item-right">
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Tires</h3>
  <li>Rear Tires- 12.5”</li>
  <li>Caster Wheels- 8”</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Weight</h3>
  <li>250lbs</li>
  </div>
</div>

<div class="flex-container">
  <div class="flex-item-left">
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Dimensions</h3>
  <li>45” L x 40” H x 31 W”</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Additional Weight Capacity</h3>
  <li>1000lbs</li>
 
  </div>
  <div class="flex-item-right">
  
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Warranty</h3>
  <li>Frame: 10 Years</li>
  <li>Parts: 5 Years</li>
  </div>
</div>
      `,
    },
    {
      id: 2,
      title: 'DOWNLOAD',
      description: `
      <a href="https://cms.bodykore.com/uploads/Smart_Sled_229646fff2.pdf" target="_blank" rel="noreferrer" style="
    background: #bc2026;
    padding: 15px;
    border-radius: 10px;
    margin-top: 25px;
    display: inline-block;
    text-align: center;
">Download Brochure</a>
      `,
    },
    {
      id: 3,
      title: '3D Viewer',
      description: `
     
      `,
    },
  ]);

  const [slider1, setSlider1] = React.useState<any>([
    {
      id: '1',
      image: '/sledproduct/SledPro1.webp',
    },
    {
      id: '2',
      image: '/sledproduct/SledPro2.webp',
    },
    {
      id: '3',
      image: '/sledproduct/SledPro3.webp',
    },
    {
      id: '4',
      image: '/sledproduct/SledPro4.webp',
    },
    {
      id: '5',
      image: '/sledproduct/SledPro5.webp',
    },
    {
      id: '6',
      image: '/sledproduct/SledPro6.webp',
    },
    {
      id: '7',
      image: '/sledproduct/SledPro7.webp',
    },
    {
      id: '8',
      image: '/sledproduct/SledPro8.webp',
    },
    {
      id: '9',
      image: '/sledproduct/SledPro9.webp',
    },
    {
      id: '10',
      image: '/sledproduct/SledPro10.webp',
    },
    {
      id: '11',
      image: '/sledproduct/SledPro11.webp',
    },
    {
      id: '12',
      image: '/sledproduct/SledPro14.webp',
    },
    {
      id: '13',
      image: '/sledproduct/SledPro13.webp',
    },
    {
      id: '14',
      image: '/sledproduct/SledPro14.webp',
    },
  ]);

  const [slider2, setSlider2] = React.useState<any>([
    {
      id: '1',
      title: 'Obstacle course',
      image: '/sledproduct/ObstacleCourse.jpg',
    },
    {
      id: '2',
      title: 'Group training',
      image: '/sledproduct/GroupTraining.jpg',
    },
    {
      id: '3',
      title: 'Hill training',
      image: '/sledproduct/HillTraining.jpg',
    },
    {
      id: '4',
      title: 'Core workouts',
      image: '/sledproduct/herophoto.webp',
    },
    {
      id: '5',
      title: 'Upper body',
      image: '/sledproduct/upperbody.jpg',
    },
    {
      id: '6',
      title: 'Rope pulls',
      image: '/sledproduct/RopePull.jpg',
    },
    {
      id: '7',
      title: 'TRX compatible',
      image: '/sledproduct/trxcompatibility.jpg',
    },
  ]);

  const [slider3, setSlider3] = React.useState<any>([
    {
      id: '1',
      title: 'Brendan Mahonn',
      job: '',
      description:
        'Personally, I wish I had something like this when I was growing up. My speed, my athleticism, it would have helped. ... The sled’s old school. This is new school. ',
      image: '/sledproduct/interview/BrendanMahonn.png',
    },
    {
      id: '2',
      title: 'Wissam Nabulsi',
      job: 'Track Athlete',
      description:
        'It’s nothing like I’ve ever tried before. This one felt like it was fighting me. Especially when it started twisting and turning and having to try to keep it straight. ',
      image: '/sledproduct/interview/wissamNabulsi.png',
    },
    {
      id: '3',
      title: 'Abraham',
      job: '',
      description:
        'That s** f** me up! I thought it was going to be easy because there was no weight on it. At 50%, it was barely moving. ',
      image: '/sledproduct/interview/Abraham.png',
    },
    {
      id: '4',
      title: 'Lorene',
      job: '',
      description:
        'It’s very different. It takes a lot of core engagement to get it done. I felt the difference. ',
      image: '/sledproduct/interview/Lorene.png',
    },
    {
      id: '5',
      title: 'Shanay',
      job: 'Trainer',
      description:
        'It is amazing. It really gives you a run for your money. And I’m all about that. I’m all about a challenge. And it challenged me for sure.',
      image: '/sledproduct/interview/Shay.png',
    },
    {
      id: '6',
      title: 'Ashley / Kiwi',
      job: '',
      description:
        'I wasn’t expecting it to be that heavy and push against us. On the concrete or grass, it would definitely work your body out and be super effective. ',
      image: '/sledproduct/interview/Ashley.png',
      image2: '/sledproduct/interview/Kiwi.png',
    },

    {
      id: '7',
      title: 'Carson',
      job: '',
      description:
        'I’m used to a lot of power sleds. I played football at the collegiate level, but this one was hard to push, especially when it started moving. It really engaged my core. ',
      image: '/sledproduct/interview/Carson.png',
    },
    {
      id: '8',
      title: 'Ricky',
      job: '',
      description:
        'I could tell it increased in resistance as I kept going and the change in direction really engaged your core and whole body.',
      image: '/sledproduct/interview/Ricky.png',
    },
  ]);

  const toggleAction = (data: string) => {
    if (toggle != data) {
      setToggle(data);
    } else {
      setToggle('');
    }
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SeoHeader seo={seo.smartsledpro} />
      <div>
        <div className="bg-sled-mainbanner bg-cover bg-center w-full">
          <div className="max-w-7xl m-auto flex flex-wrap lg:h-screen items-end lg:pb-10 pb-0">
            <div className="lg:w-10/12 w-full lg:p-0 p-5">
              <h3 className="font-bebas italic lg:text-main-banner-title text-3xl text-white leading-none">
                BODYKORE SMART SLED PRO
              </h3>
              <p className="font-roboto text-white lg:text-3xl text-lg font-light pb-2 leading-snug">
                BodyKore’s all new revolutionary multi-planar sled with patented
                smart technology takes sled training to unbeatable heights.
              </p>

              <AddToCartButton
                id={product.variants.edges[0].node.id!}
                price={
                  product.variants.edges[0].node.priceV2
                    .amount! as unknown as string
                }
                comparePrice={
                  product.variants.edges[0].node.compareAtPriceV2
                    ?.amount! as unknown as string
                }
                tags={product.tags!}
              />
            </div>
            <div className="lg:w-2/12 w-full lg:justify-between justify-start flex flex-wrap lg:px-0 px-5">
              <h4 className="text-white font-roboto uppercase w-full lg:text-center text-xl tracking-widest">
                powered by:
              </h4>
              <Image
                src="/sledproduct/poweredby.png"
                alt=""
                className="h-auto lg:w-60 w-20"
                width={213}
                height={169}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
            </div>
          </div>
        </div>
        <div className="max-w-7xl m-auto flex flex-wrap py-10">
          <div className="lg:w-2/3 w-full lg:pr-10">
            <ReactPlayer
              className="lg:h-full h-60 w-full videoBox"
              url={'https://youtu.be/zTAd1gBkpWc'}
              playing={false}
              loop={false}
              controls={true}
              volume={1}
              width="100%"
              height="420px"
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
          </div>
          <div className="lg:w-1/3 w-full">
            <div className="px-5 lg:px-0">
              <SledProductCard
                id={product.variants.edges[0].node.id!}
                slug={product.handle!}
                title={product.title}
                price={
                  product.variants.edges[0].node.priceV2
                    .amount! as unknown as string
                }
                available={product.availableForSale!}
                comparePrice={
                  product.variants.edges[0].node.compareAtPriceV2
                    ?.amount! as unknown as string
                }
                description={product.description!}
                tags={product.tags!}
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-black lg:py-10 p-5">
          <div className="max-w-7xl m-auto">
            <SliderCard slider={slider1} />
          </div>
          <div className="max-w-7xl m-auto">
            <div id="accordionExample">
              {toggleAccording.map((ele, index) => (
                <div className="rounded-t-lg text-white" key={index}>
                  <h2 className="mb-0" id="headingOne">
                    <button
                      className="group relative flex w-full items-center bg-transparent text-white py-4 px-2 text-left border-b"
                      type="button"
                      data-te-collapse-init
                      data-te-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {ele.title}
                      <span
                        onClick={() => toggleAction(ele.title)}
                        className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white"
                      >
                        {toggle != ele.title && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            fill="#fff"
                          >
                            <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        )}
                        {toggle == ele.title && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            fill="#fff"
                          >
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </h2>
                  {toggle == ele.title && (
                    <div
                      id="collapseOne"
                      className="!visible"
                      data-te-collapse-item
                      data-te-collapse-show
                      aria-labelledby="headingOne"
                      data-te-parent="#accordionExample"
                    >
                      {toggle == 'OVERVIEW' && (
                        <div
                          className="px-2 py-2"
                          dangerouslySetInnerHTML={{ __html: ele.description }}
                        ></div>
                      )}
                      {toggle == 'SPECIFICATIONS' &&
                        productStrapi.attributes.specification != undefined &&
                        productStrapi.attributes.specification.length > 0 && (
                          <div className="mt-4 grid grid-cols-12 lg:space-x-5 justify-start">
                            <div className="lg:col-span-5 col-span-12">
                              <Image
                                src={
                                  mediaUrl +
                                  productStrapi.attributes.specification[0]
                                    .image.data.attributes.url
                                }
                                className="w-full"
                                alt=""
                                width={533}
                                height={551}
                                placeholder="blur"
                                blurDataURL="/loading.png"
                              />
                            </div>{' '}
                            <div
                              className="px-2 lg:col-span-7 col-span-12"
                              dangerouslySetInnerHTML={{
                                __html: ele.description,
                              }}
                            ></div>
                          </div>
                        )}
                      {toggle == 'DOWNLOAD' && (
                        <div
                          className="py-2 px-2 w-full"
                          dangerouslySetInnerHTML={{ __html: ele.description }}
                        ></div>
                      )}
                      {toggle == '3D Viewer' &&
                        productStrapi.attributes.file3d.data != null && (
                          <button
                            className="flex items-center justify-center mb-2  bg-white rounded-xl h-9 w-24 border-2 shadow-2xl mt-4 z-50"
                            style={{ zIndex: 999 }}
                            type="button"
                            onClick={() => setShowModal(true)}
                          >
                            <Image
                              placeholder="blur"
                              blurDataURL="/loading.png"
                              src="/svg/3d.svg"
                              width="24"
                              height="24"
                            />
                            <h3 className="text-black-373933 font-roboto text-sm">
                              View
                            </h3>
                          </button>
                        )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full py-8">
          <div className="max-w-7xl m-auto">
            <h3 className="font-bebas italic lg:text-6xl text-4xl text-black leading-none text-center pt-5">
              HIGHLIGHTS
            </h3>
            <div className="flex flex-wrap justify-center lg:px-0 px-3">
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <Image
                    src="/sledproduct/DigitizedResistance.jpg"
                    alt=""
                    className="items-center m-auto h-56 w-full"
                    width={359}
                    height={224}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <h3 className="font-bebas text-2xl text-left w-full text-red-bc2026 tracking-wider font-medium py-2">
                    Magnetic RESISTANCE
                  </h3>
                  <p className="font-roboto text-sm font-normal tracking-wide leading-6 text-grey-848484 h-32">
                    The BodyKore Smart Sled Pro uses digitized resistance (dual
                    magnetic motors) to adjust workout intensity with 3x more
                    resistance than any other sled on the market (without any
                    weights).
                  </p>
                </div>
              </div>

              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <ReactPlayer
                    style={{ objectFit: 'cover' }}
                    className="lg:h-full h-screen w-full videoBox"
                    url={'/sledproduct/MultiPlanar.mp4'}
                    playing={false}
                    loop={false}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="224px"
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
                  <h3 className="font-bebas text-2xl text-left w-full text-red-bc2026 tracking-wider font-medium py-2">
                    MULTI-PLANAR MOVEMENTS
                  </h3>
                  <p className="font-roboto text-sm font-normal tracking-wide leading-6 text-grey-8C8C8C h-32">
                    Other sleds move in one direction. Not this one. Each wheel
                    can be adjusted to its own resistance to allow athletes to
                    train at a more competitive level.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <ReactPlayer
                    style={{ objectFit: 'cover' }}
                    className="lg:h-full h-screen w-full videoBox"
                    url={'/sledproduct/Livedata.mp4'}
                    playing={false}
                    loop={false}
                    controls={true}
                    volume={0}
                    width="100%"
                    height="224px"
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
                  <h3 className="font-bebas text-2xl text-left w-full text-red-bc2026 tracking-wider font-medium py-2">
                    LIVE DATA ANALYTICS
                  </h3>
                  <p className="font-roboto text-sm font-normal tracking-wide leading-6 text-grey-8C8C8C h-32">
                    The app measures power, distance, stability and force
                    production while providing feedback in real time.
                    Trainers/coaches can monitor progress and make necessary
                    adjustments to reach goals.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <ReactPlayer
                    style={{ objectFit: 'cover' }}
                    className="lg:h-full h-screen w-full videoBox"
                    url={'/sledproduct/appcontrolled.mp4'}
                    playing={false}
                    loop={false}
                    controls={true}
                    volume={0}
                    width="100%"
                    height="224px"
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
                  <h3 className="font-bebas text-2xl text-left w-full text-red-bc2026 tracking-wider font-medium py-2">
                    APP CONTROLLED
                  </h3>
                  <p className="font-roboto text-sm font-normal tracking-wide leading-6 text-grey-8C8C8C h-32">
                    The BodyKore Smart Sled Pro is controlled through a{' '}
                    <u>
                      <b>patented</b>
                    </u>
                    , proprietary app by Mach Fitness Lab using Bluetooth
                    technology to digitally reduce or intensify resistance or
                    change modes during a workout. (The sled also has manual
                    switches that can be used without the app.)
                  </p>
                </div>
              </div>
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <ReactPlayer
                    style={{ objectFit: 'cover' }}
                    className="lg:h-full h-screen w-full videoBox"
                    url={'/sledproduct/multipletraining.mp4'}
                    playing={false}
                    loop={false}
                    controls={true}
                    volume={0}
                    width="100%"
                    height="224px"
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
                  <h3 className="font-bebas text-2xl text-left w-full text-red-bc2026 tracking-wider font-medium py-2">
                    MULTIPLE TRAINING MODES
                  </h3>
                  <p className="font-roboto text-sm font-normal tracking-wide leading-6 text-grey-8C8C8C h-32">
                    Train in different modes with three levels of intensity:
                    standard, change of direction and random. The harder you
                    push, the higher the intensity. NOTE: a rolling hills mode
                    will be available soon.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:py-10 py-5 flex flex-col justify-center items-center">
              <h3 className="font-bebas italic lg:text-6xl text-4xl text-black leading-none text-center pt-5">
                ADDITIONAL FEATURES
              </h3>
              <Image
                src="/sledproduct/sledfeatures.jpg"
                alt=""
                className="lg:w-1/2 w-full lg:p-0 p-5 items-center m-auto"
                width={640}
                height={452}
                placeholder="blur"
                blurDataURL="/loading.png"
              />
              <p className="w-full text-sm text-center  italic">
                *The finished model may look different than this version
              </p>

              <div className="flex justify-center w-full pt-6">
                <AddToCartButton
                  id={product.variants.edges[0].node.id!}
                  price={
                    product.variants.edges[0].node.priceV2
                      .amount! as unknown as string
                  }
                  comparePrice={
                    product.variants.edges[0].node.compareAtPriceV2
                      ?.amount! as unknown as string
                  }
                  tags={product.tags!}
                />
              </div>
            </div>
            <div className="lg:py-10 p-5">
              <h3 className="font-bebas italic lg:text-6xl text-4xl text-black leading-none text-center pt-5">
                MULTIPLE WAYS TO TRAIN
              </h3>
              <SliderCard slider={slider2} />
            </div>
          </div>
        </div>

        <div className="bg-black py-16 text-white">
          <div className="flex flex-col justify-center items-center text-center font-bebas text-2xl lg:text-5xl tracking-wide m-auto px-4 lg:px-0">
            <h3 className="pr-2 lg:w-2/4 w-full text-center leading-tight font-normal">
              What coaches, trainers and athletes are saying about the
              <span className="text-red-bc2026"> Smart Sled Pro</span>
            </h3>
            <p className="font-roboto font-light italic text-white text-lg leading-normal text-center tracking-wider">
              From real individuals who have tested the Smart Sled Pro.
            </p>
          </div>
          <div className="max-w-7xl m-auto mt-5 lg:px-0 px-5">
            <SliderCard slider={slider3} card={true} />
          </div>
          <div className="flex justify-center w-full lg:pt-6">
            <AddToCartButton
              id={product.variants.edges[0].node.id!}
              price={
                product.variants.edges[0].node.priceV2
                  .amount! as unknown as string
              }
              comparePrice={
                product.variants.edges[0].node.compareAtPriceV2
                  ?.amount! as unknown as string
              }
              tags={product.tags!}
            />
          </div>
        </div>

        <div className="w-full py-10">
          <div className="max-w-7xl m-auto">
            <h3 className="font-bebas italic lg:text-6xl text-4xl text-black leading-none text-center pt-5">
              MORE SMART SLED PRO VIDEOS
            </h3>
            <div className="flex flex-wrap lg:p-0 p-5">
              <div className="flex lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://youtu.be/ccsEXv2QQek'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height=""
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
              </div>
              <div className="flex lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://youtu.be/1yBZB0BzUfY'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height=""
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
              </div>

              <div className="flex lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://youtu.be/8HnYrEtmNv0'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height=""
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
              </div>
              <div className="flex lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://youtu.be/45lSQHH7TJw'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height=""
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
              </div>
              <div className="flex lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://youtu.be/KfxLG7ZJ9JU'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height=""
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
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-10">
          <div className="max-w-7xl m-auto">
            <h3 className="font-bebas italic lg:text-6xl text-4xl text-black leading-none text-center pt-5 pb-5">
              FREQUENTLY ASKED{' '}
              <span className="text-red-bc2026"> QUESTIONS</span>
            </h3>
            <div className="">
              {mapFaqs().map((a, i) => {
                return (
                  <div className="flex flex-col" key={i}>
                    <button
                      className="py-3 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          onClick={() => toggleAccordion(i)}
                          src={`${
                            active === i
                              ? '/svg/substraction.svg'
                              : '/svg/sum.svg'
                          }`}
                          alt=""
                          width={17}
                          height={17}
                        />
                        <p className="inline-block text-footnote light font-bebas text-lg tracking-wide text-black-373933 text-left">
                          {a.question}
                        </p>
                      </div>
                    </button>
                    {active === i && (
                      <div>
                        <div className="overflow-auto transition-height duration-700 ease-in-out faqs-container">
                          <div
                            className="pl-8 pb-4 text-gray-500 text-sm tracking-wide"
                            dangerouslySetInnerHTML={{ __html: a.answer }}
                          />
                        </div>
                        <div className="border-b border-gray-200"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {productStrapi.attributes.file3d.data != null && (
          <div className="w-1/4" style={{ zIndex: 999999 }}>
            {showModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                  style={{ zIndex: 999999999 }}
                >
                  <div
                    className="relative w-auto my-6 mx-auto max-w-3xl bg-gray-200 overflow-hidden"
                    style={{ width: 700 }}
                  >
                    {/*content*/}
                    <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
                      {/*header*/}
                      <div
                        className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t z-50"
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        <p className="font-semibold justify-end flex w-full cursor-pointer">
                          Close
                        </p>
                      </div>
                      {/*body*/}

                      <div className="relative p-6 flex-auto">
                        <div className="w-full border-b sm:mt-0 py-10">
                          <div className="flex-row lg:flex-row flex-wrap md:max-w-7xl justify-center md:justify-center m-auto">
                            {/*Images SECTION*/}
                            {/* <div className="bg-gray-200"> */}

                            <ThreeDComponent>
                              <iframe
                                src={`https://beta.tilitso.com/threed/?${
                                  mediaUrl +
                                  productStrapi.attributes.file3d.data
                                    .attributes.url
                                }`}
                                frameBorder="0"
                                height={600}
                                width={600}
                              ></iframe>
                            </ThreeDComponent>

                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default SmartSled;
const ThreeDComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
