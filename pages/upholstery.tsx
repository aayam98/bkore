import {  useState } from 'react';
import {  getHeader } from '@utils/header';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { UseToster } from '@components/ui/ToasterUtil';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';

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
const Upholstery = () => {
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
  return (
    <div>
      {/* Features */}

      <div className="max-w-5xl mx-auto text-center lg:pb-16 px-3">
        <div className='py-16'>
          <h4 className="text-2xl lg:text-5xl font-bold font-bebas tracking-wide text-gray-800">
            Make Your Gym Stand Out with Custom Equipment
          </h4>
          <p className="text-base lg:text-lg font-roboto text-gray-700 lg:w-opt8top w-full m-auto ">
            Give your facility a <b>personalized and professional touch </b> with <b>custom upholstery, powder coating, and private labeling.</b> Whether you're reinforcing your gym’s identity or customizing equipment to match your brand,<b>BodyKore offers premium solutions</b> to make your space truly unique.
          </p>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className='text-left lg:order-none order-2'>
            <h5 className="text-3xl font-semibold pb-5 font-bebas lg:tracking-wider text-left">
              Custom Frame Color
            </h5>
            <div className='flex flex-col gap-8 pb-8'>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/paint.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    ELECTROSTATIC POWDER COATING
                  </h5>
                  <p className="text-base font-roboto">
                    Our equipment is coated with a state-of-the-art electrostatic powder coating, ensuring a durable, matte or high-gloss finish that resists scratches, chipping, and wear.
                  </p>
                </div>
              </div>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/leaf.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    ENVIRONMENTALLY FRIENDLY PROCESS
                  </h5>
                  <p className="text-base font-roboto">
                    The powder coating technique is eco-conscious, producing minimal waste and using non-toxic materials, ensuring safety for your facility and the environment.
                  </p>
                </div>
              </div>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/palette.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    WIDE COLOR SELECTION
                  </h5>
                  <p className="text-base font-roboto">
                    Choose from our five standard colors, or request a custom shade to align with your brand identity.
                  </p>
                </div>
              </div>
            </div>
            <a href='#contact' className="bg-red-bc2026 text-white font-base w-full font-medium px-6 py-3 rounded-md font-roboto cursor-pointer block text-center uppercase">
             Request Info
            </a>
          </div>
          <Image
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-9f64c44d-e2ad-4fc1-b9ca-e18492ec8249.jpg"
            alt=""
            className="w-full h-screen object-cover lg:order-none order-1"
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL="/loading.png"
          />

        </div>
      </div>
      {/* Explore */}
      <div className="text-center py-12 lg:px-4 bg-gray-100 px-3">
        <div className="max-w-6xl mx-auto md:px-4">
          <h4 className="text-2xl lg:text-4xl font-bold font-bebas">
            Custom frame COLOR SAMPLES
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-5 md:gap-0 gap-6 ">
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-50782c24-87a3-4e5f-9a0b-92b333a3f250.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-1821221b-639b-4963-8e3e-a802a7611f2a.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-5a7266b9-a348-4daf-a166-7a2b0b27421c.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-a8721bc5-5997-4385-a915-e06d79d6c1c7.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-ff2fd98f-21df-49f9-a0da-036fa2aa6f58.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
          </div>
        </div>
      </div>
      <div className="text-center py-12 px-4 bg-white">
        <h4 className="text-2xl lg:text-4xl font-bold font-bebas">
          upholstery options + Custom Logos
        </h4>
      </div>
      <div className="max-w-5xl mx-auto text-center lg:pb-16 px-3">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <Image
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-87443074-72ae-4e35-b8f3-dc9fa17f12fc.png"
            alt=""
            className="w-full h-screen object-cover"
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL="/loading.png"
          />
          <div className='text-left'>
            <h5 className="text-3xl font-semibold pb-5 font-bebas tracking-wider text-left">
              Custom upholstery
            </h5>
            <div className='flex flex-col gap-8 pb-8'>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/pers.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    PERSONALIZED AESTHETICS
                  </h5>
                  <p className="text-base font-roboto">
                    Choose from five standard upholstery colors or request one of 57 available custom shades to align with your facility’s brand identity and create a cohesive, professional look.
                  </p>
                </div>
              </div>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/star1.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    ENHANCED BRANDING
                  </h5>
                  <p className="text-base font-roboto">
                    Add your facility’s logo directly onto the upholstery for a polished, professional appearance that reinforces your brand at every workout station.
                  </p>
                </div>
              </div>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/dumbbell.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    DURABLE MATERIALS
                  </h5>
                  <p className="text-base font-roboto">
                    Our upholstery is crafted from premium, high-density foam and commercial-grade vinyl, ensuring maximum comfort, durability, and easy maintenance for high-traffic environments.
                  </p>
                </div>
              </div>
            </div>
            <a href='#contact' className="bg-red-bc2026 text-white font-base w-full font-medium px-6 py-3 rounded-md font-roboto cursor-pointer block text-center">
              REQUEST INFO
            </a>
          </div>

        </div>
      </div>
      <div className="text-center py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto md:px-4">
          <h4 className="text-2xl lg:text-4xl font-bold font-bebas uppercase">
            Custom upholstery Color Samples
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-5 md:gap-0 gap-6 ">
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-28616efc-f628-4bab-9cdc-96c437cf4d8e.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-2ed0993e-b614-42dd-96a7-13b2fc90d26d.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-68711a12-9a03-428e-bc9e-e778c70a3d59.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-e93531f7-5c45-42c1-8335-d75119a7ab02.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <Image
              src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-ccf1ca4d-dc5c-4b8c-962a-afc7f8d91fb3.png"
              alt=""
              className="w-full object-contain"
              width={150}
              height={150}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto text-center lg:pb-16 px-3">
        <div className='py-16'>
          <h4 className="text-2xl lg:text-5xl font-bold font-bebas tracking-wide text-gray-800">
            PRIVATE LABELING – YOUR BRAND, YOUR IDENTITY
          </h4>
          <p className="text-base lg:text-lg font-roboto text-gray-700 lg:w-opt8top w-full m-auto">
            Make your <b>gym, studio, or fitness facility</b> truly yours with <b>custom-branded equipment.</b> Our <b>private labeling service</b> allows you to replace the BodyKore logo with your own branding, giving your equipment a professional, signature look that reinforces your identity.
          </p>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className='text-left lg:order-none order-2'>
            <h5 className="text-3xl font-semibold pb-5 font-bebas tracking-wider text-left">
              Stand Out with Custom Branding
            </h5>
            <div className='flex flex-col gap-8 pb-8'>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/usercheck.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    STRENGTHEN BRAND RECOGNITION
                  </h5>
                  <p className="text-base font-roboto">
                    Keep your logo front and center on every machine.
                  </p>
                </div>
              </div>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/circlecheck.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    PROFESSIONAL & CLEAN AESTHETIC
                  </h5>
                  <p className="text-base font-roboto">
                    Custom branding enhances the look of your facility.
                  </p>
                </div>
              </div>
              <div className='flex flex-row gap-5 items-start'>
                <Image src="/svg/searchup.svg" height={120} width={120} placeholder='blur' blurDataURL='/loading.png'></Image>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider">
                    AVAILABLE ON SELECT EQUIPMENT
                  </h5>
                  <p className="text-base font-roboto">
                    Ask about private labeling options for your order.
                  </p>
                </div>
              </div>
            </div>
            <a href='#contact' className="bg-red-bc2026 text-white font-base w-full font-medium px-6 py-3 rounded-md font-roboto cursor-pointer block text-center uppercase">
              Request Info
            </a>
          </div>
          <Image
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-d31f7c96-e3c3-4e45-acd5-d3c7eea7374a.png"
            alt=""
            className="w-full h-screen object-cover lg:order-none order-1"
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL="/loading.png"
          />

        </div>
      </div>
      <div className="max-w-5xl mx-auto text-center lg:pb-16 px-3">
        <div className='py-16'>
          <h4 className="text-2xl lg:text-5xl font-bold font-bebas tracking-wide text-gray-800 uppercase">
          Fitness solutions that are as unique as your facility          </h4>
          <p className="text-base lg:text-lg font-roboto text-gray-700 lg:w-opt8top w-auto m-auto">
          Customizing your equipment's paint and upholstery not only reinforces your brand identity but also enhances the overall member experience. A well-coordinated gym environment can boost motivation and create a sense of pride among members.
            </p>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-aaad4333-1f1d-4d69-b702-7132fe6d09dc.png"
            alt=""
            className="w-full h-screen object-cover"
            width={500}
            height={250}
            placeholder="blur"
            blurDataURL="/loading.png"
          />
          <div className='text-left'>
           
            <div className='flex flex-col gap-8 pb-8'>
              <div className='flex flex-row gap-5 items-start'>
                <div className='w-full'>
                  <h5 className="text-lg md:text-xl font-semibold font-bebas tracking-wider uppercase">
                  Next Steps
                  </h5>
                  <p className="text-base font-roboto leading-8">
                  Looking for the perfect color combination to match your brand or facility? Our team is here to help! Whether you need custom powder coating, upholstery, or private labeling, we’ll work with you to create a look that stands out.


                  </p>
                  <p className="text-base font-roboto leading-8">
                  📍 Fill out the form below, and a BodyKore specialist will be in touch to discuss your customization options.

                  </p>
                </div>
              </div>
             
            </div>
          
          </div>
         

        </div>
      </div>
      <div className="bg-gray-200 lg:p-0 px-3" id="contact">
        <div className="max-w-2xl m-auto">
          <div className="py-16">
            <div className='pb-8 text-center'>
          <h5 className="text-lg md:text-2xl font-semibold font-bebas tracking-wider uppercase">
            Contact Us</h5>
            <p className='font-roboto text-base'>Make It Yours – Let’s Talk Customization!</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid lg:grid-cols-2 grid-cols-1 gap-3"
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

            

              <div className='lg:col-span-2'>
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

              <div className="flex items-center justify-between lg:col-span-2">
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
              <div className='lg:col-span-2'>
                {errors.terms && (
                  <p className="text-sm text-red-bc2026">
                    Please accept Terms and Conditions
                  </p>
                )}
              </div>
              <div className="block lg:col-span-2">
                <div className="mt-2">
                  <div>
                    <ReCAPTCHA
                      sitekey="6LfJ41MqAAAAABtBUo59qRaEbnVtYRFrykjeqZGa"
                      onChange={handleCaptchaChange}
                    />
                  </div>
                </div>
              </div>
              <div className='lg:col-span-2'>
                {!loading && (
                  <button
                    type="submit"
                    disabled={!captchaValue}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200"
                  >
                    Send Message
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
    </div >
  )
}

export default Upholstery