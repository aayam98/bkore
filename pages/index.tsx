import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import routes from '@config/routes';
import {
  getBestSellingProducts,
  getShopifyCollectionPage,
  getShopifyCollectionQuery,
  ShopifyCollectionPage,
  ShopifyProductQuery,
} from 'services/shopify/storefront';
import { getReviewsOfProduct, Review } from 'services/stamped';
import seo from '../public/SEO/en.json';
import {
  getStrapiProjectCategories,
  ProjectCategoryStrapi,
} from 'services/strapi/project';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import {
  FAQTypeStrapi,
  getStrapiFaqType,
} from 'services/strapi/faq';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ArticleInfoStrapi,
  getAllArticlesStrapi,
} from 'services/strapi/article';
import Slider from 'react-slick';
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';
import { ReviewResponse, RootReviewResponse } from 'services/review/judge.me';
import { formatDate } from '@utils/dateFormatter';
import { getAllHomeBannerStrapi, HomeBannerProps } from 'services/strapi/home';

// Use React.lazy for client components - improved code splitting
const MainHeroBanner = dynamic(() => import('@components/ui/bodykore/MainHeroBanner'), { ssr: false });
const HomeSection1 = dynamic(() => import('@components/ui/bodykore/Sections/HomeSection1'), { ssr: false });
const HomeSection2 = dynamic(() => import('@components/ui/bodykore/Sections/HomeSection2'), { ssr: false });
const HomeSection3 = dynamic(() => import('@components/ui/bodykore/Sections/HomeSection3'), { ssr: false });
const BestSeller = dynamic(() => import('@components/ui/bodykore/Sliders/BestSeller'), { ssr: false });
const Kavlyo = dynamic(() => import('@components/ui/bodykore/Kavlyo'), { ssr: false });
const SeoHeader = dynamic(() => import('@components/seoHeader'), { ssr: false });
const Reviews = dynamic(() => import('@components/ui/bodykore/Sections/Reviews'), { ssr: false });
const SubscriptionBlogSide = dynamic(() => import('@components/ui/bodykore/Index/SubscriptionBlogSide'), { ssr: false });
const InstagramGrid = dynamic(() => import('@components/InstagramGrid'), { ssr: false });
const VideoPlayer = dynamic(() => import('@components/VideoPlay'), { ssr: false });
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
    onClick={onClick}
    className="shadow-md hover:shadow-lg transition-shadow absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full text-black cursor-pointer"
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
      className="shadow-md hover:shadow-lg transition-shadow absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full text-black cursor-pointer"
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
// Static content definitions moved outside of render function
const CHARACTERISTICS = [
  {
    icon: '/svg/characteristics1.svg',
    title: '0% APR available for up to 18 months *',
    description: 'From Affirm',
    url: '/affirm',
  },
  {
    icon: '/svg/characteristics2.svg',
    title: 'EASY ASSEMBLY',
    description: 'Professional Assembly not required',
    url: '',
  },
  {
    icon: '/svg/characteristics3.svg',
    title: 'Warranty Policy',
    description: 'Lifetime Frame',
    url: '',
  },
  {
    icon: '/svg/characteristics4.svg',
    title: 'NATIONWIDE SHIPPING',
    description: 'Nationwide shipping- All 50 States.',
    url: '',
  },
];

const BENEFITS = [
  {
    icon: '/svg/benefits1.svg',
    title: 'TIME SAVING',
  },
  {
    icon: '/svg/benefits2.svg',
    title: 'COMFORTABLE',
  },
  {
    icon: '/svg/benefits3.svg',
    title: 'CLEAN',
  },
  {
    icon: '/svg/benefits4.svg',
    title: 'INCREASE IN PROPERTY VALUE',
  },
  {
    icon: '/svg/benefits5.svg',
    title: 'PRIVACY',
  },
];

