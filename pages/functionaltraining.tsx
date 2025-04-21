import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import ReactPlayer from 'react-player';
import { getProduct, Product } from 'services/shopify/storefront';
import SliderCard from '@components/ui/bodykore/SliderCard';
import { useForm } from 'react-hook-form';
import InspiredSpaces from '@components/ui/bodykore/InspiredSpaces';
import Image from 'next/image';
import { UseToster } from '@components/ui/ToasterUtil';
import Calendly from '@components/ui/Calndy';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const product = await getProduct('smart-sled-pro');
  return {
    props: { header, product },
    // revalidate: 30 * 60,
  };
};

interface FunctionalTrainingParams {
  header: HeaderData;
  product: Product;
}
export interface ContactFormTraining {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  time: string;
  phone: string;
  facilityType: string;
  facilityName: string;
  country: string;
  zipcode: string;
  privacy: boolean;
}

const FunctionalTraining = ({ header, product }: FunctionalTrainingParams) => {
  const [slider3, setSlider3] = React.useState<any>([
    {
      id: '1',
      title: 'Chelsea Hoyle',
      job: 'RCMC Medical Center',
      description:
        'The linx rack is a great storage solution help’s us keep our space clean and functional!',
      image: '/functionaltraining/chelsea.png',
    },
    {
      id: '2',
      title: 'Bert Flores',
      job: 'Work Fitness Center',
      description:
        'The linx rack is perfect for our group classes. Our clients are able to get to the equipment quickly and move through the group training.',
      image: '/functionaltraining/bert.png',
    },
    {
      id: '3',
      title: 'Magno Almeida',
      job: 'Gracie Gym O.C.',
      description:
        'We didn’t have a lot of space but the linx rack helped us maximize the efficiency of our gym.',
      image: '/functionaltraining/Magno.png',
    },
  ]);
  const [slider4, setSlider4] = React.useState<any>([
    {
      id: '1',
      title: 'Gracie Gym OC',
      image:
        'https://cms.bodykore.com/uploads/Gracie_Gym_OC_06_7146e44344.jpeg',
      link: '/portfolio/gracie-gym-oc',
    },
    {
      id: '2',
      title: 'RCMC Medical Center',
      image:
        'https://cms.bodykore.com/uploads/RCMC_Medical_Center_12_7dd3791ee2.jpeg',
      link: '/portfolio/rcmc-medical-center',
    },
    {
      id: '3',
      title: 'Represent Gym',
      image: 'https://cms.bodykore.com/uploads/Represent_Gym_1_fcf136128f.jpeg',
      link: '/portfolio/represent-gym',
    },
  ]);
 
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormTraining>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
   const { addToaster } = UseToster();
 
  const onSubmit = async (data: ContactFormTraining) => {
    setLoading(true);
  
    const timestamp = new Date().toISOString();
    const body = JSON.stringify({ ...data, timestamp });
    // console.log(body)
    const res = await (
      await fetch('/api/trainingcontact', { method: 'POST', body })
    ).json()
    setSuccess(res);
    setShowThankYou(true)
    addToaster({
      title: 'Success',
      message: 'Thank you for completing the form! Please check your email for a call invitation from our team..',
      duration: 5000,
      onClose: function (id: number): void {
        throw new Error('Function not implemented.');
      }
    })
    reset();
    setLoading(false);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
};




  return (
    <>
      {/* <SeoHeader seo={seo.FunctionalTrainingpro} /> */}
      <div>
        <div className="bg-universaltrainer-mainbannerr  bg-cover h-auto bg-center w-full">
          <div className="max-w-7xl m-auto flex flex-wrap lg:h-screen h-96 lg:items-center items-end">
            <div className="lg:w-10/12 w-full lg:p-0 p-5">
              <h3 className="font-bebas italic lg:text-main-banner-title font-bold tracking-wide text-5xl text-white leading-none">
                elevate your<br></br>functionality
              </h3>
              <p className="font-roboto text-white font-light tracking-wide lg:text-2xl text-lg pb-2 lg:w-4/6 w-full">
                Transform your gym while optimizing your space with BodyKore’s
                customizable functional training equipment.
              </p>
              <a href="#form">
                <button
                  className="border-black-373933 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-xl 
            text-white font-bebas lg:text-2xl text-lg lg:px-24 lg:py-4 px-3 py-4 tracking-wide"
                >
                  Schedule A Consultation Today!
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl m-auto px-5">
          <div className="bg-white pt-10 pb-10 text-white">
            <div className="text-center font-bebas text-2xl lg:text-5xl tracking-wide m-auto px-0 lg:px-0">
              <h3 className="pr-2 w-full text-center leading-tight font-normal italic text-black pb-5">
                benefits and features
              </h3>
            </div>

            <div className="pt-3 pb-3">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 items-center">
                <div>
                  <ReactPlayer
                    className="lg:h-full h-auto w-full videoBox"
                    url={'/functionaltraining/Hype_Reel_No_Models.mp4'}
                    playing={true}
                    loop={false}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="100%"
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
                <div className="space-y-2 lg:p-0 py-2">
                  <h4 className="text-red-bc2026 capitalize lg:text-4xl text-3xl font-bebas leading-none pt-2">
                    space optimization & member appeal
                  </h4>
                  <p className="text-gray-600 lg:text-lg text-base font-normal font-roboto tracking-normal">
                    Our Linx Rack functional training system offers a range of
                    sleek modular pieces, including a Single Bay, Smith Machine,
                    Cable Crossover and Storage Racks, to optimize the use of
                    your available space. Additional accessories include heavy
                    bag anchors, ball targets, resistance band anchors and more.
                    Our space-saving modular rack system offers a safe and
                    inviting atmosphere that caters to a wide range of
                    gym-goers, including seasoned athletes, everyday fitness
                    enthusiasts, cross-trainers and group fitness lovers. The
                    Linx Rack’s open environment encourages interaction, while
                    its aesthetically modern design creates an appealing
                    atmosphere for everyone.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 pb-3">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 items-center bg-black">
                <div className="col-span-1 lg:order-1 order-2 ">
                  <div className="space-y-2 lg:pl-10 p-5">
                    <h4 className="text-red-bc2026 capitalize lg:text-4xl text-3xl font-bebas leading-none pt-2">
                      100% CUSTOMIZABLE OPTIONS
                    </h4>
                    <p className="text-white lg:text-lg text-base font-normal font-roboto tracking-normal">
                      At BodyKore, we understand that every gym is unique, and
                      we believe that your functional fitness training zone
                      should reflect your vision and requirements. That’s why we
                      offer customization options for our wide range of
                      functional training equipment. From a Single Bay to the
                      Smith Machine, Cable Crossover and Storage Rack, multiple
                      accessories and additional functional training equipment,
                      including the RVR Rope and Smart Sled Pro, your functional
                      fitness training zone can be tailored to your gym’s exact
                      needs and specifications.
                    </p>
                  </div>
                </div>
                <div className="col-span-1 lg:order-2 order-1 lg:px-0 px-4">
                  <ReactPlayer
                    className="lg:h-full h-auto w-full videoBox"
                    url={'/functionaltraining/Links_Rack_Module_Slide_SHow.mp4'}
                    playing={true}
                    loop={false}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="100%"
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
            <div className="pt-3 pb-3">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 items-center">
                <div className="">
                  <ReactPlayer
                    className="lg:h-full h-auto w-full videoBox"
                    url={'/functionaltraining/Storage_1.mp4'}
                    playing={true}
                    loop={false}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="100%"
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
                <div className="space-y-2">
                  <h4 className="text-red-bc2026 capitalize lg:text-4xl text-3xl font-bebas leading-none pt-2">
                    STORAGE & STOCKING SOLUTIONS
                  </h4>
                  <p className="text-gray-600 lg:text-lg text-base font-normal font-roboto tracking-normal">
                    Say hello to more room and goodbye to clutter with the Linx
                    Rack Fitness Storage Racks. These high-quality
                    commercial-grade fitness racks are built to last so you can
                    easily organize everything from medicine balls
                    and dumbbells to weight plates and more to maximize your gym
                    space for the best possible member experience. Plus, we have
                    everything you need to stock your shelves, including the
                    innovative RVR Rope, Plyoboxes, Wall Balls, Slam Balls,
                    Battle Ropes, and Power Bags.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 pb-3 ">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 items-center bg-black">
                <div className="col-span-1 lg:order-1 order-2 ">
                  <div className="space-y-2 lg:pl-10 p-5">
                    <h4 className="text-red-bc2026 capitalize lg:text-4xl text-3xl font-bebas leading-none pt-2">
                      MEMBERS GET WHAT THEY WANT
                    </h4>
                    <p className="text-white lg:text-lg text-base font-normal font-roboto tracking-normal">
                      If you haven’t set up a functional fitness training zone
                      in your gym yet, what are you waiting for? According to a
                      report by Grand View Research, the global functional
                      fitness equipment market size is expected to reach $13.4
                      billion by 2028, driven by increasing awareness and demand
                      for versatile fitness equipment. Incorporating a
                      functional fitness training zone in your gym will not only
                      enhance client attraction and retention, but also promote
                      overall fitness and injury prevention while meeting client
                      demand for versatile fitness equipment.
                    </p>
                  </div>
                </div>
                <div className="col-span-1 lg:order-2 order-1">
                  <Image
                    src="/functionaltraining/banner2.jpg"
                    alt=""
                    className="object-cover w-full"
                    width={600}
                    height={338}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                </div>
              </div>
            </div>
            <div className="pt-3 pb-3">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 items-center">
                <div className="">
                  <ReactPlayer
                    className="lg:h-full h-auto w-full videoBox"
                    url={'/functionaltraining/Section_4__3D_Linx_Rack2.mp4'}
                    playing={true}
                    loop={false}
                    controls={true}
                    volume={1}
                    width="100%"
                    height="100%"
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
                <div className="space-y-2">
                  <h4 className="text-red-bc2026 capitalize lg:text-4xl text-3xl font-bebas leading-none pt-2">
                    OUR EXPERTS WILL HELP GUIDE YOU
                  </h4>
                  <p className="text-gray-600 lg:text-lg text-base font-normal font-roboto tracking-normal">
                    Need help configuring your space? With our expertise in
                    equipment layout and placement, we can provide guidance to
                    ensure a safe and visually appealing functional fitness
                    training zone. Using 2D and 3D renderings for your specific
                    space, we can design custom layouts inspired by your ideas,
                    bring them to life and show you what the finished product
                    will look like.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap align-middle items-center justify-center text-center lg:py-16 py-10 bg-gray-100">
          <h4 className="text-red-bc2026 lg:text-5xl text-2xl font-bebas pb-2 w-full leading-none">
            Want to elevate your gym's functionality? <br></br>
            <span className="text-gray-800 lg:text-3xl text-xl leading-none">
              Transform your gym today.{' '}
            </span>
          </h4>
          <a href="#form" className="pt-3">
            <button
              className="border-black-373933 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-xl 
            text-white font-bebas lg:text-2xl text-base lg:px-24 lg:py-4 px-3 py-4 tracking-wide"
            >
              yes! Schedule A Consultation.
            </button>
          </a>
        </div>

        <div className="bg-black py-16 text-white">
          <div className="flex flex-col justify-center items-center text-center font-bebas text-2xl lg:text-5xl tracking-wide m-auto px-4 lg:px-0">
            <h3 className="pr-2 lg:w-2/4 w-full text-center leading-tight font-normal italic">
              client success stories
            </h3>
            <p className="font-roboto font-light italic text-white text-lg leading-normal text-center tracking-wider">
              Satisfied gym owners who have utilized BodyKore's Functional
              Training Solutions
            </p>
          </div>
          <div className="max-w-7xl m-auto mt-5 lg:px-0 px-5">
            <SliderCard slider={slider3} card={true} />
          </div>
        </div>

        <div className="flex flex-wrap align-middle items-center justify-center text-center lg:py-16 py-10 bg-gray-100">
          <h4 className="text-red-bc2026 lg:text-5xl text-2xl font-bebas pb-2 w-full leading-none">
            Want to elevate your gym's functionality?<br></br>
            <span className="text-gray-800 lg:text-3xl text-xl leading-none">
              Let's talk!
            </span>
          </h4>
          <a href="#form" className="pt-3">
            <button
              className="border-black-373933 bg-red-bc2026 hover:bg-red-hover hover:-translate-x-10 rounded-xl 
            text-white font-bebas lg:text-2xl text-base lg:px-24 lg:py-4 px-3 py-4 tracking-wide"
            >
              yes! Schedule A Consultation.
            </button>
          </a>
        </div>
        <div className="bg-black py-16 text-white" id="form">
          <div className="flex flex-col justify-center items-center text-center font-bebas text-2xl lg:text-5xl tracking-wide m-auto px-4 lg:px-0">
            <h3 className="pr-2 lg:w-2/4 w-full text-center leading-tight font-normal italic">
              inspired spaces
            </h3>
          </div>
          <div className="max-w-6xl m-auto mt-5 lg:px-0 px-5">
            <InspiredSpaces slider={slider4} card={true} />
          </div>
        </div>

        <div className="max-w-3xl m-auto flex flex-wrap py-10 px-6 text-center">
          <h4 className="text-red-bc2026 lg:text-5xl text-3xl font-bebas w-full">
            Ready to get started?
            <span className="text-gray-800 pl-2">Schedule a consultation.</span>
          </h4>
          <p className="font-roboto text-gray-700 font-light lg:text-xl text-lg pb-2 lg:px-32 px-5 italic">
            Fill out the form below and one of our expert sales consultants will
            get back with you right away!
          </p>
          <div className="w-full">
          <iframe
            src="https://calendly.com/bodykore"
            style={{ width: "100%", height: "650px", border: "none" }}
            frameBorder="0"
            scrolling="no"
        />
          </div>
        </div>
      </div>
    </>
  );
};

export default FunctionalTraining;
