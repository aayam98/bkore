/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CategoryData } from '@utils/header';
import routes from '@config/routes';
import { useProductCompareBuilder } from '@lib/productCompareContext';
import Image from 'next/image';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useSnackbar } from 'nextjs-toast';
import styled from 'styled-components';

const abouts = [
  { name: '#WeAreBodyKore', link: routes.aboutus.path },
  { name: 'Inspiration', link: routes.inspiration.path },
  { name: 'Ambassadors', link: routes.teamBodykore.path },

];
const supports = [
  { name: 'Store Locator', link: routes.storeLocator.path },
  { name: 'Tutorials', link: routes.videos.path },
  { name: 'Warranty', link: routes.warranty.path },
  { name: 'Returns Policy', link: routes.returnPolicy.path },
];

interface FooterParams {
  productCat: CategoryData[];
}

const Footer = ({ productCat }: FooterParams) => {
  const { productCompare, compareIds, deleteSingleProductCompare } =
    useProductCompareBuilder();
  const snackbar = useSnackbar();
  const [showCompare, setShowCompare] = useState(false);
  const handleSomething = () => {
    snackbar.showMessage(
      'Please add aleast 2 products to compare',
      'error',
      'filled'
    );
  };

  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false)
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false)
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false)
  const [cookie, setCookie] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem('cookie')) {
  //     setCookie(false);
  //   } else {
  //     setCookie(true);
  //   }
  // }, [cookie]);

  if (typeof window !== 'undefined') {
    const html = document.querySelector('html');
    if (html) {
      html.style.overflow = cookie ? 'hidden' : 'auto';
    }
  }

  const acceptCookieHandler = () => {
    setCookie(false);
    localStorage.setItem('cookie', 'true');
    try {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init('3048042495310496');
          ReactPixel.grantConsent();
        });
    } catch (error) {
      console.log('error');
    }
  };
  const cancelCookieHandler = () => {
    setCookie(false);
    localStorage.setItem('cookie', 'reject');
  };

  return (
    <>
      {productCompare && productCompare.length > 0 && (
        <BottomCompare showcompare={!showCompare}>
          <div
            className="topTrigger"
            onClick={() => setShowCompare(!showCompare)}
          >
            Click To {showCompare ? `Show` : `Hide`} Compareables
          </div>
          <div className="w-full justify-start lg:justify-between flex flex-row">
            {productCompare.map((ele, i) => {
              return (
                <CompareProductBox key={i} className="">
                  <ImageBox>
                    <Image
                      height={150}
                      width={150}
                      objectFit="contain"
                      src={ele.image}
                      alt=""
                      className="object-contain w-56"
                    />
                  </ImageBox>

                  <h4 className="text-black-373933 text-xl font-bebas font-bold italic text-left md:text-left">
                    {ele.title}
                  </h4>
                  <p className="font-bebas italic font-bold text-md text-black-373933 product-price">
                    $ {ele.price}
                  </p>
                  <button
                    onClick={() => deleteSingleProductCompare(ele.id)}
                    style={{ outline: 'none', margin: '0px' }}
                  >
                    <IoIosCloseCircleOutline size={30} />
                  </button>
                </CompareProductBox>
              );
            })}
            <div className="comparediv actionButton">
              {productCompare.length > 1 && (
                <Link href={`/compare?products=${compareIds}`}>Compare</Link>
              )}
              {productCompare.length <= 1 && (
                <button onClick={handleSomething}>Compare</button>
              )}
            </div>
          </div>
        </BottomCompare>
      )}

      <footer className="w-full bg-black-1c2023 py-5">
        <div className="max-w-7xl m-auto">
          <div className="grid lg:grid-cols-12 grid-cols-4 md:gap-3 gap-2 py-6 lg:px-0 px-5">
            <div className="md:col-span-4 col-span-6">
              <div>
                <Image
                  placeholder="blur"
                  blurDataURL="/loading.png"
                  src="/svg/LogoFooter.svg"
                  width={200}
                  height={60}
                  alt=""
                  className="w-44"
                />
                <p className="text-gray-200 font-roboto pt-1">
                  Moving Fitness Forward
                </p>
              </div>
              <div>
                <Link href={'tel:949-325-3088'} className="">
                  <div className="flex items-center text-white font-roboto font-bold cursor-pointer gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                    >
                      <g id="Phonecall" transform="translate(0 0)">
                        <rect
                          id="Rectángulo_7"
                          data-name="Rectángulo 7"
                          width="40"
                          height="40"
                          transform="translate(0 0)"
                          fill="#fff"
                          opacity="0"
                        />
                        <path
                          id="Icon_feather-phone-call"
                          data-name="Icon feather-phone-call"
                          d="M14.048,4.857A4.2,4.2,0,0,1,17.37,8.173M14.048,1.5a7.561,7.561,0,0,1,6.686,6.665m-.841,6.7v2.518a1.681,1.681,0,0,1-1.833,1.679A16.663,16.663,0,0,1,10.8,16.483a16.383,16.383,0,0,1-5.046-5.036A16.59,16.59,0,0,1,3.175,4.169a1.68,1.68,0,0,1,1.674-1.83H7.371A1.681,1.681,0,0,1,9.053,3.783a10.761,10.761,0,0,0,.589,2.359,1.676,1.676,0,0,1-.378,1.771L8.2,8.979a13.443,13.443,0,0,0,5.046,5.036l1.068-1.066a1.684,1.684,0,0,1,1.774-.378,10.815,10.815,0,0,0,2.363.588A1.68,1.68,0,0,1,19.893,14.863Z"
                          transform="translate(7.92 9.587)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.7"
                        />
                      </g>
                    </svg>
                    <p className="">949-325-3088</p>
                  </div>
                </Link>
                <Link href={'mailto:sales@bodykore.com'} className="">
                  <div className="flex items-center text-white font-roboto font-bold cursor-pointer gap-2">
                    <svg
                      id="Sales"
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                    >
                      <rect
                        id="Rectángulo_7"
                        data-name="Rectángulo 7"
                        width="40"
                        height="40"
                        fill="#fff"
                        opacity="0"
                      />
                      <path
                        id="Icon_ionic-md-paper-plane"
                        data-name="Icon ionic-md-paper-plane"
                        d="M3.375,14.832l6.111,2.292.761,7.633,3.819-5.345,5.345,5.345L24.757,3.375Zm15.157,6.476-4.261-4.292,5.906-8.3L10.859,15.8,7.328,14.528,22.284,6.5Z"
                        transform="translate(5.625 5.625)"
                        fill="#fff"
                      />
                    </svg>
                    <p className="">sales@bodykore.com</p>
                  </div>
                </Link>
                <div className="flex items-center text-gray-200 font-roboto lg:pt-2 gap-2">
                  <svg
                    id="Clock"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                  >
                    <rect
                      id="Rectángulo_7"
                      data-name="Rectángulo 7"
                      width="40"
                      height="40"
                      fill="#fff"
                      opacity="0"
                    />
                    <g
                      id="Icon_feather-clock"
                      data-name="Icon feather-clock"
                      transform="translate(7 7)"
                    >
                      <path
                        id="Trazado_8824"
                        data-name="Trazado 8824"
                        d="M23,13A10,10,0,1,1,13,3,10,10,0,0,1,23,13Z"
                        transform="translate(0)"
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <path
                        id="Trazado_8825"
                        data-name="Trazado 8825"
                        d="M17.873,11,18,18l5.25,2.333"
                        transform="translate(-6.25 -3.333)"
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                  <span className="">
                    MON - FRI (9AM - 5PM PST) <br></br> Sat - Sun (By
                    Appointment)
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 col-span-4">
              <p
                className="font-bebas italic md:block hidden text-2xl text-white pb-1"
                style={{ letterSpacing: '1px' }}
              >
                Products
              </p>
              {/* Dropdown for mobile view */}
              <div className="block md:hidden">
                <div
                  className="flex items-center justify-between cursor-pointer bg-transparent text-white text-2xl p-2 rounded"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <span className="font-bebas italic text-xl">Products</span>
                  <span className="text-3xl">{isProductsOpen ? '-' : '+'}</span>
                </div>
                {isProductsOpen && (
                  <div className="">
                    {productCat.map((item, index) => (
                      <div key={index} className="py-1 md:pl-0 pl-2">
                        <a
                          href={`${routes.collection.path}/${item.slug}`}
                          className="text-gray-200 font-roboto block hover:underline  text-sm"
                        >
                          {item.title}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Links for larger screens */}
              <div className="hidden md:block">
                {productCat.map((item, index) => (
                  <Link
                    key={index}
                    href={`${routes.collection.path}/${item.slug}`}
                    passHref
                  >
                    <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 col-span-4">
              <p
                className="font-bebas italic md:block hidden text-2xl text-white pb-1"
                style={{ letterSpacing: '1px' }}
              >
                Resources
              </p>
              {/* Dropdown for mobile view */}
              <div className="block md:hidden">
                <div
                  className="flex items-center justify-between cursor-pointer bg-transparent text-white text-2xl p-2 rounded"
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                >
                  <span className="font-bebas italic text-xl">Resources</span>
                  <span className="text-3xl">{isResourcesOpen ? '-' : '+'}</span>
                </div>
                {isResourcesOpen && (
                  <div className="">
                    <div className="py-1 md:pl-0 pl-2">
                      <a
                        href="/product-manuals/"
                        className="text-gray-200 font-roboto block hover:underline text-sm"
                      >
                        Manual
                      </a>
                    </div>
                    <div className="py-1 md:pl-0 pl-2">
                      <a
                        href="/datasheets/"
                        className="text-gray-200 font-roboto block hover:underline text-sm"
                      >
                        Technical Datasheets
                      </a>
                    </div>
                    <div className="py-1 md:pl-0 pl-2">
                      <a
                        href="/spareParts/"
                        className="text-gray-200 font-roboto block hover:underline text-sm"
                      >
                        Spare Parts
                      </a>
                    </div>
                    <div className="py-1 md:pl-0 pl-2">
                      <a
                        href="/3ddesign/"
                        className="text-gray-200 font-roboto block hover:underline text-sm"
                      >
                        3D GYM Design
                      </a>
                    </div>
                    <div className="py-1 md:pl-0 pl-2">
                      <a
                        href="/catalogs/"
                        className="text-gray-200 font-roboto block hover:underline text-sm"
                      >
                        Catalog
                      </a>
                    </div>
                    <div className="py-1 md:pl-0 pl-2">
                      <a
                        href="/become-a-partner/"
                        className="text-gray-200 capitalize font-roboto block hover:underline text-sm"
                      >
                        Become a partner
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* Links for larger screens */}
              <div className="hidden md:block">
                <Link href={`/product-manuals/`} passHref>
                <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                    Manual
                  </p>
                </Link>
                <Link href={`/datasheets/`} passHref>
                <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                    Technical Datasheets
                  </p>
                </Link>
                <Link href={`/spareParts/`} passHref>
                <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                    Spare Parts
                  </p>
                </Link>
                <Link href={`/3ddesign/`} passHref>
                <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                    3D GYM Design
                  </p>
                </Link>
                <Link href={`/catalogs/`} passHref>
                <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                    Catalog
                  </p>
                </Link>
                <Link href={`/become-a-partner/`} passHref>
                <p className="flex-wrap text-gray-200  font-roboto cursor-pointer py-1 hover:underline text-sm">
                    Become a partner
                  </p>
                </Link>
              </div>
            </div>

            <div className="md:col-span-2 col-span-4">
              <p
                className="font-bebas italic text-2xl md:block hidden text-white pb-1"
                style={{ letterSpacing: '1px' }}
              >
                About
              </p>
              {/* Dropdown for mobile view */}
              <div className="block md:hidden">
                <div
                  className="flex items-center justify-between cursor-pointer bg-transparent text-white text-2xl p-2 rounded"
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                >
                <span className="font-bebas italic text-xl">About</span>
                  <span className="text-3xl">{isAboutOpen ? '-' : '+'}</span>
                </div>
                {isAboutOpen && (
                  <div className="">
                    {abouts.map((about, i) => (
                      <div key={i} className="py-1 md:pl-0 pl-2">
                        <a
                          href={about.link}
                          className="text-gray-200 font-roboto block hover:underline text-sm"
                        >
                          {about.name}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Links for larger screens */}
              <div className="hidden md:block">
                {abouts.map((about, i) => (
                  <Link key={i} href={about.link} passHref>
                   <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                      {about.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 col-span-4">
              <p
                className="font-bebas italic text-2xl md:block hidden text-white pb-1"
                style={{ letterSpacing: '1px' }}
              >
                Support
              </p>
              {/* Dropdown for mobile view */}
              <div className="block md:hidden">
                <div
                  className="flex items-center justify-between cursor-pointer bg-transparent text-white text-2xl p-2 rounded"
                  onClick={() => setIsSupportOpen(!isSupportOpen)}
                >
                <span className="font-bebas italic text-xl">Support</span>
                  <span className="text-3xl">{isSupportOpen ? '-' : '+'}</span>
                </div>
                {isSupportOpen && (
                  <div className="">
                    {supports.map((support, i) => (
                      <div key={i} className="py-1 md:pl-0 pl-2">
                        <a
                          href={support.link}
                          className="text-gray-200 font-roboto block hover:underline text-sm"
                        >
                          {support.name}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Links for larger screens */}
              <div className="hidden md:block">
                {supports.map((support, i) => (
                  <Link key={i} href={support.link} passHref>
                    <p className="flex-wrap text-gray-200 font-roboto cursor-pointer py-1 hover:underline text-sm">
                      {support.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
          <div className="border-b border-white"></div>
          <div className="grid lg:grid-cols-12 grid-cols-1 items-center p-5">
            <div className="col-span-3 flex text-gray-200 text-center lg:text-left flex-wrap">
              <p className="pr-2 text-sm tracking-wider md:pb-0 pb-4">
                ©2025 BodyKore -All rights reserved.
              </p>
            </div>
            <div className="col-span-6 lg:block text-white">
              <div className="grid lg:grid-cols-5 grid-cols-12 md:gap-5 gap-2 justify-center">
                <Link className='' href={'/terms-of-use'}>
                  <p className="lg:col-span-1 md:col-span-12 col-span-4 hover:underline cursor-pointer text-sm tracking-wider">
                    Terms of Use
                  </p>
                </Link>

                <Link className='' href={'/privacy-policy'}>
                  <p className="lg:col-span-1 md:col-span-12 col-span-4  hover:underline cursor-pointer text-sm tracking-wider">
                    Privacy Policy
                  </p>
                </Link>
                <Link className='' href={'/cookie'}>
                  <p className="lg:col-span-1 md:col-span-12 col-span-4  hover:underline cursor-pointer text-sm tracking-wider">
                    Cookie Policy
                  </p>
                </Link>

                <Link className='' href={'/returnPolicy'}>
                  <p className="lg:col-span-1 md:col-span-12 col-span-4  hover:underline cursor-pointer text-sm tracking-wider">
                    Return Policy
                  </p>
                </Link>

                <Link className='' href={'/sitemap'}>
                  <p className="lg:col-span-1 md:col-span-12 col-span-4 hover:underline cursor-pointer text-sm tracking-wider">
                    Sitemap
                  </p>
                </Link>
              </div>
            </div>

            <div className="col-span-3 flex lg:justify-end md:mt-0 mt-4">
              <div className="px-5">
                <Link href={'https://www.instagram.com/bodykore/'}>
                  <a target="_blank" rel="noreferrer">
                    <Image
                      src="/svg/instagram-footer.svg"
                      alt=""
                      className="cursor-pointer"
                      width={25}
                      height={25}
                    />
                  </a>
                </Link>
              </div>

              <div className="px-5">
                <Link href={'https://www.facebook.com/BodyKore/'}>
                  <a target="_blank" rel="noreferrer">
                    <Image
                      src="/svg/facebook-footer.svg"
                      alt=""
                      className="cursor-pointer"
                      width={25}
                      height={25}
                    />
                  </a>
                </Link>
              </div>

              <div className="px-5">
                <Link href={'https://twitter.com/bodykore'}>
                  <a target="_blank" rel="noreferrer">
                    <Image
                      src="/svg/twitter-footer.svg"
                      alt=""
                      className="cursor-pointer"
                      width={25}
                      height={25}
                    />
                  </a>
                </Link>
              </div>

              <div className="">
                <Link href={'https://www.youtube.com/user/BodyKore'}>
                  <a target="_blank" rel="noreferrer">
                    <Image
                      src="/svg/youtube-footer.svg"
                      alt=""
                      className="cursor-pointer"
                      width={28}
                      height={28}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {cookie && (
        <div
          className="fixed  top-0 bottom-0 right-0 left-0"
          style={{ zIndex: '8999' }}
        ></div>
      )}

      {cookie && (
        <>
          <div
            className="fixed flex px-5 py-5 bg-gray-200 bottom-0 left-0 right-0 max-w-5xl m-auto mb-10 shadow-xl rounded-md z-50"
            style={{ zIndex: '8999' }}
          >
            <div className="w-3/4">
              <p className="text-base pb-3 text-black">
                We use cookies to provide, improve, protect, and promote our
                services. Visit our{' '}
                <u>
                  <Link href={'/privacy-policy'}>Privacy Policy</Link>
                </u>{' '}
                to learn more. You can manage your personal preferences by
                checking Cookie Settings.
              </p>
            </div>
            <div className="w-1/4">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-md mx-2 w-24"
                onClick={acceptCookieHandler}
              >
                I accept
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-400 text-black px-4 py-2 rounded-md text-md mx-2 w-24"
                onClick={cancelCookieHandler}
              >
                Decline
              </button>
            </div>
          </div>
        </>
      )}
      {/* <LiveChatWidget license="11830821" /> */}
    </>
  );
};

export default Footer;

const ImageBox = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const BottomCompare = styled.div<{ showcompare: boolean }>`
  position: fixed;
  bottom: ${(p) => (p.showcompare ? `-20%` : `0`)};
  left: 0;
  right: 0;
  background: #efefef;
  padding: 0 10rem 10px;
  z-index: 999;
  transition: all 0.5s ease-in-out;
  .topTrigger {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    padding: 5px;
    cursor: pointer;
  }

  .actionButton {
    display: flex;
    align-items: center;
    flex-flow: row;
  }

  a,
  button {
    background: #000;
    color: #fff;
    min-height: 50px;
    border-radius: 10px;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .comparediv {
    width: 25%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    img {
      margin: 10px 0;
    }
  }
`;

const CompareProductBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  button {
    position: absolute;
    right: 5px;
    color: red;
    width: 30px;
    background: transparent;
  }
`;

const CookieBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #efefef;
  padding: 15px;
`;
