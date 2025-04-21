import React from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  getVideoCategoriesStrapi,
  VideoCategoryStrapi,
  VideoInfoStrapi,
} from 'services/strapi/video';
import NavMenuOptions from '@components/ui/bodykore/NavOptions/VideoOptions';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getVideoCategoriesStrapi();

  const header = await getHeader();

  return {
    props: {
      categories,
      header,
    },
    // revalidate: 30 * 60,
  };
};

interface VideosParams {
  videos: VideoInfoStrapi[][];
  categories: VideoCategoryStrapi[];
  header: HeaderData;
}

const Videos = ({ categories }: VideosParams) => {
  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.attributes.title,
      id: item.attributes.slug,
      count: item.attributes.video.data.length,
    }));
  };

  return (
    <>
      <SeoHeader seo={seo.videos} />

      <main className="w-full">
        <FadingBanner
          title={'ALL VIDEOS'}
          bgImage={'bg-manuals-image'}
          description={''}
          height={'h-72'}
        />

        <NavMenuOptions title1={''} titles={mapCategories()} />
      </main>
    </>
  );
};

export default Videos;
