/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface OptionsProps {
  text: string;
  slug: string;
}

interface SubCategoryProps {
  name: string;
  img?: string;
  slug: string;
  options: OptionsProps[];
}

interface ProductsDDProps {
  category: string;
  subCategories: SubCategoryProps[];
}

export default function ProductsDD({
  category,
  subCategories,
}: ProductsDDProps) {
  return (
    <Popover className="z-0">
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
            <Popover.Panel className="absolute transform shadow-lg w-full left-0">
            <div className="border-red-bc2026 border-t-2 mt-6">
                <div className={`w-full bg-black `}>
                  <div className="grid grid-cols-7 gap-5 px-10 py-5">
                    {subCategories.map((item, i) => (
                      <span key={i}>
                        <a href={item.slug}>
                          <h2 className="text-white cursor-pointer font-bebas italic text-2">
                            <Popover.Button className="text-white cursor-pointer font-bebas italic text-2">
                              {' '}
                              {item.name}
                            </Popover.Button>
                          </h2>
                        </a>
                        {item.options.map((o, i) => {
                          return (
                            <div className="w-52 py-1" key={i}>
                              <a href={o.slug}>
                                <p className="cursor-pointer font-roboto text-white text-sm  hover:text-red-bc2026">
                                  <Popover.Button>{o.text}</Popover.Button>
                                </p>
                              </a>
                            </div>
                          );
                        })}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
