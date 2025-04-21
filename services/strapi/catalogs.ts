import { gql } from 'graphql-request';
import getStrapicms from './config';
import { Image } from './product';

const graphcms = getStrapicms();

export interface CatalogsStrapi {
  attributes: {
    title: string;
    PDF_File: {
      data: Image;
    };
    image: {
      data: Image;
    };
  };
}


export const getStrapiCatalogs = async (
 
): Promise<CatalogsStrapi> => {
  const query = gql`
    query Catalogs {
      catalogs(
        pagination: { limit: 200 }
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
            
          }
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.catalogs.data;
};

