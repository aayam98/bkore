import React, { FormEventHandler, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import {
  Customer,
  Order,
  createCustomerToken,
  getCustomerId,
  getCustomerOrders,
  updateCustomer,
} from 'services/shopify/storefront';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSnackbar } from 'nextjs-toast';
import moment from 'moment';
export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    // revalidate: 30 * 60,
  };
};
interface FinanceParams {
  header: HeaderData;
}
const Profile = ({ header }: FinanceParams) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [activeTabs, setActiveTabs] = useState<string[]>([]);
  const snackbar = useSnackbar();
  useEffect(() => {
    setActiveTabs(['profile', 'orders']);
  }, []);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [user, setUser] = useState<Customer | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get('accessToken')) {
      router.push('/');
    } else {
      (async () => {
        const orders = await getCustomerOrders(Cookies.get('accessToken')!);
        const user = await getCustomerId(Cookies.get('accessToken')!);
        setUser(user!);
        setOrders(orders);
        setFirstName(user!.firstName);
        setLastName(user!.lastName);
        setEmail(user!.email);
      })();
    }
  }, []);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      snackbar.showMessage(
        'Password and confirm password do not match',
        'error',
        'filled'
      );
      setLoading(false);
      return;
    }
    await updateCustomer(
      email,
      password,
      firstName,
      lastName,
      Cookies.get('accessToken')
    );
    createCustomerToken(email, password).then((value) => {
      if (
        value.customerAccessToken !== null &&
        value.customerAccessToken !== undefined
      ) {
        Cookies.set('accessToken', value.customerAccessToken.accessToken, {
          expires: new Date(value.customerAccessToken.expiresAt),
        });
      }
    });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    snackbar.showMessage('Profile updated successfully', 'success', 'filled');
    setLoading(false);
  };
  return (
    <>
      <section className="max-w-6xl m-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="bg-gray-100 p-5 rounded-md">
              <ul className="text-gray-700 font-roboto text-base font-medium space-y-4 rounded-md">
                {activeTabs.map((ele, index) => (
                  <li
                    key={index}
                    className={`capitalize p-2 px-4 cursor-pointer rounded-md ${
                      ele == activeTab ? 'bg-red-bc2026 text-white' : ''
                    }`}
                    onClick={() => setActiveTab(ele)}
                  >
                    {ele}
                  </li>
                ))}
                <li
                  className={`capitalize p-2 px-4 cursor-pointer rounded-md ${
                    'logout' == activeTab ? 'bg-red-bc2026 text-white' : ''
                  }`}
                >
                  <button
                    onClick={() => {
                      Cookies.remove('accessToken');
                      router.push('/').then(() => router.reload());
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-8">
            {/* profile section */}
            {activeTab == 'profile' && (
              <div>
                <h4 className="font-bebas font-bold tracking-wider text-3xl italic text-red-bc2026">
                  Profile
                </h4>
                <p>
                  Manage your details, view your status and change your
                  password.
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                      <div className="w-full">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          id="input-label"
                          className="py-3 px-4 w-full block border border-gray-400 rounded-md text-sm text-gray-700 placeholder:text-gray-700 bg-white h-12"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          id="input-label"
                          className="py-3 px-4 w-full block border border-gray-400 rounded-md text-sm text-gray-700 placeholder:text-gray-700 bg-white h-12"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="">
                        <label htmlFor="">Email</label>
                        <input
                          type="text"
                          id="input-label"
                          className="py-3 px-4 w-full block border border-gray-400 rounded-md text-sm text-gray-700 placeholder:text-gray-700 bg-white h-12"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="">
                        <label htmlFor="">Password</label>
                        <input
                          type="text"
                          id="input-label"
                          className="py-3 px-4 w-full block border border-gray-400 rounded-md text-sm text-gray-700 placeholder:text-gray-700 bg-white h-12"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="">
                        <label htmlFor="">Confirm Password</label>
                        <input
                          type="text"
                          id="input-label"
                          className="py-3 px-4 w-full block border border-gray-400 rounded-md text-sm text-gray-700 placeholder:text-gray-700 bg-white h-12"
                          placeholder="Confrim Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      {!loading && (
                        <button
                          type="submit"
                          className="w-28 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200"
                        >
                          Update
                        </button>
                      )}
                      {loading && (
                        <button className="w-28 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200">
                          Loading ...
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* profile section */}
            {/* profile section */}
            {activeTab == 'orders' && (
              <div>
                <h4 className="font-bebas font-bold tracking-wider text-3xl italic text-red-bc2026">
                  Orders
                </h4>
                <p>Manage your placed orders.</p>
                <div className="bg-gray-100 p-4 rounded-md space-y-2">
                  {!orders && <p>No orders found</p>}
                  {orders &&
                    orders.map((ele, index) => (
                      <div
                        key={index}
                        className="flex border border-red-bc2026 p-2 rounded-md gap-5"
                      >
                        <div className="w-4/12">
                          <div>
                            <p className="font-roboto">
                              <b>Order No.:</b> {ele.node.orderNumber}
                            </p>

                            <p className="font-roboto">
                              <b>Date:</b>{' '}
                              {moment(ele.node.processedAt).format(
                                'DD-MM-YYYY'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="w-3/12 text-left">
                          <p className="font-roboto">
                            <b>Total Price: </b> ${ele.node.totalPrice.amount}
                          </p>
                          <p className="font-roboto">
                            <b>Items: </b>{' '}
                            {ele.node.lineItems.nodes
                              .map((ele) => ele.quantity)
                              .reduce((a, b) => a + b, 0)}
                          </p>
                          <p className="font-roboto">
                            <b>Shipping:</b> $
                            {ele.node.totalShippingPrice.amount}
                          </p>
                        </div>
                        <div className="w-5/12 text-left">
                          <p className="font-roboto">
                            <b>Payment Status:</b> {ele.node.financialStatus}
                          </p>
                          <p className="font-roboto">
                            <b>Fulfillment status:</b>{' '}
                            {ele.node.fulfillmentStatus}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* profile section */}
          </div>
        </div>
      </section>
    </>
  );
};
export default Profile;
