import React from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import ReactPlayer from 'react-player';
import { getProduct, Product } from 'services/shopify/storefront';
import SledProductCard from '@components/ui/bodykore/Cards/SledPrice';
import SliderCard from '@components/ui/bodykore/SliderCard';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const product = await getProduct('smart-sled-pro');
  return {
    props: { header, product },
  };
};

interface SmartSledParams {
  header: HeaderData;
  product: Product;
}
const SmartSled = ({ header, product }: SmartSledParams) => {
  const [toggle, setToggle] = React.useState('');
  const [toggleAccording, setToggleAccording] = React.useState([
    {
      id: 1,
      title: 'OVERVIEW',
      description: `Our BodyKore Universal Trainer is an all-in-one home gym. This essential machine can provide your home gym with one piece that allows you to achieve multiple exercises,
       movements & results. This versatile unit features a dual adjustable pulley system, smith machine, multi-grip pull up bars, weight pegs and bar storage, 
       Inverted leg press add on & so much more. The Universal Trainer is constructed of heavy gauge rolled steel tubing, high quality cables and pulleys, 2x 220lb 
       Steel Stack Weight Plate sets and a counter balanced bar for the Smith Machine. By the limitless exercise options and movements, 
       this machine pushes you to achieve your fitness goals and see real results. 
       <br><br>
       The high-quality cables and pulleys allow you to complete your exercises smoothly. 
       
       The counter balanced bar for the Smith Machine, lets you accurately control how much weight you want to train with. This weight system gives you a wide range of weight choices for 
       diverse sets of exercises. All your workouts can be done with ease and in the comfort of your home by this one machine.`,
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
  flex: 33.33%;
}

.flex-item-mid {
  padding: 10px 0 0;
  flex: 33.33%;
}

.flex-item-right {
  padding: 10px 0 0;
  flex: 33.33%;
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
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Dimensions</h3>
  <li>91" x 62" x 89"</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Weight</h3>
  <li>595 lbs</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;"> Footprint</h3>
  <li>40 sqft</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Frame</h3>
  <li>Rolled Steel Oval Tubing</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Frame Color</h3>
  <li>Silver or Black</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Assembly Time</h3>
  <li>2 hours</li>
  </div>

  <div class="flex-item-mid">
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Weight Stack</h3>
  <li>2x 220lbs </li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;"># of Adjustable Height Positions</h3>
  <li>15 </li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;"># Of Weight Pegs</h3>
  <li>6</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Body Group Target</h3>
  <li>Full Body</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Counter Balanced Smith Machine</h3>
  <li>✔</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Half Rack Function</h3>
  <li>✔</li>
  

  </div>


  <div class="flex-item-right">
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Dual Pulley System</h3>
  <li>✔</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Accessory Storage</h3>
  <li>✔</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Multi Grip Pull Up Handles</h3>
  <li>✔</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;">Bar Storage</h3>
  <li>✔</li>
  <h3 style="font-size: 18px;padding:5px 0;width:100%;"># of Workouts</h3>
  <li>100+</li>


  </div>
</div>

</div>
      `,
    },
    {
      id: 3,
      title: 'Accessories Included',
      description: `
      <div class="flex-container">
  <div class="flex-item-left">
 <li>2x handles</li>

<li>Tricep bar</li>

<li>Lat pull down bar</li>

<li>Ankle strap</li>
  </div>
</div>
      `,
    },
    {
      id: 4,
      title: 'Attachment Included',
      description: `
      <div class="flex-container">
  <div class="flex-item-left">
  <li>J hooks</li>

  <li>Spotter arms</li>
  
  <li>Landmine</li>
  
  <li>Dip bar</li>
  
  <li>Lat seat</li>
  
  <li>Leg press plate</li>
  
 <li> Band pegs</li>
  </div>
</div>
      `,
    },
    {
      id: 5,
      title: 'DOWNLOAD',
      description: `
      <a href="https://cms.bodykore.com/uploads/MX_1162_Manual_a9dfeec13f.pdf" target="_blank" rel="noreferrer" style="
    background: #bc2026;
    padding: 15px;
    border-radius: 10px;
    margin-top: 25px;
    display: inline-block;
    width: 25%;
    text-align: center;
">Download Manuals</a>
      `,
    },
  ]);

  const [slider1, setSlider1] = React.useState<any>([
    {
      id: '1',

      image:
        'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/MX1162.jpg?v=1670362181',
    },
    {
      id: '2',

      image:
        'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/MX1162-cover.jpg?v=1670362181',
    },
    {
      id: '3',

      image:
        'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/MX1162-black.jpg?v=1670362181',
    },
    {
      id: '4',

      image:
        'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/MX1162-1.jpg?v=1670362181',
    },
    {
      id: '5',

      image:
        'https://cdn.shopify.com/s/files/1/0609/8898/1468/products/MX1162-5.jpg?v=1670362181',
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

  return (
    <>
      {/* <SeoHeader seo={seo.smartsledpro} /> */}
      <div>
        <div className="bg-universaltrainer-mainbanner bg-cover bg-center w-full">
          <div className="max-w-7xl m-auto flex flex-wrap lg:h-screen h-60 items-end align-bottom lg:pb-10">
            <div className="lg:w-10/12 w-full lg:p-0 p-5">
              <h3 className="font-bebas italic lg:text-main-banner-title text-2xl text-white leading-none">
                Universal Trainer - MX1162
              </h3>
              <p className="font-roboto text-white lg:text-lg text-base pb-2 leading-snug">
                Our BodyKore Universal Trainer is an all-in-one home gym. This
                essential machine can provide your home gym with one piece that
                allows you to achieve multiple exercises, movements & results.
              </p>
            </div>
            <div className="lg:w-2/12 w-full lg:justify-between justify-start flex flex-wrap lg:px-0 px-5"></div>
          </div>
        </div>
        <div className="max-w-7xl m-auto flex flex-wrap py-10 px-6">
          <div className="lg:w-2/3 w-full lg:pr-0 pr-0">
            <ReactPlayer
              className="lg:h-full h-96 w-full videoBox"
              url={'https://youtu.be/-Sn-vVXE8p4'}
              playing={false}
              loop={false}
              controls={true}
              volume={1}
              width="100%"
              height="450px"
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
            <div className="lg:px-5 px-0">
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
                      <div
                        className="py-2 px-2"
                        dangerouslySetInnerHTML={{ __html: ele.description }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full py-8">
          <div className="max-w-7xl m-auto">
            <h3 className="font-bebas italic lg:text-4xl text-2xl text-black leading-none text-center pt-5 pb-5">
              FEATURES
            </h3>
            <div className="flex flex-wrap justify-center lg:px-0 px-3">
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap px-5 py-4 rounded-xl shadow-lg border-2 border-gray-200">
                  <Image
                    src="https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2FMX_1162_1_f4fbc5e8b0.jpeg&w=640&q=75"
                    alt=""
                    className="items-center m-auto h-56 w-full"
                    width={366}
                    height={224}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <h3 className="font-bebas text-xl text-left w-full text-black tracking-wider font-medium pt-3">
                    Multi-Functional All-in-One Versatile Unit
                  </h3>
                </div>
              </div>

              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap px-5 py-4 rounded-xl shadow-lg border-2 border-gray-200">
                  <Image
                    src="https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2Fmx1162_feature_1_0048ae2430.jpeg&w=640&q=75"
                    alt=""
                    className="items-center m-auto h-56 w-full"
                    width={366}
                    height={224}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <h3 className="font-bebas text-xl text-left w-full text-black tracking-wider font-medium pt-3">
                    Dual Adjustable Pulley System
                  </h3>
                </div>
              </div>
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap px-5 py-4 rounded-xl shadow-lg border-2 border-gray-200">
                  <Image
                    src="https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2Fmx1162_feature_4_53eebf6e5f.jpeg&w=640&q=75"
                    alt=""
                    className="items-center m-auto h-56 w-full"
                    width={366}
                    height={224}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <h3 className="font-bebas text-xl text-left w-full text-black tracking-wider font-medium pt-3">
                    Smith Machine
                  </h3>
                </div>
              </div>
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap px-5 py-4 rounded-xl shadow-lg border-2 border-gray-200">
                  <Image
                    src="https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2Fmx1162_feature_3_b964f06152.jpeg&w=640&q=75"
                    alt=""
                    className="items-center m-auto h-56 w-full"
                    width={366}
                    height={224}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <h3 className="font-bebas text-xl text-left w-full text-black tracking-wider font-medium pt-3">
                    Multi-Grip Pull Up Bars
                  </h3>
                </div>
              </div>
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap px-5 py-4 rounded-xl shadow-lg border-2 border-gray-200">
                  <Image
                    src="https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2Fjhook_560fa2e6b8.jpeg&w=640&q=75"
                    alt=""
                    className="items-center m-auto h-56 w-full"
                    width={366}
                    height={224}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <h3 className="font-bebas text-xl text-left w-full text-black tracking-wider font-medium pt-3">
                    Half Squat Cage Function (Bar Hooks)
                  </h3>
                </div>
              </div>
              <div className="lg:w-1/3 w-full px-2 pb-5">
                <div className="bg-white w-full justify-center flex flex-wrap px-5 py-4 rounded-xl shadow-lg border-2 border-gray-200">
                  <Image
                    src="https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2Fmx1162_feature_7_57e77fa1c9.jpeg&w=640&q=75"
                    alt=""
                    className="items-center m-auto h-56 w-full"
                    width={366}
                    height={224}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <h3 className="font-bebas text-xl text-left w-full text-black tracking-wider font-medium pt-3">
                    Dip bar attachment
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-14 items-start align-top">
              <div className="">
                <h3 className="font-bebas italic lg:text-4xl text-2xl text-black leading-none text-center pt-5 pb-5">
                  ADDITIONAL FEATURES
                </h3>
                <Image
                  src="https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2FMX_1162_done_2_57d0625c1d.jpg&w=640&q=75"
                  alt=""
                  className="w-full"
                  width={612}
                  height={796}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />
              </div>
              <div className="">
                <h3 className="font-bebas italic lg:text-4xl text-2xl text-black leading-none text-center pt-5 pb-5">
                  Warranty
                </h3>
                <Image
                  src="http://beta.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2Falliance_series_38909abfba.jpg&w=1200&q=75"
                  alt=""
                  className="w-full"
                  width={612}
                  height={796}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />
              </div>
            </div>

            <div className="lg:py-10 p-5">
              <h3 className="font-bebas italic lg:text-4xl text-2xl text-black leading-none text-center pt-5 pb-5">
                MULTIPLE WAYS TO TRAIN
              </h3>
              <SliderCard slider={slider2} />
            </div>
          </div>
        </div>

        <div className="bg-black py-16 text-white">
          <div className="flex flex-col justify-center items-center text-center font-bebas text-2xl lg:text-5xl tracking-wide m-auto px-4 lg:px-0">
            <h3 className="pr-2 lg:w-2/4 w-full text-center leading-tight font-normal">
              What our clients are saying about the
              <p className="text-red-bc2026"> Universal Trainer</p>
            </h3>
            <p className="font-roboto font-light italic text-white text-lg leading-normal text-center tracking-wider">
              From real individuals who have tested the Universal Trainer.
            </p>
          </div>
          <div className="max-w-7xl m-auto mt-5 lg:px-0 px-5">
            <SliderCard slider={slider3} card={true} />
          </div>
        </div>

        <div className="w-full py-10">
          <div className="max-w-7xl m-auto">
            <h3 className="font-bebas italic lg:text-6xl text-4xl text-black leading-none text-center pt-5">
              MORE UNIVERSAL TRAINER VIDEOS
            </h3>
            <div className="flex flex-wrap lg:p-0 p-5">
              <div className="flex lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://youtu.be/mfrMHGXkv8k'}
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
                  url={'https://youtu.be/sFE8NfEeJ4g'}
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
                  url={'https://youtu.be/sXaNuzJUls8'}
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
      </div>
    </>
  );
};

export default SmartSled;
