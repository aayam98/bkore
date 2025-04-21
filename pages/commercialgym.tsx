import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { HeaderData, getHeader } from '@utils/header';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { UseToster } from '@components/ui/ToasterUtil';
import ReCAPTCHA from 'react-google-recaptcha';

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  terms: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};
const BodykorePage = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const { addToaster } = UseToster();
  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    const timestamp = new Date().toISOString();
    const body = JSON.stringify({ ...data, timestamp });
    const res = await (
      await fetch('/api/contact', { method: 'POST', body })
    ).json();
    if (res) {
      addToaster({
        title: 'Success',
        message: 'Your message has been sent successfully',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      })
    } else {
      addToaster({
        title: 'Error',
        message: 'Your message has not been sent successfully',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      })
    }

    // setSuccess(res);
    reset();
    setLoading(false);
  };

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute md:-right-5 -right-9 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute md:-left-5 -left-9 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const equipmentItems = [
    { title: "PLATE LOADED", id: 'plate-loaded-section', icon: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-cc87ff1d-4fb8-4414-9a79-31fac4377c30.webp" },
    { title: "SELECTORIZED", id: 'selectorized-section', icon: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-76d037e3-c15b-48f8-b934-218bac03a8a9.webp" },
    { title: "CABLE STATIONS", id: 'cable-stations-section', icon: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-e27cda74-56b1-4c2b-9cdb-3b989a004fe0.webp" },
    { title: "BENCHES + RACKS", id: 'benches-racks-section', icon: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-3b1a353b-3835-412c-8954-3856ee9e9f77.webp" },
    { title: "FUNCTIONAL TRAINING", id: 'functional-training-section', icon: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-f4e50fae-9e42-4acf-b7a4-3b0c4c6e84a3.webp" },
  ];

  const carouselData = [
    {
      title: 'Fitness Solutions for Every Space',
      description: "At BodyKore, we deliver best-in-class fitness solutions tailored to the unique needs of your facility. From corporate offices to multi-family communities and beyond, we create spaces that inspire wellness and enchance performance wherever people work, live, learn, or serve."
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-285b9cea-51a1-415b-846e-6b54b9d7d7ff.jpg",
      link: '/hospitality-fitness-equipment'
    },

    {
      image: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-7e13f385-c33a-420a-81f2-1d8838029464.jpg",
      link: '#'
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-89d80c0b-a114-4266-9b79-1f78b4513a47.jpg",
      link: '#'
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-aeccdd57-5ef2-4cc4-81ee-a870fa3397af.jpg",
      link: '#'
    },

    {
      image: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-f039c672-24f6-4b49-9733-008112f14dbf.jpg",
      link: '#'
    },
    {
      image: "https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-d13fb74d-aead-42fb-9167-10bef7eb8bcb.jpg",
      link: '#'
    },
  ]

  return (
    <div>
      <div className="relative">


        {/* Banner Image */}
        <div className="relative w-full min-h-[500px] md:h-screen bg-cover bg-center" style={{ backgroundImage: `url(https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-e426f1f3-4e85-4279-9301-9db7d0903ee6.webp)` }}>
          {/* Overlay */}
          <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.6)' }}></div>

          {/* Text Content */}
          <div className="md:py-0 py-28 relative max-w-7xl mx-auto z-10 text-start text-white flex flex-col justify-center items-start h-full px-4">
            <div className="w-full md:mt-40 mt-20 md:w-[60%]">
              <h3 className="text-3xl lg:text-6xl font-bold font-bebas italic">
                PERFORMANCE. SAFETY. DURABILITY.
              </h3>
              <p className="text-lg lg:text-2xl md:mb-8 mb-3 font-roboto">
                Transform Your Gym with BodyKore
              </p>
              <a href="#contact" className="bg-red-bc2026 hover:bg-red-hover px-6 py-3 text-white font-medium rounded-lg shadow-md font-bebas cursor-pointer">
                REQUEST A QUOTE
              </a>
            </div>
          </div>
        </div>


        {/* Features */}
        <div className="bg-black text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-md lg:text-lg md:mb-8 mb-6 font-roboto">
              DISCOVER THE BODYKORE ADVANTAGE
            </p>
            <h4 className="text-2xl lg:text-4xl font-bold md:mb-8 mb-6 md:px-8 font-bebas tracking-wide">
              Engineered for performance. Designed for durability. Trusted by top
              fitness facilities worldwide.
            </h4>
            <hr className='md:mb-8 mb-6 text-gray-600' />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h5 className="text-2xl md:text-xl font-semibold mb-2 font-bebas tracking-wider">
                  DURABILITY + PRECISION
                </h5>
                <p className="text-base font-roboto md:px-4">
                  Our equipment is made with commercial-grade steel, precision
                  laser-cut frames, and high-capacity weight tolerances to
                  withstand the demands of high-traffic facilities.
                </p>
              </div>
              <div>
                <h5 className="text-2xl md:text-xl font-semibold mb-2 font-bebas tracking-wider">
                  COMPLETE PRODUCT RANGE
                </h5>
                <p className="text-base font-roboto md:px-4">
                  From selectorized machines to plate-loaded systems, functional
                  training equipment, and benches, BodyKore has a full suite of
                  solutions to meet every fitness need.
                </p>
              </div>
              <div>
                <h5 className="text-2xl md:text-xl font-semibold mb-2 font-bebas tracking-wider">INNOVATIVE DESIGN</h5>
                <p className="text-base font-roboto md:px-4">
                  BodyKore machines are designed with biomechanics in mind,
                  ensuring smooth motion, injury prevention, and an exceptional
                  workout experience for every member.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Explore */}
        <div className="text-center py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto md:px-4">
            <h4 className="text-2xl lg:text-4xl font-bold font-bebas">
              Explore Our Industry-Leading Equipment Lines
            </h4>
            <p className="text-lg lg:text-xl mb-8 text-gray-500 font-roboto">
              From strength training to functional fitness, find the perfect equipment for your facility.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 md:gap-0 gap-6 ">
              {equipmentItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <a href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      const headerOffset = 200;
                      if (element) {
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-56"
                    />
                    <p className="text-base font-semibold text-gray-500 font-roboto hover:text-red-hover hover:underline">{item.title}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Stacked Series */}
        <div id='plate-loaded-section' className="bg-black text-white py-12 px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl md:gap-20 mx-auto md:px-4">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <p className="uppercase text-sm font-medium text-gray-200 mb-2 font-roboto">
                STACKED SERIES
              </p>
              <h4 className="text-2xl lg:text-3xl font-bold mb-4 font-bebas">
                Plate Loaded Machines
              </h4>
              <p className="text-base lg:text-lg mb-6 font-roboto">
                Combining free-weight functionality with controlled motion, the
                Stacked Series promotes balanced muscle growth and unilateral
                strength.
              </p>
              <a href='/product-category/machines/plate-loaded' className="bg-white text-black font-semibold px-6 py-3 rounded-md font-bebas cursor-pointer">
                <span>LEARN MORE</span>
              </a>
            </div>

            {/* Image */}
            <div className="lg:w-3/4 order-first md:order-none md:mb-0 mb-4">
              <img
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-43f81951-f87c-4da8-b54a-930277609505.jpg"
                alt="Plate Loaded Machines"
                className="rounded-md shadow-lg w-full object-cover justify-start"
              />
            </div>
          </div>
        </div>


        {/* Isolation */}
        <div id='selectorized-section' className="flex flex-col lg:flex-row items-center justify-between py-12 px-4 md:gap-20 gap-10 max-w-7xl mx-auto">
          {/* Image */}
          <div className="lg:w-3/4">
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-9f4f0e11-10a1-439b-b8f9-7e2de19c705b.jpg"
              alt="Selectorized Machines"
              className="rounded-md shadow-lg md:h-[450px] w-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <p className="uppercase text-sm font-medium text-gray-500 mb-2 font-roboto">
              Isolation Series
            </p>
            <h4 className="text-2xl lg:text-3xl font-bold mb-4 font-bebas">
              Selectorized Machines
            </h4>
            <p className="text-base lg:text-lg mb-6 text-gray-500 font-roboto">
              Streamlined and ergonomic, these machines deliver targeted exercises
              with precision and comfort, perfect for members seeking guided
              movement.
            </p>
            <a href='/product-category/machines/' className="bg-black text-white font-semibold px-6 py-3 rounded-md font-bebas cursor-pointer">
              LEARN MORE
            </a>
          </div>
        </div>


        {/* Alliance */}
        <div id='cable-stations-section' className="bg-black text-white py-12 px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl md:gap-20 md:px-4 mx-auto">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <p className="uppercase text-sm font-medium text-gray-200 mb-2 font-roboto">
                Alliance SERIES
              </p>
              <h4 className="text-2xl lg:text-3xl font-bold mb-4 font-bebas">
                Cable Stations
              </h4>
              <p className="text-base lg:text-lg mb-6 font-roboto">
                Space-efficient multi-function systems that encourage dynamic training and social intraction, ideal for group fitness settings.
              </p>
              <a href='/product-category/machines/cable-machines' className="bg-white text-black font-semibold px-6 py-3 rounded-md font-bebas cursor-pointer">
                LEARN MORE
              </a>
            </div>

            {/* Image */}
            <div className="lg:w-3/4 order-first md:order-none md:mb-0 mb-6">
              <img
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-073f342f-3974-48e3-b6d0-7e2a808fd538.jpg"
                alt="Plate Loaded Machines"
                className="rounded-md shadow-lg md:h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </div>


        {/* Signature */}
        <div id='benches-racks-section' className="flex flex-col lg:flex-row items-center justify-between py-12 px-4 md:gap-20 gap-10 md:px-4 max-w-7xl mx-auto">
          {/* Image */}
          <div className="lg:w-3/4">
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-a83776d8-aeca-4fcf-ac18-4d172450d7dc.jpg"
              alt="Selectorized Machines"
              className="rounded-md shadow-lg md:h-[450px] w-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <p className="uppercase text-sm font-medium text-gray-500 mb-2 font-roboto">
              Signature Series
            </p>
            <h4 className="text-2xl lg:text-3xl font-bold mb-4 font-bebas">
              Power + Strength Machines
            </h4>
            <p className="text-base lg:text-lg mb-6 text-gray-500 font-roboto">
              Classic Strength-building machines with modern aesthetics, built for durability and high performance
            </p>
            <a href='#contact' className="bg-black text-white font-semibold px-6 py-3 rounded-md font-bebas cursor-pointer">
              LEARN MORE
            </a>
          </div>
        </div>


        {/* foundation */}
        <div id='functional-training-section' className="bg-black text-white py-12 px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl gap-8 lg:gap-20 mx-auto md:px-4">
            {/* Text Section */}
            <div className="lg:w-1/2">
              <p className="uppercase text-sm font-medium text-gray-200 mb-2 font-roboto">
                Foundation SERIES
              </p>
              <h4 className="text-2xl lg:text-3xl font-bold mb-4 font-bebas">
                Functional Training
              </h4>
              <p className="text-base lg:text-lg mb-6 font-roboto">
                Rugged racks and versatile tools designed to elevate olympic lifting and athletic training.
              </p>
              <a href='#contact' className="bg-white text-black font-semibold px-6 py-3 rounded-md font-bebas cursor-pointer hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                LEARN MORE
              </a>
            </div>
            {/* Image Section */}
            <div className="lg:w-1/2 order-first lg:order-none">
              <img
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-dd4fee57-84ec-4d00-8a59-052a451b3d81.jpg"
                alt="Plate Loaded Machines"
                className="rounded-md shadow-lg md:h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </div>


        {/* Elite */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 px-4 md:gap-20 gap-10 max-w-7xl mx-auto">
          {/* Image */}
          <div className="lg:w-3/4">
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-404b8db0-d548-4b6d-81e9-5cf173887ae9.jpg"
              alt="Selectorized Machines"
              className="rounded-md shadow-lg md:h-[450px] w-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <p className="uppercase text-sm font-medium text-gray-500 mb-2 font-roboto">
              Elite Series
            </p>
            <h4 className="text-2xl lg:text-3xl font-bold mb-4 font-bebas">
              Luxury Design
            </h4>
            <p className="text-base lg:text-lg mb-6  text-gray-500 font-roboto">
              Where elegance meets functionality, the Elite series brings upscale design to premium fitness facilities
            </p>
            <a href="#contact" className="bg-black text-white font-semibold px-6 py-3 rounded-md font-bebas cursor-pointer">
              LEARN MORE
            </a>
          </div>
        </div>


        {/* Guarantee */}
        <div className="bg-gray-200 text-black py-12 px-4">
          <div className="flex flex-col items-center gap-4 max-w-7xl mx-auto">
            <h4 className="uppercase text-2xl lg:text-3xl font-bold mb-2 md:w-xl justify-center text-center font-bebas">
              Lifetime Gaurantee on all frames
            </h4>
            <p className="text-base lg:text-lg mb-2 md:w-4xl text-center font-roboto lg:w-2/3 w-full m-auto">
              Upgrade your health club with BodyKore's commerical gym equipment, built to perform and guaranteed to last. Evey piece is crafted with precision and durability in mind,
              ensuring your investment stands the test of time. From robust strength machines to versatile cable systems, BodyKore delivers the tools you need to create a fitness environment that inspires confidence and drives results.
            </p>
          </div>
        </div>


        {/* Personalized */}
        <div className="bg-black text-white py-12 px-4">
          <div className="flex flex-col items-center text-center justify-center max-w-7xl md:gap-8 mx-auto">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h4 className="text-2xl lg:text-3xl font-bold mb-8 font-bebas">
                Custom Colors, Personalized Style
              </h4>
              <p className="text-base lg:text-lg mb-6 font-roboto">
                Make your fitness facility stand out with BodyKore's custom powder coating and upholstery options. Choose from a variety of colours to match your brand or design aesthetic, creating a space that's uniquely yours.
              </p>
            </div>
            <div className="flex w-full md:flex-row flex-col gap-10 md:px-4 ">
              <div className="lg:w-1/2">
                <a href='/upholstery'>
                  <img
                    src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-b74435df-42c0-4095-8df5-0114b341ea8e.jpg"
                    alt="Selectorized Machines"
                    className="rounded-md shadow-lg md:h-[400px] w-full object-cover"
                  />
                  <p className="pt-6 text-xl font-roboto">Custom Upholstery</p>
                </a>
              </div>
              <div className="lg:w-1/2">
                <a href='/upholstery'>
                  <img
                    src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-33f44f3f-8f86-412b-bc45-2fc26c147a10.jpg"
                    alt="Selectorized Machines"
                    className="rounded-md shadow-lg md:h-[400px] w-full object-cover"
                  />
                  <p className="pt-6 text-xl font-roboto">Custom Powder Coating</p>
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* 3D Video */}
        <div className="bg-gray-200 text-black md:py-16 py-12">
          <div className="flex flex-col items-center gap-4 max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center text-start">
              <h4 className="uppercase text-2xl lg:text-3xl font-bebas font-bold mb-2 md:w-1/2 justify-center">
                Visualize Your Fitness Space in 3D
              </h4>
              <p className="text-base lg:text-lg mb-6 md:w-1/2 text-gray-500 font-roboto">
                Bring Your Vision to life with BodyKore's 3D Gym Design Services. Our Team creates Custom layouts tailored to your space, ensuring the perfect fit for your equipment and maximizing functionality. See your fitness facility before it's built and design with confidence
              </p>
            </div>
            <video
              src="https://cdn.shopify.com/videos/c/o/v/806ca76b1f1e4c19b5b147cdfb1fd275.mp4"
              controls
              preload="metadata"
              poster='https://www.bodykore.com/_next/image?url=https%3A%2F%2Fcms.bodykore.com%2Fuploads%2F3_D_Gym_Design_Body_Kore_Fitness_Equipment_3777cbb0ba.jpg&w=1920&q=75'
              className="order-first md:order-none w-full block outline-none object-cover"
            />
          </div>
        </div>


        {/* Catalogs */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 px-4 md:gap-20 gap-4 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <p className="uppercase text-sm font-medium text-gray-500 mb-2 font-roboto">
              Explore the BodyKore Catalog
            </p>
            <h4 className="text-2xl lg:text-3xl font-bold mb-8 font-bebas">
              Your Complete guide to premium fitness solutions.
            </h4>
            <p className="text-base lg:text-lg mb-6  text-gray-500 font-roboto">
              Discover the full lineup of BodyKore products and services designed to elevate your fitness facility. From cutting-edge strength machines to innovative training tools, it's all here.
            </p>
            <a href='/catalogs' className="uppercase border border-gray-400 font-semibold px-6 py-3 rounded-md font-roboto cursor-pointer">
              View Catalogs
            </a>
          </div>
          {/* Image */}
          <div className="lg:w-3/4">
            <img
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-217d4c24-9eae-4f07-a96f-57e724508ec2.jpg"
              alt="Selectorized Machines"
              className="rounded-md shadow-lg md:h-[450px] w-full object-cover"
            />
          </div>
        </div>


        {/* Contact us */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 md:gap-20 gap-4 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <p className="uppercase text-sm font-medium text-gray-500 mb-2 font-roboto">
              Contact Us
            </p>
            <h4 className="text-2xl lg:text-5xl font-bold mb-8 font-bebas">
              Let's talk fitness
            </h4>
            <p className="text-base lg:text-lg mb-6  text-gray-500 font-roboto">
              we're here to help bring your vision to life. Share a bit about your business, budget, and goals,, and let's discuss how BodyKore can support your success. Schedule a free 30-minute consultation to get started today!
            </p>
          </div>
          {/* Image */}
          <div className="lg:w-3/4 w-full md:py-10 pb-10">
            <iframe
              src="https://calendly.com/bodykore"
              style={{ width: "100%", height: "500px", border: "none" }}
              frameBorder="0"
              scrolling="no"
            />
          </div>
        </div>

        <div className="lg:w-full mt-5 mb-20" id="contact">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
            <div className="bg-white py-8 mx-5 lg:mx-0 px-4 shadow-lg rounded-lg sm:px-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                action="#"
                method="POST"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
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
                      {...register('name', { required: true })}
                      className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-bc2026 pt-2">
                        Required field
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                    <span className="text-sm font-medium text-red-bc2026 pl-1">
                      *
                    </span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email', { required: true })}
                      className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-bc2026 pt-2">
                        Required field
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      type="text"
                      autoComplete="text"
                      {...register('phone')}
                      className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Textarea"
                    className="block text-sm font-medium text-gray-700 pb-1"
                  >
                    Message
                  </label>
                  <textarea
                    className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                    id="Textarea"
                    placeholder="Your message"
                    {...register('message')}
                    style={{ maxHeight: '150px', minHeight: '40px' }}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      {...register('terms', { required: true })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-black-373933 rounded"
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-black-373933 font-roboto"
                    >
                      Accept Terms and Conditions
                    </label>
                  </div>
                </div>
                <div>
                  {errors.terms && (
                    <p className="text-sm text-red-bc2026">
                      Please accept Terms and Conditions
                    </p>
                  )}
                </div>
                <div className="block">
                  <div className="mt-2">
                    <div>
                      <ReCAPTCHA
                        sitekey="6LfJ41MqAAAAABtBUo59qRaEbnVtYRFrykjeqZGa"
                        onChange={handleCaptchaChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {!loading && (
                    <button
                      type="submit"
                      disabled={!captchaValue}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200"
                    >
                      SUBMIT
                    </button>
                  )}
                  {loading &&
                    <button
                      type="button"
                      disabled
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200"
                    >
                      Submitting...
                    </button>
                  }
                </div>
                {success && (
                  <p className="text-sm pt-2 text-green">
                    Message sent succesfully
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Carousal */}
        <div className="bg-black text-white md:py-16 py-12 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between md:py-12 md:px-4 px-12 md:gap-12 gap-4 max-w-7xl mx-auto">
            <Slider {...settings} className="outline-none w-full md:w-full md:px-4">
              {carouselData.map((data, i) => (
                <div key={i} className="flex flex-col lg:flex-row px-2">
                  {data.title && data.description && (
                    <div className="w-full md:hidden block">
                      {data.title ? (
                        <h4 className="text-2xl lg:text-3xl font-bold mb-8 font-bebas">{data?.title}</h4>
                      ) : ''}
                      {data.description ? (
                        <p className="text-base lg:text-lg mb-6 text-gray-00 font-roboto">
                          {data?.description}
                        </p>
                      ) : ''}
                    </div>
                  )}
                  {data?.image && (
                    <div className="w-full md:hidden block">
                      <a href={data?.link}>
                        <img
                          src={data?.image}
                          alt="carousel"
                          className="w-full h-auto md:h-[400px] object-cover"
                        />
                      </a>
                    </div>
                  )}
                  <div className="hidden md:flex ">
                    <div className="flex flex-col">
                      {data?.title && data?.description && (
                        <div className="flex-1">
                          {data?.title ?
                            <h4 className="text-2xl lg:text-3xl font-bold mb-4 font-bebas">{data?.title}</h4> : null}
                          {data?.description ? <p className="text-base lg:text-lg mb-4 text-gray-200 font-roboto">
                            {data?.description}
                          </p> : null}
                        </div>
                      )}
                      {data?.image ? (
                        <div className="w-full mt-auto">
                          <a href={data?.link}>
                            <img
                              src={data?.image}
                              alt="carousel"
                              className="w-full h-auto md:h-[400px] object-cover"
                            />
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div >
  )
}

export default BodykorePage