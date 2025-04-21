import Link from 'next/link';
import { FormEventHandler, useEffect, useState } from 'react';
import { createCustomerToken } from 'services/shopify/storefront';
import Cookies from 'js-cookie';
import { useSnackbar } from 'nextjs-toast';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  useEffect(() => {
    if (Cookies.get("accessToken") != undefined) {
      router.push('/');
    }
  }, []);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {


    event.preventDefault();
    setLoading(true);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    createCustomerToken(email, password).then((value) => {
      if (
        value.customerAccessToken !== null &&
        value.customerAccessToken !== undefined
      ) {
        Cookies.set('accessToken', value.customerAccessToken.accessToken, {
          expires: new Date(value.customerAccessToken.expiresAt),
        });
        snackbar.showMessage("Login successful", "success", "filled");
        router.push('/').then(() => router.reload());
        setLoading(false);

        // Login successful
      } else {
        // Failed to login, if customerUserErrors is empty, graphql error,
        // else, as described.
        console.error(value.customerUserErrors);
        setLoading(false);
        snackbar.showMessage(value.customerUserErrors[0].message, "error", "filled");

      }

    });

  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log into your account
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

              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm w-full text-center">
                <Link href="/auth/signup">
                  <a className="font-medium text-gray-500">
                    Don't have an account?
                  </a>
                </Link>
              </div>

              <div className="text-sm w-full text-center">
                <Link href="/auth/forgetpassword">
                  <a className="font-medium text-gray-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>

              <div>
                {!loading && (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-bc2026 hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign In
                  </button>
                )}
                {loading && (
                  <button

                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-bc2026 hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    loading...
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
