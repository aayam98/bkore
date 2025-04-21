import useWindowSize from '@lib/hooks/use-window-size';
import { GetServerSideProps } from 'next';
import { getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import {
  FAQStrapi,
  FAQTypeStrapi,
  getStrapiFaq,
  getStrapiFaqType,
} from 'services/strapi/faq';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SquatBoxBanner from '@components/ui/bodykore/SquatBoxBanner';
import ReactPlayer from 'react-player';
import {
  GetAllProductsResponse,
  Product,
  addItemToCheckout,
  createCheckout,
  getAllProducts,
  getProduct,
} from 'services/shopify/storefront';
import { ProductStrapi, getStrapiProduct } from 'services/strapi';
import SingleProduct from '@components/ui/bodykore/Sections/Product';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import { Review, getReviewsOfProduct } from 'services/stamped';
import ImgPagSlider from '@components/ui/bodykore/Sliders/ImgPagSlider';
import Cookies from 'js-cookie';
import { useSnackbar } from 'nextjs-toast';
import { useSetAtom } from "jotai";
import { cartItemsState, cartTotalState, checkoutUrlState } from 'state/atoms';
import { mapCheckout } from '@utils/checkout';
import SquatBoxFaq from '@components/ui/bodykore/Sections/SquatBoxFaq';
import SquatTraining from '@components/ui/bodykore/SquatTraining';
import Slider from 'react-slick';
import ImageComparisionSlider from '@components/ui/bodykore/ImageComparisionSlider';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const product = await getProduct('squat-box-mx1182');
  const productStrapi = await getStrapiProduct('squat-box-mx1182');
  const products = await getAllProducts(3, undefined, {
    tag: 'squat-tag' as string,
  });
  const faqStrapiType = await getStrapiFaqType(false);
  const faqStrapi = await getStrapiFaq();
  const reviews = await getReviewsOfProduct(product!.id.split('/').pop() + '');
  const setupFeeProduct =
    product != undefined &&
    product!.setupProducts &&
    (await getProduct(product!.setupProducts?.value as string));

  let addOnWeightProducts = [] as unknown as Product[];

  if (product?.addonweights?.value != null) {
    let addonWeights: string[] = product?.addonweights?.value.split(',');
    for (let ele of addonWeights) {
      const product = await getProduct(ele);
      product && addOnWeightProducts.push(product as Product);
    }
  }

  return {
    props: {
      header,
      faqStrapi,
      faqStrapiType,
      product,
      productStrapi,
      reviews,
      setupFeeProduct,
      addOnWeightProducts,
      products,
    },
  };
};
interface SquatBoxParams {
  product: Product;
  productStrapi: ProductStrapi;
  faqStrapi: FAQStrapi[];
  faqStrapiType: FAQTypeStrapi[];
  reviews: Review[] | undefined;
  setupFeeProduct: Product;
  addOnWeightProducts: Product[];
  products: GetAllProductsResponse;
}

