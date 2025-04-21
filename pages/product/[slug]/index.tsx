import SeoHeader from '@components/seoHeader';
import { OptionProps } from '@components/ui/bodykore/NavOptions/SwitchPagesOptions';
import Threekeys from '@components/ui/bodykore/Sections/Threekeys';
import Video from '@components/ui/bodykore/Sections/video';
import SingleProduct from '@components/ui/bodykore/Sections/Product';
import ReviewForm from '@components/ui/bodykore/Sections/ReviewForm';
import Reviews from '@components/ui/bodykore/Sections/Reviews';
import ImgPagSlider from '@components/ui/bodykore/Sliders/ImgPagSlider';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import routes from '@config/routes';
import { getHeader } from '@utils/header';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useRef, useState } from 'react';
import {
  getProduct,
  getProductRecommendations,
  getShopifyCollectionQuery,
  Product,
  ProductInfo,
} from 'services/shopify/storefront';
import { getReviewsOfProduct, Review } from 'services/stamped';
import { ProductProps } from 'services/graphCMS';
import ImgGallery from '@components/ui/bodykore/Sections/gallery';
import ImgDescriptionSinglePage from '@components/ui/bodykore/Sections/ImgDescriptionSinglePage';
import SellCardsSingle, {
  CardProps,
} from '@components/ui/bodykore/Cards/SellCardsSingle';
import { getStrapiProduct, ProductStrapi } from 'services/strapi';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import 'react-image-lightbox/style.css';
import Warranty from '@components/ui/bodykore/Sections/Warranty';
import Specifications from '@components/ui/bodykore/Sections/Specification';
import TechnologyModal from '@components/ui/bodykore/Sections/TechnologyModal';
import ImageModal from '@components/ui/bodykore/Sections/ImageModal';
import Image from 'next/image';
import Head from 'next/head';

interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  const productStrapi = await getStrapiProduct(slug as string);

  if (!productStrapi) {
    return {
      notFound: true,
    };
  }
  const product = await getProduct(slug as string);
  if (product === undefined) {
    return {
      notFound: true,
    };
  }
  const header = await getHeader();
  const productId = product.id.split('/').pop();
  const reviews = await getReviewsOfProduct(product.id.split('/').pop() + '');
  const recommendations = await getProductRecommendations(product.id);

  const singleProduct = await getProduct(slug as string);

  let addOnWeightProducts = [] as unknown as Product[];

  if (singleProduct?.addonweights?.value != null) {
    let addonWeights: string[] = singleProduct?.addonweights?.value.split(',');
    for (let ele of addonWeights) {
      const product = await getProduct(ele);
      product && addOnWeightProducts.push(product as Product);
    }
  }

  const setupFeeProduct =
    singleProduct != undefined &&
    singleProduct!.setupProducts &&
    (await getProduct(singleProduct!.setupProducts?.value as string));

  const bestSeller = await getShopifyCollectionQuery('tag:carts');
  const subNavigation = [] as unknown as SubNavProp;

  return {
    props: {
      product,
      productStrapi,
      setupFeeProduct,
      reviews,
      recommendations,
      header,
      productId,
      singleProduct,
      subNavigation,
      bestSeller,
      addOnWeightProducts,
      slug,
    },
  };
};
interface SubNavProp {
  icon: string;
  text: string;
  id: string;
}
export interface ProductPageParams {
  product: Product;
  setupFeeProduct: Product;
  reviews: Review[] | undefined;
  recommendations: ProductInfo[];
  productId: string;
  singleProduct: ProductProps;
  subNavigation: SubNavProp[];
  productStrapi: ProductStrapi;
  addOnWeightProducts: Product[];
  slug: string;
}
const ProductPage = ({
  product,
  setupFeeProduct,
  reviews,
  recommendations,
  productId,
  subNavigation,
  productStrapi,
  addOnWeightProducts,
  slug,
  
}: ProductPageParams) => {
  const [videoCategories, setVideoCategories] = useState<string[]>([]);
  const [selectedVideoCategory, setSelectedVideoCategory] =
    useState<string>('');
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const mapVideo = () => {
    return productStrapi.attributes.videos.data.map((item) => ({
      url: item.attributes.videoUrl,
      title: item.attributes.title,
      video_categories: item.attributes.video_categories,
    }));
  };

  const mapVideoCategories = () => {
    for (let video of productStrapi.attributes.videos.data) {
      for (let category of video.attributes.video_categories.data) {
        setVideoCategories((prev) => {
          if (!prev.includes(category.attributes.title)) {
            return [...prev, category.attributes.title];
          }
          return prev;
        });
      }
    }
  };

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

  const mapReviews = () => {
    const uniqueTitles = new Set();

    return (reviews || [])
      .filter(item => {
        // If the title is already in the Set, filter out this review
        // If it's not in the Set yet, add it and keep this review
        if (uniqueTitles.has(item.reviewTitle)) {
          return false;
        } else {
          uniqueTitles.add(item.reviewTitle);
          return true;
        }
      })
      .map((item, index) => ({
        id: item.id,
        name: item.author,
        rating: item.reviewRating,
        title: item.reviewTitle,
        date: item.reviewDate,
        description: item.reviewMessage,
        numLikes: item.reviewVotesUp,
        numDislikes: item.reviewVotesDown,
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

  //for recommended products
  const mapProducts = (): CardProps[] => {
    return recommendations
      .filter((el) => el.tags[0] != 'assembly')
      .map((item) => ({
        id: item.variants.edges[0].node.id,
        slug: item.handle,
        bgImg: item.featuredImage?.url,
        title: item.title,
        price: item.variants.edges[0].node.priceV2.amount,
        comparePrice: item.variants.edges[0].node.compareAtPriceV2?.amount,
        description: item.description,
        available: item.availableForSale,
        tags: item.tags,
      }));
  };

  //for feature section
  const mapFeatures = () => {
    return productStrapi.attributes.feature.map((ele) => ({
      title: ele.title,
      subFeatures: ele.subFeature.map((el) => ({
        img:
          el.images.data.length > 0 && el.images.data[0].attributes != undefined
            ? mediaUrl + el.images.data[0].attributes.url
            : imageNotFound,
        description:
          el.description != undefined && el.description != null
            ? el.description
            : '',
        title: el.title != undefined ? el.title : '',
      })),
    }));
  };

  //for gallery images
  const mapGallery = () => {
    return productStrapi.attributes.gallery.data.map((item) => ({
      img: mediaUrl + item.attributes.url,
      btn3d: true,
    }));
  };

  //for faqs
  const mapFaqs = () => {
    return productStrapi.attributes.faqs.data.map((item) => ({
      question: item.attributes.question,
      answer: item.attributes.answer,
    }));
  };

  // dynamically change seo title

  const dinamycSeo = () => {
    return {
      title: product.seo.title != null ? product.seo.title : product.title,
      description: product.seo.description != null ? product.seo.description : product.description,
      noIndex: false,
      metaTitle: product.seo.description != null ? product.seo.title : product.title,
      nofollow: false,
      Index: true,

      image: {
        url: '',
      },
    };
  };

  //mapTechnologies() map
  const mapTechnologies = () => {
    return productStrapi.attributes.technologies.data.map((ele) => ({
      title: ele.attributes.title,
      description: ele.attributes.description,
      image: ele.attributes.image.data
        ? ele.attributes.image.data.map((image) => {
          return mediaUrl + image.attributes.url;
        })
        : [imageNotFound],
      iconImage: mediaUrl + ele.attributes.iconImage.data.attributes.url,
    }));
  };

  const mapSubNavigation = () => {
    if (productStrapi.attributes.description != undefined) {
      subNavigation = [
        {
          icon: '/svg/paper.svg',
          text: 'Description',
          id: 'description',
        },
      ];
    }
    if (productStrapi.attributes.gallery.data.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/highlight.svg',
          text: 'Gallery',
          id: 'gallery',
        },
      ];
    }
    if (productStrapi.attributes.feature.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/key.svg',
          text: 'Features',
          id: 'features',
        },
      ];
    }
    if (productStrapi.attributes.videos.data.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/video.svg',
          text: 'Videos',
          id: 'videos',
        },
      ];
    }
    if (productStrapi.attributes.specification != undefined) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/specification.svg',
          text: 'Specifications',
          id: 'specifications',
        },
      ];
    }
    if (reviews != undefined && reviews.length > 0) {
      subNavigation = [
        ...subNavigation,
        {
          icon: '/svg/reviewStar.svg',
          text: 'Reviews',
          id: 'reviews',
        },
      ];
    }
    return subNavigation;
  };

  const validateToShow = (data: string) => {
    return data && data.length > 0;
  };

  const [threekeys, setThreekeys] = React.useState([
    {
      icon: '/Product/location.svg',
      title: 'Home Delivery',
      description: 'Available Nationwide',
    },

    {
      icon: '/Product/assembly.svg',
      title: 'Easy Assembly',
      description: 'Professional Assembly not required',
    },
    {
      icon: '/Product/warranty.svg',
      title: 'Warranty Policy',
      description: 'Lifetime Frame',
    },
    {
      icon: '/Product/return.svg',
      title: 'Return Policy',
      description: '30-Day easy return',
    },
  ]);
  const switchPage: OptionProps[] = [
    {
      icon: '/svg/home.svg',
      text: 'Products',
      arrow: '/svg/rightArrow.svg',
      link: routes.products.path,
    },
  ];
  if (product.collections.edges.length !== 0) {
    switchPage.push({
      text: product.collections.edges[0].node.title,
      arrow: '/svg/rightArrow.svg',
      link: `${routes.collection.path}/${product.collections.edges[0].node.handle}`,
    });
  }
  switchPage.push({
    text: product.title,
  });

  const [active, setActive] = useState(-1);
  function toggleAccordion(index: number) {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  }

  const [activeBanner, setActiveBanner] = useState('');
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState({
    status: false,
    id: undefined as unknown as number,
  });
  const modalAction = (id: number, status: boolean) => {
    setShowModal({ status: status, id: id });
  };
  const [showModalImage, setShowModalImage] = useState(false);
  const [contentModal, setContentModal] = useState({
    title: '',
    description: '',
    image: '',
  } as any);
  const imageModalAction = (status: boolean) => {
    setShowModalImage(status);
  };

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const targetRef = useRef<HTMLDivElement>(null);

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

    mapVideoCategories();
    setSelectedVideoCategory('all');
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);

  return (
    <>
      <Head>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      image: product.images.edges[0].node.url,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'BodyKore',
      },
      offers: {
        '@type': 'Offer',
        url: `https://www.bodykore.com/product/${product.handle}`,
        "price": product.variants.edges[0].node.priceV2.amount,
        "priceCurrency": product.variants.edges[0].node.priceV2.currencyCode,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      // Only include aggregateRating if there are reviews
      ...(mapReviews().length > 0 ? {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "5",
          "ratingCount": Math.max(1, mapReviews().length),
          "reviewCount": Math.max(1, mapReviews().length),
        },
        "review": mapReviews().map(rev => ({
          "@type": "Review",
          "name": rev.name,
          "reviewTitle": rev.title,
          "reviewBody": rev.description,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": rev.rating,
            "bestRating": "5",
            "worstRating": "5"
          },
          "datePublished": rev.date,
          "author": { "@type": "Person", "name": rev.name },
          "publisher": { "@type": "Organization", "name": "BodyKore" }
        }))
      } : {})
    }),
  }}
