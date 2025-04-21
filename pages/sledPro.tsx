import React, { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import ReactPlayer from 'react-player';
import { getProduct, Product } from 'services/shopify/storefront';
import { ProductStrapi, getStrapiProduct } from 'services/strapi';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import SubscriptionSledPro from '@components/ui/bodykore/Index/SubscriptionSledPro';
import DemoSledPro from '@components/ui/bodykore/Index/DemoSleldPro';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const product = await getProduct('smart-sled-pro');
  const productStrapi = await getStrapiProduct('smart-sled-pro');

  return {
    props: { header, product, productStrapi },
    // revalidate: 30 * 60,
  };
};

interface SmartProParams {
  header: HeaderData;
  product: Product;
  productStrapi: ProductStrapi;
}
const SmartPro = ({ header, product, productStrapi }: SmartProParams) => {
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

  const [performanace, setPerformanace] = useState([
    {
      title: "",
      percentage: 0,
    },
    {
      title: "",
      percentage: 0,
    },
    {
      title: "",
      percentage: 0,
    },
  ]);
  const [excellence, setExcellence] = useState([
    {
      title: "Miles on one charge",
      description: "Only 2 hours of charging time until the smart sled pro batteries are fully charged.",
      percentage: 0,
    },
    {
      title: "Degree Turning Radius",
      description: "Patented multi-planar movements made possible with 360 Degree wheel rotation.",
      percentage: 0,
    },
    {
      title: "Pounds of Resistance",
      description: "5 Levels of digital magnetic resistance up to 700 pounds with an additional weight capacity of 1,000 pounds of disc weights.",
      percentage: 0,
    },
  ]);

  const sectionRef = useRef(null);
  const excellenceRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger the width animation
            setPerformanace([
              {
                title: "Endurance",
                percentage: 70,
              },
              {
                title: "Strength",
                percentage: 80,
              },
              {
                title: "Cardio Workout",
                percentage: 68,
              },
            ]);

          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = [
              {
                title: "Endurance",
                targetPercentage: 229,
                description: "Only 2 hours of charging time until the smart sled pro batteries are fully charged.",
              },
              {
                title: "Strength",
                targetPercentage: 360,
                description: "Patented multi-planar movements made possible with 360 Degree wheel rotation.",
              },
              {
                title: "Cardio Workout",
                targetPercentage: 1700,
                description: "5 Levels of digital magnetic resistance up to 700 pounds with an additional weight capacity of 1,000 pounds of disc weights.",
              },
            ];


            // Start animations for each object
            targets.forEach((item, index) => {
              let currentPercentage = 0;

              const interval = setInterval(() => {
                if (currentPercentage >= item.targetPercentage) {
                  clearInterval(interval); // Stop when target percentage is reached
                  return;
                }

                currentPercentage += Math.ceil(item.targetPercentage / 100); // Increment by 1% of the target

                // Update the state
                setExcellence((prev) =>
                  prev.map((ex, i) =>
                    i === index ? { ...ex, percentage: Math.min(currentPercentage, item.targetPercentage) } : ex
                  )
                );
              }, 0.1); // Adjust the interval duration for smoother/slower animations

            });
          }
        });
      },
      { threshold: 0.1 } // Trigger when the section is fully visible
    );

    // Assuming excellenceRef is a reference to your target element
    if (excellenceRef.current) {
      observer.observe(excellenceRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (excellenceRef.current) {
        observer.unobserve(excellenceRef.current);
      }
    };
  }, []);

  const videos = [
    {
      id: '1',
      title: 'Smart Sled Pro Intro with Clar Bartram',
      video: 'https://youtu.be/-URuSsPhVDs',
      image: 'https://www.fitnesssled.com/wp-content/uploads/2024/02/Smart-Sled-Pro-Clark-Bartram-Intro.jpg',
      duration: '02:00'
    },
    {
      id: '2',
      title: 'Change of Direction Mode',
      video: 'https://youtu.be/l5VdeVpFvmg',
      image: 'https://www.fitnesssled.com/wp-content/uploads/2024/02/multiplanr-movement-scaled.jpg',
      duration: '01:00'
    },
    {
      id: '3',
      title: 'Sled Comparison Video',
      video: 'https://youtu.be/i-dpPd8MGDs',
      image: 'https://www.fitnesssled.com/wp-content/uploads/2024/02/Sled-Comparison-Torque-vs-Smart-Sled.jpg',
      duration: '01:30'
    },
    {
      id: '4',
      title: 'Offensive Line Coach Demo',
      video: 'https://youtu.be/v2bRU42V4bQ',
      image: 'https://www.fitnesssled.com/wp-content/uploads/2024/02/Screenshot-2024-02-29-at-22.53.59.jpg',
      duration: '02:00'
    },
    {
      id: '5',
      title: 'Change of Direction Mode',
      video: 'https://youtu.be/1yBZB0BzUfY',
      image: 'https://www.fitnesssled.com/wp-content/uploads/2024/02/Screenshot-2024-02-29-at-22.54.29.jpg',
      duration: '01:00'
    },
    {
      id: '7',
      title: 'Sled Comparison Video',
      video: 'https://youtu.be/i-dpPd8MGDs',
      image: 'https://www.fitnesssled.com/wp-content/uploads/2024/02/Sled-Comparison-Torque-vs-Smart-Sled.jpg',
      duration: '01:30'
    },
    {
      id: '8',
      title: 'Sled Comparison Video',
      video: 'https://youtu.be/i-dpPd8MGDs',
      image: 'https://www.fitnesssled.com/wp-content/uploads/2024/02/Sled-Comparison-Torque-vs-Smart-Sled.jpg',
      duration: '01:30'
    },
  ];

  const [firstPlay, setFirstPlay] = useState(true);
  const [selectVideo, setSelectVideo] = useState<{ id: string, title: string, video: string, image: string, duration: string } | undefined>(videos[0]);
  const [popup, setPopup] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 3500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderImages = [
    {
      id: '1',
      url: 'https://cms.bodykore.com/uploads/USA_Wrestling_Smart_Sled_Athletes_1c4333d787.png',
    },
    {
      id: '2',
      url: 'https://cms.bodykore.com/uploads/MLS_smart_Sled_Athletes_e34569098f.png',
    },
    {
      id: '3',
      url: 'https://cms.bodykore.com/uploads/USA_smart_sled_athletes_2bdabfda65.png',
    },
    {
      id: '4',
      url: 'https://cms.bodykore.com/uploads/UFC_73c161915a.png',
    },
    {
      id: '5',
      url: 'https://cms.bodykore.com/uploads/NFL_1e1d55a313.png',
    },
    {
      id: '6',
      url: 'https://cms.bodykore.com/uploads/MLB_30cdcb2ef7.png',
    },
    {
      id: '7',
      url: 'https://cms.bodykore.com/uploads/Crossfit_69c7d1cb68.png',
    },
  ]

  return (
    <>
      {/* <SeoHeader seo={seo.SmartPropro} /> */}
      <div>
        <div className="bg-sledpro-mainbanner bg-cover bg-center w-full relative">
          < div className="absolute inset-0 bg-black opacity-50" ></div>
          <div className="max-w-7xl m-auto flex flex-wrap lg:h-screen items-center lg:pb-10 pb-0 relative">
            <div className="lg:w-7/12 m-auto w-full lg:p-0 p-5 text-center">
              <p className="font-roboto text-white lg:text-3xl text-base font-light pb-2 leading-snug">
                Introducing the Future of Sled Training for
              </p>
              <h3 className="font-bebas font-bold lg:text-9xl text-4xl text-white leading-none tracking-wider">
                high performance athletes
              </h3>
              <p className="font-roboto text-white lg:text-xl text-base font-normal pb-2 lg:leading-snug leading-normal">
                All-terrain training with the Smart Sled Pro: Offering unique multiplanar, multidirectional workouts, dual magnetic resistance motors for customizable intensity, and analytics to enhance athletic performance.
              </p>
              <button onClick={() => { setPopup(true) }} className="text-lg lg:w-2/6 w-full uppercase h-14 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-semibold text-white-f2f9fa tracking-wide">
                Get A Demo
              </button>

            </div>

          </div>
        </div>
        <div className="p-2 bg-red-bc2026">

          <ReactPlayer
            className="lg:h-full h-60 w-full videoBox"
            url={'https://youtu.be/zTAd1gBkpWc'}
            playing={false}
            loop={false}
            controls={true}
            volume={1}
            width="100%"
            height="800px"
            playsInline={true}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
            onPlay={() => { }}
          />


        </div>


        <div className="w-full py-8 bg-darkgunmetal">
          <div className="max-w-8xl m-auto">
            <div className='grid grid-cols-12 items-center lg:pb-10 p-5'>
              <div className='lg:col-span-10 col-span-12 lg:p-0 pb-4'>
                <p className='font-roboto text-red-bc2026 font-medium text-2xl'>Double Patented</p>
                <h3 className="font-bebas lg:text-7xl tracking-wide text-3xl text-white font-semibold leading-none text-left">
                  REVOLUTIONARY <br></br>FEATURES
                </h3>
              </div>
              <div className='lg:col-span-2  col-span-6'>
                <Link href={'https://cms.bodykore.com/uploads/Smart_Sled_New_5677c77ff9.pdf'}>

                  <button className="w-full h-14 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-semibold text-white-f2f9fa tracking-wide">
                    TECHNICAL SHEET
                  </button>
                </Link>
              </div>
            </div>
            <div className='max-w-7xl m-auto'>
              <div className='grid grid-cols-12 gap-5 lg:p-0 p-5'>

                <div className='lg:col-span-4 col-span-12 bg-white p-5 rounded-md'>
                  <div className=''>
                    <ReactPlayer
                      style={{ objectFit: 'cover' }}
                      className="lg:h-full h-screen w-full videoBox"
                      url={'https://cms.bodykore.com/uploads/Multi_Plannar_1_b447f334eb.mp4'}
                      playing={true}
                      loop={true}
                      controls={false}
                      volume={0}
                      width="100%"
                      height="350px"
                      playsInline={true}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                          },
                        },
                      }}
                      onPlay={() => { }}
                    />
                    <div className='pt-2'>
                      <h3 className="font-bebas text-3xl text-left w-full text-red-bc2026 font-medium">
                        MULTI-PLANAR MOVEMENTS
                      </h3>
                      <p>
                        Controlled via a patented, proprietary app by Mach Fitness Lab, the sled utilizes Bluetooth technology for digital resistance adjustments and mode changes during workouts. The app measures power, distance, stability and force production while providing feedback in real time. Trainers/coaches can monitor progress and make necessary adjustments.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='lg:col-span-4 col-span-12 bg-white p-5 rounded-md'>
                  <div className=''>
                    <ReactPlayer
                      style={{ objectFit: 'cover' }}
                      className="lg:h-full h-screen w-full videoBox"
                      url={'https://cms.bodykore.com/uploads/Upper_Body_96dd2f2aff.mp4'}
                      playing={true}
                      loop={true}
                      controls={false}
                      volume={0}
                      width="100%"
                      height="350px"
                      playsInline={true}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                          },
                        },
                      }}
                      onPlay={() => { }}
                    />
                    <div className='pt-2'>
                      <h3 className="font-bebas text-3xl text-left w-full text-red-bc2026 font-medium">
                        MAGNETIC RESISTANCE
                      </h3>
                      <p>
                        The Smart Sled Pro is equipped with dual magnetic motors, offering digitized resistance. It provides three times more resistance than other sleds on the market, ensuring a rigorous workout without needing additional weights.


                      </p>
                    </div>
                  </div>
                </div>
                <div className='lg:col-span-4 col-span-12 bg-white p-5 rounded-md'>
                  <div className=''>
                    <ReactPlayer
                      style={{ objectFit: 'cover' }}
                      className="lg:h-full h-screen w-full videoBox"
                      url={'https://cms.bodykore.com/uploads/Live_Data_Feed_Back_Video_1_c6382c25c0.mp4'}
                      playing={true}
                      loop={true}
                      controls={false}
                      volume={0}
                      width="100%"
                      height="350px"
                      playsInline={true}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                          },
                        },
                      }}
                      onPlay={() => { }}
                    />
                    <div className='pt-2'>
                      <h3 className="font-bebas text-3xl text-left w-full text-red-bc2026 font-medium">
                        APP CONTROLLED
                      </h3>
                      <p>
                        Controlled via a patented, proprietary app by Mach Fitness Lab, the sled utilizes Bluetooth technology for digital resistance adjustments and mode changes during workouts. The app measures power, distance, stability and force production while providing feedback in real time. Trainers/coaches can monitor progress and make necessary adjustments.


                      </p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <div className='grid grid-cols-2 lg:py-16 p-5 items-center lg:space-x-10 space-y-10'>
              <div className='lg:col-span-1 col-span-12'>
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-full h-screen w-full videoBox"
                  url={'https://cms.bodykore.com/uploads/Live_Data_Feedback_1_2104222fb7.mp4'}
                  playing={true}
                  loop={true}
                  controls={false}
                  volume={0}
                  width="100%"
                  height="550px"
                  playsInline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => { }}
                />
              </div>
              <div className='lg:col-span-1 col-span-12'>
                <p className='font-roboto text-red-bc2026 font-medium text-2xl'>
                  Measure your Output
                </p>
                <h3 className="font-bebas font-semibold lg:text-8xl text-4xl text-white leading-none tracking-wider text-left">
                  LIVE DATA<br></br>
                  ANALYTICS
                </h3>
                <p className="w-full text-lg text-white">
                  The app provides real-time feedback on power, distance, stability, and force production. This allows trainers and coaches to monitor progress and make necessary adjustments to optimize training and goal achievement.

                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-red-bc2026 '>
          <div className='max-w-7xl m-auto'>
            <div className='grid grid-cols-12 lg:py-16 p-5 items-center lg:space-x-10 space-y-10'>

              <div className='lg:col-span-6 col-span-12'>
                <p className='font-roboto text-white font-medium text-2xl'>
                  All Terrain Fitness Sled
                </p>
                <h3 className="font-bebas lg:text-8xl font-semibold text-4xl text-white leading-none tracking-wider text-left">
                  MULTIPLE TRAINING MODES
                </h3>
                <p className="w-full text-lg text-white">
                  The all-terrain Smart Sled offers diverse training modes with three levels of intensity: standard, change of direction, and random, with a “rolling hills” mode coming soon. The intensity automatically increases with the effort exerted by the user.

                </p>
              </div>
              <div className='lg:col-span-6 col-span-12'>
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-full h-screen w-full videoBox"
                  url={'https://cms.bodykore.com/uploads/Hill_Training_8492b58aa3.mp4'}
                  playing={true}
                  loop={true}
                  controls={false}
                  volume={0}
                  width="100%"
                  height="550px"
                  playsInline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => { }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-8 bg-darkgunmetal">
          <div className="max-w-8xl m-auto">
            <div className='grid grid-cols-12 lg:py-16 p-5 items-center lg:space-x-10 space-y-10'>
              <div className='lg:col-span-6 col-span-12'>
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-full h-screen w-full videoBox"
                  url={'https://cms.bodykore.com/uploads/Clark_Bartram_Introducing_the_Smart_Sled_Pro_a3dbbec5bb.mp4'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={0}
                  width="100%"
                  height="550px"
                  playsInline={true}

                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => { }}
                />
              </div>
              <div className='lg:col-span-6 col-span-12 space-y-6'>
                <p className='font-roboto text-red-bc2026 font-medium text-2xl'>
                  Compete at the Highest Level
                </p>
                <h3 className="font-bebas lg:text-8xl font-semibold text-4xl text-white leading-none tracking-wider text-left">
                  APP Controlled <br></br>training
                </h3>
                <p className="w-full text-lg text-white">
                  Perfect for coaches and athletes alike, this innovative feature allows for seamless transitions between very high and low resistance levels mid-push, enabling precise control over speed, strength, and agility workouts. Whether you’re aiming to boost an athlete’s top-end speed or manage their pace through deceleration exercises, the Smart Sled Pro adapts instantly to your training needs.
                </p>
              </div>

            </div>
            <div className='grid grid-cols-12 lg:py-16 p-5 items-center lg:space-x-10 space-y-10'>
              <div className='lg:col-span-6 col-span-12'>
                <Image
                  src="https://cms.bodykore.com/uploads/Smart_Sled_Dimensions_e7bc9fbf54_e435efcf9f.jpg"
                  className=""
                  width={600}
                  height={600}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />
                <Image
                  src="https://cms.bodykore.com/uploads/sledfeatures_044d6123b4.jpg"
                  className=""
                  width={600}
                  height={600}
                  placeholder="blur"
                  blurDataURL="/loading.png"
                />
              </div>
              <div className='lg:col-span-6 col-span-12'>
                <p className='font-roboto text-red-bc2026 font-medium text-2xl'>
                  Technical Breakdown
                </p>
                <h3 className="font-bebas lg:text-8xl font-semibold text-4xl text-white leading-none tracking-wider text-left">
                  specifications
                </h3>
                <p className="w-full text-lg text-white">
                  Explore the precision-engineered features of the Smart Sled Pro, designed to elevate your training to unprecedented levels. With adjustable resistance levels that cater to every stage of fitness, from 150lbs to a challenging 700lbs, plus the capability to add an extra 1000 pounds of disc weights, this sled offers a total resistance of up to 1700 pounds. Its robust construction and thoughtful design, including durable tires and a substantial weight capacity, ensure a seamless workout experience. The Smart Sled Pro is not just a piece of equipment; it’s a comprehensive training solution backed by a solid warranty for peace of mind.


                </p>
                <h4 className="font-bebas lg:text-5xl text-3xl text-white leading-none tracking-wider text-left">
                  main features
                </h4>
                <ul className='grid lg:grid-cols-2 grid-cols-1 text-white font-roboto font-medium leading-10'>
                  <li>Level 1 - 150lbs</li>
                  <li>Level 2 - 300lbs</li>
                  <li>Level 3 - 450lbs</li>
                  <li>Level 4 - 600lbs</li>
                  <li>Level 5 - 700lbs</li>
                  <li>Additional Weight Capacity 1000lbs</li>

                </ul>
                <div className='grid lg:grid-cols-2 grid-cols-1 space-y-4'>
                  <div className='text-white leading-10'>
                    <h4 className="font-bebas lg:text-3xl text-2xl leading-none tracking-wider text-left">
                      Dimensions
                    </h4>
                    <p>
                      45” L x 40” H x 31 W”
                    </p>
                  </div>
                  <div className='text-white leading-10'>
                    <h4 className="font-bebas lg:text-3xl text-2xl leading-none tracking-wider text-left">
                      Weight
                    </h4>
                    <p>
                      250lbs
                    </p>
                  </div>
                  <div className='text-white leading-10'>
                    <h4 className="font-bebas lg:text-3xl text-2xl leading-none tracking-wider text-left">
                      Warranty
                    </h4>
                    <ul>
                      <li>Frame: 10 Years</li>
                      <li>Parts: 5 Years
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='text-white'>
                  <h4 className="font-bebas lg:text-3xl text-2xl leading-none tracking-wider text-left">
                    Sled TRAINING
                  </h4>
                  <div className='flex mt-4'>
                    <ul ref={sectionRef} className="performance-list w-full flex flex-col gap-4">
                      {performanace.map((ele, index) => (
                        <li
                          key={index}
                          className="relative border-green border-2 h-12 w-full font-bold"
                        >
                          <div
                            className="h-full bg-green flex items-center justify-between capitalize px-3 text-darkgunmetal"
                            style={{
                              width: `${ele.percentage}%`,
                              maxWidth: "100%",
                              transition: "width 0.3s ease-in-out", // Smooth animation
                            }}
                          >
                            {ele.percentage > 30 && <>
                              <span>{ele.title}</span>
                              <span>{ele.percentage}%</span>
                            </>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='max-w-7xl m-auto'>
            <div className='p-5'>
              <p className='font-roboto text-red-bc2026 font-medium text-2xl'>
                See for Yourself
              </p>
              <h3 className="font-bebas lg:text-8xl font-semibold text-4xl text-white leading-none tracking-wider text-left">
                Smart Sled<br></br>
                in Action
              </h3>
              <div className='w-full bg-white my-5 flex lg:flex-row flex-row-reverse'>
                <div className='w-4/12'>
                  <header>
                    <ul className='bg-green flex justify-between p-4 text-white font-semibold'>
                      <li>Smart Sled Playlist</li>
                      <li>8 Videos</li>
                    </ul>
                  </header>
                  <div>
                    <ul className='' style={{ height: 440, overflowY: 'scroll' }}>
                      {videos.map((ele, index) => <li key={index} className={`cursor-pointer border-b ${selectVideo?.id == ele.id && !firstPlay ? 'bg-gray-100' : ''}`} onClick={() => {
                        setSelectVideo(undefined)
                        setSelectVideo(ele)
                        setFirstPlay(false)
                      }}>
                        <div className='flex justify-between gap-4 items-center p-2'>
                          <div className='flex justify-start w-full gap-4 items-center'>
                            <div className='flex gap-3 w-3/12 bg-gray-400 relative' >
                              <Image
                                src={ele.image}
                                className="object-cover"
                                width={100}
                                height={60}
                                alt=""
                              />
                              <img src="play.svg" alt="" className='brightness-200 absolute w-6 h-6' style={{ bottom: '5px', right: '5px', filter: 'invert(1)' }} />
                            </div>
                            <div className='w-7/12'>
                              <p className='text-grey-848484 hover:text-red-bc2026 font-semibold w-full text-sm'>{ele.title}</p>
                            </div>
                            <div className='w-2/12'>
                              <p className='text-grey-848484 font-semibold'>{ele.duration}</p>
                            </div>
                          </div>


                        </div>
                      </li>)}
                    </ul>
                  </div>
                </div>
                <div className='w-8/12'>
                  {selectVideo != undefined && <ReactPlayer
                    url={selectVideo.video}
                    loop={true}
                    controls={true}
                    width="100%"
                    height="100%"
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                    playing={!firstPlay}
                  />}
                </div>
              </div>
            </div>
            <div className='p-5'>
              <p className='font-roboto text-red-bc2026 font-medium text-2xl'>
                Trusted by Athletes from


              </p>
              <h3 className="font-bebas lg:text-8xl font-semibold text-4xl text-white leading-none tracking-wider text-left">
                Major League<br></br>
                Sports


              </h3>
              <Slider className="z-50" {...settings}>
                {sliderImages.map((el, i) => (
                  <div className="p-2" key={i}>
                    <Image
                      key={i}
                      src={el.url}
                      className=""
                      objectFit='contain'
                      width={600}
                      height={330}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                  </div>
                ))}
              </Slider>

            </div>
            <div className='p-5'>
              <p className='font-roboto text-red-bc2026 font-medium text-2xl'>
                Train with the Best


              </p>
              <h3 className="font-bebas lg:text-8xl font-semibold text-4xl text-white leading-none tracking-wider text-left">
                SLED
                <br></br>Programs</h3>
              <div className='grid lg:grid-cols-12 w-full lg:gap-x-12 gap-y-6 pt-5'>
                <div className='lg:col-span-4 col-span-12'>
                  <div className='lg:gap-y-4 gap-y-2'>
                    <Image
                      src="https://cms.bodykore.com/uploads/Obstacle_Course_022f8fdf55.jpg"
                      className=""
                      width={380}
                      height={280}
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                    <div className='pt-2'>
                      <h3 className="font-bebas text-3xl text-left text-red-bc2026 font-medium">
                        Prehab/rehab TRAINING
                      </h3>
                      <p className=" text-base text-white font-medium">
                        All Levels
                      </p>
                      <p className="w-full text-base text-white pb-4 lg:h-56 h-auto lg:text-left text-justify">
                        Discover the transformative power of sled training with our specialized prehab/rehab exercise program. Designed for the Smart Sled Pro, this guide offers targeted exercises to strengthen, rehabilitate, and prevent injuries, ensuring you maintain peak performance. Perfect for athletes and fitness enthusiasts alike, download now to elevate your training and safeguard your physical health.

                      </p>
                      <Link href={'https://cms.bodykore.com/uploads/Smart_Sled_Prehab_Rehab_Sled_Exercise_Program_6a0447590f.pdf'}>
                      <button className="lg:w-full w-1/2 h-14 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-semibold text-white-f2f9fa tracking-wide">
                        FREE DOWNLOAD
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='lg:col-span-4 col-span-12'>
                  <div className='lg:gap-y-4 gap-y-2'>
                    <Image
                      src="https://cms.bodykore.com/uploads/App_Controlled_e2beb99075.jpg"
                      className=""
                      width={380}
                      height={280}
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />

                    <div className='pt-2'>
                      <h3 className="font-bebas text-3xl text-left w-full text-red-bc2026 font-medium">
                        Endurance Training

                      </h3>
                      <p className="w-full text-base text-white font-medium">
                        Moderate to Expert

                      </p>
                      <p className="w-full text-base text-white pb-4 lg:h-56 h-auto lg:text-left text-justify">
                        This program is specifically designed for athletes such as runners, sprinters, football, and soccer players who aim to enhance their endurance and speed. Utilizing the Smart Sled Pro's magnetic resistance, this program will focus on improving explosive power, speed, and cardiovascular endurance, which are crucial for athletic performance.

                      </p>
                      <Link href={'https://cms.bodykore.com/uploads/Smart_Sled_Pro_Elite_Endurance_Program_0c47bd0e13.pdf'}>
                      <button className="lg:w-full w-1/2 h-14 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-semibold text-white-f2f9fa tracking-wide">
                        FREE DOWNLOAD
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='lg:col-span-4 col-span-12'>
                  <div className='lg:gap-y-4 gap-y-2'>
                    <Image
                      src="https://cms.bodykore.com/uploads/Group_Training_fa9aa5126d.jpg"
                      className=""
                      width={380}
                      height={280}
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                    <div className='pt-2'>
                      <h3 className="font-bebas text-3xl text-left w-full text-red-bc2026 font-medium">
                        Strength Training


                      </h3>
                      <p className="w-full text-base text-white font-medium">
                        Moderate to Expert


                      </p>
                      <p className="w-full text-base text-white pb-4 lg:h-56 h-auto lg:text-left text-justify">
                        Unlock unparalleled muscle growth and strength gains with the Smart Sled Pro Muscle + Strength Building Program. Tailored for those ready to push their limits, this comprehensive 4-week plan harnesses the unique capabilities of the Smart Sled Pro. Experience targeted workouts that challenge every major muscle group, utilizing the sled's innovative magnetic resistance for a truly dynamic strength training experience.

                      </p>
                      <Link href={'https://cms.bodykore.com/uploads/Smart_Sled_Pro_Muscle_Strength_Building_Workout_Program_5df356a965.pdf'}>
                      <button className="lg:w-full w-1/2 h-14 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-semibold text-white-f2f9fa tracking-wide">
                        FREE DOWNLOAD
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full pt-8 bg-darkgunmetal relative">
          < div className="absolute inset-0 bg-black opacity-50" ></div>
          <div className='grid grid-cols-12 pt-12 lg:space-x-8 space-y-8 items-center m-auto'>
            <div className='lg:col-span-6 col-span-12 text-center bg-sledpro-tesla bg-cover bg-center lg:py-72 py-36'>
              <div className='relative'>
                <p className='font-roboto text-white font-medium text-2xl'>
                  Smart Sled Pro
                </p>
                <h3 className="font-bebas font-semibold lg:text-8xl text-4xl text-white leading-none tracking-wider">
                  THE "TESLA"<br></br>
                  OF<br></br>
                  FITNESS SLEDS
                </h3>
              </div>
            </div>
            <div className='lg:col-span-6 col-span-12 space-y-6 relative'>
              <div className='grid grid-cols-12 lg:gap-14 gap-y-10 px-10'>
                <div className='lg:col-span-6 col-span-12 text-center space-y-3'>
                  <h3 className="font-bebas lg:text-3xl text-lg text-red-bc2026 leading-none tracking-wider">
                    Diverse Training for All Fitness Levels

                  </h3>
                  <p className="w-full text-lg text-white">
                    With multiple training modes and adjustable intensity, the Smart Sled Pro caters to a wide range of fitness levels. From beginners to elite athletes, users can customize their workout experience to suit their individual needs.
                  </p>
                </div>
                <div className='lg:col-span-6 col-span-12 text-center space-y-3'>
                  <h3 className="font-bebas lg:text-3xl text-lg text-red-bc2026 leading-none tracking-wider">
                    Interactive and Dynamic Workouts
                  </h3>
                  <p className="w-full text-lg text-white">
                    The app-controlled functionality brings a new level of interactivity to workouts. Athletes and trainers can adjust resistance on the fly, ensuring workouts are dynamic and tailored to specific training needs.
                  </p>
                </div>
                <div className='lg:col-span-6 col-span-12 text-center space-y-3'>
                  <h3 className="font-bebas lg:text-3xl text-lg text-red-bc2026 leading-none tracking-wider">
                    Data-Driven Training Approach
                  </h3>
                  <p className="w-full text-lg text-white">
                    Live data analytics provide valuable insights into each training session, allowing for a more scientific approach to fitness. This feature is especially beneficial for trainers and coaches to track progress and tweak training programs for maximum effectiveness.
                  </p>
                </div>
                <div className='lg:col-span-6 col-span-12 text-center space-y-3'>
                  <h3 className="font-bebas lg:text-3xl text-lg text-red-bc2026 leading-none tracking-wider">
                    Versatile Movement for Enhanced Agility

                  </h3>
                  <p className="w-full text-lg text-white">
                    With its multi-planar movement capability, the Smart Sled Pro is perfect for athletes requiring agility and quick direction changes in their sport, enhancing overall athletic performance.


                  </p>
                </div>
              </div>


            </div>

          </div>



        </div>

        <div className="bg-red-bc2026 w-full">
          <div className="max-w-8xl m-auto flex flex-wrap lg:py-36 h-auto items-center">
            <div className="lg:w-8/12 m-auto w-full lg:p-0 p-5 text-center lg:space-y-8 space-y-5">
              <p className='font-roboto text-white font-medium text-2xl'>
                Revolutionize your Fitness Sled Training

              </p>
              <h3 className="font-bebas font-bold lg:text-main-banner-title text-4xl text-white leading-none tracking-wider">
                CHALLENGE YOUR ATHLETES.<br></br>
                TAKE IT TO THE NEXT LEVEL.

              </h3>
              <button className="lg:w-56 w-1/2 h-14 bg-white uppercase hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-semibold text-red-bc2026 hover:text-white tracking-wide">
                request your demo
              </button>


            </div>

          </div>
        </div>






        <div className="w-full py-10 bg-darkgunmetal">
          <div className="max-w-7xl m-auto">
            <div className='text-center max-w-xl m-auto pb-10'>
              <p className='font-roboto text-white font-medium text-2xl'>
                Our Clients
              </p>
              <h3 className="font-bebas font-bold lg:text-6xl text-2xl text-white leading-none tracking-wider">
                Don’t just take our word for it

              </h3>
            </div>
            <div className="flex flex-wrap lg:p-5 p-5 bg-white">
              <div className="flex flex-wrap lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://cms.bodykore.com/uploads/Riley_Tejcek_USA_Bobsled_Captain_9325c739f3.mp4'}
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
                  onPlay={() => { }}
                />
                <div className='text-center w-full py-2'>
                  <ul className='font-roboto text-base leading-normal'>
                    <li>Team USA Bobsled Pilot 🛷</li>
                    <li>USMC Captain🇺🇸</li>
                    <li>Ms. Military ‘23 👑</li>
                    <li><Link href={'https://www.instagram.com/riley.tejcek'}>Instagram Profile</Link> </li>
                  </ul>
                  <h5 className='font-bebas text-red-bc2026 font-semibold text-2xl'>Riley Tejcek</h5>
                  <p>USA Bob Sled Pilot</p>
                  <p></p>
                </div>
              </div>
              <div className="flex flex-wrap lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://cms.bodykore.com/uploads/Football_Speed_and_Agility_Coach_Dylan_Bradley_s_review_of_the_Body_Kore_Smart_Sled_Pro_96c3f77db2.mp4'}
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
                  onPlay={() => { }}
                />
                <div className='text-center w-full py-2'>
                  <ul className='font-roboto text-base leading-normal'>
                    <li>Wide Reciever Trainer 🏈</li>
                    <li>Performance Coach 💪🏼</li>
                    <li>Youth to NFL 🏆</li>

                  </ul>
                  <h5 className='font-bebas text-red-bc2026 font-semibold text-2xl'>Dillon Bradley</h5>
                  <p>Athletic Performance Coach</p>
                  <p></p>
                </div>

              </div>

              <div className="flex flex-wrap lg:w-1/3 w-full p-2">
                <ReactPlayer
                  style={{ objectFit: 'cover' }}
                  className="lg:h-64 h-60 w-full videoBox"
                  url={'https://cms.bodykore.com/uploads/Laura_Gordon_Soccer_Story_4f322caf57.mp4'}
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
                  onPlay={() => { }}
                />
                <div className='text-center w-full py-2'>
                  <ul className='font-roboto text-base leading-normal'>
                    <li>Human Performance Psych 🧬🧠</li>
                    <li>Ph.D. candidate, J.D.,🏋🏻‍♀️</li>
                    <li>Lead Performance Coach</li>
                    <li><Link href={'https://www.instagram.com/lauragordon__'}>Instagram Profile</Link> </li>
                  </ul>
                  <h5 className='font-bebas text-red-bc2026 font-semibold text-2xl'>Laura Gordon
                  </h5>
                  <p>Athlete/Former Soccer Player
                  </p>
                  <p></p>
                </div>

              </div>
              <div className="flex lg:flex-row flex-wrap w-full justify-center lg:px-40">



                <div className="lg:w-1/2 w-full">
                  <div className="bg-white py-5 px-10 rounded-lg text-gray-800 text-center">
                    <p className="font-bebas leading-tight">
                      <div className="flex justify-center mb-2">

                        <Image
                          src="https://cms.bodykore.com/uploads/Carson_0e0231620a.png"
                          className="rounded-full shadow-lg  object-cover"
                          width={80}
                          height={80}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />

                      </div>
                    </p>
                    <p className="h-24">I'm used to a lot of power sleds. I played football at the collegiate level, but this one was hard to push, especially when it starte moving. It really engaged my core.
                    </p>


                    <h5 className='font-bebas text-red-bc2026 font-semibold text-2xl'>
                      Carson
                    </h5>


                    <h5 className="text-sm tracking-wide font-roboto">
                      Athlete
                    </h5>

                  </div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="bg-white py-5 px-10 rounded-lg text-gray-800 text-center">
                    <p className="font-bebas leading-tight">
                      <div className="flex justify-center mb-2">

                        <Image
                          src="https://cms.bodykore.com/uploads/Brendan_Mahonn_f8c197867c.png"
                          className="rounded-full shadow-lg  object-cover"
                          width={80}
                          height={80}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />

                      </div>
                    </p>
                    <p className="h-24">
                      Personally I wish I had something like this when I was growing up. My speed, my athleticisim, it would have helped... the sled is old school. This is new school.

                    </p>


                    <h5 className='font-bebas text-red-bc2026 font-semibold text-2xl'>
                      Brendan Mahonn
                    </h5>


                    <h5 className="text-sm tracking-wide font-roboto">
                      Athlete
                    </h5>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
        <div className="bg-3Dsledpro w-full">
          <div className="max-w-8xl m-auto flex flex-wrap lg:py-36 h-auto items-center">
            <div className="lg:w-8/12 m-auto w-full lg:p-0 p-5 text-center lg:space-y-8 space-y-5">

              <h3 className="font-bebas font-bold lg:text-main-banner-title text-3xl text-white leading-none tracking-wider">
                Outperform, Outlast:<br></br>
                Take the Smart Sled Challenge.

              </h3>


            </div>

          </div>
        </div>
        <div className="w-full py-10 bg-darkgunmetal m-auto">
          <div className="max-w-6xl m-auto">
            <div className='lg:w-7/12 w-full m-auto lg:p-0 p-5'>
              <p className='font-roboto text-white font-medium text-2xl text-center'>
                FAQ

              </p>
              <h3 className="font-bebas font-bold lg:text-6xl text-2xl text-white leading-none tracking-wider text-center pb-5">
                ask us
                anything

              </h3>
              <div className="">
                {mapFaqs().map((a, i) => {
                  return (
                    <div className="flex flex-col border-t border-red" key={i}>
                      <button
                        className="py-3 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
                        onClick={() => toggleAccordion(i)}
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            onClick={() => toggleAccordion(i)}
                            src={`${active === i
                              ? '/svg/substraction.svg'
                              : '/svg/sum.svg'
                              }`}
                            alt=""
                            width={17}
                            height={17}
                          />
                          <p className="inline-block text-footnote light font-bebas text-3xl tracking-wide text-red-bc2026 text-left">
                            {a.question}
                          </p>
                        </div>
                      </button>
                      {active === i && (
                        <div>
                          <div className="overflow-auto transition-height duration-700 ease-in-out faqs-container">
                            <div
                              className="pl-8 pb-4 text-white text-base tracking-wide"
                              dangerouslySetInnerHTML={{ __html: a.answer }}
                            />
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-darkgunmetal m-auto justify-center pt-10'>
          <div className='grid grid-cols-12 justify-center m-auto'>
            <div className='lg:col-span-6 col-span-12 lg:pl-48 p-5 lg:pr-32'>

              <p className='font-roboto text-white font-medium text-2xl'>
                Train with the Best

              </p>
              <h3 className="font-bebas font-bold lg:text-8xl text-2xl text-white leading-none tracking-wider pb-10">
                TAKE IT TO THE NEXT LEVEL.
              </h3>
              <button className="text-lg lg:w-2/6 w-full uppercase h-14 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-md font-roboto font-semibold text-white-f2f9fa tracking-wide">
                Get A Demo
              </button>
            </div>
            <div className='lg:col-span-6 col-span-12 p-5'>
              <Image
                src="https://cms.bodykore.com/uploads/bkore_mergeimage_4f67dde4d6.png"
                className=""
                width={900}
                height={600}
                placeholder="blur"
                blurDataURL="/loading.png"
              />

            </div>
          </div>
        </div>


        <div className="bg-sledzoom w-full relative p-5">
          < div className="absolute inset-0 bg-black opacity-50" ></div>

          <div className="max-w-8xl m-auto flex flex-wrap lg:py-36 h-auto items-center relative z-10">
            <div className="lg:w-8/12 m-auto w-full lg:p-0 p-5 text-center ">
              <p className='font-roboto text-red-bc2026 font-medium text-2xl'>Peak Athletic Performance</p>
              <h3 className="font-bebas font-bold lg:text-8xl text-2xl text-white leading-none tracking-wider">
                Achieve Excellence.<br></br>
                Embrace the Smart Sled.

              </h3>


            </div>
            <div ref={excellenceRef} className='max-w-6xl m-auto'>
              <div className='grid grid-cols-12 gap-5 py-10'>
                {excellence.map((ele, index) => <div key={index} className='lg:col-span-4 col-span-12 text-center'>
                  <h6 className='font-bebas font-extrabold text-9xl leading-none text-red-bc2026'>
                    {ele.percentage}
                  </h6>
                  <p className='font-roboto font-semibold text-2xl text-white'>{ele.title}</p>
                  <p className='font-roboto text-base text-white'>
                    {ele.description}
                  </p>
                </div>)}

              </div>
            </div>

          </div>
        </div>


        <div className="bg-red-bc2026 w-full">
          <div className="max-w-8xl m-auto flex flex-wrap lg:py-16 h-auto items-center">
            <div className="lg:w-8/12 m-auto w-full lg:p-0 p-5 text-center">
              <p className='font-roboto text-white font-medium text-2xl'>
                Smart Sled Pro by BodyKore
              </p>
              <h3 className="font-bebas font-bold lg:text-main-banner-title text-4xl text-white leading-none tracking-wider">
                about us

              </h3>


            </div>

          </div>
        </div>

        <div className="w-full bg-darkgunmetal">

          <div className='grid grid-cols-12 lg:space-x-8 space-y-8 items-center m-auto'>

            <div className='lg:col-span-5 col-span-12 text-center bg-sledpro-bottomimage bg-cover bg-right lg:h-opt4right h-96'>
            </div>
            <div className='lg:col-span-7 col-span-12 space-y-6'>
              <div className='grid grid-cols-12 lg:gap-14 lg:gap-y-10 gap-y-5 lg:px-10 px-5'>
                <div className='col-span-12'>
                  <h3 className="font-bebas font-bold lg:text-7xl text-center text-2xl text-red-hover leading-none tracking-wider">
                    Driven by Passion.<br></br>
                    Proven by Performance.

                  </h3>
                </div>
                <div className='lg:col-span-6 col-span-12 text-left space-y-3'>

                  <p className="w-full text-lg text-white">
                    At BodyKore, innovation isn’t just a buzzword––it’s our foundation. Established in 2005 in Los Angeles, California we’ve been at the forefront of revolutionizing fitness equipment, expanding our reach across three continents. Our journey is fueled by a passion for excellence and a commitment to quality that’s evident in every piece of equipment we design.


                  </p>
                </div>
                <div className='lg:col-span-6 col-span-12 text-left space-y-3'>

                  <p className="w-full text-lg text-white">
                    Our diverse team of product specialists, engineers, kinesiologists, and designers shares a common goal: to enhance your fitness experience. We blend cutting-edge technology with biomechanical precision to create equipment that not only meets but exceeds industry standards. The Smart Sled Pro is a testament to our innovation––a product that redefines versatility and efficiency in training.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscriptionSledPro />
      {popup && <DemoSledPro setPopup={setPopup}/>}
    </>
  );
};

export default SmartPro;
