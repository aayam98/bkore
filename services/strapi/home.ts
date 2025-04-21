import { gql } from 'graphql-request';
import getStrapicms from './config';

const graphcms = getStrapicms();

export interface HomeBannerProps {
  attributes: {
    title: string;
    url: string;
    buttonText: string;
    description: string;
    media: {
      data: {
        attributes: {
          url: string;
          height: string;
          width: string;
          mime: string;
        };
      };
    };
  };
}

export const getAllHomeBannerStrapi = async () => {
  const query = gql`
    query HomeBanner {
      homeBanners {
        data {
          attributes {
            title
            description
            url
            buttonText
            media {
              data {
                attributes {
                  url
                  height
                  width
                  mime
                }
              }
            }
          }
        }
      }
    }
  `;


  const res = await graphcms.request(query);
  return res.homeBanners.data;
};
