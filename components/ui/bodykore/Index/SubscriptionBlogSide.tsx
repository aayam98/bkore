import { UseToster } from '@components/ui/ToasterUtil';
import Image from 'next/image';
import { useSnackbar } from 'nextjs-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SubcriptionForm {
  id: string;
  name: string;
  email: string;
}

interface SubscriptionBlogSideProps {
  textColor: string;
  buttonColor: string;
}
const SubscriptionBlogSide = ({ textColor, buttonColor }: SubscriptionBlogSideProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubcriptionForm>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  const { addToaster } = UseToster();
  const onSubmit = async (data: SubcriptionForm) => {
    setLoading(true);
    const timestamp = new Date().toISOString();
    const body = JSON.stringify({ ...data, timestamp });
    // console.log(body)
    const res = await (
      await fetch('/api/subscription', { method: 'POST', body })
    ).json();
    setSuccess(res);
    setLoading(false);
    reset();
    if (res) {
      addToaster({
        title: 'Success',
        message: 'Thank you for subscribing!',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      })
    } else {
      addToaster({
        title: 'Error',
        message: 'Error in subscribing',
        duration: 5000,
        onClose: function (id: number): void {
          throw new Error('Function not implemented.');
        }
      })
    }
  };
  return (
    <div className="">
      <div className="text-white">
        {/* <h6 className="text-gray-800 font-bebas text-3xl tracking-wider font-semibold pb-2">
          Stay in the Know
        </h6> */}
        <div className="lg:col-span-3 flex flex-row space-x-2 text-xl lg:text-5xl font-bebas font-bold italic tracking-wide">

          <p className={`text-red-bc2026 `}>Newsletter</p>
        </div>

        <p className={`text-left font-roboto text-sm tracking-wide w-full m-auto pb-4 ${textColor}`}>
          Enter your email and be the first to get the latest blog posts, news,
          product launches and more from BodyKore.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=""
          action="#"
          method="POST"
        >
          <input
            className="p-3 mr-0 border text-gray-800 border-gray-400 w-full"
            placeholder="Your Email"
            {...register('email', { required: true })}
          />

          <button className={`w-full  font-normal font-roboto border  hover:bg-gray-300 p-3 uppercase text-sm lg:text-lg mt-2 text-center ${buttonColor}`}>
            {!loading && <span>Subscribe</span>}
            {loading && (
              <Image
                placeholder="blur"
                blurDataURL="/loading.png"
                src="/svg/loading.svg"
                width={25.5}
                height={25.5}
                className="py-5"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionBlogSide;
