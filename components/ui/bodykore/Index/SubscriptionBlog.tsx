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
const SubscriptionBlog = () => {
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
    <div className="bg-gray-200">
      <div className="max-w-6xl m-auto lg:px-10 lg:py-28 p-5 text-center">
        <h6 className="text-gray-800 font-bebas text-3xl tracking-wider font-semibold pb-2">
          Stay in the Know
        </h6>
        <p className="text-gray-700 font-roboto text-sm tracking-wide lg:w-96 w-full m-auto pb-4">
          Enter your email and be the first to get the latest blog posts, news,
          product launches and more from BodyKore.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-3 justify-center grid lg:grid-cols-6 grid-cols-1 lg:w-7/12 w-full m-auto"
          action="#"
          method="POST"
        >
          <input
            className="p-4 mr-0 border text-gray-800 border-gray-400 lg:col-span-4 col-span-12"
            placeholder="Your Email"
            {...register('email', { required: true })}
          />

          <button className="lg:px-12 px-3 text-gray-800 font-normal font-roboto border hover:bg-gray-300 border-black p-4 uppercase text-sm lg:text-lg lg:col-span-2 col-span-12">
            {!loading && <span>Sign Up</span>}
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

export default SubscriptionBlog;
