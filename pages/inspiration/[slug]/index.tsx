import SeoHeader from '@components/seoHeader';
import ImageBanner from '@components/ui/bodykore/Banners/ImageBanner';
import SellCardsportfolio from '@components/ui/bodykore/Cards/SellCardsportfolio';
import DoubleText from '@components/ui/bodykore/Text/DoubleText';
import { getHeader } from '@utils/header';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { getProductCard, ProductInfo } from 'services/shopify/storefront';
import seo from '../../../public/SEO/en.json';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import { getStrapiProject, ProjectStrapi } from 'services/strapi/project';
import PortfolioGallery from '@components/ui/bodykore/Sections/PortfoioGallery';

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  // const project = await getProject(slug as string);
  const projectStrapi = await getStrapiProject(slug as string);

  if (projectStrapi === undefined) {
    return {
      notFound: true,
    };
  }

  const products: ProductInfo[] = [];
  for (let product of projectStrapi.attributes.products.data) {
    const res = await getProductCard(product.attributes.handle);

    if (res !== undefined) {
      products.push(res);
    }
  }
  const header = await getHeader();

  return {
    props: { products, header, projectStrapi },
  };
};

interface SingleProjectParams {
  products: ProductInfo[];
  projectStrapi: ProjectStrapi;
}

const SingleProject = ({ products, projectStrapi }: SingleProjectParams) => {
  const mapProducts = () => {
    return products.map((item) => ({
      id: item.variants.edges[0].node.id,
      slug: item.handle,
      bgImg:
        item.featuredImage?.url != undefined
          ? item.featuredImage?.url
          : imageNotFound,
      title: item.title,
      price: item.variants.edges[0].node.priceV2.amount,
      comparePrice: item.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.description,
      available: item.availableForSale,
    }));
  };

  // dynamically change seo title
  const dinamycSeo = () => {
    return seo.portfolioProject;
  };

  const mapGallery = () => {
    return projectStrapi.attributes.image.data.map((el) => {
      return {
        img: mediaUrl + el.attributes.url,
      };
    });
  };

  return (
    <>
      <SeoHeader seo={dinamycSeo()} />
      <main className="w-full">
        <ImageBanner
          title1={projectStrapi.attributes.title}
          height={'h-80'}
          bgImage={
            mediaUrl + projectStrapi.attributes.image.data[0].attributes.url
          }
        />

        <DoubleText
          title1={projectStrapi.attributes.title}
          title2={projectStrapi.attributes.subTitle}
          items={products.map((item) => item.title)}
          description={projectStrapi.attributes.description}
        />

        <PortfolioGallery
          imgHeight="h-auto"
          imgWidth="w-auto"
          images={mapGallery()}
          video={
            projectStrapi.attributes.videos.data.length > 0
              ? projectStrapi.attributes.videos.data[0].attributes.videoUrl
              : ''
          }
        />

        <SellCardsportfolio
          title={'FIND THE EQUIPMENT'}
          gap="gap-3"
          cards={mapProducts()}
          slide={true}
        />

        <script
          async
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
      </main>
    </>
  );
};

export default SingleProject;