export default function SquatBox({
  product,
  productStrapi,
  reviews,
  setupFeeProduct,
  addOnWeightProducts,
  products,
}: SquatBoxParams) {
  const [selected, setSelected] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeBanner, setActiveBanner] = useState('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [slider1, setSlider1] = useState<any>([
    {
      id: '1',
      title: '',
      description: 'Portable Belt Squat Station for Powerful Legs',
      image: '/squatbox/03.jpg',
      buttontext: 'Buy Now',
      link: '/smartsledpro',
    },

    {
      id: '2',
      title: 'Maximize Gains',
      description: 'Minimize Risk with Belt Squats',
      image: '/squatbox/02.jpg',
      buttontext: 'Buy Now',
      link: '/functionaltraining',
    },
    {
      id: '3',
      title: 'For Serious Booty Training',
      description: 'Unleash Peak Performance with the Squat Box',
      image: '/squatbox/01.jpg',
      buttontext: 'Buy Now',
      link: '/product/universal-trainer',
    },
    {
      id: '4',
      title: '',
      description: 'Transform Your Training with Versatile Tools',
      image: '/squatbox/04.jpg',
      buttontext: 'Buy Now',
      link: '/smartsledpro',
    },
    {
      id: '5',
      title: '',
      description: 'Lower Center of Mass for Greater Stability',
      image: '/squatbox/05.jpg',
      buttontext: 'Buy Now',
      link: '/smartsledpro',
    },
  ]);

  const mapImages = () => {
    return product.images.edges.map((item) => ({
      url: item.node.url,
      btn3d: true,
    }));
  };
  const getRating = () => {
    if (reviews === undefined || reviews.length === 0) {
      return 0;
    }
    let sum = 0;
    for (let review of reviews) {
      sum += review.reviewRating;
    }
    return sum / reviews.length;
  };

  const mapTechnologies = () => {
    return (
      productStrapi &&
      productStrapi.attributes.technologies.data.map((ele) => ({
        title: ele.attributes.title,
        description: ele.attributes.description,
        image: ele.attributes.image.data
          ? ele.attributes.image.data.map((image) => {
              return mediaUrl + image.attributes.url;
            })
          : [imageNotFound],
        iconImage: mediaUrl + ele.attributes.iconImage.data.attributes.url,
      }))
    );
  };

  const mapOptions = () => {
    return product.variants.edges
      .sort(function (b, a) {
        return a.node.quantityAvailable - b.node.quantityAvailable;
      })
      .sort(function (b, a) {
        return (
          Number(a.node.availableForSale) - Number(b.node.availableForSale)
        );
      })
      .map((item) => ({
        title: item.node.title,
        id: item.node.id,
        price: item.node.priceV2.amount,
        prevPrice: item.node.compareAtPriceV2?.amount,
        img: item.node.image?.url,
        available: item.node.availableForSale,
        quantityAvailable: item.node.quantityAvailable,
      }));
  };

  const scrollDown = () => {
    const element = document.getElementById('reviews');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;

  const [cookie, setCookie] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('cookie')) {
      setCookie(false);
    } else {
      setCookie(true);
    }
  }, [cookie]);

  const handleScroll = () => {
    if (window.scrollY > 300 && localStorage.getItem('sendEmail') === null) {
      setSendEmail(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cookie]);

  useEffect(() => {
    if (localStorage.getItem('sendEmail')) {
      setSendEmail(false);
    }
  }, [sendEmail]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsVisible(!entry.isIntersecting);
        });
      }
    );

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);
  const snackbar = useSnackbar();
  const setCartItems = useSetAtom(cartItemsState);
  const setcheckoutUrl = useSetAtom(checkoutUrlState);
  const setCartTotal = useSetAtom(cartTotalState);
  const [cartLoading, setCartLoading] = useState(false);
  const [variantId, setVariantId] = useState('');
  const [faqs, setFaqs] = useState<FAQStrapi[]>([
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question:
          'What Types Of Exercises Can Be Performed With The Squat Box?',
        answer:
          '<ul class="customli"><li>All squat variations</li><li>Lunges</li><li>Deadlifts</li><li>Rows</li><li>Bicep curls</li><li>Shoulder press</li><li>Tricep overhead extensions</li></li>',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question:
          'Are There Any Weight Or Height Restrictions For Users Of The Squat Box?',
        answer:
          'The Squat Box is designed to accommodate users of various sizes. To ensure safety and optimal performance, we recommend not exceeding 70% of the user’s body weight when using the Squat Box.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'What Are The Main Benefits Of Using The Squat Box?',
        answer:
          '<ul class="customli"><li>Provides added stability and support for squat exercises</li><li>Enables a completely vertical resistance down from the user with the 360 pulley</li><li>Facilitates proper form and technique, reducing the risk of injury</li><li>Enhances muscle activation and strength gains during all movements</li></ul>',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question:
          'How Quickly Can I Expect My Squat Box To Ship After I Place An Order?',
        answer:
          'All Squat Box kits are in stock and ready to ship. You can expect your order to be shipped within 7 to 10 business days.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question:
          'How Does The Squat Box Improve Upon Traditional Squat Exercises?',
        answer:
          '<ul class="customli"><li>The Squat Step attaches to cable machines or door anchored resistance bands using the provided cable attachment, allowing for seamless integration.</li><li>It can be used for various squat exercises, including box squats, sumo squats, and front squats, among others.</li><li>The Squat Box can be incorporated into existing workout programs or used for targeted squat-focused sessions.</li><li>While this machine is used primarily for squat exercises, it can be used for several upper body exercises as well such as tricep extensions, bicep curls, rows, and shoulder presses.</li></ul>',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'Is The Squat Step Suitable For All Fitness Levels?',
        answer:
          'The Squat Step is suitable for users of all fitness levels, from beginners to advanced athletes.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'Can The Resistance Level Be Adjusted On The Squat Box?',
        answer:
          'Yes, the Squat Box features adjustable resistance options. You can easily adjust the resistance levels using either the weight systems or resistance bands, depending on your Squat Box kit.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question: 'Can I Use The Squat Box Outdoors?',
        answer:
          'Yes, the Squat Box is designed for versatility and can be used outdoors. However, we recommend storing it indoors when not in use to preserve its condition.',
      },
    },
    {
      attributes: {
        faq_type: {
          data: {
            attributes: {
              title: 'FAQ',
            },
          },
        },
        question:
          'What safety precautions should I take when using the Squat Box?',
        answer:
          'To ensure your safety while using the Squat Box, please adhere to the following guidelines: <ul class="customli"><li>Before connecting or disconnecting the belt to the cable, ensure both feet are securely planted on the Squat Box.</li><li>Maintain both feet fully planted on the Squat Box at all times during exercises.</li><li>Do not lift more than 70% of your body weight to avoid strain or injury.</li><li>Place the Squat Box on a stable and flat surface before use.</li><li>Avoid sudden or jerky movements to prevent strain or injury.</li><li>Always use proper form and technique when exercising.</li><li>Keep the area around the Squat Box clear of any obstacles to prevent tripping or accidents.</li><li>Failure to follow these instructions may result in injury. </li></ul>Always exercise caution and consult a fitness professional if needed.',
      },
    },
  ]);

  const addProduct = async (id: string, tags: string[]) => {
    setCartLoading(true);
    setVariantId(id);
    const checkoutId = Cookies.get('checkoutId');
    const email = Cookies.get('email');

    let checkout;
    if (checkoutId !== undefined) {
      const res = await addItemToCheckout(checkoutId, id);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
      }
    } else {
      const res = await createCheckout(id, email);
      if (res.checkout !== undefined) {
        checkout = res.checkout;
        Cookies.set('checkoutId', checkout.id, { expires: 90 });
      }
    }
    snackbar.showMessage('Successfully Added to cart', 'success', 'filled');
    if (checkout !== undefined) {
      setCartItems(mapCheckout(checkout));
      setcheckoutUrl(checkout.webUrl);
      setCartTotal(checkout.subtotalPriceV2.amount);
    } else {
      console.error('Failed to add product');
      snackbar.showMessage('Failed to add product', 'error', 'filled');
    }
    setVariantId('');
    setCartLoading(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: false,
  };

  const [modalWeight, setModalWeight] = useState(false);
  const [modalStaticContent, setModalStaticContent] = useState([
    {
      description: [],
    },
    {
      description: [
        'Squat Box Essentials (Squat Box, Cable attachment, Belt)',
        'Door Anchor',
        '42" Loop Band- X-Light',
        '42" Loop Band- Light',
        '42" Loop Band- Medium',
        '42" Loop Band- Heavy',
      ],
    },
    {
      description: [
        'Squat Box Essentials (Squat Box, Cable attachment, Belt)',
        'Tricep Bar',
        "1' Extension cable",
        "2' Extension Cable",
      ],
    },
  ]);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: [''],
    image: '',
  });

  return (
    <>
      <SeoHeader seo={seo.squatBox} />
      <div>
        <main>
          <SquatBoxBanner
            slider={slider1}
            card={true}
            product={product}
            addProduct={addProduct}
            cartLoading={cartLoading}
          />
          <div className="py-24 bg-black lg:-mt-2 -mt-2">
            <div className="max-w-8xl grid lg:grid-cols-3 grid-cols-1 lg:px-0 px-3 items-center align-middle m-auto gap-5 text-center">
              <div className="">
                <Image
                  className="rounded-lg"
                  src={`/squatbox/belowfold.jpg`}
                  height={700}
                  width={500}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="/loading.png"
                ></Image>
              </div>
              <div className="">
                <h5 className="text-red-bc2026 text-2xl font-montserrat font-semibold pb-5 textshadow">
                  Your Workout, Your Way
                </h5>
                <h2 className="text-white text-6xl font-playfair font-black capitalize leading-tight pb-10">
                  Home<br></br>Or<br></br>Gym
                </h2>
                <h6 className="text-white text-xl leading-8 font-montserrat font-semibold pb-5">
                  Effortlessly integrate into any fitness routine with options
                  for a door anchor and loop bands at home, or a pulley system
                  at the gym.
                </h6>
              </div>
              <div className="">
                <Image
                  className="rounded-lg"
                  src={`/squatbox/belowfold1.jpg`}
                  height={700}
                  width={500}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="/loading.png"
                ></Image>
              </div>
            </div>
          </div>

          <div className="lg:pt-24 py-10 lg:px-0 px-5 bg-white m-auto">
            <div className="max-w-8xl m-auto">
              <div className="max-w-7xl m-auto w-full">
                <h5 className="text-red-bc2026 lg:text-2xl text-xl font-montserrat font-semibold textshadow">
                  How it Works
                </h5>
                <h2 className="text-gray-900 lg:text-6xl text-4xl font-playfair font-black capitalize leading-tight pb-10">
                  Transform Your <br></br>Workouts
                </h2>
              </div>
              <div className="bg-gray-200 grid lg:grid-cols-2 grid-cols-1 items-center">
                <div className="player-wrapper">
                  <ReactPlayer
                    className="react-player"
                    url={
                      'https://cms.bodykore.com/uploads/Introducing_the_Body_Kore_Squat_Box_with_Gabriela_Kurtz_5e91e2cc4c.mp4'
                    }
                    playing={false}
                    loop={true}
                    controls={true}
                    muted={false}
                    volume={0}
                    width="100%"
                    height="100%"
                    playsInline={true}
                    playbackRate={1}
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                    onPlay={() => {}}
                  />
                </div>
                <div className="flex flex-col lg:px-10 p-5 gap-8">
                  <h6 className="text-gray-900 lg:text-xl text-base lg:leading-8 leading-normal font-montserrat">
                    <strong>Optimized Performance for Every Setting</strong>{' '}
                    Whether at home, the gym, or outdoors, the Squat Box adapts
                    effortlessly to your environment. Connect it to a cable
                    system or utilize resistance bands for a comprehensive
                    workout tailored to your needs.
                  </h6>
                  <div className="grid lg:grid-cols-2 gap-5">
                    <div className="">
                      <ul className="font-montserrat text-lg font-medium leading-9">
                        <li className="flex items-center gap-x-2">
                          {' '}
                          <Image
                            className="rounded-lg"
                            src={`/squatbox/check.svg`}
                            height={20}
                            width={20}
                            objectFit="contain"
                          ></Image>
                          Versatile Functionality
                        </li>
                        <li className="flex items-center gap-x-2">
                          {' '}
                          <Image
                            className="rounded-lg"
                            src={`/squatbox/check.svg`}
                            height={20}
                            width={20}
                            objectFit="contain"
                          ></Image>
                          Compact and Portable
                        </li>
                        <li className="flex items-center gap-x-2">
                          {' '}
                          <Image
                            className="rounded-lg"
                            src={`/squatbox/check.svg`}
                            height={20}
                            width={20}
                            objectFit="contain"
                          ></Image>
                          Safe For All Ages
                        </li>
                      </ul>
                    </div>
                    <div className="">
                      <ul className="font-montserrat text-lg font-medium leading-9">
                        <li className="flex items-center gap-x-2">
                          {' '}
                          <Image
                            className="rounded-lg"
                            src={`/squatbox/check.svg`}
                            height={20}
                            width={20}
                            objectFit="contain"
                          ></Image>
                          Safety First Design
                        </li>
                        <li className="flex items-center gap-x-2">
                          {' '}
                          <Image
                            className="rounded-lg"
                            src={`/squatbox/check.svg`}
                            height={20}
                            width={20}
                            objectFit="contain"
                          ></Image>
                          Adjustable Resistance
                        </li>
                        <li className="flex items-center gap-x-2">
                          {' '}
                          <Image
                            className="rounded-lg"
                            src={`/squatbox/check.svg`}
                            height={20}
                            width={20}
                            objectFit="contain"
                          ></Image>
                          Space Efficient
                        </li>
                      </ul>
                    </div>
                  </div>

                  <a
                    className="m-auto text-center transition duration-700 ease-in-out w-40 lg:py-3 py-2 lg:px-6 px-3 font-roboto uppercase font-bold tracking-wide lg:text-lg text-lg  border-2 bg-white text-red-bc2026 border-red-bc2026 hover:bg-red-hover hover:text-white hover:border-white"
                    href="#productid"
                  >
                    {' '}
                    Buy Now
                  </a>
                </div>
              </div>
              <div className="bg-gray-200 grid lg:grid-cols-2 grid-cols-1 items-center">
                <div className="flex flex-col gap-10">
                  <div className="grid lg:grid-cols-2 gap-5 p-10">
                    <div className="m-auto text-center space-y-1">
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/icon.svg`}
                        height={50}
                        width={50}
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      ></Image>
                      <h2 className="text-gray-900 text-xl tracking-wide font-playfair font-black leading-tight">
                        Stability and Support
                      </h2>
                      <h6 className="text-gray-700 text-base font-montserrat font-normal pb-5 lg:h-24 h-auto ">
                        Designed to ensure correct form and reduce the risk of
                        injury, providing a safer workout experience.
                      </h6>
                    </div>
                    <div className="m-auto text-center space-y-1">
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/icon2.svg`}
                        height={50}
                        width={50}
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      ></Image>
                      <h2 className="text-gray-900 text-xl tracking-wide font-playfair font-black leading-tight">
                        Versatile Resistance Options
                      </h2>
                      <h6 className="text-gray-700 text-base font-montserrat font-normal pb-5 lg:h-24 h-auto ">
                        Accommodates both weight systems and resistance bands,
                        allowing for varied intensity and adaptability to your
                        fitness level.
                      </h6>
                    </div>
                    <div className="m-auto text-center space-y-1">
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/icon3.svg`}
                        height={50}
                        width={50}
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      ></Image>
                      <h2 className="text-gray-900 text-xl tracking-wide font-playfair font-black leading-tight">
                        Enhanced Muscle Activation
                      </h2>
                      <h6 className="text-gray-700 text-base font-montserrat font-normal pb-5 lg:h-24 h-auto ">
                        Engineered to maximize muscle engagement with every
                        movement, helping you achieve greater strength gains
                        more efficiently.
                      </h6>
                    </div>
                    <div className="m-auto text-center space-y-1">
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/icon4.svg`}
                        height={50}
                        width={50}
                        objectFit="contain"
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      ></Image>
                      <h2 className="text-gray-900 text-xl tracking-wide font-playfair font-black leading-tight">
                        Space Efficient Design
                      </h2>
                      <h6 className="text-gray-700 text-base font-montserrat font-normal pb-5 lg:h-24 h-auto ">
                        Compact and easy to store, perfect for any home gym or
                        commercial space, making the most out of your workout
                        area.
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image
                    src={`/squatbox/boxbg.jpg`}
                    className="w-full lg:h-opt8right object-cover"
                    alt=""
                    width={770}
                    height={551}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className="absolute z-50 top-0 bottom-0 flex flex-col items-center justify-center align-middle text-center w-full">
                    <h5 className="text-white text-2xl font-montserrat font-semibold pb-5 shadowtext">
                      BodyKore Squat Box
                    </h5>
                    <h2 className="text-white lg:text-6xl text-3xl font-playfair font-black leading-tight">
                      Sculpt Full-Body Strength
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:py-24 lg:px-0 px-10 py-10 bg-white">
            <div className="max-w-8xl m-auto px-2">
              <h4 className="text-black lg:text-6xl text-3xl font-playfair font-black capitalize leading-tight text-left lg:pb-10 pb-5">
                Squat Box Features
              </h4>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                
                <div className="relative">
                  <Image
                    src={`/squatbox/feature2.png`}
                    className="w-full object-cover lg:h-96 h-72"
                    alt=""
                    width={456}
                    height={384}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className="absolute z-50 bottom-5 left-5">
                    <h5 className="text-white lg:text-2xl text-xl font-montserrat capitalize font-semibold tracking-wide shadowtext2">
                      Commercial nylon pulley
                    </h5>
                  </div>
                  <a
                    href="#"
                    className=" absolute w-full h-full top-0 left-0 bg-gray-500 opacity-10 z-10 transition-opacity duration-300 hover:opacity-20 "
                  ></a>
                </div>
                <div className="relative">
                  <Image
                    src={`/squatbox/feature3.png`}
                    className="w-full object-cover lg:h-96 h-72"
                    alt=""
                    width={456}
                    height={384}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className="absolute z-50 bottom-5 left-5">
                    <h5 className="text-white lg:text-2xl text-xl font-montserrat capitalize font-semibold tracking-wide shadowtext2">
                      Anti slip grips
                    </h5>
                  </div>
                  <a
                    href="#"
                    className=" absolute w-full h-full top-0 left-0 bg-gray-500 opacity-10 z-10 transition-opacity duration-300 hover:opacity-20 "
                  ></a>
                </div>
                <div className="relative">
                  <Image
                    src={`/squatbox/feature4.png`}
                    className="w-full object-cover lg:h-96 h-72"
                    alt=""
                    width={456}
                    height={384}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className="absolute z-50 bottom-5 left-5">
                    <h5 className="text-white lg:text-2xl text-xl font-montserrat capitalize font-semibold tracking-wide shadowtext2">
                      Rubber footing
                    </h5>
                  </div>
                  <a
                    href="#"
                    className=" absolute w-full h-full top-0 left-0 bg-gray-500 opacity-10 z-10 transition-opacity duration-300 hover:opacity-20 "
                  ></a>
                </div>
                <div className="relative">
                  <Image
                    src={`/squatbox/feature5.png`}
                    className="w-full object-cover lg:h-96 h-72"
                    alt=""
                    width={456}
                    height={384}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className="absolute z-50 bottom-5 left-5">
                    <h5 className="text-white lg:text-2xl text-xl font-montserrat capitalize font-semibold tracking-wide shadowtext2">
                      Heavy sheet metal
                    </h5>
                  </div>
                  <a
                    href="#"
                    className=" absolute w-full h-full top-0 left-0 bg-gray-500 opacity-10 z-10 transition-opacity duration-300 hover:opacity-20 "
                  ></a>
                </div>
                <div className="relative">
                  <Image
                    src={`/squatbox/feature6.png`}
                    className="w-full object-cover lg:h-96 h-72"
                    alt=""
                    width={456}
                    height={384}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className="absolute z-50 bottom-5 left-5">
                    <h5 className="text-white lg:text-2xl text-xl font-montserrat capitalize font-semibold tracking-wide shadowtext2">
                      Custom designed belt
                    </h5>
                  </div>
                  <a
                    href="#"
                    className=" absolute w-full h-full top-0 left-0 bg-gray-500 opacity-10 z-10 transition-opacity duration-300 hover:opacity-20 "
                  ></a>
                </div>
                <div className="relative">
                  <Image
                    src={`https://cms.bodykore.com/uploads/squat_box_dde5f9653c.jpg`}
                    className="w-full object-cover lg:h-96 h-72"
                    alt=""
                    width={456}
                    height={384}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  {/* <div className="absolute z-50 bottom-5 left-5">
                    <h5 className="text-white lg:text-2xl text-xl font-montserrat capitalize font-semibold tracking-wide shadowtext2">
                      Custom designed belt
                    </h5>
                  </div> */}
                  <a
                    href="#"
                    className=" absolute w-full h-full top-0 left-0 bg-gray-500 opacity-10 z-10 transition-opacity duration-300 hover:opacity-20 "
                  ></a>
                </div>
              </div>
            </div>
            <div className="bg-black py-5 mt-5">
              <div className="max-w-7xl m-auto">
                <div className="lg:flex lg:flex-row lg:py-5 p-3 items-center justify-center align-middle text-white text-left font-montserrat font-medium lg:text-lg text-base leading-9 gap-10">
                  <ul>
                    <li className="flex items-center gap-x-2">
                      {' '}
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/check.svg`}
                        height={20}
                        width={20}
                        objectFit="contain"
                      ></Image>
                      Platform with anti-slip footing
                    </li>
                    <li className="flex items-center gap-x-2">
                      {' '}
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/check.svg`}
                        height={20}
                        width={20}
                        objectFit="contain"
                      ></Image>
                      Heavy sheet metal construction for durability
                    </li>
                    <li className="flex items-center gap-x-2">
                      {' '}
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/check.svg`}
                        height={20}
                        width={20}
                        objectFit="contain"
                      ></Image>
                      Custom designed belt with detaching latch release
                    </li>
                  </ul>
                  <ul>
                    <li className="flex items-center gap-x-2">
                      {' '}
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/check.svg`}
                        height={20}
                        width={20}
                        objectFit="contain"
                      ></Image>
                      Commercial grade pulley for smoothness
                    </li>
                    <li className="flex items-center gap-x-2">
                      {' '}
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/check.svg`}
                        height={20}
                        width={20}
                        objectFit="contain"
                      ></Image>
                      Rubber footing to prevent from slipping
                    </li>
                    <li className="flex items-center gap-x-2">
                      {' '}
                      <Image
                        className="rounded-lg"
                        src={`/squatbox/check.svg`}
                        height={20}
                        width={20}
                        objectFit="contain"
                      ></Image>
                      Black matte paint for a sleek finish
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="py-24 bg-black text-center font-montserrat">
            <div className="max-w-7xl m-auto">
              <h5 className="text-red-bc2026 lg:text-2xl text-lg font-semibold pb-5 textshadow">
                Package Options
              </h5>
              <h2 className="text-white lg:text-6xl text-3xl font-playfair font-black capitalize leading-tight pb-3">
                Choose your perfect kit
              </h2>
              <p className="text-white text-lg leading-8 font-medium font-montserrat pb-5 lg:w-4/6 m-auto lg:px-0 px-3">
                Explore our tailored Squat Box kits, each designed to suit
                different training environments and fitness goals. Whether
                you’re enhancing your home gym, upgrading your professional
                equipment, or just starting out, find the perfect package to
                match your workouts. All kits include our innovative Squat Box
                with a built-in pulley system and custom squat belt for unmatched versatility and performance .
              </p>
            </div>
          </div>
          <div className="py-14 m-auto max-w-7xl" id="productid">
            <div className="grid lg:grid-cols-3 grid-cols-1 items-start gap-y-3">
              <div className="col-span-2 relative">
                <div className="absolute z-10 right-7 top-5">
                  {mapOptions()[selected].prevPrice !== undefined ? (
                    <p className="font-roboto font-bold italic text-base text-white bg-red-bc2026 rounded-md px-4 py-2">
                      SAVE $
                      {(
                        +mapOptions()[selected].price -
                        +mapOptions()[selected].prevPrice!
                      ).toFixed(2)}
                    </p>
                  ) : null}
                </div>
                <div className="" onClick={() => setActiveBanner('')}>
                  <ImgPagSlider
                    bgImage={mapImages()}
                    productStrapi={productStrapi}
                    activeBg={activeBanner}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <SingleProduct
                  rating={getRating()}
                  technologies={mapTechnologies()}
                  product={{
                    title: product.title,
                    image: product.images.edges[0].node.url,
                    id: productStrapi.attributes.handle,
                    price: product.variants.edges[0].node.priceV2.amount,
                    quantity: product.variants.edges[0].node.quantityAvailable,
                  }}
                  numReviews={reviews?.length || 0}
                  description={productStrapi.attributes.description}
                  options={mapOptions()}
                  reviewOnClick={scrollDown}
                  tags={product.tags}
                  setupFeeProduct={setupFeeProduct}
                  dimension={
                    productStrapi.attributes.specification.length > 0
                      ? productStrapi.attributes.specification[0].dimensions
                      : ''
                  }
                  addOnWeightProducts={addOnWeightProducts}
                  diagramAct={(data: string) => setActiveBanner(data)}
                  slug={'squat-box-mx1182'}
                  isVisible={isVisible}
                  cards={[]}
                />
              </div>
            </div>
          </div>

          <div className="bg-white py-8 flex justify-center text-center">
            <div className="w-full max-w-7xl mx-auto">
              <div className="max-w-5xl mx-auto p-3">
                <h4 className="lg:text-5xl font-medium text-2xl text-gray-800 uppercase font-bebas lb:pb-0 pb-2">
                  squat box original or pro? see the key differences
                </h4>
                <h5 className="text-base text-gray-500 leading-tight font-roboto font-normal">
                  Optimized Performance for Every Setting Whether at home, the
                  gym, or outdoors, the Squat Box adapts effortlessly to your
                  environment. Connect it to a cable system or utilize
                  resistance bands for a comprehensive workout tailored to your
                  needs.
                </h5>
              </div>

              <div className="py-8 max-w-5xl hidden md:block mx-auto">
                <ImageComparisionSlider
                  beforeImage="/squatboxnew/squatboxneworiginal.jpeg"
                  afterImage="/squatboxnew/squatboxnewpro.jpeg"
                />
              </div>
              <div className="py-8 md:hidden max-w-5xl mx-auto p-3">
                {/* <ImageComparisonSlider
                                    beforeImage='/squatboxnew/before.jpg'
                                    afterImage='/squatboxnew/after.jpg'
                                /> */}
                <img src="/squatboxnew/after.jpg" alt="" />
                <a
                  href="/squat-box-pro"
                  className="uppercase bg-black-1c2023 hover:bg-red-hover font-montserrat text-white md:text-lg 
                  text-xs md:p-4 px-2 py-4 w-full rounded-sm"
                 
                >
                  take me to the squat box pro
                </a>
                <img src="/squatboxnew/before.jpg" alt="" />
                <a
                  href="/squatBox"
                  className="uppercase bg-black-1c2023 hover:bg-red-hover font-montserrat text-white md:text-lg text-xs md:p-4 px-2 py-4 w-full rounded-sm"
                >
                  take me to the original squat box
                </a>
              </div>

              <div className="md:flex gap-8 max-w-5xl mx-auto hidden">
                <a
                  href="/squatBox"
                  className="uppercase bg-black-1c2023 hover:bg-red-hover font-montserrat text-white md:text-lg text-xs md:p-4 p-2 w-full rounded-sm"
                >
                  take me to the original squat box
                </a>
                <a
                  href="/squat-box-pro"
                  className="uppercase bg-black-1c2023 hover:bg-red-hover font-montserrat text-white md:text-lg text-xs md:p-4 p-2 w-full rounded-sm"
                 
                >
                  take me to the squat box pro
                </a>
              </div>
            </div>
          </div>

          <div className="py-14 bg-black">
            <div className="max-w-8xl m-auto px-12">
              <div className="text-center">
                <h5 className="text-red-bc2026 text-2xl font-montserrat font-semibold pb-5 textshadow">
                  Our Clients
                </h5>
                <h2 className="text-white lg:text-6xl text-3xl font-playfair font-black capitalize leading-tight pb-10">
                  DON’T JUST TAKE OUR <br></br>WORD FOR IT
                </h2>
              </div>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                <div className="text-center lg:py-0 py-5">
                  <div className="flex flex-row items-center justify-center gap-2 pb-3">
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                  </div>
                  <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                    I bought the Squat Box Home Kit and it's been a game-changer
                    for my workouts. The loop bands and anchor make it so
                    versatile—I can target different muscle groups easily from
                    home. The setup was a breeze and the quality is top-notch.
                    Highly recommend for anyone looking to up their fitness game
                    without leaving the house!
                  </p>
                  <h4 className="text-red-bc2026 text-2xl font-montserrat font-black capitalize leading-tight">
                    SAMANTHA L.
                  </h4>
                  <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                    Home Fitness Enthusiast
                  </h5>
                </div>
                <div className="text-center lg:py-0 py-5">
                  <div className="flex flex-row items-center justify-center gap-2 pb-3">
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                  </div>
                  <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                    The Squat Box Gym Kit has been an excellent addition to our
                    training facility. The straight bar and extension cable are
                    perfect for our clients who are serious about their strength
                    training. Plus, the built-in pulley system really sets it
                    apart from other equipment we've used. Durable, reliable,
                    and definitely worth the investment.
                  </p>
                  <h4 className="text-red-bc2026 text-2xl font-montserrat font-black capitalize leading-tight">
                    {' '}
                    DEREK H.
                  </h4>
                  <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                    Gym Owner
                  </h5>
                </div>

                <div className="text-center lg:py-0 py-5">
                  <div className="flex flex-row items-center justify-center gap-2 pb-3">
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                    <Image
                      className="rounded-lg"
                      src={`/svg/star.svg`}
                      height={25}
                      width={25}
                      objectFit="cover"
                    ></Image>
                  </div>
                  <p className="text-white text-base font-montserrat font-normal pb-5 lg:h-48 h-auto">
                    I was new to working out and decided to start with the Squat
                    Box Essentials Kit. I couldn't be happier with my choice!
                    It's straightforward to use, and I feel safe thanks to the
                    anti-slip features and sturdy build. It’s also easy to store
                    in my small apartment. This kit is perfect for beginners
                    like me who want quality equipment without complexity.
                  </p>
                  <h4 className="text-red-bc2026 text-2xl font-montserrat font-black capitalize leading-tight">
                    {' '}
                    MICHELLE D.
                  </h4>
                  <h5 className="text-white text-lg font-montserrat font-normal capitalize leading-tight">
                    Beginner Fitness Enthusiast
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="py-14 bg-black">
            <div className="max-w-8xl m-auto px-12">
              <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
                <ReactPlayer
                  className="lg:h-full h-72 w-full videoBox"
                  url={
                    'https://youtube.com/shorts/DEBXdxeA4lg?si=a2RrP9kIm0PbWQo2'
                  }
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height="450px"
                  playsInline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => {}}
                />
                <ReactPlayer
                  className="lg:h-full h-72 w-full videoBox"
                  url={'https://youtu.be/n35tjLYWM7w?si=l9FSHL6bmD0o8UV1'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height="450px"
                  playsInline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => {}}
                />
                <ReactPlayer
                  className="lg:h-full h-72 w-full videoBox"
                  url={'https://youtu.be/J6gCQFD7xa4?si=jsQB39nbUgUvSLrf'}
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height="450px"
                  playsInline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => {}}
                />
                <ReactPlayer
                  className="lg:h-full h-72 w-full videoBox"
                  url={
                    'https://youtube.com/shorts/idE7QCN_dsw?si=e_dzlUPfyiFnbKVi'
                  }
                  playing={false}
                  loop={false}
                  controls={true}
                  volume={1}
                  width="100%"
                  height="450px"
                  playsInline={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="py-10">
            {/* <SquatBoxFaq
              title1="FREQUENTLY ASKED"
              title2="QUESTIONS"
              accordion={faqs.map((item) => ({
                question: item.attributes.question,
                answer: item.attributes.answer,
                type: item.attributes.faq_type.data.attributes.title,
              }))}
            /> */}
             <SquatBoxFaq
                                        title1="FREQUENTLY ASKED"
                                        title2="QUESTIONS"
                                        accordion={faqs.map((item) => ({
                                            question: item.attributes.question,
                                            answer: item.attributes.answer,
                                            type: item.attributes.faq_type.data.attributes.title,
                                        }))}
                                    />
          </div>

          <div className="py-52 bg-squatbox bg-cover bg-center text-center font-montserrat">
            <div className="max-w-7xl m-auto">
              <h5 className="text-white lg:text-2xl text-lg  font-semibold pb-5 shadowtext">
                Take Your Training to the Next Level
              </h5>
              <h2 className="text-white lg:text-6xl text-3xl font-playfair font-black leading-tight pb-5">
                Get Your Bodykore<br></br>
                Squat Box Today!
              </h2>
              <a
                className="block m-auto text-center transition duration-700 ease-in-out w-56 lg:py-3 py-2 lg:px-6 px-3 font-roboto uppercase 
                font-semibold tracking-wide lg:text-xl text-lg border-2 bg-gray-900 text-white hover:bg-white hover:text-red-hover hover:border-red-hover"
                href="#productid"
              >
                {' '}
                Buy Now
              </a>
            </div>
          </div>
          <div className="lg:py-44 py-10 px-3 bg-white bg-cover bg-center text-left font-montserrat">
            <div className="max-w-8xl m-auto">
              <h5 className="text-red-hover lg:text-6xl text-lg  font-bold pb-5">
                Join Our Newsletter
              </h5>
              <SquatTraining setSendEmail={setSendEmail} />
            </div>
          </div>
        </main>
      </div>
      {modalWeight && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{ zIndex: 99999 }}
          >
            <div className="relative w-auto mx-auto max-w-xl p-3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-start py-3 pl-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-base lg:text-2xl font-semibold">
                    {modalContent?.title}
                  </h3>
                  <button
                    className="pr-5 pt-2 ml-auto  border-0 text-black float-right text-2xl leading-none"
                    onClick={() => setModalWeight(false)}
                  >
                    <IoIosCloseCircleOutline style={{ color: '#000' }} />
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-scroll">
                  <div className="">
                    <Image
                      className=""
                      src={modalContent?.image}
                      height={400}
                      width={800}
                      alt="image"
                      objectFit="contain"
                      placeholder="blur"
                      blurDataURL="/loading.png"
                    />
                  </div>
                  <br />
                  <strong>Included: </strong>
                  <ul className="font-roboto text-sm lg:text-base flex flex-col">
                    {modalContent.content.map((ele, index) => (
                      <li key={index}> - {ele}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
