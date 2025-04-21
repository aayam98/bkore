import React from 'react';
import { useForm } from 'react-hook-form';

interface PartnerFormProps {
  name: string;
  company?: string;
  email: string;
  phone: string;
}

interface PartnerContactFormProps {
  name?: boolean;
  email?: boolean;
  company?: boolean;
  phone?: boolean;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  companyPlaceholder?: string;
  phonePlaceholder?: string;
  buttonText?: string;
}

function PartnerContactForm({
  company,
  companyPlaceholder,
  email,
  emailPlaceholder,
  name,
  namePlaceholder,
  phone,
  phonePlaceholder,
  buttonText,
}: PartnerContactFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartnerFormProps>({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: PartnerFormProps) => {
    setLoading(true);

    try {
      const body = JSON.stringify(data);
      const res = await (
        await fetch('/api/contact', { method: 'POST', body })
      ).json();
      setSuccess(res.success);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="justify-center flex flex-col items-center py-7 px-4"
    >
      <div className="w-full space-y-4">
        {name && (
          <>
            <input
              type="text"
              placeholder={namePlaceholder || 'Your Name'}
              className="w-full rounded-md  text-black  py-4 px-2"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <small className="text-red-bc2026 text-sm">
                {errors.name.message}
              </small>
            )}
          </>
        )}

        {company && (
          <>
            <input
              type="text"
              placeholder={companyPlaceholder || 'Your Company Name'}
              className="w-full rounded-md py-4 text-black px-2"
              {...register('company', { required: 'Company name is required' })}
            />

            {errors.company && (
              <small className="text-red-bc2026 text-sm">
                {errors.company.message}
              </small>
            )}
          </>
        )}

        {email && (
          <>
            <input
              type="email"
              placeholder={emailPlaceholder || 'Your Email'}
              className="w-full rounded-md  text-black py-4 px-2"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <small className="text-red-bc2026 text-sm">
                {errors.email.message}
              </small>
            )}
          </>
        )}
        {phone && (
          <>
            <input
              type="text"
              placeholder={phonePlaceholder || 'Your Phone'}
              className="w-full rounded-md  text-black py-4 px-2"
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && (
              <small className="text-red-bc2026 text-sm">
                {errors.phone.message}
              </small>
            )}
          </>
        )}
      </div>
      <div className="w-full pt-3">
        {!loading && (
          <button
            type="submit"
            className="uppercase rounded-md bg-red-bc2026 px-6 py-3 text-white font-montserrat font-bold w-full"
          >
            {buttonText || 'Contact Me'}
          </button>
        )}
        {loading && (
          <button
            disabled
            className="uppercase bg-red-bc2026 px-6 py-2 text-white font-montserrat font-bold opacity-75 w-full"
          >
            Submitting...
          </button>
        )}
      </div>
      {success && (
        <p className="text-sm pt-2 text-green-600">
          Your form has been sent successfully.
        </p>
      )}
    </form>
  );
}

export default PartnerContactForm;
