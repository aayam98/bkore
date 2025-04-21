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
import ImageComparisonSlider from '@components/ui/bodykore/ImageComparisionSlider';
import { useRouter } from 'next/router';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import VideoPlayer from '@components/VideoPlay';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const product = await getProduct('squat-box-mx1182');
  const proProduct = await getProduct(
    'mx1182xl-squat-box-pro-portable-belt-squat-station'
  );
  const productStrapi = await getStrapiProduct('squat-box-mx1182');
  const proProductStrapi = await getStrapiProduct(
    'mx1182xl-squat-box-pro-portable-belt-squat-station'
  );
  const products = await getAllProducts(3, undefined, {
    tag: 'squat-tag' as string,
  });
  const faqStrapiType = await getStrapiFaqType(false);
  const faqStrapi = await getStrapiFaq();
  const reviews = await getReviewsOfProduct(product!.id.split('/').pop() + '');
  const proReviews = await getReviewsOfProduct(
    proProduct!.id.split('/').pop() + ''
  );
  const setupFeeProduct =
    product != undefined &&
    product!.setupProducts &&
    (await getProduct(product!.setupProducts?.value as string));
  const setupFeeProProduct =
    proProduct != undefined &&
    proProduct!.setupProducts &&
    (await getProduct(product!.setupProducts?.value as string));

  let addOnWeightProducts = [] as unknown as Product[];
  let addOnWeightProProducts = [] as unknown as Product[];

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
      proProductStrapi,
      proProduct,
      proReviews,
      addOnWeightProProducts,
      setupFeeProProduct,
    },
  };
};
interface SquatBoxProParams {
  product: Product;
  productStrapi: ProductStrapi;
  proProductStrapi: ProductStrapi;
  faqStrapi: FAQStrapi[];
  faqStrapiType: FAQTypeStrapi[];
  reviews: Review[] | undefined;
  setupFeeProduct: Product;
  setupFeeProProduct: Product;
  addOnWeightProducts: Product[];
  addOnWeightProProducts: Product[];
  products: GetAllProductsResponse;
  proProduct: Product;
  proReviews: Review[] | undefined;
}

