import { Tooltip } from '@components/ui/base/tooltip/Tooltip';
import { Popover, Transition } from '@headlessui/react';
import { productMenus } from '@utils/productMenus';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { FaArrowRight } from 'react-icons/fa';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
interface SubCategoryProps {
  name: string;
  img?: string;
  slug: string;
  options: OptionsProps[];
}

interface OptionsProps {
  text: string;
  slug: string;
  img: string;
}

export interface ProductMenuProps {
  title: string;
  text: string;
  slug: string;
  image: string;
}

interface MegamenuVerticleProps {
  category: string;
  subCategories: SubCategoryProps[];
}

export default function MegamenuVerticle({
  category,
  subCategories,
}: MegamenuVerticleProps) {
  const [menu, setMenu] = useState<SubCategoryProps>();
  const menuSelect = (menu: SubCategoryProps) => {
    setMenu(menu);
  };
  const [products, setProducts] = useState<ProductMenuProps[]>([]);

  useEffect(() => {
    setMenu(subCategories[0]);
    setProducts(
      productMenus
    );
  }, []);

  return (
    <>
      <Popover className="z-0 ">
        {({ open }) => (
          <>
            <div className="z-10 bg-black">
              <div className="max-w-7xl mx-auto flex">
                <Popover.Button
                  className={classNames(
                    open ? 'text-red' : 'text-white',
                    'group bg-black rounded-md inline-flex items-center text-white font-medium hover:text-white focus:outline-none'
                  )}
                >
                  <span className="hover:text-red-bc2026 font-bebas italic text-xl tracking-wide">
                    {category}
                  </span>
                </Popover.Button>
              </div>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1"
            >
              <Popover.Panel className="absolute transform shadow-lg  left-0 ">
                <div className="grid grid-cols-6 border-t-2 border-red-bc2026 h-full mt-7">
                  <div className="col-span-1 h-fit bg-black">
                    <ul className="text-white cursor-pointer font-bebas italic text-xl w-56">
                      {subCategories.map((item, i) => (
                        <li
                          key={i}
                          className="hover:bg-red-hover pl-6 py-2 w-full"
                          onMouseOver={() => menuSelect(item)}
                        >
                          <a href={item.slug} className="w-full">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {menu && (
                    <div className="bg-black  pl-3 pb-8 col-span-5 h-full overflow-y-scroll pr-6">
                      <a href={menu.slug} className="">
                        <h4 className="text-white  cursor-pointer font-bebas italic text-lg md:text-xl lg:text-xl py-2">
                          {menu.name}
                        </h4>
                      </a>
                      <div className="grid  grid-cols-5 gap-3 justify-start">
                        {menu.options.map((ele, index) => {
                          const filteredProducts = products.filter((el) => el.title === ele.text);
                          return (
                            <div className="pb-3" key={index}>
                              <Tooltip
                                position="right"
                                content={
                                  menu.name !== "Packages" && menu.name !== "Smart Sled" && filteredProducts.length > 0 && (
                                    <ul
                                      className={'list-none flex flex-col gap-3 w-auto text-black cursor-pointer font-roboto text-base leading-7 p-2'}
                                    >
                                      {filteredProducts.map((el, index) => {
                                        return (
                                          <li
                                            key={index}
                                            className="w-12/12 hover:text-red-hover text-sm leading-tight flex items-center w-96">
                                            <Image
                                              placeholder="blur"
                                              blurDataURL="/loading.png"
                                              src="/svg/rightArrow.svg"
                                              width={20}
                                              height={20}
                                              alt=""
                                              className="w-5"
                                            />
                                            <a
                                              href={el.slug}
                                              className='flex gap-3'
                                            >
                                              {el.text}
                                            </a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )
                                }
                              >
                                <div className="flex flex-col  items-center">
                                  <h4 className="text-white cursor-pointer font-bebas italic text-lg pt-2 hover:text-red-hover">
                                    <a href={ele.slug}>
                                      <Image
                                        src={ele.img}
                                        alt=""
                                        className="object-cover w-full h-44"
                                        height={250}
                                        width={300}
                                        placeholder="blur"
                                        blurDataURL="/loading.png"
                                      />
                                      {ele.text}</a>
                                  </h4>
                                </div>
                              </Tooltip>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}