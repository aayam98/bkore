import { UseToster } from '@components/ui/ToasterUtil';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactForm } from '../Sections/ContactSection';
import ReCAPTCHA from 'react-google-recaptcha';

type DemoSledProProps = {
    setPopup: (popup: boolean) => void
}
const DemoSledPro = ({setPopup}:DemoSledProProps) => {
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
            await fetch('/api/demosledpro', { method: 'POST', body })
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
        setPopup(false);
    };


    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value: any) => {
        setCaptchaValue(value);
        console.log("Captcha value:", value);
    };


    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setPopup(false); // Close the popup when clicking outside
        }
      };
  

    return (
        
        <div className=' p-16 fixed top-0 left-0 w-full h-full' style={{zIndex:9999,backgroundColor:"rgba(0, 0, 0, 0.5)"}} onClick={handleClickOutside}>
            <button onClick={() => setPopup(false)}>Close</button>

            <div className='max-w-2xl m-auto p-12 flex flex-col border bg-white' ref={ref}>
                <div className='text-left'>
                    <h6 className="font-roboto font-bold text-3xl text-red-bc2026 leading-none">
                        See the Smart Sled In Action
                    </h6>
                    <h1 className='font-bebas font-bold lg:text-main-banner-title text-3xl text-black leading-normal tracking-wider'>
                        Demo Request
                    </h1>
   
                </div>
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
                            Please indicate the best time to contact you for schedule
                        </label>
                        <textarea
                            className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                            id="Textarea"
                            placeholder="Please indicate the best time to contact you for schedule"
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


    )
}

export default DemoSledPro
