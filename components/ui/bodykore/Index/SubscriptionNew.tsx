import { UseToster } from '@components/ui/ToasterUtil';
import Image from 'next/image'
import { useSnackbar } from 'nextjs-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SubcriptionForm {
    id: string;
    name: string;
    email: string;
}
const SubscriptionNew = () => {
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
        <div className='bg-red-hover'>
            <div className='max-w-7xl m-auto flex justify-between py-6'>
                <div className='w-1/3 '>
                    <h1 className="font-bebas text-3xl font-bold italic text-left text-white">
                        Join Our Fitness Community Today
                    </h1>
                    <p className="font-roboto text-sm text-left text-white">
                        Subscribe Now and Stay Connected, Get Exclusive Fitness Tips, and Be the First to Know About New Products!
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center gap-2 w-2/3 justify-end"
                    action="#"
                    method="POST"
                >
                    <input
                        className="rounded-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-64"
                        placeholder="Your best email address."
                        {...register('email', { required: true })}
                    />
                    <input
                        className="rounded-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-64"
                        placeholder="Your best email address."
                        {...register('email', { required: true })}
                    />

                    <button className="lg:px-8 px-3 flex items-center rounded-lg bg-black  text-white font-normal p-4 uppercase text-sm lg:text-lg">
                        {!loading && <span>Join Now</span>}
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


    )
}

export default SubscriptionNew
