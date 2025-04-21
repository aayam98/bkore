import axios from 'axios';
import React from 'react';
import { sendKalvyo } from 'services/email';
import { useSnackbar } from 'nextjs-toast';
import Image from 'next/image';
import Link from 'next/link';

interface SquatTrainingProps {
  setSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const SquatTraining = ({ setSendEmail }: SquatTrainingProps) => {
  const snackbar = useSnackbar();
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [country, setCountry] = React.useState('');
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let body = JSON.stringify({
      email: email,
      phone: country + phone,
    });
    const res = await (
      await fetch('/api/kalvyo', { method: 'POST', body })
    ).json();
    setLoading(false);
    setSuccess(res);
    setSendEmail(false);
    localStorage.setItem('sendEmail', 'true');
    snackbar.showMessage('Successfully Submiited', 'success', 'filled');
  };
  return (
    <div className="">
      <div className="lg:col-span-3 col-span-6 w-full h-full rounded-l-lg lg:order-1 order-last">
        <form
          action=""
          className="w-full flex justify-center mt-5"
          onSubmit={submitForm}
        >
          <div className="w-5/6 flex flex-col relative">
            <input
              type="email"
              placeholder="Your Email"
              className="h-12 px-5 border-b border-gray-700 lg:text-lg text-sm rounded-none bg-transparent"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
            />
          </div>

          {!loading && (
            <button
              className="bg-red-bc2026 hover:bg-red-hover font-regular lg:text-lg text-sm rounded-full leading-none text-white w-1/3 ml-3 border border-1 border-black"
              type="submit"
            >
              Subscribe
            </button>
          )}
          {loading && (
            <button className="bg-red-bc2026 hover:bg-red-hover font-regular lg:text-lg text-sm rounded-full leading-none text-white w-1/3 ml-3 border border-1 border-black">
              Loading...
            </button>
          )}
        </form>
        <ul className="flex flex-row gap-x-6 pt-7">
          <li>
            <Link href={'https://www.instagram.com/bodykore/'}>
              <a target="_blank" rel="noreferrer">
                <Image
                  src="/svg/instagram-red.svg"
                  alt=""
                  className="cursor-pointer"
                  width={25}
                  height={25}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href={'https://www.facebook.com/BodyKore/'}>
              <a target="_blank" rel="noreferrer">
                <Image
                  src="/svg/facebook-red.svg"
                  alt=""
                  className="cursor-pointer"
                  width={14}
                  height={24}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href={'https://twitter.com/bodykore'}>
              <a target="_blank" rel="noreferrer">
                <Image
                  src="/svg/twitter-red.svg"
                  alt=""
                  className="cursor-pointer"
                  width={27}
                  height={22}
                />
              </a>
            </Link>
          </li>
          <li>
            <Link href={'https://www.youtube.com/user/BodyKore'}>
              <a target="_blank" rel="noreferrer">
                <Image
                  src="/svg/youtube-red.svg"
                  alt=""
                  className="cursor-pointer"
                  width={35}
                  height={25}
                />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SquatTraining;
