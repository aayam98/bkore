import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { getAddOnProductsShopify } from 'services/shopify/storefront';
import { canCheckoutState, cartAddOn, cartSidebarOpenState } from '../state/atoms';
import SellCards, { CardProps } from './ui/bodykore/Cards/SellCardsaddon';
import SingleCartItem, {
  SingleItemCartProps,
} from './ui/bodykore/Cart/SingleCartItem';

interface CartSidebarProps {
  items: SingleItemCartProps[];
  checkoutUrl?: string;
  cartTotal?: string;
  bestSeller?: CardProps[] | undefined;
}

const CartSidebar = ({ items, checkoutUrl, cartTotal }: CartSidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(cartSidebarOpenState);
  const [sum, setSum] = useState(0);
  const setAddOns = useAtom(cartAddOn);
  const [addOns, setAddOnsState] = useState<CardProps[]>([]);
  const canCheckout = useAtomValue(canCheckoutState);
  const setCanCheckout = useSetAtom(canCheckoutState);
  useEffect(() => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.price;
    });
    setSum(sum);

  }, [items]);
  const addons = useAtom(cartAddOn)[0];

  const fetchProduct = async () => {
    const handle1 = (addons && addons!.length > 0 && addons![0].name) || '';
    const handle2 = (addons && addons!.length > 1 && addons![1].name) || '';
    const handle3 = (addons && addons!.length > 2 && addons![2].name) || '';
    const handle4 = (addons && addons!.length > 3 && addons![3].name) || '';
    const handle5 = (addons && addons!.length > 4 && addons![4].name) || '';
    const handle6 = (addons && addons!.length > 5 && addons![5].name) || '';
    const handle7 = (addons && addons!.length > 6 && addons![6].name) || '';
    const handle8 = (addons && addons!.length > 7 && addons![7].name) || '';
    const handle9 = (addons && addons!.length > 8 && addons![8].name) || '';
    const handle10 = (addons && addons!.length > 9 && addons![9].name) || '';
    await getAddOnProductsShopify(
      handle1,
      handle2,
      handle3,
      handle4,
      handle5,
      handle6,
      handle7,
      handle8,
      handle9,
      handle10
    ).then((res) => {
      setAddOnsState([
        res.product1 && {
          id: res.product1.id || '',
          slug: res.product1.handle || '',
          bgImg: res.product1.featuredImage.url || '',
          title: res.product1.title || '',
          price: res.product1.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product1.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product1.description || '',
          available: true,
        },
        res.product2 && {
          id: res.product2.id || '',
          slug: res.product2.handle || '',
          bgImg: res.product2.featuredImage.url || '',
          title: res.product2.title || '',
          price: res.product2.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product2.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product2.description || '',
          available: true,
        },
        res.product3 && {
          id: res.product3.id || '',
          slug: res.product3.handle || '',
          bgImg: res.product3.featuredImage.url || '',
          title: res.product3.title || '',
          price: res.product3.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product3.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product3.description || '',
          available: true,
        },
        res.product4 && {
          id: res.product4.id || '',
          slug: res.product4.handle || '',
          bgImg: res.product4.featuredImage.url || '',
          title: res.product4.title || '',
          price: res.product4.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product4.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product4.description || '',
          available: true,
        },
        res.product5 && {
          id: res.product5.id || '',
          slug: res.product5.handle || '',
          bgImg: res.product5.featuredImage.url || '',
          title: res.product5.title || '',
          price: res.product5.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product5.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product5.description || '',
          available: true,
        },
        res.product6 && {
          id: res.product6.id || '',
          slug: res.product6.handle || '',
          bgImg: res.product6.featuredImage.url || '',
          title: res.product6.title || '',
          price: res.product6.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product6.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product6.description || '',
          available: true,
        },
        res.product7 && {
          id: res.product7.id || '',
          slug: res.product7.handle || '',
          bgImg: res.product7.featuredImage.url || '',
          title: res.product7.title || '',
          price: res.product7.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product7.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product7.description || '',
          available: true,
        },
        res.product8 && {
          id: res.product8.id || '',
          slug: res.product8.handle || '',
          bgImg: res.product8.featuredImage.url || '',
          title: res.product8.title || '',
          price: res.product8.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product8.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product8.description || '',
          available: true,
        },
        res.product9 && {
          id: res.product9.id || '',
          slug: res.product9.handle || '',
          bgImg: res.product9.featuredImage.url || '',
          title: res.product9.title || '',
          price: res.product9.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product9.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product9.description || '',
          available: true,
        },
        res.product10 && {
          id: res.product10.id || '',
          slug: res.product10.handle || '',
          bgImg: res.product10.featuredImage.url || '',
          title: res.product10.title || '',
          price: res.product10.variants.edges[0].node.priceV2.amount || '',
          comparePrice:
            res.product10.variants.edges[0].node.compareAtPriceV2 || '',
          description: res.product10.description || '',
          available: false,
        },
      ]);
    });
    // console.log('products', addOns);
  };
  useEffect(() => {
    async function getProduct() {
      await fetchProduct();
    }
    getProduct();
  }, [items]);

  const checkoutPageAct = () => {

    try {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          // console.log(ReactPixel);
          ReactPixel.init('3048042495310496');
          // ReactPixel.trackCustom('InitiateCheckout', { cartTotal } as any);
          ReactPixel.trackSingle('3048042495310496', 'InitiateCheckout', {
            cartTotal,
          } as any);
        });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed  inset-0 flex z-50 flex-row-reverse"
        onClose={setSidebarOpen}
        style={{ zIndex: 9999999 }}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-md w-full bg-white-f2f9fa">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 left-0 -ml-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="w-full">
              <div className="">
                <h5
                  className="text-2xl font-bebas font-bold italic text-black-373933 text-center py-1 border-b border-gray-300"
                  style={{ letterSpacing: '1px' }}
                >
                  Cart
                </h5>

                <div className="px-2 flex flex-col lg:max-h-cartVH lg:h-cartVH sm:h-cartsidesm h-cartVH py-3  overflow-y-scroll">
                  {items.map((item, i) => {
                    return (
                      <div className="flex flex-col gap-4 " key={i}>

                        <div className="px-2">

                          <SingleCartItem
                            id={item.id}
                            name={item.name}
                            amount={item.amount}
                            available={item.available}
                            option={item.option}
                            price={item.price}
                            saved={item.saved}
                            image={item.image}
                            lineId={item.lineId}
                            cartId={item.cartId}
                            tags={item.tags}
                            currentlyNotInStock={item.currentlyNotInStock}
                            customAttributes={item.customAttributes}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {(!cartTotal as unknown as number) && (
                    <p
                      className="text-xl font-bebas font-bold text-center italic text-black-373933"
                      style={{ letterSpacing: '1px' }}
                    >
                      No items in cart
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-400 bg-white w-full">
                {/*Total*/}
                {(cartTotal as unknown as number) > 0 && (
                  <div className="py-2">
                    <div className="flex justify-between px-4">
                      <h5
                        className="text-2xl font-bebas font-bold italic text-gray-700"
                        style={{ letterSpacing: '1px' }}
                      >
                        Subtotal
                      </h5>
                      <h5
                        className="text-2xl font-bebas font-bold italic text-red-bc2026"
                        style={{ letterSpacing: '1px' }}
                      >
                        ${sum}.00
                      </h5>
                    </div>
                  </div>
                )}

                {/*Checkout*/}
                {(cartTotal as unknown as number) > 0 && (
                  <>
                    {canCheckout && <a
                      className="text-base font-medium"
                      href={checkoutUrl}
                      onClick={() => checkoutPageAct()}
                    >
                      <div className={` rounded-lg text-white text-center py-2 mx-3 ${canCheckout ? 'bg-black-373933 hover:bg-red-hover' : 'bg-gray-400 cursor-not-allowed'}`}>
                        Checkout
                      </div>
                    </a>}
                    {!canCheckout && <button
                      className="text-base font-medium "
                      onClick={() => setSidebarOpen(false)}
                      disabled={true}
                    >

                      <div className={` rounded-lg text-white text-center py-2 mx-3 ${canCheckout ? 'bg-black-373933 hover:bg-red-hover' : 'bg-gray-400 cursor-not-allowed'}`}>
                        Checkout
                      </div>
                    </button>}
                  </>
                )}
                {(cartTotal as unknown as number) > 0 &&
                  addOns != undefined &&
                  items.length > 0 && (
                    <SellCards
                      cards={addOns != undefined ? addOns : undefined}
                      id={items[0].productId!}
                    />
                  )}
              </div>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-16">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartSidebar;
