import Footer from '@components/Footer';
import Header from '@components/Header';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import CatPackagesSection1 from '@components/ui/bodykore/Sections/CatPackagesSection1';
import SliderPackages from '@components/ui/bodykore/Sliders/SliderPackages';
import CatPackagesSection4 from '@components/ui/bodykore/Sections/CatPackagesSection4';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import useWindowSize from '@lib/hooks/use-window-size';
import routes from '@config/routes';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import React from 'react';
import {
  CMSCollectionPage,
  getCMSCollectionPage,
  getProjectsOfCategoryHome,
  ProjectCategoryHome,
} from 'services/graphCMS';
import {
  getProductCard,
  getShopifyCollectionPage,
  ShopifyCollectionPage,
} from 'services/shopify/storefront';
import SeoHeader from '@components/seoHeader';
import { CategoryStrapi, getStrapiCategoriesSingle } from 'services/strapi';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import SellCardsSingle from '@components/ui/bodykore/Cards/SellCardsSingle';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const shopifyData = await getShopifyCollectionPage('packages');
  const CMSData = await getStrapiCategoriesSingle('packages');
  const projects = await getProjectsOfCategoryHome();
  const bundleItems: string[][] = [];
  for (let product of shopifyData!.products.edges) {
    const productItems: string[] = [];
    if (product.node.metafield) {
      for (let item of product.node.metafield.value.split(',')) {
        const res = await getProductCard(item);
        console.log(res);
        // productItems.push(res.title);
      }
    }
    bundleItems.push(productItems);
  }

  return {
    props: { header, shopifyData, CMSData, bundleItems, projects },
  };
};

interface AllBenchesParams {
  header: HeaderData;
  shopifyData: ShopifyCollectionPage;
  CMSData: CategoryStrapi;
  bundleItems: string[][];
  projects: ProjectCategoryHome[];
}

const AllBenches = ({
  header,
  shopifyData,
  CMSData,
  bundleItems,
  projects,
}: AllBenchesParams) => {
  const mapProjects = () => {
    return projects.map((item) => ({
      url:
        item.projects.length > 0
          ? item.projects[0].image[0].url
          : imageNotFound,
      title: item.title,
      link:
        item.projects.length > 0
          ? `${routes.inspiration.path}/${item.projects[0].slug}`
          : '',
    }));
  };

  const mapProducts = () => {
    return shopifyData.products.edges.map((item, index) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      url: item.node.featuredImage?.url,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      // description: item.node.description,
      available: item.node.availableForSale,
      affirmPrice: '$60/mo at',
      affirmIcon: '/Product/affirm.jpg',
      options: bundleItems[index],
    }));
  };

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;

  const dinamycSeo = () => {
    return {
      title: shopifyData.title,
      description: 'string',
      noIndex: false,
      nofollow: false,
      Index: true,
      image: {
        url: '',
      },
    };
  };

  return (
    <>
      <SeoHeader seo={dinamycSeo()} />

      <section className="w-full">
        <MainBanner
          title={shopifyData.title}
          bgImage={
            mediaUrl + CMSData.data[0].attributes.image.data.attributes.url
          }
        />

        <div className="pt-5" id="belowBanner">
          <CatPackagesSection1
            title1="THE BEST FITNESS EQUIPMENT IN EVERY"
            title2="BODYKORE PACKAGE"
            paragraphs={[
              {
                text: 'At BodyKore, we have the best complete fitness equipment, either if you are looking for commercial gym equipment or fitness equipment to build your gym at home. In our catalog, you will find a wide range of packages containing several products to start or upgrade your commercial studio or private fitness room, including some of our world-class machines and other accessories like benches or weights.',
              },
              {
                text: 'The fitness equipment included in all our packages provides all necessary items for training your body to the maximum level and going that extra mile, from functional training to bodybuilding, from compound workouts to isolation exercises, from starter to professional level. There’s a package for everyone, and all of them are of the highest quality.',
              },
            ]}
            img="/Packages-category/Section1.png"
          />
        </div>

        <div>
          <div className="pt-10 pb-12 max-w-7xl m-auto flex flex-wrap">
            <div className="lg:flex lg:w-2/4 text-center lg:text-left pb-5">
              <span
                className={`text-black-373933 text-4xl xl:text-5xl font-bebas font-bold italic`}
              >
                <span
                  className={`text-red-bc2026 text-4xl xl:text-5xl font-bebas font-bold italic pr-2`}
                >
                  OUR
                </span>
                PACKAGES
              </span>
            </div>
            <div className="w-full">
              <SellCardsSingle gap="gap-1" cards={mapProducts()} />
              
            </div>
          </div>
        </div>

        <CatPackagesSection4
          title1={'WHY CHOOSE'}
          title2="US"
          paragraphs={[
            {
              text: 'The fitness equipment included in every package has been carefully selected to fulfill the needs of each profile of fitness enthusiast, depending on the type of training you like, the space you have available, or if you are looking for commercial gym equipment or equipment for private use, for which we have prepared six different packages: Dynamic Package, Universal Gym Package, Home Gym Package, Garage Gym Package, Weight Room Package, and Free Weight Package. Visit our online shop and find your own!',
            },
            {
              text: 'BodyKore is a solid brand in the fitness and wellness industry, delivering only products of superior quality. Our fitness equipment is among the best in the market, and helping our customers reach their fitness goals is our main motivation.',
            },
            {
              text: 'At Bodykore, we are specialists in all kinds of fitness equipment. Our team is made up of professionals who are passionate about the same things you are: fitness, wellness, and empowerment through physical activity.',
            },
            {
              text: 'If you have any questions or need further advice on which fitness equipment to purchase, you can contact us via telephone, e-mail, or live chat. We are looking forward to hearing from you.',
            },
          ]}
          bgImage="https://cms.bodykore.com/uploads/packages_734c096846.jpg"
          heightbg="768px"
          heightGradient="768px"
        />

        <div className="py-12 px-8">
          <SliderProgress
            title1={'GET'}
            title2={'INSPIRATION'}
            color1={'text-red-bc2026'}
            color2={'text-black-373933'}
            btnText="PORTFOLIO"
            link={routes.inspiration.path}
            bgImage={mapProjects()}
            width="w-1/2"
          />
        </div>
      </section>
    </>
  );
};

export default AllBenches;
