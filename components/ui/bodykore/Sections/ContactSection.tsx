import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { UseToster } from '@components/ui/ToasterUtil';

interface ContactSectionProps {
  title1: string;
  title2: string;
  description: string;
  btnText1: string;
  btnText2: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  terms: string;
}

export default function ContactSection({
  title1,
  title2,
  description,
  btnText1,
  btnText2,
}: ContactSectionProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToaster } = UseToster();
  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    const timestamp = new Date().toISOString();
    const body = JSON.stringify({ ...data, timestamp });
    const res = await (
      await fetch('/api/contact', { method: 'POST', body })
    ).json();
    if(res){
      addToaster({
        title: 'Success',
        message: 'Your message has been sent successfully',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      })
    }else{
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
 
  
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  };


  return (
    <>
      <section className="w-full">
        <div className="bg-no-repeat w-full bg-cover bg-contact-image flex bg-top">
          <div className={`w-full flex justify-center`}>
            <div className="flex flex-wrap justify-center w-full">
              <div className="lg:w-1/2 px-10 lg:px-0 lg:mt-32 mt-20">
                <h5
                  className={`lg:text-bebas lg:text-7xl text-6xl italic font-bebas font-bold text-white`}
                  style={{ letterSpacing: '2px' }}
                >
                  CONTACT US
                </h5>
                <p className="pt-2 font-roboto text-white-f2f9fa lg:w-3/5 w-full tracking-wide">
                  Get in touch with Team BodyKore through Email, Live Chat or
                  Phone Call. Our office hours are Monday - Friday 9am - 5pm PST
                  but we will do our best to answer your questions after hours
                  and on the weekends.
                </p>
                <div>
                  <div className="flex items-center text-white font-roboto pt-5">
                    <ul>
                      <li>BodyKore Headquarters</li>
                      <li>7466 Orangewood Ave</li>
                      <li>Garden Grove, CA 92841</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 mt-5 mb-20" style={{ width: '450px' }}>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 mx-5 lg:mx-0 px-4 shadow rounded-lg sm:px-10">
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
                              sitekey="6LfJ41MqAAAAABtBUo59qRaEbnVtYRFrykjeqZGa" // Replace with your Google reCAPTCHA v2 site key
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
