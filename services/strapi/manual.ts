import { gql } from 'graphql-request';
import getStrapicms from './config';
import { Image } from './product';

const graphcms = getStrapicms();

export interface ManualStrapi {
  attributes: {
    title: string;
    PDF_File: {
      data: Image;
    };
    image: {
      data: Image;
    };
    manual_category: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
  };
}

export interface ManualStrapiCategory {
  attributes: {
    slug: string;
    title: string;
  };
}

export const getStrapiManual = async (
  contentType: String
): Promise<ManualStrapi> => {
  const query = gql`
    query Manuals($contentType: String!) {
      manuals(
        pagination: { limit: 200 }
        filters: { contentType: { eq: $contentType } }
      ) {
        data {
          attributes {
            title
            PDF_File {
              data {
                attributes {
                  url
                }
              }
            }
            image {
              data {
                attributes {
                  url
                }
              }
            }
            manual_category {
              data {
                attributes {
                  title
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    contentType,
  };
  const res = await graphcms.request(query, variables);
  return res.manuals.data;
};



export const getStrapiManualCategories = async (contentType: String) => {
  const query = gql`
    query ManualCategories($contentType: String!) {
      manualCategories(filters: { contentType: { eq: $contentType } }) {
        data {
          attributes {
            slug
            title
          }
        }
      }
    }
  `;
  const variable = {
    contentType,
  };
  const res = await graphcms.request(query, variable);
  return res.manualCategories.data;
};
