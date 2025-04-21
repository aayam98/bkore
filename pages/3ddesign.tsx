import { GetServerSideProps } from 'next';
import { getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FAQStrapi } from 'services/strapi/faq';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import SquatBoxFaq from '@components/ui/bodykore/Sections/SquatBoxFaq';
import Slider from 'react-slick';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: {
      header,
    },
  };
};

export default function ThreeDDesign() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [sendEmail, setSendEmail] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('sendEmail')) {
      setSendEmail(false);
    }
  }, [sendEmail]);

  const [faqs, setFaqs] = useState<FAQStrapi[]>([
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'What Are The Essential Pieces Of Equipment For A Home Gym?',
        answer:
          'Essential equipment for most home gyms includes a weight rack, a barbell, a weight bench, weight plates, and potentially other items like dumbbells, plyo boxes, and cardio machines, depending on individual workout preferences​​.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'How Should I Budget For A Home Gym?',
        answer:
          'Determine how much you’re willing to spend total on home gym equipment. Home gym setups can range from $600 to several thousand dollars. Consider financing options if paying in full upfront isn’t feasible​​.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question:
          'What Should I Consider In Terms Of Exercise Style And Weight Load?',
        answer:
          'Identify the types of exercises you want to do and ensure the equipment matches your workout preferences. Also, research the weight capacity of the equipment, especially if you are an experienced lifter​​.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'How Do I Choose The Right Size Equipment For My Space?',
        answer:
          'Before purchasing, consider the dimensions and weight of the machine and determine where it will be placed. Some home gyms are bulky and hard to move, while others are more compact or foldable for easy storage​​.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'What Is 3D Gym Design?',
        answer:
          '3D Gym Design is a service that creates a virtual model of your home gym before installation. It allows you to visualize the layout, equipment, and overall design of your gym in a realistic 3D environment.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'How Does The 3D Design Process Work?',
        answer:
          'The process typically starts with a consultation to understand your preferences and space dimensions. Then, a detailed 3D model is created, allowing for revisions and finalization before the actual setup.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'Can I Customize The Equipment And Layout In The 3D Design?',
        answer:
          'Yes, the 3D design process is highly customizable. You can choose different equipment, alter layouts, and even experiment with color schemes to create a gym that perfectly suits your needs.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question:
          'How Accurate Are The 3D Designs Compared To The Final Setup?',
        answer:
          'The 3D designs are made to be as realistic as possible, giving you an accurate representation of what your gym will look like. However, slight variations may occur during actual installation due to physical constraints.',
      },
    },
  ]);

  // const [sendEmail, setSendEmail] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 6000,
        },
      },
    ],
  };

  const [modalLighBox, setModalLighBox] = useState(false);
  const [modalLighBoxVideo, setModalLighBoxVideo] = useState(false);
  const [modalContent, setModalContent] = useState({
    url: '',
  });
  const [modalContentVideo, setModalContentVideo] = useState({
    url: '',
  });

  const [threeDs, setThreeDs] = useState([
    {
      url: 'https://cms.bodykore.com/uploads/below1_5440f4b9cd.jpeg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/below2_2838c66d00.jpg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/below3_3194072bf5.jpeg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/below4_31b376d740.jpeg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/below5_cb21d9b84d.jpeg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/below6_464a7d102d.jpeg',
    },
  ]);

  const [sliderImages, setSliderImages] = useState([
    {
      url: 'https://cms.bodykore.com/uploads/Hollywood_Hills_b17b142e0d.jpeg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/brentwood_e81572f458.jpg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/Beverly_7e941f9afd.jpeg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/Bel_Air_8ecfcc1ad4.jpg',
    },
    {
      url: 'https://cms.bodykore.com/uploads/Gym_above_the_stars_5f9e3a8668.jpg',
    },
  ]);
  const [sliderImages2, setSliderImages2] = useState([
    {
      image:
        'https://cms.bodykore.com/uploads/Rashawn_and_Christina_b4bc197660.jpg',
      url: 'https://youtu.be/f0SN2pRRNmU?si=PmOlbCqAMQIQhuW0',
    },
    {
      image: 'https://cms.bodykore.com/uploads/Luciano_211698b942.jpg',
      url: 'https://youtu.be/gbUCr090F6w?si=jUqk5SRdNYf92Geb',
    },
    {
      image: 'https://cms.bodykore.com/uploads/kay_ca78f91d25.jpg',
      url: 'https://youtu.be/RbbQyNespAs?si=WFEKw8tF7eLS7oIT',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, setValue, getValues, reset } =
    useForm({
      mode: 'onBlur',
      defaultValues: {
        name: '',
        email: '',
        message: '',
      },
    });

  const onSubmit = async (data: any) => {
    console.log(data);
    setLoading(true);

    const body = JSON.stringify(Object.assign(data));
    const res = await (
      await fetch('/api/threeddesign', { method: 'POST', body })
    ).json();
    setSuccess(res);
    setLoading(false);
    reset();

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    console.log('Captcha value:', value);
  };

  return (
    <>
      <SeoHeader seo={seo.threeddesign} />
      <div>
        <main>
          <div className="relative w-full">
            <Image
              className="w-full h-auto object-cover"
              width={1425}
              height={650}
              src="https://cms.bodykore.com/uploads/3_D_Gym_Design_Body_Kore_Fitness_Equipment_3777cbb0ba.jpg"
              alt="3D Gym Design"
              layout="responsive"
            />
            <div className="absolute top-1/4 flex flex-col items-center w-full">
              <h5 className="lg:text-threedtext text-6xl italic font-bold leading-tight font-bebas text-white">
                3D Gym Design
              </h5>
              <a
                className="text-center rounded-lg transition duration-700 ease-in-out lg:py-3 py-2 lg:px-10 px-3 font-roboto uppercase font-bold tracking-wide lg:text-xl text-lg border-2 bg-white text-red-bc2026 border-red-bc2026 hover:bg-red-hover hover:text-white hover:border-white"
                href="#scheduleform"
              >
                Request a Free Consultation
              </a>
            </div>
          </div>
          <div className="lg:p-20 p-6 bg-white">
            <div className="lg:space-y-6 space-y-4 ">
              <p className="text-red-bc2026 font-roboto font-medium text-lg">
                Visualize and Create Your Ideal Fitness Space
              </p>
              <h6 className="text-gray-800 font-bebas lg:text-6xl text-5xl leading-none font-bold">
                BRING YOUR DREAM GYM TO LIFE<br></br>
                WITH OUR EXPERT 3D DESIGN SERVICE
              </h6>
              <p className="font-roboto text-gray-600 lg:text-xl text-base lg:leading-8 leading-normal lg:w-9/12 w-full">
                At BodyKore, we specialize in bringing the professional gym
                experience into the comfort and convenience of your home. Our
                Home Gym 3D Design Service is crafted to transform your personal
                space into your ideal workout sanctuary.
                <br></br>
                Whether you’re looking to create a compact fitness corner or a
                fully-equipped home gym, our team is dedicated to designing a
                space that aligns perfectly with your fitness aspirations and
                lifestyle needs.
              </p>
            </div>
          </div>

          {/* 2column banner */}

          <div className="bg-white">
            <div className="flex lg:flex-row flex-col lg:items-center lg:align-middle">
              <div className="lg:w-1/2 w-full">
                <div className="flex">
                  <div className="lg:pl-20 px-6 space-y-3">
                    <h6 className="text-gray-800 font-bebas lg:text-5xl text-3xl leading-none font-bold">
                      YOUR HOME IS UNIQUE, <br></br>AND SO SHOULD BE YOUR GYM
                    </h6>
                    <p className="font-roboto text-gray-600 lg:text-lg text-base lg:leading-8 leading-normal">
                      Visualize the transformation of your space with our
                      advanced 3D rendering technology.
                    </p>
                    <ul className="font-montserrat text-base font-medium leading-8">
                      <li className="flex items-center gap-x-2">
                        {' '}
                        <Image
                          className="rounded-lg"
                          src={`/squatbox/check.svg`}
                          height={20}
                          width={20}
                          objectFit="contain"
                        ></Image>
                        Tailored Customization for Home Spaces
                      </li>
                      <li className="flex items-center gap-x-2">
                        {' '}
                        <Image
                          className="rounded-lg"
                          src={`/squatbox/check.svg`}
                          height={20}
                          width={20}
                          objectFit="contain"
                        ></Image>
                        Realistic 3D Visualizations
                      </li>
                      <li className="flex items-center gap-x-2">
                        {' '}
                        <Image
                          className="rounded-lg"
                          src={`/squatbox/check.svg`}
                          height={20}
                          width={20}
                          objectFit="contain"
                        ></Image>
                        Expert Guidance at Every Step
                      </li>
                    </ul>

                    <div className="pt-5 lg:pb-0 pb-10">
                      <a
                        className="text-center transition duration-700 ease-in-out w-72 lg:py-3 py-2 lg:px-6 px-3 font-roboto uppercase font-bold tracking-wide
                       lg:text-lg text-lg  border-2 bg-white text-red-bc2026 border-red-bc2026 hover:bg-red-hover hover:text-white hover:border-white"
                        href="#scheduleform"
                      >
                        {' '}
                        Let's get started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full p-6">
                <div className="player-wrapper2">
                  <ReactPlayer
                    className="react-player2"
                    url={
                      'https://cms.bodykore.com/uploads/Body_Kore_Home_Gym_Installation_in_Brentwood_Best_Gym_Design_and_Install_Company_in_2023_77a83390fc.mp4'
                    }
                    playing={true}
                    loop={true}
                    controls={true}
                    muted={false}
                    volume={0}
                    width="100%"
                    height="100%"
                    playsInline={true}
                    playbackRate={1}
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

          <div className="bg-white">
            <div className="flex lg:flex-row flex-col">
              <div className="lg:w-1/2 w-full lg:h-opt9top h-96 bg-left3d bg-center flex flex-col items-center align-middle justify-center">
                <h5 className="text-white text-3xl font-roboto font-semibold pb-5 shadowtext">
                  How it Works
                </h5>
                <h2 className="text-white lg:text-7xl text-3xl font-bebas font-black leading-tight">
                  STEP BY STEP PROCESS
                </h2>
              </div>

              <div className="flex lg:w-1/2 w-full items-center align-middle">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-center align-middle p-10">
                  <div className="space-y-1">
                    <Image
                      className="rounded-lg"
                      src={`/squatbox/icon.svg`}
                      height={60}
                      width={60}
                      objectFit="contain"
                    ></Image>
                    <h2 className="text-gray-900 text-2xl font-bebas tracking-wide">
                      CONSULTATION AND SPACE ASSESSMENT
                    </h2>
                    <p className="lg:h-36 h-auto text-gray-700 text-base font-roboto font-normal">
                      Our experts engage with you to understand your fitness
                      goals, preferences, and the specificities of your home
                      space. We consider everything from room dimensions to
                      lighting, ensuring that every aspect of your space is
                      assessed for optimal gym design.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Image
                      className="rounded-lg"
                      src={`/svg/rendering.svg`}
                      height={60}
                      width={60}
                      objectFit="contain"
                    ></Image>
                    <h2 className="text-gray-900 text-2xl font-bebas tracking-wide">
                      CONCEPTUALIZATION AND 3D RENDERING
                    </h2>
                    <p className="lg:h-36 h-auto text-gray-700 text-base font-roboto font-normal">
                      Post-consultation, our design team gets to work,
                      transforming your vision into a detailed 3D model. This
                      step is where your dream gym starts taking shape – from
                      the placement of each machine to the overall layout and
                      aesthetic.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Image
                      className="rounded-lg"
                      src={`/svg/edit3d.svg`}
                      height={60}
                      width={60}
                      objectFit="contain"
                    ></Image>
                    <h2 className="text-gray-900 text-2xl font-bebas tracking-wide">
                      REVISIONS AND FINALIZATION
                    </h2>
                    <p className="lg:h-32 h-auto text-gray-700 text-base font-roboto font-normal">
                      We collaborate closely with you to refine the design. This
                      phase is all about tweaking and adjusting until everything
                      feels just right. Whether it's changing equipment
                      positions, altering color schemes, or adding additional
                      features, we're committed to perfecting your space until
                      it meets your absolute satisfaction.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Image
                      className="rounded-lg"
                      src={`/svg/implementation.svg`}
                      height={60}
                      width={60}
                      objectFit="contain"
                    ></Image>
                    <h2 className="text-gray-900 text-2xl font-bebas tracking-wide">
                      IMPLEMENTATION SUPPORT
                    </h2>
                    <p className="lg:h-32 h-auto text-gray-700 text-base font-roboto font-normal">
                      Once the final design is approved, we don’t just leave you
                      with a plan. Our team provides comprehensive support to
                      bring the design to life. From recommending trusted
                      installers to guiding you through the equipment setup, we
                      ensure a smooth and hassle-free implementation of your
                      home gym.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pt-20 pb-10 lg:max-w-8xl m-auto">
            <h2 className="text-gray-900 lg:text-6xl text-2xl font-bebas font-bold text-center">
              3D DESIGN PROCESS
            </h2>
            <div className="video-wrapper lg:mx-20 mx-6 grid grid-cols-2 gap-4">
              {/* First Video */}
              <div className="video-container h-96">
                <video
                  className="w-full h-full object-cover rounded shadow-md"
                  controls
                  controlsList="nodownload"
                  muted={false}
                  loop
                  playsInline
                >
                  <source
                    src="https://cdn.shopify.com/videos/c/o/v/806ca76b1f1e4c19b5b147cdfb1fd275.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Second Video */}
              <div className="video-container h-96">
                <video
                  className="w-full h-full object-cover rounded shadow-md"
                  controls
                  controlsList="nodownload"
                  muted={false}
                  loop
                  playsInline
                >
                  <source
                    src="https://cms.bodykore.com/uploads/PASO_ROBLES_3_D_VIDEO_a3d283904a.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>


            <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 lg:px-20 px-6">
              {threeDs.map((ele, index) => (
                <div
                  className="relative"
                  key={index}
                  onClick={() => {
                    setModalLighBox(true);
                    setModalContent(ele);
                  }}
                >
                  <div
                    className="h-full w-full absolute top-0 left-0 bg-gray-600 bg-opacity-10"
                    style={{ zIndex: 9999 }}
                  ></div>
                  <Image
                    src={ele.url}
                    height={350}
                    width={500}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                    objectFit="cover"
                  ></Image>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black py-5">
            <div className="max-w-7xl m-auto">
              <div className="lg:flex lg:flex-row lg:py-5 p-3 items-center justify-center align-middle text-white text-left font-roboto lg:text-lg text-base gap-10">
                <ul className="space-y-5">
                  <li className="flex items-start gap-x-2 leading-7">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={50}
                      width={20}
                      objectFit="contain"
                      style={{ padding: '20px' }}
                    ></Image>
                    Initial Floor Plan: Detailed blueprint showcasing the layout
                    and dimensions of your space.
                  </li>
                  <li className="flex items-start gap-x-2 leading-7">
                    {' '}
                    <Image
                      className="rounded-lg"
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                      objectFit="contain"
                    ></Image>
                    3D Mockup Creation: Realistic 3D model that visualizes your
                    gym’s design and equipment placement.
                  </li>
                  <li className="flex items-start gap-x-2 leading-7">
                    {' '}
                    <Image
                      className="rounded-lg"
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                      objectFit="contain"
                    ></Image>
                    Multiple Angle Views: Comprehensive images from various
                    angles for a thorough visual understanding.
                  </li>
                </ul>
                <ul className="space-y-5">
                  <li className="flex items-start gap-x-2 leading-7">
                    {' '}
                    <Image
                      className="rounded-lg"
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                      objectFit="contain"
                    ></Image>
                    Customizable Features: Ability to adjust equipment, colors,
                    and layout based on your preferences.
                  </li>
                  <li className="flex items-start gap-x-2 leading-7">
                    {' '}
                    <Image
                      className="rounded-lg"
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                      objectFit="contain"
                    ></Image>
                    Final 3D Rendering: Immersive, high-quality renderings that
                    bring your gym design to life.
                  </li>
                  <li className="flex items-start gap-x-2 leading-7">
                    {' '}
                    <Image
                      className="rounded-lg"
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                      objectFit="contain"
                    ></Image>
                    3D Fly-Through Experience: Interactive virtual tour
                    providing a dynamic view of your future gym.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2column banner */}

          <div className="lg:py-24 p-6 bg-black text-center font-montserrat lg:mt-28">
            <div className="max-w-7xl m-auto">
              <h5 className="text-red-bc2026 font-roboto lg:text-2xl text-base font-medium pb-5 textshadow">
                Custom 3D Designs for Home and Commercial Gyms
              </h5>
              <h2 className="text-white lg:text-6xl text-3xl font-bebas font-black capitalize leading-tight pb-3">
                WHY CHOOSE BODYKORE?
              </h2>
              <p className="text-white lg:text-lg text-base lg:leading-8 leading-normal font-roboto pb-5 lg:w-5/6 m-auto lg:px-0 px-3">
                BodyKore excels in designing and outfitting both home gyms and
                commercial fitness spaces with a perfect blend of functionality,
                durability, and aesthetic appeal. Our experienced team,
                comprised of fitness enthusiasts and design experts, ensures
                every gym is tailored to individual needs and space constraints.
                From realistic 3D visualizations to the final setup, we provide
                end-to-end solutions, guaranteeing a seamless and satisfying
                experience.
                <br></br>
                With BodyKore, you’re not just getting gym equipment; you’re
                investing in a comprehensive fitness solution that supports your
                journey every step of the way.
              </p>
            </div>
          </div>

          <div className="py-14 bg-gray-300" ref={targetRef}>
            <div className="max-w-8xl m-auto lg:px-12 px-6">
              <Slider className="z-50" {...settings}>
                {sliderImages.map((el, i) => (
                  <div className="p-2" key={i}>
                    <Image
                      key={i}
                      className="rounded-md"
                      src={el.url}
                      height={350}
                      width={450}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="lg:py-14 py-6 bg-black">
            <div className="max-w-8xl m-auto lg:px-12 px-0">
              <div className="text-center">
                <h5 className="text-red-bc2026 text-2xl font-montserrat font-semibold pb-5 textshadow">
                  Our Clients
                </h5>
                <h2 className="text-white lg:text-6xl text-3xl font-bebas font-black capitalize leading-tight pb-10">
                  SEE WHAT OUR <br></br>CLIENTS ARE SAYING
                </h2>
              </div>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 lg:px-20 px-6">
                <div className="text-center lg:py-0 py-5">
                  <div className="flex flex-row items-center justify-center gap-2 pb-3">
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                  </div>
                  <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                    The 3D design service from BodyKore transformed my vision
                    into reality. Seeing the layout and equipment placement in
                    advance was invaluable. The team was professional and
                    responsive, guiding me through every step. Now, my home gym
                    is everything I dreamed of and more!
                  </p>
                  <h4 className="text-red-bc2026 text-2xl font-montserrat font-black capitalize leading-tight">
                    JORDAN S.
                  </h4>
                  <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                    BodyKore Customer
                  </h5>
                </div>
                <div className="text-center lg:py-0 py-5">
                  <div className="flex flex-row items-center justify-center gap-2 pb-3">
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                  </div>
                  <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                    As a gym owner, I needed a precise and efficient design for
                    our new facility. BodyKore's 3D design service exceeded my
                    expectations. The realistic visualizations and expert advice
                    made the process seamless. Our members love the new space!
                  </p>
                  <h4 className="text-red-bc2026 text-2xl font-montserrat font-black capitalize leading-tight">
                    {' '}
                    EMILY R.
                  </h4>
                  <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                    BodyKore Customer
                  </h5>
                </div>

                <div className="text-center lg:py-0 py-5">
                  <div className="flex flex-row items-center justify-center gap-2 pb-3">
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                  </div>
                  <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                    BodyKore's 3D design service was a game-changer for setting
                    up my commercial gym. The detailed renderings allowed me to
                    fine-tune the layout before any equipment was installed. The
                    result is a perfectly optimized gym that our clients can't
                    stop raving about.
                  </p>
                  <h4 className="text-red-bc2026 text-2xl font-montserrat font-black capitalize leading-tight">
                    {' '}
                    MICHAEL T.
                  </h4>
                  <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                    BodyKore Customer
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="py-14 bg-gray-300 " ref={targetRef}>
            <div className="max-w-8xl m-auto px-12">
              <Slider className="z-50" {...settings}>
                {sliderImages2.map((el, i) => (
                  <div
                    key={i}
                    className="p-2"
                    onClick={() => {
                      setModalLighBoxVideo(true);
                      setModalContentVideo(el);
                    }}
                  >
                    <Image
                      key={i}
                      className="rounded-md "
                      src={el.image}
                      height={350}
                      width={450}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="py-10">
            <SquatBoxFaq
              title1="FREQUENTLY ASKED"
              title2="QUESTIONS"
              accordion={faqs.map((item) => ({
                question: item.attributes.question,
                answer: item.attributes.answer,
                type: item.attributes.faq_type.data.attributes.title,
              }))}
            />
          </div>

          <div
            className="lg:py-24 py-10 bg-black text-center"
            id="scheduleform"
          >
            <div className="max-w-7xl m-auto lg:px-0 px-6">
              <h5 className="text-white lg:text-6xl text-lg  font-bold pb-5 shadowtext font-bebas leading-none tracking-wider">
                START YOUR GYM DESIGN <br></br>JOURNEY TODAY
              </h5>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid lg:grid-cols-2 grid-cols-1 gap-5"
                action="#"
                method="POST"
              >
                <div className="lg:col-span-1 col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm text-left font-medium text-white"
                  >
                    Name
                    <span className="text-sm font-medium text-red-bc2026 pl-1">
                      *
                    </span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      className="w-full py-3 rounded-md px-3"
                      placeholder="Enter your name"
                      {...register('name', { required: true })}
                      required
                    />
                  </div>
                </div>
                <div className="lg:col-span-1 col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm text-left font-medium text-white"
                  >
                    Email
                    <span className="text-sm font-medium text-red-bc2026 pl-1">
                      *
                    </span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="text"
                      autoComplete="email"
                      className="w-full py-3 rounded-md px-3"
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      required
                    />
                  </div>
                </div>
                <div className="lg:col-span-2 col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm text-left font-medium text-white"
                  >
                    Message
                    <span className="text-sm font-medium text-red-bc2026 pl-1">
                      *
                    </span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      className="w-full py-3 rounded-md px-3"
                      id="Textarea"
                      placeholder="Your message"
                      style={{ maxHeight: '250px', minHeight: '100px' }}
                      {...register('message', { required: true })}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="lg:col-span-2 col-span-full">
                  <ReCAPTCHA
                    sitekey="6LfJ41MqAAAAABtBUo59qRaEbnVtYRFrykjeqZGa" // Replace with your Google reCAPTCHA v2 site key
                    onChange={handleCaptchaChange}
                  />
                </div>
                <div className="col-span-2">
                  {!loading && (
                    <button
                      disabled={!captchaValue}
                      className="uppercase bg-red-bc2026 hover:bg-red-hover py-4 text-white font-montserrat font-bold w-full rounded-md tracking-wide"
                    >
                      Schedule My Consultation
                    </button>
                  )}
                  {loading && (
                    <button className="uppercase bg-red-bc2026 px-6  py-2 text-white font-montserrat font-bold">
                      Submitting...
                    </button>
                  )}
                </div>
                {success && (
                  <p className="text-sm pt-2 text-green">
                    Your form has been sent successfully.
                  </p>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
      {modalLighBox && (
        <>
          <div
            className="bg-black bg-opacity-70 flex flex-col fixed h-auto w-auto justify-center items-center inset-0 overflow-x-hidden overflow-y-auto z-50"
            style={{ zIndex: 99999 }}
          >
            <div className="lg:w-imagepopupwidth w-96 justify-end flex ml-8 z-50">
              <button
                className="bg-white text-3xl p-1 rounded-full ml-2 -mb-8"
                onClick={() => setModalLighBox(false)}
              >
                <IoIosCloseCircleOutline style={{ color: '#000' }} />
              </button>
            </div>
            <div className=" flex flex-col  justify-center items-center">
              <div className="flex lg:w-imagepopupwidth w-96 lg:h-imagepopupheight h-full">
                <div className="relative p-2 flex-auto">
                  <Image
                    className=""
                    src={modalContent?.url}
                    height={560}
                    width={800}
                    alt="image"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {modalLighBoxVideo && (
        <>
          <div
            className="bg-black bg-opacity-70 flex flex-col fixed h-auto w-auto justify-center items-center inset-0 overflow-x-hidden overflow-y-auto z-50"
            style={{ zIndex: 99999 }}
          >
            <div className="lg:w-opt5top w-96 justify-end flex ml-8 z-50">
              <button
                className="bg-white text-3xl p-1 rounded-full ml-8 -mb-4"
                onClick={() => setModalLighBoxVideo(false)}
              >
                <IoIosCloseCircleOutline style={{ color: '#000' }} />
              </button>
            </div>
            <div className=" flex flex-col  justify-center items-center">
              <div className="flex lg:w-opt5top w-96 lg:h-smopt5right h-full player-wrapper2">
                <div className=" p-2 flex-auto react-player2 bg-white">
                  <ReactPlayer
                    className=""
                    url={modalContentVideo.url}
                    playing={false}
                    loop={false}
                    controls={true}
                    width="100%"
                    height="100%"
                    playsInline={true}
                    playbackRate={1}
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
