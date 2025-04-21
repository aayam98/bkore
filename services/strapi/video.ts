import { gql } from 'graphql-request';
import getStrapicms from './config';

const graphcms = getStrapicms();

export interface VideoCategoryStrapi {
  attributes: {
    title: string;
    slug: string;
    sort: string;
    video: {
      data: {
        attributes: {
          title: string;
          videoUrl: string;
        };
      }[];
    };
  };
}

export const getVideoCategoriesStrapiWithCategory = async (
  slug: string
): Promise<VideoCategoryStrapi[]> => {
  const query = gql`
    query VideoCategories {
      videoCategories(sort: "sort:ASC",filters:{slug:{eq:"${slug}"}}) {
        data {
          attributes {
            title
            sort
            slug
            video  {
              data {
                attributes {
                  title
                  videoUrl
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.videoCategories.data;
};

export const getVideoCategoriesStrapi = async (): Promise<
  VideoCategoryStrapi[]
> => {
  const query = gql`
    query VideoCategories {
      videoCategories(sort: "sort:ASC") {
        data {
          attributes {
            title
            sort
            slug
            video(pagination: { limit: 1000 }) {
              data {
                id
              }
            }
          }
        }
      }
    }
  `;

  const res = await graphcms.request(query);
  return res.videoCategories.data;
};

export interface VideoInfoStrapi {
  data: {
    attributes: {
      title: string;
      videoUrl: string;
    };
  }[];
  meta: {
    pagination: {
      total: number;
      page: number;
      pageCount: number;
      pageSize: number;
    };
  };
}

export const getVideosOfCategoryStrapi = async (
  slug: string,
  start: number,
  limit: number
): Promise<VideoInfoStrapi> => {
  const query = gql`
    query Video($slug: String) {
      videos(
        filters: { video_categories: { slug: { eq: $slug } } }
        pagination: { pageSize: ${limit}, page: ${start} }
      ) {
        data {
          attributes {
            videoUrl
            title
            
          }
        }
        meta {
          pagination {
            total
            page
            pageCount
            pageSize
          }
        }
      }
    }
  `;
  const variables = {
    slug,
    start,
    limit,
  };
  const res = await graphcms.request(query, variables);
  // console.log(res);
  return res.videos === null ? undefined : res.videos;
};
