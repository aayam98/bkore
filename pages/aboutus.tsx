import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import OurVision from '@components/ui/bodykore/Sections/AboutSection1';
import WeAreBK from '@components/ui/bodykore/Sections/AboutSection2';
import WhatWeDo from '@components/ui/bodykore/Sections/AboutSection3';
import { NUM_TOP_PRODUCTS } from '@config/siteConfig';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import React from 'react';
import seo from '../public/SEO/en.json';
import {
  getAllProducts,
  GetAllProductsResponse,
  Sort,
} from 'services/shopify/storefront';
import { getHomeReviews, Review } from 'services/stamped';
import SeoHeader from '@components/seoHeader';
import Ourteam from '@components/ui/bodykore/Sections/ourteam';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const products = await getAllProducts(
    NUM_TOP_PRODUCTS,
    undefined,
    undefined,
    Sort.BestSelling
  );
  const reviews = await getHomeReviews();

  return {
    props: { header, products, reviews },
    // revalidate: 30 * 60,
  };
};

interface AboutParams {
  header: HeaderData;
  products: GetAllProductsResponse;
  reviews: Review[];
}

const About = ({ header, products, reviews }: AboutParams) => {
  const mapProducts = () => {
    return products.edges.map((item) => ({
      id: item.node.variants.edges[0].node.id,
      slug: item.node.handle,
      bgImg: item.node.featuredImage?.url,
      title: item.node.title,
      price: item.node.variants.edges[0].node.priceV2.amount,
      comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
      description: item.node.description,
      available: item.node.availableForSale,
      cursor: item.cursor,
    }));
  };

  return (
    <>
      <SeoHeader seo={seo.aboutUs} />

      <div>
        <main className="w-full">
          <MainBanner
            bgImage={'/AboutUs/coverImage.jpg'}
            title={'ABOUT US'}
            description={''}
          />

          <OurVision
            title1="OUR"
            title2="VISION"
            // id="belowBanner"
            description="BodyKore’s mission is to remain at the forefront of the global fitness industry by continually providing state of the art commercial fitness equipment, innovative design, and excellent service. We focus our time and efforts on producing high quality products to help each individual achieve their fitness goals, while providing a great experience for our customers."
            options={[
              {
                icon: '/svg/advance.svg',
                title: 'ADVANCE',
                width: '50px',
                height: '50px',
              },
              {
                icon: '/svg/innovation.svg',
                title: 'INNOVATION',
                width: '50px',
                height: '50px',
              },
              {
                icon: '/svg/progress.svg',
                title: 'PROGRESS',
                width: '76.5px',
                height: '25px',
              },
            ]}
          />
          <div className='pb-12'>
          <WeAreBK
            title1="WE ARE"
            title2="#BODYKORE"
            description1="DRIVEN BY PASSION, PROVEN BY PERFORMANCE"
            description2="
            At BodyKore, innovation isn't just a buzzword—it's our foundation. Established in 2005 in Los Angeles, California, we've been at the forefront of revolutionizing fitness equipment, expanding our reach across three continents. Our journey is fueled by a passion for excellence and a commitment to quality that's evident in every piece of equipment we design.
            "
            description3="
            Our diverse team of product specialists, engineers, kinesiologists, and designers shares a common goal: to enhance your fitness experience. We blend cutting-edge technology with biomechanical precision to create equipment that not only meets but exceeds industry standards. The Smart Sled Pro is a testament to our innovation—a product that redefines versatility and efficiency in training."
            description4="At BodyKore, we believe in more than just selling equipment. We're dedicated to building a community where fitness enthusiasts can connect, share, and grow. Through direct engagement and continuous feedback, we stay ahead of the curve, anticipating the needs of our users and setting new benchmarks in the fitness industry."
            description5="Our commitment goes beyond the gym floor. We're here to support your fitness journey every step of the way, from the first sketch to the final product, and beyond. With BodyKore, you're not just choosing equipment; you're choosing a partner in your pursuit of excellence."
            description6="DRIVEN BY PASSION, PROVEN BY PERFORMANCE encapsulates our ethos perfectly. Join us, and experience the BodyKore difference."
            btnText="JOIN OUR TEAM"
            img="/AboutUs/weAre.jpg"
          />
          </div>
<div className='bg-gray-200'>
          <WhatWeDo
            img="/AboutUs/whatWeDo.jpg"
            title1="WHAT WE"
            title2="DO"
            description1="Through our team of experts and prestige production capabilities, we are able to produce equipment at the highest bio-mechanical caliber. Customer value comes first and it is displayed through our one on one interaction and compelling problem solving. We do not limit our mission by solely delivering high quality equipment and great customer experience."
            description2="We have taken it upon ourselves to go one step further by directly engaging with our users through our online community and social network. Through these avenues we are able to interact with our users on a daily basis, share product knowledge, and get a better understanding of the industries wants and needs. We make sure to provide our customers with the best fitness experience by combining our knowledge for the industry, with hard work and love for fitness."
          />
</div>
<div className='py-12'>
          <Ourteam
            title1="MEET"
            title2="THE Team"
            img="/AboutUs/weAre.jpg"
            title3={''}
          />
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