const SLIDER1 = [
  {
    id: 1,
    title: '',
    description: '',
    image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/universaltraining_e71e6a05b9.jpg?v=1741345343',
    buttontext: '',
    link: '/product/universal-trainer',
  },
  {
    id: 2,
    title: 'For Serious Booty Training',
    description: 'Unleash Peak Performance with the Squat Box',
    image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/squat_box.webp?v=1741345712',
    buttontext: 'View More',
    link: '/squatBox',
  },
  {
    id: 3,
    title: 'Plate Loaded',
    description:
      `Experience the ultimate in durability with BodyKore's plate-loaded machines, designed for heavy commercial use. Crafted with precision from laser-cut frames, our robust equipment supports a higher weight capacity, making it ideal for advanced lifters yet accessible for beginners.`,
    image: 'https://cdn.shopify.com/s/files/1/0609/8898/1468/files/plateloaded_6ebd969a99.jpg?v=1741345502',
    buttontext: 'View More',
    link: '/product-category/machines/plate-loaded',
  },
];

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Parallelize data fetching with Promise.all
    const [
      header,
      shopifyData,
      bestSeller,
      projectsStrapi,
      faqStrapiType,
      articles,
      reviews,
      banner
    ] = await Promise.all([
      getHeader(),
      getShopifyCollectionPage('packages'),
      getBestSellingProducts(10), // Use the new function to get top 10 best sellers
      getStrapiProjectCategories(),
      getStrapiFaqType(true),
      getAllArticlesStrapi(6),
      getReviewsOfProduct(),
      getAllHomeBannerStrapi()
    ]);

    return {
      props: {
        header,
        shopifyData,
        projectsStrapi,
        bestSeller,
        faqStrapiType,
        articles,
        reviews,
        banner
      },
      revalidate: 60, // Revalidate the static data every minute
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // Return minimal props to avoid complete build failure
    return {
      props: {
        header: {},
        shopifyData: { products: { edges: [] } },
        projectsStrapi: { data: [] },
        bestSeller: { products: { edges: [] } },
        faqStrapiType: [],
        articles: [],
        reviews: [],
        banner: []
      },
      revalidate: 30
    };
  }
};

interface HomeParams {
  header: HeaderData;
  shopifyData: ShopifyCollectionPage;
  reviews: Review[];
  bestSeller: ShopifyProductQuery;
  projectsStrapi: ProjectCategoryStrapi;
  faqStrapiType: FAQTypeStrapi[];
  articles: ArticleInfoStrapi[];
  banner: HomeBannerProps[]
}

