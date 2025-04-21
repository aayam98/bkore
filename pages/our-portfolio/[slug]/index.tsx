import React, { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../../../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  getVideoCategoriesStrapiWithCategory,
  getVideosOfCategoryStrapi,
  VideoCategoryStrapi,
  VideoInfoStrapi,
} from 'services/strapi/video';

import ReactPlayer from 'react-player';
import TransparentBtn from '@components/ui/bodykore/Buttons/TransparentBtn';
import { getAllProducts } from 'services/shopify/storefront';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.slug;
  const slug = query as string;

  const categories = await getVideoCategoriesStrapiWithCategory(
    query as string
  );

  const videos = await getVideosOfCategoryStrapi(query as string, 0, 9);

  const header = await getHeader();

  return {
    props: {
      videos,
      categories,
      header,
      slug,
    },
    // revalidate: 30 * 60,
  };
};

interface VideosParams {
  videos: VideoInfoStrapi;
  categories: VideoCategoryStrapi[];
  header: HeaderData;
  slug: string;
}

const Videos = ({ slug, videos, categories }: VideosParams) => {
  const [vid, setVid] = React.useState<VideoInfoStrapi>(videos);
  const [loading, setLoading] = React.useState<boolean>(false);
  const loadMore = async () => {
    setLoading(true);
    const newVideos = await getVideosOfCategoryStrapi(
      slug,
      videos.meta.pagination.page + 1,
      9
    );
    videos.data = [...videos.data, ...newVideos.data];
    videos.meta.pagination.page = newVideos.meta.pagination.page;
    videos.meta.pagination.pageCount = newVideos.meta.pagination.pageCount;
    videos.meta.pagination.total = newVideos.meta.pagination.total;
    setVid(videos);
    setLoading(false);
  };
  return (
    <>
      <SeoHeader seo={seo.videos} />

      <main className="w-full">
        <section className="max-w-8xl m-auto pb-5 pt-6">
          <div className="flex pb-3" style={{ letterSpacing: '1px' }}>
            <h5 className="text-red-bc2026 text-2xl font-bebas font-bold italic">
              {categories[0].attributes.title.substring(
                0,
                categories[0].attributes.title.indexOf(' ')
              )}
            </h5>
            <h3 className="text-black-373933 text-2xl pl-1 font-bebas font-bold italic">
              {categories[0].attributes.title.substring(
                categories[0].attributes.title.indexOf(' ')
              )}{' '}
              ({vid.meta.pagination.total} Videos)
            </h3>
          </div>
          <div className="">
            <p className="text-black-1c2023 text-center lg:text-left">
              {/* {description} */}
            </p>
          </div>

          <div className="grid grid-cols-3">
            {vid.data.map((video, i) => {
              return (
                <div className="py-1" key={i}>
                  <ReactPlayer
                    className="video_player_index"
                    url={video.attributes.videoUrl}
                    loop={true}
                    controls={true}
                    width="465px"
                    height="220px"
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                    onPlay={() => {}}
                  />
                  <h5
                    key={i}
                    className="font-roboto text-base font-medium text-black-373933 pt-2 text-left"
                  >
                    {video.attributes.title!}
                  </h5>
                </div>
              );
            })}
          </div>
        </section>
        <div className="text-center mb-5">
          {vid.meta.pagination.pageCount != vid.meta.pagination.page && (
            <TransparentBtn
              text={loading ? 'Loading...' : `Load More`}
              width="w-60"
              fontSize="text-md"
              onClick={loadMore}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Videos;
