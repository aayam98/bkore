import { gql } from 'graphql-request';
import getStrapicms from './config';
import { Image } from './product';

const graphcms = getStrapicms();

export interface Technologies {
  attributes: {
    title: string;
    description: string;
    image: {
      data: Image[];
    };
    iconImage: {
      data: Image;
    };
  };
}

export const getStrapiTechnologies = async (): Promise<Technologies> => {
  const query = gql`
    query Technologies {
      technologies {
        data {
          attributes {
            title
            image {
              data {
                attributes {
                  height
                  width
                  url
                }
              }
            }
            description
            iconImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await graphcms.request(query);
  return res.technologies.data;
};
