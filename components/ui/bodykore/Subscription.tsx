import { Snackbar } from '@material-ui/core';
import Image from 'next/image';
import { useSnackbar } from 'nextjs-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SubcriptionForm {
  id: string;
  name: string;
  email: string;
}

export const Subscription = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubcriptionForm>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
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
    snackbar.showMessage('Thank you for subscribing!', 'success', 'filled');
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center"
      action="#"
      method="POST"
    >
      <input
        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder="Your best email address."
        {...register('email', { required: true })}
      />
      <input
        className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder="Your best email address."
        hidden
        value={'Smart Sled'}
        {...register('name', { required: true })}
      />
      <button className="lg:px-8 px-3 flex items-center rounded-r-lg bg-red-bc2026  text-white font-normal p-4 uppercase text-sm lg:text-lg">
        {!loading && <span>Notify me!</span>}
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
  );
};
