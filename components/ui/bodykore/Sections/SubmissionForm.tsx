import { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useSnackbar } from 'nextjs-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { ProductAllStrapi } from 'services/strapi';
import { ChevronDown } from '@components/icons';
import { UseToster } from '@components/ui/ToasterUtil';

interface SubmissionFormProps {
  products: ProductAllStrapi[]
}

export interface WarrantyContactForm {
  name: string;
  phone: string;
  email: string;
  dateOfPurchase: string;
  itemName: string;
  orderNumber: string;
  serialNumber: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  comments: string;
  marketplace: string;
  Accept_Terms_and_Conditions: string;
}

const SubmissionForm = ({ products }: SubmissionFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WarrantyContactForm>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  const { addToaster } = UseToster();
  const onSubmit = async (data: WarrantyContactForm) => {
    setLoading(true);
    const body = JSON.stringify({ ...data, dateOfPurchase: moment(data.dateOfPurchase).format('YYYY-MM-DD') });
    const res = await (
      await fetch('/api/warranty', { method: 'POST', body })
    ).json();
    setSuccess(res);
    reset();
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
    setLoading(false);
  };

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value: any) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  };



  return (
    <form className="max-w-7xl m-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-name"
          >
            Name *
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight"
            id="grid-name"
            type="text"

            {...register('name', { required: true })}
          ></input>
        </div>

        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-email-address"
          >
            Email address *
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight"
            id="grid-email-address"
            type="text"
      
            {...register('email', { required: true })}
          ></input>
        </div>

        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-phone-number"
          >
            Phone Number
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight"
            id="grid-phone-number"
            type="text"
  
            {...register('phone')}
          ></input>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-date-purchase"
          >
            Date of purchase *
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight"
            id="grid-date-purchase"
            type="date"


            placeholder="YYYY-MM-DD"
            {...register('dateOfPurchase', { required: true })}
          ></input>
        </div>

        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-item-name"
          >
            Item name *
          </label>
          <div className='relative'>
            <select className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" placeholder="Item name"
              {...register('itemName', { required: true })}>
              <option value="">Select Item</option>
              {products.map((product, index) => (
                <option key={index} value={product.attributes.title}>{product.attributes.title}</option>
              ))}
            </select>
            <ChevronDown className='absolute right-3 top-3' />
          </div>

        </div>

        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-order-number"
          >
            Order Number *
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight"
            id="grid-order-number"
            type="text"
        
            {...register('orderNumber', { required: true })}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-order-number"
          >
            Serial Number *
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight"
            id="grid-order-number"
            type="text"

            {...register('serialNumber', { required: true })}
          ></input>
        </div>


       
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-marketplace"
          >
            Marketplace purchase from
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight"
            id="grid-marketplace"
            type="text"

            {...register('marketplace')}
          ></input>
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-country"
          >
            Country
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight"
            id="grid-country"
            type="text"
 
            {...register('country')}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-state"
          >
            State
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight"
            id="grid-state"
            type="text"
     
            {...register('state')}
          ></input>
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-street-address"
          >
            Address 1
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight"
            id="grid-street-address"
            type="text"

            {...register('address2')}
          ></input>
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-street-address"
          >
            Address 2
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight"
            id="grid-street-address"
            type="text"

            {...register('address2')}
          ></input>
        </div>

       
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-city"
          >
            City
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight"
            id="grid-city"
            type="text"

            {...register('city')}
          ></input>
        </div>
        

        <div className="w-full md:w-1/3 px-3">
          <label
            className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2"
            htmlFor="grid-zip"
          >
            ZIP
          </label>
          <input
            className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight"
            id="grid-zip"
            type="text"

            {...register('zip')}
          ></input>
        </div>


      </div>
      <div className="pb-2">
        <label className="pb-1 block text-sm font-roboto text-black-1c2023 sm:mt-px sm:pt-2">
          Comments
        </label>
        <div className="mt-1 sm:mt-0">
          <textarea
            id="comments"
            rows={3}
            className="shadow-sm block w-full text-sm border-2 border-black-1c2023 pl-4 pt-2 h-44"
            defaultValue={''}
       
            {...register('comments')}
          />
        </div>
      </div>


      <div className="block">
        <div className="mt-2">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                {...register('Accept_Terms_and_Conditions', { required: true })}
              ></input>
              <a href="/terms-of-use" target={'_blank'}>
                <span className="ml-2">Accept Terms and Conditions</span>
              </a>
            </label>
          </div>
        </div>
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
      <section className="max-w-7xl m-auto mt-5 mb-5">
        <button
          className={`w-52 h-12 mb-2 bg-transparent text-black-373933 border-2 border-black-373933 rounded-lg font-bebas`}
          style={{ letterSpacing: '1.5px' }}
          type="submit"
        // disabled={!captchaValue}
        >
          {!loading && (
            <div className="flex justify-center items-center gap-2">
              <h3 className="font-bold">Submit</h3>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center gap-2">
              <h3 className="font-bold">Submitting</h3>
            </div>
          )}
        </button>
      </section>
    </form>
  );
};

export default SubmissionForm;
