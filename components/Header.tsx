/* eslint-disable @next/next/no-img-element */
import routes from '@config/routes';
import { mapCheckout } from '@utils/checkout';
import { CategoryData } from '@utils/header';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { getCheckout, updateCheckoutEmail } from 'services/shopify/storefront';
import {
  cartAddOn,
  cartItemsState,
  cartSidebarOpenState,
  cartTotalState,
  checkoutUrlState,
  menuSidebarOpenState,
} from '../state/atoms';
import MobileMenu from './MobileMenu';
import CartSidebar from './CartSidebar';
import ResourcesDD from './ui/bodykore/Dropdown/ResourcesDD';
import SearchModal from './ui/bodykore/SearchModal';
import { CardProps } from './ui/bodykore/Cards/SellCardsaddon';
import { useRouter } from 'next/router';
import MegamenuVerticle from './ui/bodykore/Sections/MegamenuVerticle';
import Image from 'next/image';
import { categories, resources } from '@utils/home';

interface HeaderParams {
  productCat: CategoryData[];
  cartsAddon: CardProps[];
}

const Header = ({ productCat, cartsAddon }: HeaderParams) => {
  const setMenuSidebarOpen = useSetAtom(menuSidebarOpenState);
  const setCartSidebarOpen = useSetAtom(cartSidebarOpenState);
  const [cartItems, setCartItems] = useAtom(cartItemsState);
  const [checkoutUrl, setcheckoutUrl] = useAtom(checkoutUrlState);
  const [cartTotal, setCartTotal] = useAtom(cartTotalState);
  const [dropdown, setDropdown] = useState<string>('');
  const [logged, setLogged] = useState(false);
  const setAddOns = useSetAtom(cartAddOn);
  const router = useRouter();

  const dropDownAct = (name: string) => {
    setDropdown(dropdown === name ? '' : name);
  };

  const fetchCart = async () => {
    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');
    if (checkoutId) {
      const checkout = await getCheckout(checkoutId);
      if (checkout) {
        setCartItems(mapCheckout(checkout));
        setcheckoutUrl(checkout.webUrl);
        setCartTotal(checkout.subtotalPriceV2.amount);
        if (email && checkout.email !== email) {
          await updateCheckoutEmail(checkoutId, email);
        }
      } else {
        Cookies.remove('checkoutId');
      }
    }
  };

  useEffect(() => {
    // console.log('product category ', productCat);
    fetchCart();
  }, []);

  useEffect(() => {
    setLogged(!!Cookies.get('accessToken'));
  }, []);

  useEffect(() => {
    const addons = localStorage.getItem('addons');
    if (addons) setAddOns(JSON.parse(addons));
  }, [setAddOns]);

  const mapDynamicSearch = () => productCat.map((item) => ({
    name: `${item.title} (Collection)`,
    link: `${routes.collection.path}/${item.slug}`,
  }));

  return (
    /*Nav section*/
    <nav className="sticky top-0" style={{ zIndex: 99999 }}>
      {/*Ad bar section*/}
      <div className="bg-black border-b border-gray-600 text-center py-1 lg:px-10 px-5">
        <div className="flex max-w-8xl m-auto justify-start items-center">
          <h4 className="font-bebas text-center lg:text-2xl text-base tracking-wide italic text-white w-11/12 ">
            {/* FREE SHIPPING ON ORDERS OVER $1000 WITH CODE :  */}
            {/* <span className='border-2 px-1 border-dotted'> holidayspecial</span> */}
          </h4>
          <Link href="/search" passHref>
            <a className="cursor-pointer w-1/12 inline-flex justify-end">
              <Image width={40} height={40} src="/header/Search.svg" alt="search" />
            </a>
          </Link>
        </div>
      </div>
      {/*Navigation section*/}
      <div className="bg-black py-5 lg:px-10 px-5">
        <div className="sticky top-0 max-w-8xl m-auto">
          {/* Cart Sidebar */}
          <CartSidebar
            items={cartItems}
            checkoutUrl={checkoutUrl}
            cartTotal={cartTotal}
            bestSeller={cartsAddon}
          />
          <div className="grid grid-cols-10 items-center">
            {/*BodyKore Logo*/}
            <div className="justify-start col-span-1">
              <div className="hidden xl:block">
                <Link href="/" passHref>
                  <a>
                    <Image
                      src="/header/logowhitered.png"
                      alt="BodyKore"
                      className="cursor-pointer object-cover"
                      width={250}
                      height={40}
                    />
                  </a>
                </Link>
              </div>
            </div>

            {/*Categories*/}
            <div className="font-bebas  text-xl col-span-7 flex flex-wrap justify-end pr-5">
              <div className="hidden xl:block">
                <div className="flex justify-end">
                  <div className="flex items-center">
                    <div className="flex-1 mr-5 ">
                      <MegamenuVerticle
                        category="Products"
                        subCategories={productCat.map((category) => ({
                          name: category.title,
                          img: category.image,
                          slug: `${routes.collection.path}/${category.slug}`,
                          options: category.subcategories.map((subcat) => {
                            if (category.slug === 'packages') {
                              return {
                                text: subcat.name,
                                slug: `${routes.products.path}/${subcat.slug}`,
                                img: subcat.image,
                              };
                            }
                            return {
                              text: subcat.name,
                              slug: `${routes.products.path
                                }-category/${category.title?.replaceAll(' ', '-')
                                  .toLowerCase()}/${subcat.name
                                    .replaceAll(' ', '-')
                                    .toLowerCase()}`,
                              img: subcat.image,
                            };
                          }),
                        }))}
                      />
                    </div>
                    <div className="flex-1 mr-1">
                      <Link href="/product" passHref>
                        <a className="text-white cursor-pointer hover:text-red-bc2026 text-center italic" id="menu-button" aria-expanded="true" aria-haspopup="true">
                          Shop
                        </a>
                      </Link>
                    </div>
                    <div className="hidden flex-1 xl:block">
                      <ResourcesDD
                        category="Resources"
                        subCategories={resources}
                      />
                    </div>
                  </div>
                  <div className="hidden  flex-1 xl:block justify-end italic">
                    <div className="relative w-full flex gap-6">
                      {categories.map((category, i) => (
                        <a key={i} href={category.link}>
                          {category.link && (
                            <span
                              className="text-white cursor-pointer hover:text-red-bc2026 text-center"
                              id="menu-button"
                              aria-expanded="true"
                              aria-haspopup="true"
                            >
                              {category.name}
                            </span>
                          )}
                          {!category.link && (
                            <span>
                              <span
                                className="text-white cursor-pointer hover:text-red-bc2026 text-center "
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() => dropDownAct(category.name)}
                              >
                                {category.name}
                              </span>
                              {dropdown == category.name &&
                                category.subCategories && (
                                  <ul className="flex flex-col absolute top-8 bg-black w-2/3 text-lg">
                                    {category.subCategories.map((subcat, i) => (
                                      <li
                                        key={i}
                                        className=" py-2 pl-6"
                                        onClick={() =>
                                          dropDownAct(category.name)
                                        }
                                      >
                                        {subcat.blank != '' && (
                                          <Link
                                            href={subcat.link}
                                            target={subcat.blank}
                                            passHref
                                          >
                                            <span
                                              className="text-white cursor-pointer hover:text-red-bc2026 text-center"
                                              id="menu-button"
                                              aria-expanded="true"
                                              aria-haspopup="true"
                                            >
                                              {subcat.name}
                                            </span>
                                          </Link>
                                        )}
                                        {subcat.blank == '' && (
                                          <Link href={subcat.link} passHref>
                                            <span
                                              className="text-white cursor-pointer hover:text-red-bc2026 text-center"
                                              id="menu-button"
                                              aria-expanded="true"
                                              aria-haspopup="true"
                                            >
                                              {subcat.name}
                                            </span>
                                          </Link>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*Icons*/}
            <div className="col-span-2  ">
              <div className="hidden xl:flex flex-1 gap-2 justify-end">
                <div className="flex justify-end gap-3 items-center">
                  <Link href={!logged ? '/auth/signin' : '/account/profile'} passHref>
                    <a className="cursor-pointer">
                      <Image src='/header/account.svg' alt="user" width={40} height={40} />
                    </a>
                  </Link>

                  <div onClick={() => setCartSidebarOpen(true)} className='relative'>
                    <Image width={40} height={40} src="/header/cart.svg" alt="" />
                    <span className="absolute text-xs -top-1 -right-1 w-5 h-5 rounded-full  flex items-center justify-center text-white" style={{ backgroundColor: '#d33500' }}>
                      {cartItems && cartItems.length ? cartItems.length : 0}
                    </span>
                  </div>

                  <div className="ml-4">
                    <Link href={'tel:949-325-3088'} passHref>
                      <a>
                        <button
                          className="bg-transparent text-white hover:text-white border border-white hover:border-white rounded-lg text-md px-2 py-1"
                          style={{ letterSpacing: '1.5px' }}
                        >
                          <div className="flex justify-center items-center">
                            <Image src="/header/phone.svg" alt="phone" width={40} height={40} />

                            <div className="px-2 text-sm font-medium">
                              Call us
                            </div>
                          </div>
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="w-1/3 flex justify-start items-center">
              {/*3 bars Menu*/}
              <div
                className="flex  items-center pl-2 xl:hidden cursor-pointer"
                onClick={() => setMenuSidebarOpen(true)}
              >
                <Image src='/header/hamburger.svg' alt="menu" width={40} height={40} />
              </div>
            </div>

            {/* Search Modal */}
            <SearchModal dynamicItems={mapDynamicSearch()} />
            {/* Menu Sidebar */}
            <MobileMenu
              search={mapDynamicSearch()}
              categories={[
                {
                  title: 'Products',
                  icon: '/svg/black-arrow.svg',
                },
                {
                  title: 'Resources',
                  icon: '/svg/black-arrow.svg',
                },
              ]}
              links={[
                {
                  title: 'Inspiration',
                  href: routes.inspiration.path,
                },
                {
                  title: 'Stores',
                  href: routes.storeLocator.path,
                },
              ]}
              linksImg={[
                {
                  title: 'Cart',
                  icon: '/svg/header-cart.svg',
                  href: '#',
                },
                {
                  title: 'Account',
                  icon: '/svg/my-account.svg',
                  href: routes.account.path,
                },
              ]}
              categories1={productCat}
            />

            <div className="w-1/3 flex justify-center items-center">
              <div className="xl:hidden">
                <Link href="/" passHref>
                  <a>
                    <Image
                      src="/header/logowhitered.png"
                      alt="BodyKore"
                      className="cursor-pointer object-cover"
                      width={250}
                      height={40}
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                  </a>
                </Link>
              </div>
            </div>

            <div className="w-1/3 flex justify-end items-center">
              {/*Shopping cart sm*/}
              <div
                className="md:block lg:block xl:hidden"
                onClick={() => setCartSidebarOpen(true)}
              >
                <Image width={40} height={40} src="/header/cart.svg" alt="" />
                <span className="absolute text-xs -top-1 -right-1 w-5 h-5 rounded-full  flex items-center justify-center text-white" style={{ backgroundColor: '#d33500' }}>
                  {cartItems && cartItems.length ? cartItems.length : 0}
                </span>              
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Ad bar section*/}
      <div className="w-full h-auto bg-red-bc2026 text-center py-2 px-4">
        <span className="text-white font-bebas italic tracking-wider text-xl">
          <Link href="/finance" passHref>
            <a className="cursor-pointer">
              FLEXIBLE FINANCING AVAILABLE
            </a>
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Header;