/>

      </Head>

      <SeoHeader seo={dinamycSeo()} />
      {/*------------------ Product images and prices 2 cols------------------ */}
      <div className="max-w-8xl m-auto pt-5 pb-5">

        <div className="grid lg:grid-cols-3 grid-cols-1 items-start gap-y-3">
          <div className="col-span-2 relative">
            <div className="absolute">
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
            <div className="w-full textgra" onClick={() => setActiveBanner('')}>
              <ImgPagSlider
                bgImage={mapImages()}
                productStrapi={productStrapi}
                activeBg={activeBanner}
                title={product.title}
              />
            </div>
          </div>

          <div className="col-span-1  ">
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
              slug={slug}
              isVisible={isVisible}
              cards={mapProducts()}
            />
          </div>
        </div>
      </div>

      {/*------------------ Product images and prices 2 cols------------------ */}
      {/*------------------ facitity------------------ */}
      <div
        className="border-t-2 border-b-2 py-3 border-gray-200"
        ref={targetRef}
      >
        <Threekeys threekeys={threekeys} factors={[]} />
      </div>
      {/*------------------ facitity------------------ */}

      {/*------------------ technology------------------ */}
      {mapTechnologies().length > 0 && (
        <div className="border-b-2 border-gray-200 bg-gray-100">
          <div className="lg:pl-0 pl-5 flex flex-row py-4 gap-x-2 max-w-full items-center lg:justify-center justify-start m-auto overflow-x-scroll">
            {mapTechnologies() &&
              mapTechnologies().map((t, i) => {
                return (
                  <div className="flex flex-row  gap-2 items-center" key={i}>
                    <div className="">
                      <Image
                        src={t.iconImage}
                        alt=""
                        className="cursor-pointer p-2 max-w-sm w-20 h-20 object-contain"
                        onClick={() => modalAction(i, true)}
                        width={70}
                        height={70}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                    </div>
                    <h3 className="font-roboto font-medium text-gray-600 italic px-1 lg:w-auto w-52">
                      {t.title}
                    </h3>

                    {i == showModal.id && (
                      <TechnologyModal
                        closeModal={() => modalAction(i, false)}
                        showModal={showModal.status}
                        technology={t}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* >>>>>>>>>>>>>>>>>>>>>>>>Technology<<<<<<<<<<<<<<<<<<<< */}

      {/*------------------ technology------------------ */}

      {/*------------------ Description------------------ */}
      <div className="max-w-8xl  m-auto py-10 px-3">
        <div className="grid lg:grid-cols-6 grid-cols-1 gap-x-10">
          <div className="lg:col-span-4">
            <Blacktitle
              title="DESCRIPTION"
              textSize="text-4xl"
              textColor="text-black-373933"
            />
            {productStrapi.attributes.description && (
              <div
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html: productStrapi.attributes.description,
                }}
              ></div>
            )}
            {productStrapi.attributes.featureList &&
              productStrapi.attributes.featureList.length > 0 && (
                <>
                  <Blacktitle
                    title="FEATURES"
                    textSize="text-2xl pt-2"
                    textColor="text-black-373933"
                  />
                  <ul className="list-disc pl-5">
                    {productStrapi.attributes.featureList.map((feature, i) => {
                      return (
                        <li className="text-base text-gray-700" key={i}>
                          {feature.title}
                          <p className="text-base text-gray-700">
                            {feature.featuredesc}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

            <div className="grid lg:grid-cols-2 grid-cols-1 pt-5 ">
              {productStrapi.attributes.accessoriesIncluded &&
                productStrapi.attributes.accessoriesIncluded.length > 10 && (
                  <div className="">
                    <h3
                      className={`font-bebas lg:text-2xl text-2xl italic font-bold tracking-wider pb-2`}
                    >
                      Accessories Included
                    </h3>
                    <div className=''>
                      <div
                        className="listitems"
                        dangerouslySetInnerHTML={{
                          __html: productStrapi.attributes.accessoriesIncluded,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              {productStrapi.attributes.attachmentsIncluded &&
                productStrapi.attributes.attachmentsIncluded.length > 10 && (
                  <div className="">
                    <h3
                      className={`font-bebas lg:text-2xl text-2xl italic font-bold tracking-wider pb-2`}
                    >
                      Attachment Included
                    </h3>
                    <div
                      className="listitems"
                      dangerouslySetInnerHTML={{
                        __html: productStrapi.attributes.attachmentsIncluded,
                      }}
                    ></div>
                  </div>
                )}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="">
              {(productStrapi.attributes.manuals.data.length > 0 ||
                productStrapi.attributes.technical_datasheets.data.length >
                0) && (
                  <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider border-b-2">
                    Downloads
                  </h3>
                )}
              <div>
                {productStrapi.attributes.manuals.data.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 items-start py-3">
                    <div className="col-auto lg:col-span-1">
                      <h3 className="font-bebas text-left text-2xl italic tracking-wide w-full lg:w-72">
                        Manuals
                      </h3>
                    </div>

                    <div className="col-auto lg:col-span-2">
                      {productStrapi.attributes.manuals.data.map((ele, i) => (
                        <a
                          href={
                            mediaUrl +
                            ele.attributes.PDF_File.data.attributes.url
                          }
                          key={i}
                          target="_blank" rel="noreferrer"
                          className="bg-red-bc2026 hover:bg-red-hover font-roboto text-sm px-5 py-3 text-white mr-2 inline-flex my-2 gap-x-2 w-full rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                          {ele.attributes.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {productStrapi.attributes.technical_datasheets.data.length >
                  0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 items-start py-3">
                      <div className="col-auto lg:col-span-1">
                        <h3 className="font-bebas text-left text-2xl italic tracking-wide w-full lg:w-72">
                          Data Sheets
                        </h3>
                      </div>

                      <div className="col-auto lg:col-span-2">
                        {productStrapi.attributes.technical_datasheets.data.map(
                          (ele, i) => (
                            <a
                              href={
                                mediaUrl + ele.attributes.pdf.data.attributes.url
                              }
                              key={i}
                              target="_blank" rel="noreferrer"
                              className="bg-red-bc2026 hover:bg-red-hover font-roboto text-sm px-5 py-3 text-white mr-2 inline-flex my-2 gap-x-2 w-full items-center rounded-md"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                              </svg>
                              {ele.attributes.title}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*------------------ Description------------------ */}
      {/*------------------ proiduct features------------------ */}
      {productStrapi.attributes.feature &&
        productStrapi.attributes.feature.length > 0 && (
          <div className="max-w-8xl m-auto px-3">
            <div className="grid grid-cols-1 items-start">
              <ImgDescriptionSinglePage
                imgHeight="w-full"
                imgWidth="w-full"
                textSize="text-sm"
                images={mapFeatures()}
              />
            </div>
          </div>
        )}
      {/*------------------ proiduct features------------------ */}

      {slug == 'universal-trainer' && (
        <div className="flex justify-center lg:py-20 py-5">
          <div className="relative">
            <Image
              src="/01.jpg"
              className="lg:h-mx1162h h-auto w-mx1162w object-contain"
              alt=""
              height={1000}
              width={1000}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
            <div
              className="absolute lg:top-opt1top lg:right-opt1right top-smopt1top right-smopt1right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer text-center opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Multi Grip Pull Up Bars',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Multi_Grip_Pull_Up_Bars_7f68ab61c0.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 1
            </div>
            <div
              className="absolute lg:top-opt2top top-smopt2top lg:right-opt2right right-smopt2right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'J Hooks',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/J_Hooks_65caa081af.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 2
            </div>
            <div
              className="absolute lg:top-opt3top top-smopt3top lg:right-opt3right right-smopt3right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Inverted Leg Press',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Inverted_Leg_Press_a51ba66196.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 3
            </div>
            <div
              className="absolute lg:top-opt4top top-smopt4top lg:right-opt4right right-smopt4right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Smith Machine',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Smith_Machine_4548e3fc4b.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 4
            </div>
            <div
              className="absolute lg:top-opt5top top-smopt5top lg:right-opt5right right-smopt5right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Lat Pull Down Seat Add-On',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/5_Lat_Pull_Down_Seat_Add_On_dd35038ea7.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 5
            </div>
            <div
              className="absolute lg:top-opt6top top-smopt6top lg:right-opt6right right-smopt6right lg:h-24 lg:w-24 h-11 w-11 rounded-full bg-red-hover cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Olympic Plate Storage',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/6_Plate_Storage_9877cb1568.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 6
            </div>
            <div
              className="absolute lg:top-opt7top lg:right-opt7right top-smopt7top right-smopt7right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Sliding Pulley Arm',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Sliding_Pulley_Arm_082c0b00eb.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 7
            </div>
            <div
              className="absolute lg:top-opt8top top-smopt8top lg:right-opt8right right-smopt8right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Accessories Hooks',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Accessories_Hooks_f42590a998.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 8
            </div>
            <div
              className="absolute lg:top-opt9top top-smopt9top lg:right-opt9right right-smopt9right cursor-pointer bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Dual Pulley System',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/9_Dual_Adjustable_Pulley_System_54a53d69ec.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 9
            </div>
            <div
              className="absolute lg:top-opt10top top-smopt10top lg:right-opt10right right-smopt10right cursor-pointer bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Safety Spotter Attachment',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Bar_Spotters_bed9f9b731.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 10
            </div>
            <div
              className="absolute lg:top-opt11top lg:right-opt11right top-smopt11top right-smopt11right cursor-pointer bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Dip Bar',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Dip_Bar_dc05523250.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 11
            </div>
            <div
              className="absolute lg:top-opt12top top-smopt12top lg:right-opt12right right-smopt12right cursor-pointer bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Land Mine',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Land_Mine_ce0ce6f979.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 12
            </div>
            <div
              className="absolute lg:top-opt13top top-smopt13top lg:right-opt13right right-smopt13right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Band Pegs',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Band_Pegs_4e2f65a05c.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 13
            </div>
            <div
              className="absolute lg:top-opt14top top-smopt14top lg:right-opt14right right-smopt14right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Bar Storage',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/14_Bar_Storage_f81fffc0de.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 14
            </div>
            <div
              className="absolute lg:top-opt15top top-smopt15top lg:right-opt15right right-smopt15right bg-red-hover lg:h-24 lg:w-24 h-11 w-11 rounded-full cursor-pointer opacity-0"
              onClick={() => {
                setContentModal({
                  title: 'Lazer Cut Details',
                  description: '',
                  image:
                    'https://cms.bodykore.com/uploads/Lazer_Cut_Details_59af7db58b.mp4',
                  fileType: 'video',
                });
                setShowModalImage(true);
              }}
            >
              Opt 15
            </div>
            <div>
              <ImageModal
                title={contentModal.title}
                description={contentModal.description}
                image={contentModal.image}
                closeModal={() => imageModalAction(false)}
                showModal={showModalImage}
                fileType={contentModal.fileType}
              />
            </div>
          </div>
        </div>
      )}
      {/*------------------ specifications / warrenty------------------ */}
      {productStrapi.attributes.specification != undefined &&
        productStrapi.attributes.specification.length > 0 && (
          <div className="max-w-8xl m-auto">
            <div className="grid lg:grid-cols-4 grid-cols-1 items-start lg:py-5 p-4">
              <div className="col-span-2">
                <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2">
                  SPECIFICATIONS
                </h3>
                <Specifications
                  specifications={productStrapi.attributes.specification}
                  featuredImage={productStrapi.attributes.featureImage}
                />
                {productStrapi.attributes.featureImage.data && (
                  <section className="flex justify-center mb-16"></section>
                )}
              </div>
              {productStrapi.attributes.warranty.data.length > 0 && (
                <div className="col-span-2 space-y-36">
                  <div>
                    <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2">
                      Warranty
                    </h3>
                    <Warranty images={productStrapi.attributes.warranty.data} />
                  </div>
                  {slug == 'universal-trainer' && (
                    <div>
                      <h3 className="font-bebas lg:text-2xl text-xl italic font-bold tracking-wider">
                        Universal Trainer Attachments. Click image below to know
                        more.
                      </h3>

                      <a href="/universal-trainer-attachments">
                        <Image
                          src={
                            'https://cms.bodykore.com/uploads/Attachments_1cc359af94.jpeg'
                          }
                          className="h-opt5top object-contain w-full"
                          width={800}
                          height={550}
                          placeholder="blur"
                          blurDataURL="/loading.png"
                        />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      {/*------------------ specifications / warrenty------------------ */}

      {/*------------------ Gallery------------------ */}
      <div className="max-w-8xl m-auto">
        <div className="lg:py-5 p-4">
          {mapGallery().length > 0 && (
            <div className="items-start">
              <h3 className="font-bebas text-left lg:text-4xl text-2xl italic tracking-wide pt-5 pb-3">
                Gallery
              </h3>
              <ImgGallery
                imgHeight="h-auto"
                imgWidth="w-auto"
                images={mapGallery()}
              />
            </div>
          )}
        </div>
      </div>

      {/*------------------ Gallery------------------ */}

      {/*------------------ Video------------------ */}
      <div className="max-w-8xl m-auto">
        <div className="lg:py-5 p-4">
          {mapVideo().length > 0 && (
            <div className="items-start">
              <div className="flex flex-wrap items-center justify-between">
                <h3 className="font-bebas text-left lg:text-4xl text-2xl italic tracking-wide pt-5 pb-3 lg:w-auto w-full">
                  Videos
                </h3>
                <ul
                  className="flex gap-3 lg:overflow-hidden overflow-scroll lg:w-auto w-full mb-2"
                  role="tablist"
                >
                  <li
                    className={`${selectedVideoCategory === 'all'
                      ? 'bg-black text-white'
                      : ''
                      } cursor-pointer px-3 py-1 text-sm rounded-md text-center lg:w-auto w-44 whitespace-nowrap`}
                    role="tab"
                    aria-selected={selectedVideoCategory === 'all'}
                    onClick={() => {
                      setVideoLoading(true);
                      setSelectedVideoCategory('all');
                      setTimeout(() => {
                        setVideoLoading(false);
                      }, 100);
                    }}
                  >
                    All
                  </li>
                  {videoCategories.map((ele, index) => (
                    <li
                      className={`${selectedVideoCategory === ele
                        ? 'bg-black text-white'
                        : ''
                        } cursor-pointer px-3 py-1 text-sm rounded-md text-center lg:w-auto w-44 whitespace-nowrap`}
                      role="tab"
                      aria-selected={selectedVideoCategory === ele}
                      onClick={() => {
                        setVideoLoading(true);
                        setSelectedVideoCategory(ele);
                        setTimeout(() => {
                          setVideoLoading(false);
                        }, 100);
                      }}
                      key={index}
                    >
                      {ele}
                    </li>
                  ))}
                </ul>
              </div>
              {videoLoading && (
                <div className="flex justify-center items-center h-96">
                  {' '}
                  loading{' '}
                </div>
              )}
              {!videoLoading && (
                <Video
                  videos={mapVideo()}
                  selectedVideoCategory={selectedVideoCategory}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/*------------------ Video------------------ */}
      {/*------------------ faq------------------ */}
      <div className="max-w-8xl m-auto">
        <div className="grid lg:grid-cols-1 grid-cols-1 items-start lg:py-5 p-4">
          {mapFaqs().length > 0 && (
            <div className="lg:py-5 p-4 col-span-3">
              <h3 className="font-bebas text-left lg:text-4xl text-2xl italic tracking-wide pt-5 pb-3">
                frequently asked questions (FAQ)
              </h3>

              {mapFaqs().map((a, i) => {
                return (
                  <div className="flex flex-col pb-3" key={i}>
                    <div
                      className="py-1 cursor-pointer"
                      onClick={() => toggleAccordion(i)}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          onClick={() => toggleAccordion(i)}
                          src={`${active === i
                            ? '/svg/substraction.svg'
                            : '/svg/sum.svg'
                            }`}
                          width={16}
                          height={16}
                          alt=""
                        />
                        <h4 className="inline-block font-bebas lg:text-xl text-lg tracking-wide text-gray-800 hover:text-red-hover text-left">
                          {a.question}
                        </h4>
                      </div>
                    </div>
                    {active === i && (
                      <div>
                        <div className="overflow-auto transition-height duration-700 ease-in-out faqs-container">
                          <div
                            className="pl-8 text-gray-600 font-roboto text-base tracking-wide"
                            dangerouslySetInnerHTML={{ __html: a.answer }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/*------------------ faq------------------ */}

      {/*------------------ Reviews------------------ */}
      <div className="max-w-8xl m-auto">
        <div className="lg:py-5 p-4">
          {mapReviews().length > 0 && (
            <h3 className="font-bebas text-left lg:text-4xl text-2xl italic tracking-wide pt-5 pb-3">
              Reviews({mapReviews()?.length || 0})
            </h3>
          )}
          {mapReviews().length > 0 && <Reviews reviews={mapReviews() as any} />}
          <ReviewForm
            productId={productId}
            productLink={product.id}
            productName={product.title}
          />
        </div>
      </div>
      {/*------------------ Reviews------------------ */}
      {/*------------------ SIMILAR PRODUCT------------------ */}
      <div className="max-w-8xl m-auto">
        <div className="lg:py-5 p-4">
          <h3 className="font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2">
            SIMILAR PRODUCT
          </h3>
          {recommendations.length > 0 ? (
            <>
              <SellCardsSingle gap="gap-5" cards={mapProducts()} />
            </>
          ) : null}
        </div>
      </div>
      {/*------------------ SIMILAR PRODUCT------------------ */}
    </>
  );
};
export default ProductPage;
function addToCompare(product: Product): void {
  throw new Error('Function not implemented.');
}
