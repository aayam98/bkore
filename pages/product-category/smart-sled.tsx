import React from 'react';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import CatPackagesSection1 from '@components/ui/bodykore/Sections/CatPackagesSection1';
import SliderPackages from '@components/ui/bodykore/Sliders/SliderPackages';
import SliderProgress from '@components/ui/bodykore/Sliders/SliderProgress';
import useWindowSize from '@lib/hooks/use-window-size';
import routes from '@config/routes';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import {
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
import SledCol from '@components/ui/bodykore/Sections/SledCol';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const shopifyData = await getShopifyCollectionPage('smart-sled');
  const CMSData = await getStrapiCategoriesSingle('smart-sled');
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

        <div className="py-12" id="belowBanner">
          <CatPackagesSection1
            title1="For the High-Performance "
            title2="Athlete"
            paragraphs={[
              {
                text: 'The BodyKore Smart Sled was created to take athletes to a whole new level of training. With its advanced technology and futuristic look, one coach has already dubbed it the “Tesla of Fitness.” Here are some highlights of this dynamic training tool.',
              },
              {
                text: '',
              },
            ]}
            img="/Packages-category/sled.jpg"
          />
        </div>

        <SledCol
          title1="BODYKORE SMART SLED"
          title2="For the High-Performance Athlete"
          text="The BodyKore Smart Sled was created to take athletes to a whole new level of training. With its advanced technology and futuristic look, one coach has already dubbed it the “Tesla of Fitness.” Here are some highlights of this dynamic training tool."
          texthead="DIGITIZED RESISTANCE"
          textpara="Convenience is king. The BodyKore Smart Sled uses digitized resistance (dual magnetic motors) to adjust workout intensity with 3x more resistance than any other sled on the market (without any weights)."
          texthead1="MULTI-PLANAR MOVEMENTS"
          textpara1="Other sleds move in one direction. Not this one. Each wheel can be adjusted to its own resistance to allow athletes to train at a more competitive level."
          texthead2="LIVE DATA FEEDBACK"
          textpara2="Unlike other sleds, the BodyKore Smart Sled provides performance feedback in real time. Athletes and coaches can monitor progress, track stats and make necessary adjustments to reach goals."
          texthead3="APP CONTROLLED"
          textpara3="The BodyKore Smart Sled is controlled through a proprietary app using the Bluetooth feature to digitally reduce or intensify resistance during a workout. This makes training far more convenient, faster and efficient (especially when training in pairs)."
          texthead4="OTHER PRODUCT FEATURES"
          textpara4={[
            'Electrostatic Paint',
            'All Terrain Wheels for Indoor/Outdoor Use',
            'Dual Weight Pegs for Up To 1000 lbs Additional Resistance',
            'Ergonomic Handles',
            'Four Modes',
          ]}
          img="/Sled/sledside1.jpg"
        />
        <div>
          {(() => {
            if (widthSize !== undefined && widthSize >= 800) {
              return (
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
                      Smart Sled Pro
                    </span>
                  </div>{' '}
                  <div className="flex justify-end lg:justify-end lg:w-2/4 py-8 lg:py-0"></div>
                  <SellCardsSingle gap="gap-5" cards={mapProducts()} />
                  <script
                    type="application/javascript"
                    dangerouslySetInnerHTML={{
                      __html: `
              BreadPayments.registerPlacements(
                
                  ${JSON.stringify(
                    mapProducts().map((ele) => ({
                      allowCheckout: false,
                      domID: `bread-checkout-btn-${
                        ele.id.split('/')[ele.id.split('/').length - 1]
                      }`,
                      financingType: 'installment',
                      locationType: 'product',
                      order: {
                        items: [
                          {
                            name: `${ele.title}`,
                            category: '',
                            unitPrice: {
                              value: ele.comparePrice
                                ? parseFloat(ele.comparePrice) * 100
                                : parseFloat(ele.price) * 100,
                              currency: 'USD',
                            },
                            unitTax: { value: 0, currency: 'USD' },
                            brand: ele.title,
                            quantity: 1,
                            shippingDescription: 'Ground',
                            shippingProvider: 'UPS',
                            shippingCost: { value: 0, currency: 'USD' },
                          },
                        ],
                        subTotal: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalPrice: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalTax: { value: 0, currency: 'USD' },
                        totalShipping: { value: 0, currency: 'USD' },
                        totalDiscounts: { value: 0, currency: 'USD' },
                      },
                    }))
                  )}
                );
              BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {
                console.log(installmentResult);
              });   
              BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {
                console.log("Checkout Successful");
                console.log(installmentResult);
              });
           `,
                    }}
                  />
                </div>
              );
            } else {
              return (
                <div className="pt-10 pb-28">
                  <SliderPackages
                    title1="OUR"
                    color1="text-black-373933"
                    title2="PACKAGES"
                    color2="text-red-bc2026"
                    btnText="SEE ALL PACKAGES"
                    border="border"
                    btnBorder="border-black-373933"
                    link={`${routes.products.path}?category=Packages`}
                    cards={mapProducts()}
                  />
                  <script
                    type="application/javascript"
                    dangerouslySetInnerHTML={{
                      __html: `
              BreadPayments.registerPlacements(
                
                  ${JSON.stringify(
                    mapProducts().map((ele) => ({
                      allowCheckout: false,
                      domID: `bread-checkout-btn-${
                        ele.id.split('/')[ele.id.split('/').length - 1]
                      }`,
                      financingType: 'installment',
                      locationType: 'product',
                      order: {
                        items: [
                          {
                            name: `${ele.title}`,
                            category: '',
                            unitPrice: {
                              value: ele.comparePrice
                                ? parseFloat(ele.comparePrice) * 100
                                : parseFloat(ele.price) * 100,
                              currency: 'USD',
                            },
                            unitTax: { value: 0, currency: 'USD' },
                            brand: ele.title,
                            quantity: 1,
                            shippingDescription: 'Ground',
                            shippingProvider: 'UPS',
                            shippingCost: { value: 0, currency: 'USD' },
                          },
                        ],
                        subTotal: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalPrice: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalTax: { value: 0, currency: 'USD' },
                        totalShipping: { value: 0, currency: 'USD' },
                        totalDiscounts: { value: 0, currency: 'USD' },
                      },
                    }))
                  )}
                );
              BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {
                console.log(installmentResult);
              });   
              BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {
                console.log("Checkout Successful");
                console.log(installmentResult);
              });
           `,
                    }}
                  />
                </div>
              );
            }
          })()}
        </div>

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
