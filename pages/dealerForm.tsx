import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import SeoHeader from '@components/seoHeader';
import seo from '../public/SEO/en.json';
import ReCAPTCHA from 'react-google-recaptcha';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  return {
    props: { header },
  };
};
interface FinanceParams {
  header: HeaderData;
}

export type FormValue = {
  name: '';
  yearInBusiness: '';
  website: '';
  emc: '';
  contactName: '';
  title: '';
  phone: '';
  email: '';
  cityStateZip: '';
  contact: '';
  phoneBilling: '';
  emailBilling: '';
  applicantName: '';
  date: '';
  clearifyStatus: false;
};

const DealerForm = ({ header }: FinanceParams) => {
  const { register, handleSubmit, formState, setValue, getValues, reset } =
    useForm({
      mode: 'onBlur',
      defaultValues: {
        name: '',
        yearInBusiness: '',
        website: '',
        emc: '',
        contactName: '',
        title: '',
        phone: '',
        email: '',
        cityStateZip: '',
        contact: '',
        phoneBilling: '',
        emailBilling: '',
        applicantName: '',
        date: '',
        clearifyStatus: false,
      },
    });
  const { errors } = formState;

  const [trades, setTrades] = useState([
    {
      companyName: '',
      address: '',
      contactName: '',
      contactNumber: '',
    },
  ]);

  const form = useForm<FormValue>();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const timestamp = new Date().toISOString();
    const body = JSON.stringify(Object.assign(data, { trades, timestamp }));
    const res = await (
      await fetch('/api/dealforms', { method: 'POST', body })
    ).json();
    setSuccess(res);
    reset();
    setTrades([
      {
        companyName: '',
        address: '',
        contactName: '',
        contactNumber: '',
      },
    ]);
    setLoading(false);
  };

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  };


  return (
    <>
      <SeoHeader seo={seo.dealerForm} />
      <div className="flex lg:h-96 h-48 items-center justify-center bg-bgImage bg-no-repeat w-full bg-cover">
        <div className="text-center text-white max-w-7xl m-auto">
          {/*Title*/}
          <div className="flex flex-wrap justify-center items-center">
            <h4
              className={`text-5xl tracking-wider italic font-bebas font-bold w-full`}
            >
              Dealer Application Form
            </h4>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="max-w-6xl m-auto px-6">
          <form
            className="grid grid-cols-2 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Name of Business
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Website
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('website', { required: true })}
                />
                {errors.website && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Years in Business
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('yearInBusiness', { required: true })}
                />
                {errors.yearInBusiness && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Estimated monthly sales ($)
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('emc', { required: true })}
                />
                {errors.emc && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Contact Name
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('contactName', { required: true })}
                />
                {errors.contactName && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Title
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('title', {
                    required: true,
                  })}
                />
                {errors.title && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Phone
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('phone', {
                    required: true,
                  })}
                />
                {errors.phone && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Email
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('email', {
                    required: true,
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>

            <div className="col-span-2 bg-gray-200 p-2 flex flex-row justify-between">
              <h5 className="block text-base font-medium font-roboto text-gray-700">
                Billing Address
              </h5>
              <div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        // setValue('cityStateZip', getValues(''));
                        setValue('contact', getValues('contactName'));
                        setValue('phoneBilling', getValues('phone'));
                        setValue('emailBilling', getValues('email'));
                      } else {
                        // setValue('cityStateZip', '');
                        setValue('contact', '');
                        setValue('phoneBilling', '');
                        setValue('emailBilling', '');
                      }
                    }}
                    // {...register('terms', { required: true })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-black-373933 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-black-373933 font-roboto"
                  >
                    Same as Shipping Address
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                City, State, Zip code
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('cityStateZip', {
                    required: true,
                  })}
                />
                {errors.cityStateZip && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Contact Name
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('contact', { required: true })}
                />
                {errors.contact && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Phone
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('phoneBilling', { required: true })}
                />
                {errors.phoneBilling && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Email
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('emailBilling', { required: true })}
                />
                {errors.emailBilling && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-2 ">
              <h5 className="block text-base font-normal font-roboto text-gray-500 italic">
                Note : California dealers must fill out a resale tax form or
                they will be charged sales tax until the form is received.
              </h5>
            </div>
            <div className="col-span-2 bg-gray-200 p-2 flex flex-row justify-between items-center">
              <h5 className="block text-base font-medium font-roboto text-gray-700">
                Trade References
              </h5>
              <div className="flex flex-row gap-2 items-center">
                <div
                  className="border rounded-full border-gray-700 w-9  text-center cursor-pointer"
                  onClick={() => {
                    if (trades.length > 1) {
                      let temp = [...trades];
                      temp.pop();
                      setTrades(temp);
                    }
                  }}
                >
                  <span className=" text-center text-2xl font-semibold font-roboto">
                    -
                  </span>
                </div>
                {trades.length < 3 && (
                  <div
                    className="border rounded-full border-gray-700 w-9  text-center cursor-pointer"
                    onClick={() => {
                      if (trades.length < 3) {
                        setTrades([
                          ...trades,
                          {
                            companyName: '',
                            address: '',
                            contactName: '',
                            contactNumber: '',
                          },
                        ]);
                      }
                    }}
                  >
                    <span className=" text-center text-2xl font-semibold font-roboto">
                      +
                    </span>
                  </div>
                )}
              </div>
            </div>
            {trades.map((trade, index) => (
              <div key={index} className="col-span-2 bg-gray-100 p-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-base font-medium font-roboto text-gray-700"
                    >
                      Company Name
                      <span className="text-sm font-medium text-red-bc2026 pl-1">
                        *
                      </span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                        value={trade.companyName}
                        onInput={(e) => {
                          let temp = [...trades];
                          temp[index].companyName = e.currentTarget.value;
                          setTrades(temp);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-base font-medium font-roboto text-gray-700"
                    >
                      Address
                      <span className="text-sm font-medium text-red-bc2026 pl-1">
                        *
                      </span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                        value={trade.address}
                        onInput={(e) => {
                          let temp = [...trades];
                          temp[index].address = e.currentTarget.value;
                          setTrades(temp);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-base font-medium font-roboto text-gray-700"
                    >
                      Contact Name
                      <span className="text-sm font-medium text-red-bc2026 pl-1">
                        *
                      </span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                        value={trade.contactName}
                        onInput={(e) => {
                          let temp = [...trades];
                          temp[index].contactName = e.currentTarget.value;
                          setTrades(temp);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-base font-medium font-roboto text-gray-700"
                    >
                      Contact Number
                      <span className="text-sm font-medium text-red-bc2026 pl-1">
                        *
                      </span>
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                        value={trade.contactNumber}
                        onInput={(e) => {
                          let temp = [...trades];
                          temp[index].contactNumber = e.currentTarget.value;
                          setTrades(temp);
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            ))}
            <div className="col-span-2 bg-gray-200 p-2">
              <h5 className="block text-base font-medium font-roboto text-gray-700">
                Minimum Advertised Price Policy (“MAP”) - Effective: 08/01/2022
              </h5>
            </div>
            <div className="col-span-2 ">
              <h5 className="block text-xl font-medium italic font-bebas text-gray-700">
                Policy statement
              </h5>
              <p className="block text-base font-medium font-roboto text-gray-700">
                Please understand your submittal of this Application to BodyKore
                Inc. and its review and processing does not mean BodyKore will
                approve your company as a dealer. You will not be approved by
                BodyKore until the full execution of a new or updated Dealer
                Contract(s). Please allow approximately 15 days for us to review
                and process your Application. Further information may be
                requested in order to process your application.
              </p>
            </div>

            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Applicant’s Name
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('applicantName', { required: true })}
                />
                {errors.applicantName && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-base font-medium font-roboto text-gray-700"
              >
                Date
                <span className="text-sm font-medium text-red-bc2026 pl-1">
                  *
                </span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="date"
                  autoComplete="name"
                  className="appearance-none block w-full px-3 py-2 rounded-md h-12 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  {...register('date', { required: true })}
                />
                {errors.date && (
                  <p className="text-sm text-red-bc2026 pt-2">Required field</p>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('clearifyStatus', { required: true })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-black-373933 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-base font-normal text-gray-700 font-roboto"
                >
                  I CERTIFY THAT I HAVE READ THIS DOCUMENT AND I FULLY
                  UNDERSTAND ITS CONTENT.
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-center">
              <ReCAPTCHA
                    sitekey="6LfJ41MqAAAAABtBUo59qRaEbnVtYRFrykjeqZGa" // Replace with your Google reCAPTCHA v2 site key
                    onChange={handleCaptchaChange}
                  />
              </div>
            </div>
           
            {!loading && (
              <button
                type="submit"
                disabled={!captchaValue}
                className="w-36 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200"
              >
                SUBMIT
              </button>
            )}
            {loading && (
              <button
                type="submit"
                className="w-36 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200"
                disabled
              >
                Submitting...
              </button>
            )}
            {success && (
              <p className="text-sm pt-2 text-green">
                Message sent succesfully
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default DealerForm;
