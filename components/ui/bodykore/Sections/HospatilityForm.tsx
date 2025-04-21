import React from 'react';
import { useForm } from 'react-hook-form';

const HospatilityForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { register, handleSubmit, formState, setValue, getValues, reset } =
    useForm({
      mode: 'onBlur',
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
    });


  const onSubmit = async (data: any) => {
    setLoading(true);

    const body = JSON.stringify(Object.assign(data));
    const res = await (
      await fetch('/api/hospitality', { method: 'POST', body })
    ).json();
    setSuccess(res);
    setLoading(false);
    reset();
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const { errors } = formState;
  return (
    <div>
      <div className="py-32 squarbox bg-cover bg-center text-center font-montserrat ">
        <div className="max-w-7xl m-auto">
          <h5 className="text-white lg:text-2xl text-lg   font-montserrat pb-5 ">
            We'd Love To Hear From You
          </h5>
          <h2 className="text-white lg:text-7xl text-3xl font-montserrat  leading-tight tracking-normal pb-5 font-bold ">
            SCHEDULE A<br></br>
            FREE CONSULTATION
          </h2>
        </div>
      </div>
      <div className="bg-black" id='booknow'>
        <div className="py-10">
          <h6 className="text-white text-center lg:text-xl text-lg flex flex-col font-montserrat">
            <span>
              Take the first step towards elevating your hospitality fitness
              center. Schedule a free consultation today to
            </span>
            <span>
              explore tailored solutions that meet your unique needs. Use our
              simple form or direct contact options to get
            </span>
            <span>started.</span>
          </h6>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" justify-center flex flex-col items-center py-7 px-4 max-w-8xl m-auto">
          <div className="lg:w-3/4 w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full py-4 px-2"
              required
              {...register('name', { required: 'Name is required' })}
              
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:w-3/4 w-full gap-6 lg:m-10 m-6">
            <input
              type="text"
              placeholder="Your Phone"
              className="w-full  py-4 px-2"
              required

              onChange={(e) => setValue('phone', e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full  py-4 px-2"
              required
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>
          <div className="lg:w-3/4 w-full">
            <textarea
              placeholder="Your Message"
              className="w-full  py-4 px-2"
              required
              style={{ maxHeight: '250px', minHeight: '100px' }}
              {...register('message', { required: 'Message is required' })}
            />
          </div>
          <div className="p-7">
            {!loading && <button className="uppercase bg-red-bc2026 px-6  py-2 text-white font-montserrat font-bold">
              Schedule Now
            </button>}
            {loading && <button className="uppercase bg-red-bc2026 px-6  py-2 text-white font-montserrat font-bold">
              Submitting...
            </button>} 
          </div> 
          {success && (
            <p className="text-sm pt-2 text-green">
              Your form has been sent successfully.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default HospatilityForm;