export default function Home({
  bestSeller,
  projectsStrapi,
  faqStrapiType,
  articles,
  reviews,
  banner
}: HomeParams) {
  // Move data mapping to useMemo to prevent recalculation on re-renders
  const mappedProjects = useMemo(() => {
    return projectsStrapi?.data?.map((item) => ({
      url:
        item.attributes.image.data != undefined
          ? mediaUrl + item.attributes.image.data.attributes.url
          : imageNotFound,
      title: item.attributes.title,
      link: `/inspiration?category=${item.attributes.title.toLowerCase()}`,
    })) || [];
  }, [projectsStrapi]);

  const mappedBestSellers = useMemo(() => {
    return bestSeller?.products?.edges?.map((item) => ({
      url: item.node.featuredImage?.url,
      downTitle: item.node.title,
      title: item.node.title,
      link: `${routes.products.path}/${item.node.handle}`,
      subCategories: [],
    })) || [];
  }, [bestSeller]);





  // State management
  const [cookie, setCookie] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [popup, setPopup] = useState(false);
  const [reviewsData, setReviewsData] = useState<ReviewResponse[]>([]);
  const [limit, setLimit] = useState(3);

  // Memoize filtered reviews to prevent unnecessary recalculation
  const mappedReviews = useMemo(() => {
    return (reviewsData || [])
      .filter((ele) => ele.rating > 3)
      .map((item) => ({
        id: item.id,
        name: item.reviewer.name,
        rating: item.rating,
        title: item.title,
        date: formatDate(item.created_at),
        description: item.body,
        numLikes: '0',
        numDislikes: '0',
      }));
  }, [reviewsData]);

  // Fetch reviews only once after initial render
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res: RootReviewResponse = await (
          await fetch('/api/judgmereview', { method: 'GET' })
        ).json();
        setReviewsData(res.reviews);
      } catch (error) {
        console.log('error while fetching review', error);
      }
    };

    fetchReviews();
  }, []);

  // Cookie and email popup handling
  useEffect(() => {
    if (localStorage.getItem('cookie')) {
      setCookie(false);
    } else {
      setCookie(true);
    }

    if (localStorage.getItem('sendEmail')) {
      setSendEmail(false);
    }

    // Check if popup was previously closed
    if (sessionStorage.getItem('popup') !== 'true') {
      // setPopup(true);
    }
  }, []);

  // Scroll handler with debounce
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (window.scrollY > 300 && localStorage.getItem('sendEmail') === null) {
          setSendEmail(true);
        }
      }, 100); // Debounce scroll events
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Memoize slider settings
  const sliderSettings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    lazyLoad: 'progressive' as const,
  }), []);

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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }), []);

  return (
    <>
      <SeoHeader seo={seo.home} />
      <div>
        <main>
          {popup && (
            <div
              className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
              style={{ zIndex: 99999999, background: 'rgba(0, 0, 0, 0.5)' }}
            >
              <div
                className="flex items-center justify-center flex-col rounded-2xl relative p-5"
                onClick={() => { sessionStorage.setItem('popup', 'true'); }}
              >
                <button
                  className="absolute bg-white z-30 lg:-top-3 -top-0 lg:-right-3 -right-0 text-black lg:p-3 p-1 rounded-full font-black"
                  onClick={() => { setPopup(false); sessionStorage.setItem('popup', 'true'); }}
                >
                  <IoMdClose size={20} />
                </button>
                <Link href="/squatBox">
                  <a>
                    <Image
                      src="/blackfriday.jpeg"
                      alt="Black Friday Promo"
                      height={450}
                      width={800}
                      className="object-cover"
                      priority={true}
                    />
                  </a>
                </Link>
              </div>
            </div>
          )}

          {banner && <MainHeroBanner slider={banner.map((ele: HomeBannerProps, index: number) => {
            return {
              id: index,
              image: (ele.attributes.media.data.attributes.mime.split("/")[0] == 'image' ? mediaUrl + ele.attributes.media.data.attributes.url : ''),
              buttontext: ele.attributes.buttonText,
              description: ele.attributes.description,
              link: ele.attributes.url,
              title: ele.attributes.title,
              video: (ele.attributes.media.data.attributes.mime.split("/")[0] == 'video' ? mediaUrl + ele.attributes.media.data.attributes.url : '')

            }
          })} card={true} />}
          <HomeSection1 options={CHARACTERISTICS} />

          <div className="py-16">
            <div className="max-w-7xl grid lg:grid-cols-3 lg:px-0 px-3 m-auto gap-3">
              {/* Feature Cards Section */}
              <Link href="/ambassadors">
                <div className="relative h-full cursor-pointer">
                  <Image
                    className="rounded-lg"
                    src="/Ambassadors/team.jpg"
                    height={550}
                    width={500}
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/loading.png"
                    loading="lazy"
                  />
                  <div className="absolute w-full h-full bottom-1 framegradient rounded-lg"></div>
                  <h6 className="absolute font-bebas italic font-medium text-center w-full lg:text-6xl text-5xl top-44 text-white shadowtext1">
                    Team Bodykore
                  </h6>
                </div>
              </Link>

              <Link href="/storeLocator">
                <div className="relative h-full cursor-pointer">
                  <Image
                    className="rounded-lg"
                    src="/Ambassadors/dealerlocation.jpg"
                    height={550}
                    width={500}
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/loading.png"
                    loading="lazy"
                  />
                  <div className="absolute w-full h-full bottom-1 framegradient rounded-lg"></div>
                  <h6 className="absolute font-bebas italic font-medium text-center w-full lg:text-6xl text-5xl top-44 text-white shadowtext1">
                    Dealer Location
                  </h6>
                </div>
              </Link>

              <Link href="/3ddesign">
                <div className="relative h-full bg-white cursor-pointer">
                  <Image
                    className="rounded-lg"
                    src="https://homegym.bodykore.com/wp-content/uploads/2020/07/home-guy-packages.jpg"
                    height={550}
                    width={500}
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/loading.png"
                    loading="lazy"
                  />
                  <div className="absolute w-full h-full bottom-1 framegradient rounded-lg"></div>
                  <h6 className="absolute font-bebas italic font-medium text-center w-full lg:text-6xl text-5xl top-44 text-white leading-none">
                    Request your 3d design
                  </h6>
                </div>
              </Link>
            </div>
          </div>

          <HomeSection2
            title1="BENEFITS"
            title2="OF OWNING A HOME GYM"
            description="With multiple options to choose from, BodyKore's premier selection of exercise and home gym equipment comes in a variety of different combinations all suited to your fitness needs."
            options={BENEFITS}
          />

          <div>
            <div className="px-5 py-16">
              <BestSeller
                title1="BEST"
                color1="text-gray-700"
                title2="SELLERS"
                color2="text-red-bc2026"
                description=""
                btnText=""
                border=""
                btnBorder=""
                link={`${routes.collection.path}/packages`}
                bgImage={mappedBestSellers}
              />
            </div>
          </div>

          {/* About Section */}
          <div className="py-16 bg-black">
            <div className="max-w-7xl m-auto lg:gap-x-3 gap-3 lg:px-5 px-0">
              <div className="justify-center items-center lg:w-4/6 w-full h-fit m-auto">
                <div className="w-full md:pr-10 sm:pr-0 pb-10 flex flex-col gap-5">
                  <div className="justify-center lg:justify-center font-bebas italic font-bold text-5xl">
                    <div className="flex justify-center pb-1">
                      <h3
                        className="text-white text-2xl lg:text-5xl pr-2 leading-10"
                        style={{ letterSpacing: '1px' }}
                      >
                        WE ARE
                      </h3>
                      <h3
                        className="text-red-bc2026 text-2xl lg:text-5xl leading-10"
                        style={{ letterSpacing: '1px' }}
                      >
                        #BODYKORE
                      </h3>
                    </div>
                    <p className="w-full font-bebas italic lg:text-3xl text-xl font-semibold tracking-wider text-white leading-relaxed text-center lg:px-0 px-6">
                      DRIVEN BY PASSION, PROVEN BY PERFORMANCE
                    </p>
                  </div>

                  <div className="w-full md:pt-0 pt-6 md:px-0 px-5">
                    <VideoPlayer
                      height={470}
                      thumbnailSrc="/aboutcover.jpg"
                      src="https://cdn.shopify.com/videos/c/o/v/86c2e6e1e9d5473eaa4673c03128664b.mov"
                      videoClassName="h-[450px] object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-roboto text-white leading-relaxed text-center lg:px-0 px-6">
                      At BodyKore, innovation isn't just a buzzword—it's our foundation. Established in 2005 in Los Angeles, California, we've been at the forefront of revolutionizing fitness equipment, expanding our reach across three continents. Our journey is fueled by a passion for excellence and a commitment to quality that's evident in every piece of equipment we design.
                    </p>
                    <p className="font-roboto text-white leading-relaxed text-center lg:px-0 px-6">
                      Our diverse team of product specialists, engineers, kinesiologists, and designers shares a common goal: to enhance your fitness experience. We blend cutting-edge technology with biomechanical precision to create equipment that not only meets but exceeds industry standards. The Smart Sled Pro is a testament to our innovation—a product that redefines versatility and efficiency in training.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="py-16">
            <div className="max-w-7xl m-auto lg:gap-x-3 gap-3 px-5">
              <div className="flex items-center justify-between">
                <div className="lg:col-span-3 flex flex-row space-x-2 text-3xl lg:text-5xl font-bebas font-bold italic tracking-wide">
                  <p className="text-gray-700">Bodykore</p>
                  <p className="text-red-bc2026">Beat</p>
                </div>
                <a
                  href="/blog"
                  className="bg-grey-848484 hover:bg-red-hover text-white py-2 px-5 font-roboto rounded-md"
                >
                  View More
                </a>
              </div>
              <Slider {...blogSliderSettings}>
                {articles.map((ele, i) => (
                  <div className="h-full" key={i}>
                    <div className="border-gray-200 border rounded-lg hover:shadow-md">
                      <a href={`${routes.news.path}/${ele.attributes.slug}`}>
                        <Image
                          src={
                            ele.attributes.medias.data.length > 0
                              ? mediaUrl + ele.attributes.medias.data[0].attributes.url
                              : imageNotFound
                          }
                          className="rounded-lg"
                          width={500}
                          height={300}
                          alt={ele.attributes.title}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          objectFit="cover"
                          placeholder="blur"
                          blurDataURL="/loading.png"
                          loading="lazy"
                        />
                        <div className="p-3 h-36">
                          <h6 className="text-gray-700 hover:text-red-hover hover:underline tracking-wider font-bebas text-xl font-medium italic cursor-pointer">
                            {ele.attributes.title}
                          </h6>
                          <div className="relative">
                            <p className="text-black-1c2023 font-roboto text-sm py-2">
                              {ele.attributes.excert?.slice(0, 150)}
                              {ele.attributes.excert?.length > 150 && '...'}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Inspiration Section */}
          <div className="py-16 bg-black">
            <div className="max-w-7xl m-auto lg:gap-x-3 gap-3 px-5">
              <div className="lg:col-span-3 flex flex-row space-x-2 text-3xl lg:text-5xl font-bebas font-bold italic tracking-wide">
                <p className="text-white">GET</p>
                <p className="text-red-bc2026">Inspired</p>
              </div>

              <Slider {...sliderSettings}>
                {mappedProjects.map((ele, i) => (
                  <div
                    onClick={() =>
                    (window.location.href = `/inspiration?category=${ele.title
                      .substring(0, ele.title.indexOf(' '))
                      ?.toLowerCase()} gyms`)
                    }
                    key={i}
                    className="cursor-pointer"
                  >
                    <div className="relative h-full">
                      <Image
                        src={ele.url}
                        className="rounded-lg relative"
                        width={1366}
                        height={700}
                        alt={ele.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={50}
                        objectFit="cover"
                        loading="lazy"
                      />
                      <div className="absolute font-bebas italic font-medium text-left w-full text-4xl bottom-0 text-white framegradient h-full"></div>
                      <h6 className="absolute font-bebas italic font-medium text-left pl-5 lg:pb-5 pb-0 w-full lg:text-4xl text-2xl bottom-0 text-white z-50">
                        {ele.title}
                      </h6>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="py-10">
            <div className="flex justify-center lg:text-center text-left font-bebas text-3xl lg:text-5xl font-bold italic max-w-7xl m-auto py-9">
              <h3 className="text-black-373933 pr-2">FREQUENTLY ASKED</h3>
              <h3 className="text-red-bc2026 pr-1">QUESTIONS</h3>
            </div>
            <HomeSection3 title1="" title2="" accordion={faqStrapiType} />
          </div>

          <InstagramGrid />

          <div className="bg-black">
            <div className="max-w-2xl m-auto lg:gap-x-3 gap-3 px-5 py-16">
              <SubscriptionBlogSide buttonColor="bg-black" textColor="text-white" />
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-7xl m-auto">
            <div className="lg:py-5 p-4">
              {mappedReviews.length > 0 && (
                <h3 className="font-bebas text-left lg:text-4xl text-2xl italic tracking-wide pt-5 pb-3">
                  Reviews({reviewsData?.length || 0})
                </h3>
              )}

              {reviewsData?.length > 0 && mappedReviews.length > 0 && (
                <Reviews reviews={mappedReviews.slice(0, limit) as any} />
              )}

              {limit < 5 && mappedReviews.length > limit && (
                <div className="w-full flex justify-center">
                  <button
                    className="bg-grey-848484 hover:bg-red-hover text-white py-2 px-5 font-roboto rounded-md"
                    onClick={() => setLimit(mappedReviews.length)}
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Email Popup */}
        {!cookie && sendEmail && (
          <div
            className="fixed bg-black bg-opacity-25 top-0 bottom-0 right-0 left-0 flex items-center justify-center"
            style={{ zIndex: '99999' }}
          >
            <Kavlyo setSendEmail={setSendEmail} />
          </div>
        )}
      </div>
    </>
  );
}