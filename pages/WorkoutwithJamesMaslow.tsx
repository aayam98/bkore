import { GetServerSideProps } from 'next';
import { getHeader } from '@utils/header';
import {
  FAQStrapi,
  FAQTypeStrapi,
  getStrapiFaq,
  getStrapiFaqType,
} from 'services/strapi/faq';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Product,
  getProduct,
} from 'services/shopify/storefront';
import { ProductStrapi, getStrapiProduct } from 'services/strapi';
import SingleProduct from '@components/ui/bodykore/Sections/Product';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import { Review, getReviewsOfProduct } from 'services/stamped';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import ImgPagSlider from '@components/ui/bodykore/Sliders/ImgPagSlider';
import Image from 'next/image';
// import MaslowProduct from '@components/ui/bodykore/Sections/MaslowProduct';
import ReactPlayer from 'react-player';
import WorkoutwithJamesMaslowFaq from '@components/ui/bodykore/Sections/WorkoutwithJamesMaslowFaq';
import WorkoutwithJamesMaslow from '@components/ui/bodykore/Sections/MaslowProduct';
import DescriptionComponent from '@components/ui/bodykore/Text/Description';
import Slider from 'react-slick';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const proProduct = await getProduct('on-the-road-with-maslow-fitness-kit');
  const proProductStrapi = await getStrapiProduct('on-the-road-with-maslow-fitness-kit');
  const faqStrapiType = await getStrapiFaqType(false);
  const faqStrapi = await getStrapiFaq();
  const proReviews = await getReviewsOfProduct(proProduct!.id.split('/').pop() + '');
  const setupFeeProProduct = proProduct != undefined && proProduct!.setupProducts &&
    (await getProduct(proProduct!.setupProducts?.value as string));

  let addOnWeightProProducts = [] as unknown as Product[];

  return {
    props: {
      header,
      faqStrapi,
      faqStrapiType,
      proProductStrapi,
      proProduct,
      proReviews,
      addOnWeightProProducts,
      setupFeeProProduct
    },
  };
};

interface SingleProduct {
  faqStrapi: FAQStrapi[];
  faqStrapiType: FAQTypeStrapi[];
  proProductStrapi: ProductStrapi;
  setupFeeProProduct: Product;
  addOnWeightProProducts: Product[];
  proProduct: Product;
  proReviews: Review[] | undefined;
}

