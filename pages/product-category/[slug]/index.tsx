import SeoHeader from '@components/seoHeader';
import FadingAndInfo from '@components/ui/bodykore/Banners/FadingAndInfo';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import SellCardsSingle from '@components/ui/bodykore/Cards/SellCardsSingle';
import ImgDescription from '@components/ui/bodykore/Sections/ImgDescription';
import CatSlider from '@components/ui/bodykore/Sliders/CatSlider';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import TextRImg from '@components/ui/bodykore/Text/TextRImg';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import routes from '@config/routes';
import useWindowSize from '@lib/hooks/use-window-size';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import {
  getProjectsOfCategoryHome,
  ProjectCategoryHome,
} from 'services/graphCMS';
import {
  getShopifyCollectionPage,
  ShopifyCollectionPage,
} from 'services/shopify/storefront';
import { CategoryStrapi, getStrapiCategoriesSingle } from 'services/strapi';

interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  const shopifyData = await getShopifyCollectionPage(slug as string);
  const CMSData = await getStrapiCategoriesSingle(slug as string);

  const projects = await getProjectsOfCategoryHome();

  if (shopifyData === undefined || CMSData.data[0].attributes === undefined) {
    return {
      notFound: true,
    };
  }

  const header = await getHeader();

  return {
    props: { shopifyData, header, CMSData, projects },
  };
};

interface CategoryParams {
  shopifyData: ShopifyCollectionPage;
  CMSData: CategoryStrapi;
  header: HeaderData;
  projects: ProjectCategoryHome[];
}

const Category = ({ shopifyData, CMSData, projects }: CategoryParams) => {
  const mapSubcategories = () => {
    return CMSData.data[0].attributes!.subcategories.data.map((item) => ({
      url: item.attributes.image?.data
        ? mediaUrl + item.attributes.image?.data.attributes.url
        : imageNotFound,
      topTitle: item.attributes.title,
      title: item.attributes.title,
      link: `${routes.products.path}?category=${shopifyData.title}`,
      subCategories: [],
    }));
  };

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
    return shopifyData.products.edges.map((item) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.node.description,
      available: item.node.availableForSale,
      tags: item.node.tags,
      variants: item.node.variants.edges,
    }))
    .sort((a, b) => {
      const aSpecialTags = a.tags?.some(tag => ['specialOrder'].includes(tag));
      const bSpecialTags = b.tags?.some(tag => ['specialOrder'].includes(tag));
      
      // Both have special tags or both don't have special tags
      if ((aSpecialTags && bSpecialTags) || (!aSpecialTags && !bSpecialTags)) {
        if (!a.tags?.length) return -1;
        if (!b.tags?.length) return 1;
        return 0;
      }
      
      // One has special tags
      return aSpecialTags ? 1 : -1;
    });
  };

  const mapFeatures = () => {
    return CMSData.data[0].attributes.features.map((item) => ({
      img: mediaUrl + item.images.data[0].attributes.url,
      description: item.description,
      title: item.title,
    }));
  };

  const size = useWindowSize();
  let widthSize: number | undefined = size.width;
  // dynamically change seo title
  const dinamycSeo = () => {
    return {
      title: shopifyData.seo.title,
      metaTitle: shopifyData.seo ? shopifyData.seo.title : '',
      description: shopifyData.seo ? shopifyData.seo.description : '',
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
          <TextRImg
            title="DETAILS"
            description={shopifyData.descriptionHtml as unknown as string}
            img={
              mediaUrl + CMSData.data[0].attributes.image.data.attributes.url
            }
          />
        </div>

        <div>
          {(() => {
            if (widthSize !== undefined && widthSize >= 800) {
              return (
                <div className="max-w-6xl m-auto py-5">
                  <CatSlider
                    title1="ALL"
                    color1="text-red-bc2026"
                    title2={shopifyData.title}
                    color2="text-black-373933"
                    btnText={`ALL ${shopifyData.title}`}
                    btnBorder="border-black-373933"
                    border="border-2"
                    bgImage={mapSubcategories()}
                    link={`${routes.products.path}?category=${shopifyData.title}`}
                  />
                </div>
              );
            } else {
              return (
                <div className="p-5">
                  <SliderProgress
                    title1={'ALL'}
                    title2={shopifyData.title}
                    color1={'text-red-bc2026'}
                    color2={'text-black-373933'}
                    btnText={`SEE ALL ${shopifyData.title}`}
                    link={`${routes.products.path}?category=${shopifyData.title}`}
                    bgImage={mapSubcategories()}
                    gap="gap-20"
                    pb="py-4"
                  />
                </div>
              );
            }
          })()}
        </div>

        {mapFeatures().length > 0 && (
          <>
            <div className="max-w-6xl m-auto py-5">
              <Blacktitle
                title="FEATURES"
                textColor="text-black-373933"
                textSize="text-5xl"
              />
              <ImgDescription
                imgHeight="h-72"
                imgWidth="w-72"
                textSize="text-sm"
                images={mapFeatures()}
              />
            </div>
          </>
        )}

        <div className="pt-5">
          <FadingAndInfo
            title={'ELEMENTS'}
            description={CMSData.data[0].attributes.elementDescription}
            icon="/svg/document.svg"
            btnText="Download Technical Data"
            bgImage={
              CMSData.data[0].attributes.gradientBanner.data != undefined
                ? mediaUrl +
                  CMSData.data[0].attributes.gradientBanner.data.attributes.url
                : imageNotFound
            }
            heightbg="498px"
            heightGradient="498px"
            link={routes.technicalDatasheets.path}
          />
        </div>

        <div className="py-5 px-5">
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

        <div className="py-5 lg:px-0 px-5 max-w-7xl m-auto">
          <Blacktitle
            title={`TOP SELLERS`}
            textColor="text-black-373933"
            textSize="text-5xl"
          />
          <SellCardsSingle gap="gap-12" cards={mapProducts()} />
        </div>
      </section>
    </>
  );
};
export default Category;
