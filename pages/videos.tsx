import React from 'react';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import Video from '@components/ui/bodykore/Video';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  getVideoCategoriesStrapi,
  getVideosOfCategoryStrapi,
  VideoCategoryStrapi,
  VideoInfoStrapi,
} from 'services/strapi/video';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getVideoCategoriesStrapi();

  const videos = [];
  for (let ele of categories) {
    videos.push(await getVideosOfCategoryStrapi(ele.attributes.slug, 0, 9));
  }

  const header = await getHeader();

  return {
    props: {
      videos,
      categories,
      header,
    },
    // revalidate: 30 * 60,
  };
};

interface VideosParams {
  videos: VideoInfoStrapi[];
  categories: VideoCategoryStrapi[];
  header: HeaderData;
}

const Videos = ({ videos, categories }: VideosParams) => {
  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.attributes.title,
      id: item.attributes.slug,
    }));
  };

  const mapVideos = () => {
    return categories.map((item, index) => {
      const space = item.attributes.title.indexOf(' ');
      return (
        videos[index].data.length > 0 && (
          <Video
            key={index}
            id={item.attributes.slug}
            title1={item.attributes.title.substring(0, space)}
            title2={item.attributes.title.substring(space + 1)}
            videos={videos[index].data.map((item) => ({
              url: item.attributes.videoUrl,
              title: item.attributes.title,
            }))}
          />
        )
      );
    });
  };
  mapVideos();

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
        <NavOptions title1={'ALL'} titles={mapCategories()} />
        <div className="max-w-7xl m-auto pl-14"></div>
        {mapVideos()}
      </main>
    </>
  );
};

export default Videos;
