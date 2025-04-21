import { UseToster } from '@components/ui/ToasterUtil';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useSnackbar } from 'nextjs-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SubcriptionForm {
    id: string;
    name: string;
    email: string;
    terms:string;
}
const MaslowForm = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubcriptionForm>();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const snackbar = useSnackbar();
    const navigation = useRouter();
    const { addToaster } = UseToster();
    const onSubmit = async (data: SubcriptionForm) => {
        setLoading(true);
        const timestamp = new Date().toISOString();
        const body = JSON.stringify({ ...data, timestamp });
        // console.log(body)
        const res = await (
            await fetch('/api/subscriptionmaslow', { method: 'POST', body })
        ).json();
        setSuccess(res);
        setLoading(false);
        reset();
        if (res) {
            navigation.push('/maslowFormConfirmation');
            // addToaster({
            //     title: 'Success',
            //     message: 'Thank you for subscribing!',
            //     duration: 5000,
            //     onClose: function (id: number): void {
            //         throw new Error('Function not implemented.');
            //     }
            // })
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
       <>
                
                <form
  onSubmit={handleSubmit(onSubmit)}
  className="flex flex-col items-center gap-5 justify-center"
  action="#"
  method="POST"
>
  <input
    className="rounded-lg p-4 border border-gray-200 bg-white text-gray-800 w-full"
    placeholder="Full Name"
    {...register('name', { required: true })}
  />
  <input
    className="rounded-lg p-4 border border-gray-200 bg-white text-gray-800 w-full"
    placeholder="Email Address"
    {...register('email', { required: true })}
  />

  <div className="flex items-center gap-3 text-sm text-gray-400 w-full">
    <input
      type="checkbox"
      id="terms"
      className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-red-600"
      {...register('terms', { required: true })}
    />
    <label htmlFor="terms" className="cursor-pointer text-white">
      I accept <a href="/maslowPolicy" className=" underline">Terms and Conditions.</a>
    </label>
  </div>
  <div className="flex items-center gap-3 text-sm text-gray-400 w-full">
    <input
      type="checkbox"
      id="terms"
      className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-red-600"
      {...register('terms', { required: true })}
    />
    <label htmlFor="terms" className="cursor-pointer text-white">
      I accept <a href="//privacy-policy" className=" underline"> privacy policy.</a>
    </label>
  </div>

  <button
  disabled={true}

    className="w-full cursor-not-allowed text-center rounded-lg bg-red-bc2026 hover:bg-red-hover text-white font-normal p-4 uppercase text-sm lg:text-lg"
    type="submit"
  >
    {!loading && <span className="uppercase font-roboto font-semibold">Register Now</span>}
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

         </>


    )
}

export default MaslowForm