export default function SquatBoxNew({
  product,
  productStrapi,
  proProductStrapi,
  reviews,
  setupFeeProduct,
  addOnWeightProducts,
  addOnWeightProProducts,
  setupFeeProProduct,
  products,
  proProduct,
  proReviews,
}: SquatBoxProParams) {
  const [selected, setSelected] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeBanner, setActiveBanner] = useState('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [slider1, setSlider1] = useState<any>([
    {
      id: '1',
      title: 'Original Version',
      description: 'Smaller footprint for easy storage and transport.',
      image: '/squatboxnew/squatboxneworiginal.jpeg',
      buttontext: 'Buy Now',
      link: '#',
    },

    {
      id: '2',
      title: 'Pro Version',
      description: 'Add balance and control for safer heavy lifts.',
      image: '/squatboxnew/squatboxnewpro.jpeg',
      buttontext: 'Buy Now',
      link: '#',
    },
    {
      id: '3',
      title: '',
      description:
        'Optimized Performancefor Every Setting Weather at home, the gym, or outdoors.',
      image: '/squatboxnew/original-or-pro.png',
      buttontext: 'Buy Now',
      link: '#',
    },
  ]);

  const mapImages = () => {
    return product.images.edges.map((item) => ({
      url: item.node.url,
      btn3d: true,
    }));
  };

  const mapProImages = () => {
    return proProduct?.images.edges.map((item) => ({
      url: item.node.url,
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

  const getProRating = () => {
    if (proReviews === undefined || proReviews.length === 0) {
      return 0;
    }
    let sum = 0;
    for (let review of proReviews) {
      sum += review.reviewRating;
    }
    return sum / proReviews.length;
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

  const mapProTechnologies = () => {
    return (
      proProductStrapi &&
      proProductStrapi.attributes.technologies.data.map((ele) => ({
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

  const mapProOptions = () => {
    return proProduct.variants.edges
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
          'Both models support a variety of exercises beyond belt squats, including <strong>lunges, deadlifts, rows, bicep curls, shoulder presses, and triceps extensions.</strong> The integrated pulley system allows for <strong>upper and lower-body workouts,</strong> making it a versatile strength training tool.',
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
        question: 'What is the maximum weight I can lift with each model?',
        answer:
          '<ul class="customli"><li><strong>Squat Box Original:</strong> Designed for lifts up to <strong>70% of a user’s body weight </strong>without shifting.</li><li><strong>Squat Box Pro:</strong> Rated for <strong>70% of a user’s body weight PLUS an additional 270 lbs </strong>loaded onto the weight horns. For example, a <strong>185-lb user can safely lift up to 400 lbs.</strong>.</li>',
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
        question: 'Does the Squat Box require a cable machine to work?',
        answer:
          'No, both models can be used with <strong>selectorized cable machines or resistance bands.</strong> The pulley system can be anchored to <strong>a cable stack, door anchor, or any stable anchor point</strong> for flexibility in different training environments.',
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
          'What are the key differences between the Squat Box Original and Pro?',
        answer:
          '<ul class="customli"><li><strong>Squat Box Original</strong>More compact (24.5” x 16.6” x 9.5”), designed for portability and moderate lifting.</li><li><strong>Squat Box Pro:</strong>Larger platform (36” x 18” x 12”) with<strong>detachable weight horns for adding weight stability for heavier lifting.</strong>Includes<strong>extended cables and a stabilizing handlebar</strong>for greater control.</li>',
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
          'How does the Squat Box improve upon traditional squat exercises?',
        answer:
          'By <strong>shifting the load to your hips</strong> rather than your spine, belt squats <strong>reduce lower-back strain</strong> while still targeting your <strong>quads, glutes, hamstrings, and core.</strong> This makes them ideal for people with back issues or those looking for a safer way to train heavy.',
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
        question: 'Is the Squat Box suitable for all fitness levels?',
        answer:
          "Yes! <strong>The adjustable resistance</strong> makes it suitable for beginners to elite athletes. Whether you're <strong>rehabbing an injury, building muscle, or improving endurance,</strong> both models allow you to train safely and effectively.",
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
        question: 'Can I adjust the resistance level?',
        answer:
          'Absolutely! The resistance can be adjusted by:<ul class="customli"><li><strong>Connecting to a cable weight stack</strong> (if available)</li><li><strong>Adding weight plates</strong> (Pro model only)</li><li><strong>Using resistance bands<strong>for scalable intensity</li>',
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
        question: 'Can the Squat Box be used outdoors?',
        answer:
          'Yes! Both models are <strong>compact and portable,</strong> making them great for <strong>garage gyms, outdoor workouts, or professional training facilities.</strong> Just ensure the surface is stable and safe for use.',
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
          '<ul class="customli"><li>Always<strong> place the Squat Box on a stable, non-slip surface.</strong></li><li>Use the<strong>heavy-duty belt squat belt </strong>correctly for <strong>secure support</strong></li><li>Start with <strong>lighter resistance</strong> to master proper from before increasing weight.</li><li>When using the<strong>Pro model,</strong> evenly distribute weight plates on the <strong>weight horns</strong>to maintain balance</li>',
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
        question: 'How easy is the Squat Box to store?',
        answer:
          'The Squat Box Original and Pro are both <strong>compact and space-saving.</strong> The <strong>Original model’s smaller footprint</strong> makes it even easier to store, while the <strong>Pro model’s attachments</strong> can be removed for more convenient storage when not in use.',
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
        question: 'Is assembly required?',
        answer:
          'Minimal assembly is required. All tools and instructions are included for a <strong>quick and easy setup</strong>',
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
        question: 'How quickly will my Squat Box ship?',
        answer:
          'Orders are typically processed within <strong>1-2 business days,</strong> and shipping times vary based on location and selected shipping method. A confirmation email with tracking information will be sent once your order has shipped.',
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

  const squatBoxData = [
    {
      icon: '',
      title: '🔥 Lower-Body Strength',
      data: [
        {
          subTitle: 'Squats (all variations):',
          description: 'Standard, sumo, split squats, and pause squats',
        },
        {
          subTitle: 'Lunges:',
          description: 'Forward, reverse, and lateral lunges',
        },
        {
          subTitle: 'Deadlifts:',
          description: 'Romanian, stiff-legs, and sumo deadlift',
        },
      ],
    },
    {
      icon: '',
      title: '💪 Upper-Body Strength',
      data: [
        {
          subTitle: 'Rows:',
          description: 'Bent-over, upright, and single-arm cable rows',
        },
        {
          subTitle: 'Presses:',
          description: 'Shoulder press, chest press, and incline press',
        },
        {
          subTitle: 'Curls & Extensions:',
          description:
            'Bicep curls, triceps overhead extensions, and lateral raises',
        },
      ],
    },
    {
      icon: '',
      title: '⚡ Functional & Rehab Training',
      data: [
        {
          subTitle: 'Core Engagement:',
          description: 'Cabe crunches, and oblique twist',
        },
        {
          subTitle: 'Rehab and stability:',
          description: 'Controlled movements for knee and hip strengthening',
        },
        {
          subTitle: 'Secondary Use:',
          description:
            'The stable platform can also be used for bodyweight exercises like step-ups and jump squats (without added resistance)',
        },
      ],
    },
  ];

  const originalRef = useRef(null);
  const proRef = useRef(null);

  const scrollToSection = (ref: any) => {
    if (ref.current) {
      const topOffset = 200;
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - topOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };
  const subFeatureData = proProductStrapi?.attributes?.feature[0]?.subFeature;

  return (
    <>
      <SeoHeader seo={seo['squat-box-pro']} />
      <div>
        <main>
          <div className="w-full h-full">
            <div className="relative w-full h-auto max-w-9xl mx-auto">
              <a href="#productred">
                <img
                  src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/portablesquatrack.jpg?v=1742904960"
                  alt="banner"
                  className="w-full object-contain"
                />
              </a>
            </div>
          </div>
          <div className="bg-gray-200  lg:pb-12">
            <div className="lg:py-12 lg:px-0 px-10 py-6">
              <div className="max-w-8xl mx-auto px-2 flex flex-col justify-center text-center">
                <h4 className="text-black md:text-5xl text-xl font-bebas font-semibold uppercase tracking-wide lg:pb-10 pb-5">
                  Squat Box PRO FEATURES
                </h4>
                <div className="w-full flex justify-center">
                  <div className="max-w-7xl grid lg:grid-cols-4 grid-cols-1 gap-5">
                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-5dbf2440-874b-4e03-941a-aa02a5afddbc.webp`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Commercial Nylon Pulley
                          </h5>
                        </div>
                      </a>
                    </div>

                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-40118959-a556-448c-a205-de7dcf144f57.webp`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Anti Slip Grips + Heavy Duty Carabiner
                          </h5>
                        </div>
                      </a>
                    </div>

                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-91b0a9b7-309e-40a8-b6b6-ece7e29af224.webp`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Heavy Sheet Metal + Rubber Footing{' '}
                          </h5>
                        </div>
                      </a>
                    </div>

                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-75ca867a-c6a4-49d8-ac39-5fed4ed8097f.webp`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Custom Designed Belt Squat Belt{' '}
                          </h5>{' '}
                        </div>
                      </a>
                    </div>

                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-9b4c4e0b-d11e-4a8e-b93f-efaa2a6c4a06.jpg`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Removable Weight Horns{' '}
                          </h5>{' '}
                        </div>
                      </a>
                    </div>

                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-9e934135-601a-4879-8ee6-08e9fe98d85b.jpg`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Stabilizing Handlebar Attachment Point{' '}
                          </h5>{' '}
                        </div>
                      </a>
                    </div>

                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-6c053f9d-8a63-4b26-a37b-5456a3909099.jpg`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Stabilizing Handle Bar
                          </h5>{' '}
                        </div>
                      </a>
                    </div>

                    <div className="">
                      <a href="#" className="">
                        <Image
                          src={`https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-5f8310bc-ac97-4f6e-b220-932db115d61b.jpg`}
                          className="w-full object-cover lg:h-96 h-72"
                          alt=""
                          width={456}
                          height={384}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                        <div className="">
                          <h5 className="text-gray-700 lg:text-xl text-lg font-roboto capitalize font-bold">
                            Straight Bar + Cable Pulley Extensions
                          </h5>{' '}
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black md:px-0 px-4 pb-10">
            <div className="max-w-6xl mx-auto">
              <h5 className="font-bebas text-white text-center pt-10 pb-5 lg:text-5xl text-3xl font-semibold tracking-wide">
                summary of features
              </h5>
              <div className="lg:flex lg:flex-row py-5 p-1 items-center justify-center align-middle text-white text-left font-montserrat font-medium lg:text-md text-base leading-6 gap-10">
                <ul className="">
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">Platform with anti-slip footing.</p>
                  </li>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">
                      Rubber footing to prevent from slipping.{' '}
                    </p>
                  </li>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">
                      Custom belt with detaching latch release, withstands 500
                      pounds.
                    </p>
                  </li>
                </ul>
                <ul>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">
                      Commercial grade pulley for smoothness.
                    </p>
                  </li>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">
                      Heavy sheet metal construction for durability.
                    </p>
                  </li>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">
                      Black matte paint for a sleek finish.
                    </p>
                  </li>
                </ul>
                <ul>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">
                      Detachable weight horns holds up to 270 lbs.
                    </p>
                  </li>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      className=""
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">Stabilizing handle attachment.</p>
                  </li>
                  <li className="flex flex-row items-center gap-x-2">
                    {' '}
                    <Image
                      src={`/squatbox/check.svg`}
                      height={20}
                      width={20}
                    ></Image>
                    <p className="w-full">
                      Straight bar and cable pulley extensions.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-100">
            <div className="max-w-4xl m-auto text-center gap-8 flex flex-col lg:py-16 py-8 lg:p-0 px-4">
              <h5 className="lg:text-5xl font-bold text-2xl text-gray-800 uppercase font-bebas">
                The Ultimate Belt Squat Solution{' '}
              </h5>
              {/* <ReactPlayer
                                className="lg:h-full h-72 w-full videoBox"
                                url={
                                    'https://youtu.be/FvfNf0HSXCg?si=U1_UZBY8pQ4f07GE'
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
                                onPlay={() => { }}
                            /> */}

              <div className=" h-[470px]  ">
                <VideoPlayer
                height={470}
                  thumbnailSrc="/thumbnail.png"
                  src="https://cdn.shopify.com/videos/c/o/v/d7c32402856a4e488168720411d9e59b.mp4"
                  videoClassName=" h-[450px] object-cover "
                />
              </div>

              <h6 className="font-bebas lg:text-3xl font-semibold tracking-wide text-2xl text-gray-700">
                Squat Box Pro Review with Alex & Cheyenne Myers
              </h6>
              <p className="font-roboto text-gray-600 lg:text-lg text-base font-medium">
                Looking for a safer way to build lower-body strength without
                putting stress on your spine? The Squat Box Pro is a
                game-changer for athletes, trainers, and anyone serious about
                strength training.
                <br></br>
                Join basketball and strength coaches Alex and Cheyenne Myers as
                they put this innovative belt squat platform to the test.
              </p>
              <a
                href="#productred"
                className="uppercase bg-gray-900 text-white py-3 w-41 m-auto"
              >
                Buy Now
              </a>
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
                <ImageComparisonSlider
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
                <button
                  className="uppercase bg-black-1c2023 hover:bg-red-hover font-montserrat text-white md:text-lg text-xs md:p-4 px-2 py-4 w-full rounded-sm"
                  onClick={() => scrollToSection(proRef)}
                >
                  take me to the squat box pro
                </button>
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
                <button
                  className="uppercase bg-black-1c2023 hover:bg-red-hover font-montserrat text-white md:text-lg text-xs md:p-4 p-2 w-full rounded-sm"
                  onClick={() => scrollToSection(proRef)}
                >
                  take me to the squat box pro
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex mx-auto bg-black lg:py-8 py-4 md:px-0 px-4 w-full">
              <h4 className="lg:text-5xl font-medium text-lg text-white m-auto uppercase font-bebas text-center">
                why belt squats with the squat box are a game-changer
              </h4>
            </div>
            <div className=" bg-gray-200">
              <div className="py-6 max-w-8xl mx-auto grid lg:grid-cols-2 grid-cols-1">
                <div className="flex flex-col">
                  <div className="grid lg:grid-cols-2 lg:gap-14 gap-4 p-8">
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
                      <h5 className="text-gray-900 text-xl font-montserrat font-semibold leading-tight">
                        Reduced Spinal Load
                      </h5>
                      <h6 className="text-gray-700 text-base font-montserrat pb-5 lg:h-24 h-auto ">
                        Traditional squats can strain the spine, but{' '}
                        <strong>belt squats shift the load to your hips</strong>
                        , allowing you to train your legs intensely{' '}
                        <strong>without compressing your lower back-</strong>
                        ideal for those with back issues or injuries.
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
                      <h5 className="text-gray-900 text-xl font-montserrat font-semibold leading-tight">
                        Versatile Resistance Options
                      </h5>
                      <h6 className="text-gray-700 text-base font-montserrat pb-5 lg:h-24 h-auto ">
                        Compatible with{' '}
                        <strong>
                          selectorized weight stacks, plate, loading, and
                          resistance bands,
                        </strong>{' '}
                        allowing you to adjust intensity and customize your
                        workouts to match your fitness level.
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
                      <h5 className="text-gray-900 text-xl font-montserrat font-semibold leading-tight">
                        Enhanced Muscle Activation
                      </h5>
                      <h6 className="text-gray-700 text-base font-montserrat pb-5 lg:h-24 h-auto ">
                        Belt squats{' '}
                        <strong>
                          target the quads, glutes, hamstrings, and calves
                        </strong>{' '}
                        with the same intensity as barbell squats - helping you{' '}
                        <strong>build power, endurance, and stability</strong>{' '}
                        without added spinal stress.
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
                      <h5 className="text-gray-900 text-xl font-semibold font-montserrat leading-tight">
                        Space Efficient Design
                      </h5>
                      <h6 className="text-gray-700 text-base font-montserrat pb-5 lg:h-24 h-auto ">
                        Unlike full-size belt squat machines, the{' '}
                        <strong>Squat Box Original & Pro</strong> provide a{' '}
                        <strong>compact, portable solution</strong> that fits in
                        home gyms, garage setups, or professional training
                        spaces <strong>without taking up extra room.</strong>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  
                  <div className="video-container h-opt8top">
                    <VideoPlayer
                     thumbClassName=''
                      thumbnailSrc="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/squatboxpro_2.png?v=1741777177"
                      src="https://cdn.shopify.com/videos/c/o/v/061926f699c64b47802433391faa20dd.mov"
                      videoClassName=" h-opt8top  max-w-max mx-auto "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-8xl mx-auto py-8">
            <div className="max-w-6xl mx-auto md:px-0 px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 justify-between">
                <div className="">
                  <h4 className="lg:text-5xl leading-10 font-medium text-2xl text-gray-800 uppercase font-bebas pb-4 lg:text-left text-center">
                    EXERCISE VERSATILITY – TRAIN YOUR ENTIRE BODY WITH THE SQUAT
                    BOX
                  </h4>
                  <p className="text-gray-700 lg:mb-6 mb-8 font-montserrat ">
                    The <strong>Squat Box Original & Pro</strong> go beyond belt
                    squats, offering a{' '}
                    <strong>full-body training experience </strong> with
                    multiple exercise variations. Whether you're focusing on{' '}
                    <strong>strength, endurance, or injury recovery</strong>,
                    these platforms provide a{' '}
                    <strong>safe and effective way</strong> to load resistance
                    without spinal compression.
                  </p>
                  {squatBoxData.map((items, index) => (
                    <div key={index} className="mb-6">
                      <div className="text-xl font-bold">
                        <span className="text-2xl">{items.icon}</span>
                        <h4 className="font-semibold">{items.title}</h4>
                      </div>
                      <ul className="lg:mt-2 mt-6 space-y-3">
                        {items.data.map((subData, subIndex) => (
                          <li
                            key={subIndex}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfz3upZJUzgki4bn27faJf6gPIIo7Yo5HxZg&s"
                              width="18"
                              height="18"
                              alt="Check icon"
                              className="mt-1"
                            />
                            <div className="flex-1 items-center text-lg">
                              <strong>{subData.subTitle}</strong>&nbsp;
                              <span>{subData.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <div className="lg:mt-48">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-24fb113c-54ed-4515-a8e4-367d9affb3d4.jpg"
                      alt="Squat Box Training"
                      width={350}
                      height={350}
                      className="w-full h-auto rounded-sm shadow-md"
                    />
                  </div>
                  <div className="">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-b120fceb-2982-4848-bf58-3c02571e2378.jpg"
                      alt="Squat Box Gym"
                      width={350}
                      height={350}
                      className="w-full h-auto rounded-sm shadow-md"
                    />
                  </div>
                  <div className="lg:mt-40">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-629b3975-cd94-4630-9b64-dc3efa9b4766.jpg"
                      alt="Squat Box Gym"
                      width={350}
                      height={350}
                      className="w-full h-auto rounded-sm shadow-md"
                    />
                  </div>
                  <div className="">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-20862d28-3c03-41b8-8689-42cd13b4c022.jpg"
                      alt="Squat Box Training"
                      width={350}
                      height={350}
                      className="w-full h-auto rounded-sm shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <h5 className="max-w-5xl text-gray-600 md:py-8 py-10 font-montserrat text-center">
                  With the <strong> Squat Box Original & Pro,</strong> you’re
                  not limited to squats—you’re unlocking a{' '}
                  <strong> versatile, total-body workout station</strong> in a{' '}
                  <strong> compact, space-saving design</strong>.
                </h5>
              </div>
            </div>
          </div>

          <div className="" id="productred" ref={proRef}>
            <div className="py-4 bg-red-bc2026">
              <h4 className="lg:text-5xl py-6 leading-10 font-medium text-3xl text-white uppercase font-bebas text-center">
                get your squat box pro here👇🏼
              </h4>
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
                      bgImage={mapProImages()}
                      productStrapi={proProductStrapi}
                      activeBg={activeBanner}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <SingleProduct
                    rating={getProRating()}
                    technologies={mapProTechnologies()}
                    product={{
                      title: proProduct.title,
                      image: proProduct.images.edges[0].node.url,
                      id: proProductStrapi.attributes.handle,
                      price: proProduct.variants.edges[0].node.priceV2.amount,
                      quantity:
                        proProduct.variants.edges[0].node.quantityAvailable,
                    }}
                    numReviews={proReviews?.length || 0}
                    description={proProductStrapi.attributes.description}
                    options={mapProOptions()}
                    reviewOnClick={scrollDown}
                    tags={proProduct.tags}
                    setupFeeProduct={setupFeeProProduct}
                    dimension={
                      proProductStrapi.attributes.specification.length > 0
                        ? proProductStrapi.attributes.specification[0]
                            .dimensions
                        : ''
                    }
                    addOnWeightProducts={addOnWeightProProducts}
                    diagramAct={(data: string) => setActiveBanner(data)}
                    slug={'mx1182xl-squat-box-pro-portable-belt-squat-station'}
                    isVisible={isVisible}
                    cards={[]}
                  />
                  <div className="px-4 pt-3">
                    <Blacktitle
                      title="DESCRIPTION"
                      textSize="text-4xl"
                      textColor="text-black-373933"
                    />
                    {proProductStrapi.attributes.description && (
                      <div
                        className="text-base"
                        dangerouslySetInnerHTML={{
                          __html: proProductStrapi.attributes.description,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-14 bg-black">
            <div className="max-w-8xl m-auto px-12">
              <div className="text-center">
                <h5 className="text-red-bc2026 text-2xl font-montserrat font-semibold pb-5 textshadow">
                  Our Clients
                </h5>
                <h2 className="lg:text-6xl lg:pt-8 pt-0 lb:pb-16 pb-2 leading-10 font-medium text-2xl text-white uppercase font-bebas text-center">
                  Real People. Real Results
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
              <h2 className="text-white lg:text-6xl text-3xl font-montserrat font-semibold leading-tight pb-5">
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