const Maslow = ({
  proProductStrapi,
  addOnWeightProProducts,
  setupFeeProProduct,
  proProduct,
  proReviews, }: SingleProduct) => {
  const [selected] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeBanner, setActiveBanner] = useState('');
  const [isVisible, setIsVisible] = useState<boolean>(true);

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
  const mapProImages = () => {
    return proProduct?.images.edges.map((item) => ({
      url: item.node.url,
    }));
  };


  const videoLinks = [
    "https://cms.bodykore.com/uploads/maslow_1_6393427706.mp4",
    "https://cms.bodykore.com/uploads/maslow_2_f3a50048c8.mp4",
    "https://cms.bodykore.com/uploads/maslow_3_3e70b6f0a6.mp4",
    "https://cms.bodykore.com/uploads/maslow_4_121f44ee55.mp4"
  ]

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
          'What makes the Road Kit different from other fitness kits?',
        answer:
          'The Road Kit was personally co-developed by James Maslow to meet the demands of a busy, on-the-go lifestyle. It includes everything you need for full-body workouts, comes in a branded drawstring bag, and gives you exclusive access to follow-along workout videos led by James himself—only available with this kit.',
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
        question: 'I’m a beginner. Is this kit right for me?',
        answer:
          'Absolutely! The Road Kit includes multiple resistance levels and an exercise guide, making it easy for anyone—from beginners to advanced fitness enthusiasts—to customize their workout and progress at their own pace.',
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
        question: 'Can I use this kit while traveling?',
        answer:
          'Yes! The entire kit is lightweight (just 3.5 lbs), compact, and fits easily into a backpack or carry-on. Whether you are on tour like James or heading on vacation, it’s the perfect workout solution on the go.',
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
          'What type of workouts can I do with this?',
        answer:
          'From full-body strength training to targeted workouts (glutes, arms, core, and more), you’ll get access to exclusive video workouts with James demonstrating how to use the kit effectively. Plus, a printed guide is included to keep your routine fresh and motivating.'
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
          'What’s included with the Road Kit?',
        answer:
          'You’ll get everything you need for a full-body workout in one compact package: <ul><li>2-section threaded steel Workout Bar</li><li>3 heavy-duty resistance bands (20 lbs, 25 lbs, and 30 lbs)</li><li>Adjustable ankle straps & padded foot straps</li><li>Door anchor</li><li>Resistance handles</li><li>Custom James Maslow “Jim Gym” drawstring bag</li><li>BONUS: Free 1-month MetPro nutrition coaching</li><li>BONUS: Exclusive access to James’s on-the-go workout video series</li></ul>',
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
        question: 'Do I need any other equipment to use this kit?',
        answer:
          "Nope! The Road Kit includes everything you need to start training right away, including a door anchor to attach bands for a wider range of resistance exercises—no gym required.",
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
        question: 'How will I access James Maslow’s exclusive workout programs?',
        answer:
          'After you complete your purchase, you’ll receive an email with private links to James’s exclusive workout videos hosted on his YouTube channel. These workouts were designed specifically for the Road Kit and are only available to customers!',
      },
    },

  ]);


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

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-28  -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    );
  };
  
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-28 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
      </button>
    );
  };

  const blogSliderSettings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    lazyLoad: 'progressive' as const,
    centerMode: true,
    // centerPadding: '1px', 
    className: "gap-slider",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '15px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
        },
      },
    ],
  }), []);
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

  return (
    <>
      <section className="bg-black text-white py-10">
        {/* API Integration Point: Insert Node.js e-ticketing or currency localization APIs here */}
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 items-start">
            {/* Left Image */}
            <div className="col-span-12 md:col-span-3 lg:flex justify-center lg:order-1 order-2 hidden">
              <img
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-7c3c06a0-35a4-451d-bada-3fd4fc1ea967.png"
                alt="Workout image - Left"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Center Content */}
            <div className="col-span-12 md:col-span-4 lg:order-2 order-1 lg:px-0 px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold text-yellow-300">
                  How to Workout with <br></br>James Maslow
                </h2>
                <p className="text-xl md:text-4xl font-semibold font-roboto pt-5">
                  Exclusive Offer!
                </p>
              </div>
              <img
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-9bfcfc3c-2b08-4add-81c7-fb5baaa070fd.png"
                alt="Workout image - Center"
                className="w-full h-auto object-contain mb-8"
              />
              {/* Text & CTA Button */}
              <p className="text-center font-semibold text-lg mb-6 uppercase tracking-wide text-yellow-300">
              PLUS - you'll get 4 free bonus exercise videos <br />
              from James himself!<br/>
              2nd Bonus! 30 days of meal plans by MetPro
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-yellow-300 text-black font-bold py-3 px-8 rounded-md hover:bg-yellow-300 transition-colors duration-300"
                  onClick={() => scrollToSection(proRef)}
                >
                  Buy Now
                </button>

              </div>
            </div>

            {/* Right Image */}
            <div className="col-span-12 md:col-span-5 lg:flex hidden justify-center order-3">
              <img
                src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-ce239004-a871-4e20-a63e-5b333f0e97e6.png"
                alt="Workout image - Right"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section className='max-w-7xl m-auto p-5' ref={proRef}>
        <div className='text-center'>
          <h4 className='lg:text-4xl text-xl font-semibold'>
          Ready to crush your workouts? Grab the exclusive “On the Road <br/> with Maslow” fitness kit and James' own special bag!<br/>
          (while supplies last)
          </h4>
          <p>
            Plus, you'll also get 4 videos of James himself showing you how to use it!
          </p>
        </div>
        {/* product component here  */}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
          <div className="col-span-2" onClick={() => setActiveBanner('')}>
            <ImgPagSlider
              bgImage={mapProImages()}
              productStrapi={proProductStrapi}
              activeBg={activeBanner}
            />
          </div>
          <div className='col-span-1'>

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
          </div>



        </div>
        <div className="px-4 pt-3">
          <Blacktitle
            title="DESCRIPTION"
            textSize="text-4xl"
            textColor="text-black-373933"
          />
          {proProductStrapi.attributes.description && (
            <DescriptionComponent
              description={proProductStrapi.attributes.description}
            />
          )}
        </div>
        {/* product component here  */}
        <div className='max-w-7xl px-5 py-3'>
          <img
            src="https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-e6781eb9-8620-428d-aaea-a5d70323c493.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
        {/* product component here  */}
        <div>
          <section className="bg-white text-black py-8 px-5">

            <div className="max-w-screen-xl mx-auto border-2 border-dashed border-green-300 p-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
                  <img
                    src={mapProImages()[0].url}
                    alt="Product Image"
                    className="w-60 object-contain"
                  />
                </div>

                <div className="col-span-12 md:col-span-9">
                  <div className=''>
                    <WorkoutwithJamesMaslow
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* product component here  */}
      </section>
      <section className='bg-yellow-300 py-10'>
        <div className='max-w-6xl grid lg:grid-cols-4 grid-cols-2 m-auto justify-center align-middle lg:px-0 px-10'>
          <Image
            src={'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-4e573ace-914c-43c8-909f-926f4b8ee137.png'}
            alt=""
            objectFit='contain'
            height={200}
            width={200}
            placeholder="blur"
            blurDataURL="/loading.png"
          />
          <Image
            src={'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-da21d57a-9434-4340-8c59-ea9cc2929d4e.png'}
            alt=""
            objectFit='contain'
            height={200}
            width={200}
            placeholder="blur"
            blurDataURL="/loading.png"
          />
          <Image
            src={'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-9de500f7-5749-4727-b476-457d34a55743.png'}
            alt=""
            objectFit='contain'
            height={200}
            width={200}
            placeholder="blur"
            blurDataURL="/loading.png"
          />

          <Image
            src={'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-a2174710-c032-4e41-b69a-a5378ada287d.png'}
            alt=""
            objectFit='contain'
            height={200}
            width={200}
            placeholder="blur"
            blurDataURL="/loading.png"
          />


        </div>
      </section>
      <section className='bg-black  py-10'>
        <div className='max-w-7xl m-auto grid lg:grid-cols-2 grid-cols-1'>
          <div className='px-10'>
            <h2 className='font-bebas lg:text-5xl text-2xl text-white italic lg:order-1 order-1'>
              “This is the exact kit I use while touring. It fits in my bag, gives me a killer workout, and keeps me on track—no matter where I am.”
              – James Maslow
            </h2>
            <div className='lg:hidden flex py-4'>
            <ReactPlayer
              className="rounded-md"
              url={"https://cms.bodykore.com/uploads/Body_Kore_Travel_1bea927da2.mov"}
              playing={false}
              loop={false}
              controls={true}
              volume={1}
              width="100%"
              height="auto"
              playsInline={true}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
            </div>
            <div className='lg:order-2 order-3'>
            <h6 className='text-yellow-300 lg:text-5xl text-2xl font-bebas tracking-wider'>
              Top reasons you need
              this kit!
            </h6>
            <ul className='font-roboto lg:text-xl text-base text-white space-y-5'>
              <li><span className='text-yellow-300 font-semibold'>Designed for All Fitness Levels:</span> Customizable resistance and versatile tools make it perfect for beginners and pros alike.</li>
              <li><span className='text-yellow-300 font-semibold'>🚀 Portable & Travel-Friendly:</span> Ideal for home, gym, or on-the-go workouts.</li>
              <li><span className='text-yellow-300 font-semibold'>🏋️ Full-Body Strength Training:</span> From squats and deadlifts to core work and mobility, this kit does it all.</li>
              <li><span className='text-yellow-300 font-semibold'>🎥 James Maslow’s Exclusive Workouts:</span>  Access workouts and nutrition guidance you won’t find anywhere else.</li>
              <li><span className='text-yellow-300 font-semibold'>🔥 No Gym Required:</span>  Ditch the expensive membership and own your fitness journey anywhere you go.</li>
            </ul>
            <button
              type="button"
              className="font-roboto text-xl text-black p-3 rounded-md bg-yellow-300 my-5 w-40"
              onClick={() => scrollToSection(proRef)}
            >
              Get yours now!
            </button>

            </div>
          </div>
          <div className='px-5 lg:flex hidden'>
            <ReactPlayer
              className="rounded-md"
              url={"https://cms.bodykore.com/uploads/Body_Kore_Travel_1bea927da2.mov"}
              playing={false}
              loop={false}
              controls={true}
              volume={1}
              width="100%"
              height="auto"
              playsInline={true}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
          </div>
        </div>
              <div className='flex max-w-7xl m-auto flex-col gap-2 pt-16 pb-10'>
              <h6 className='text-yellow-300 lg:text-5xl text-2xl font-bebas text-center tracking-wider p-0 m-0'>
              Train Like James: Sneak Peek at the Exclusive Road Kit Workouts
            </h6>
            <Slider {...blogSliderSettings}>
            {videoLinks.map((links, index) => (
              <ReactPlayer
              key={index}
              className="rounded-md mx-4"
              url={links}
              playing={false}
              loop={false}
              controls={true}
              volume={1}
              width="100%"
              height="250px"
              playsInline={true}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
           ))}

              </Slider>
        

              </div>

      </section>

      <section className='bg-yellow-300 py-14'>
        <h4 className='text-center font-bebas italic lg:text-5xl text-3xl font-semibold tracking-wider pb-5'>
          Exclusive Bonuses with Your Kit
        </h4>
        <div className='max-w-4xl m-auto grid lg:grid-cols-2 grid-cols-1 gap-5 px-5'>
          <div className='bg-white p-5 rounded-md flex flex-col lg:gap-4 gap-2 items-start'>
            <Image
              src={'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-c59a1281-6a4b-4a3a-b2fc-491c16a757aa.png'}
              alt=""
              objectFit='contain'
              height={100}
              width={100}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <h2 className='font-bebas lg:text-4xl text-xl italic leading-10 font-semibold tracking-wide'>Exclusive Workout Video Access
              <br></br>($149 Value)</h2>
            <p className='text-base font-roboto'>
              Follow James’ exclusive workout videos designed for the kit. Strength, tone, and flexibility routines adapted for all fitness levels—delivered straight to your inbox.
            </p>
          </div>
          <div className='bg-white p-5 rounded-md flex flex-col gap-4 items-start'>
            <Image
              src={'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/gempages_543095999581652214-d759dffe-92d3-4316-a35c-e68871432053.png'}
              alt=""
              objectFit='contain'
              height={100}
              width={100}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <h2 className='font-bebas lg:text-4xl text-xl italic leading-10 font-semibold tracking-wide'>MetPro Nutrition Plan
              <br></br>($100 Value)</h2>
            <p className='text-base font-roboto'>
              The same personalized nutrition and fitness program James uses to fuel his workouts.<br></br>
              <strong>Includes:</strong>
            </p>
            <ul className='list-disc pl-6'>
              <li>Tailored meal plans to fit your metabolism.</li>
              <li>Progress-tracking tools for strength and endurance.</li>
              <li>Hundreds of workouts for every fitness goal.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className='bg-black'>
        <div className='max-w-5xl m-auto pt-10 pb-14'>
          <WorkoutwithJamesMaslowFaq
            title1="FREQUENTLY ASKED"
            title2="QUESTIONS"
            accordion={faqs.map((item) => ({
              question: item.attributes.question,
              answer: item.attributes.answer,
              type: item.attributes.faq_type.data.attributes.title,
            }))}
          />

        </div>
      </section>

    </>
  )
}

export default Maslow;