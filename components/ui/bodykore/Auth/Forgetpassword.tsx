import Link from 'next/link';
import { FormEventHandler } from 'react';
import {
  createCustomerToken,
  recoverCustomerPassword,
} from 'services/shopify/storefront';
import Cookies from 'js-cookie';

export default function ForgetComponent() {

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    recoverCustomerPassword(email).then((value) => {
      if (value.customerUserErrors.length === 0) {
        // Password recovery email sent
      } else {
        // Failed to send recovery email, if customerUserErrors is empty, graphql error,
        // else, as described.
        console.error(value.customerUserErrors);
      }
    });


  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forget Password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  />
                </div>
              </div>



              <div className="text-sm w-full text-center">
                <Link href="/auth/signin">
                  <a className="font-medium text-gray-500">
                    Already have an account?
                  </a>
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-bc2026 hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
