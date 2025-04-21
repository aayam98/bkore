import { gql } from 'graphql-request';
import getStrapicms from './config';

const graphcms = getStrapicms();

export interface StoreStrapi {
  attributes: {
    address: string;
    title: string;
    phone: string;
    email: string;
    longitude: number;
    latitude: number;
    website: string;
  };
}

export const getStrapiStore = async (): Promise<StoreStrapi> => {
  const query = gql`
    query Stores {
      stores(pagination:{limit:100}) {
        data {
          attributes {
            address
            title
            phone
            email
            longitude
            latitude
            website
          }
        }
      }
    }
  `;

  const res = await graphcms.request(query);
  return res.stores.data;
};
