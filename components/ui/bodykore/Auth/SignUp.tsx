import Link from 'next/link';
import { FormEventHandler, useState } from 'react';
import {
  createCustomer,
  createCustomerToken,
} from 'services/shopify/storefront';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'nextjs-toast';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const confirm = event.currentTarget['confirm-password'].value;
    const terms = event.currentTarget.terms;
    if (terms != undefined) {
      setLoading(true);
    }else{
      snackbar.showMessage("Please accept the terms and conditions", "error", "filled");
    }
    if (password.length < 5) {
      console.log('length');
      // Password too short, requirement of Shopify
      return;
    }
    if (password !== confirm) {
      console.log('different');
      // Different passwords
      return;
    }
    if (!terms.checked) {
      console.log('terms');
      // Terms not accepted
      return;
    }
    createCustomer(email, password).then((value) => {
      if (value.customer !== null && value.customer !== undefined) {
        createCustomerToken(email, password).then((value) => {
          console.log(value);
          if (
            value.customerAccessToken !== null &&
            value.customerAccessToken !== undefined
          ) {
            Cookies.set('accessToken', value.customerAccessToken.accessToken, {
              expires: new Date(value.customerAccessToken.expiresAt),
            });
            router.push('/').then(() => router.reload());
            setLoading(false);
            snackbar.showMessage('Signup successful', 'success', 'filled');
            // Signup and login successful
          } else {
            // Signup successful but failed to login, if customerUserErrors is empty, graphql error,
            // else, as described.
            console.error(value.customerUserErrors);

            setLoading(false);
            alert("Error, please try again");
          }
        });
      } else {
        // Failed to signup, if customerUserErrors is empty, graphql error,
        // else, as described.
        console.error(value.customerUserErrors);
        alert('Something went wrong');
        setLoading(false);
      }
    });
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="confirm-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I accept the terms and conditions
                </label>
              </div>

              <div className="text-sm w-full text-center">
                <Link href="/auth/signin">
                  <a className="font-medium text-gray-500">
                    Already have an account?
                  </a>
                </Link>
              </div>

              <div>
                {!loading && (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-bc2026 hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign Up
                  </button>
                )}
                {loading && (
                  <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-bc2026 hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    loading
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
