import { gql } from 'graphql-request';
import getStrapicms from './config';
import { Image } from './product';

const graphcms = getStrapicms();

export interface DatasheetStrapiCategory {
  attributes: {
    title: string;
    slug: string;
    technical_datasheet: {
      data: {
        attributes: {
          title: string;
          images: {
            data: Image[];
          };
        };
      };
    };
  };
}

export const getStrapiDatasheetCategory =
  async (): Promise<DatasheetStrapiCategory> => {
    const query = gql`
      query DatasheetCategory {
        datasheetCategories {
          data {
            attributes {
              title
              slug
              technical_datasheet {
                data {
                  attributes {
                    title
                    image {
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
          }
        }
      }
    `;

    const res = await graphcms.request(query);
    return res.datasheetCategories.data;
  };

export interface DatasheetStrapi {
  attributes: {
    title: string;
    image: {
      data: Image;
    };
    datasheet_category: {
      data: DatasheetStrapiCategory;
    };
    pdf: {
      data: Image;
    };
  };
}

export const getStrapiDatasheet =
  async (): Promise<DatasheetStrapiCategory> => {
    const query = gql`
      query Datasheet {
        technicalDatasheets(pagination:{limit:100}) {
          data {
            attributes {
              title
              image {
                data {
                  attributes {
                    url
                    height
                    width
                  }
                }
              }
              pdf {
                data {
                  attributes {
                    url
                    height
                    width
                  }
                }
              }
              datasheet_category {
                data {
                  attributes {
                    title
                    slug
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await graphcms.request(query);
    return res.technicalDatasheets.data;
  };
