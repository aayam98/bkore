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
const SubscriptionSledPro = () => {
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
            await fetch('/api/subscriptionsled', { method: 'POST', body })
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
        <div className='bg-darkgunmetal p-16'>
            <div className='max-w-7xl m-auto p-12 flex flex-col border'>
                <div className='text-center'>
                    <h6 className="font-roboto font-bold text-3xl text-red-bc2026 leading-none">
                    Take Athletic Training to New Heights
                    </h6>
                    <h1 className='font-bebas font-bold lg:text-main-banner-title text-3xl text-white leading-normal tracking-wider'>
                    stay tuned
                    </h1>
                    <p className="font-roboto text-2xl text-white">
                    Subscribe to our newsletter to hear the latest news
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-wrap items-center gap-5 justify-center"
                    action="#"
                    method="POST"
                >
                    <input
                        className="rounded-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-4/12"
                        placeholder="Full Name"
                        {...register('email', { required: true })}
                    />
                    <input
                        className="rounded-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-4/12"
                        placeholder="Email Address"
                        {...register('email', { required: true })}
                    />

                    <button className="lg:px-8 px-3 text-center rounded-lg bg-red-bc2026 hover:bg-red-hover  text-white font-normal p-4 uppercase text-sm lg:text-lg w-4/12">
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


    )
}

export default SubscriptionSledPro
