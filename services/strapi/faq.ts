import { gql } from 'graphql-request';
import getStrapicms from './config';

const graphcms = getStrapicms();

export interface FAQStrapi {
  attributes: {
    faq_type: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    question: string;
    answer: string;
  };
}

export const getStrapiFaq = async (limit?: number): Promise<FAQStrapi> => {
  const query = gql`
    query Faq($limit: Int) {
      faqs(
        pagination: { limit: $limit }
        filters: { products: { title: null } }
      ) {
        data {
          attributes {
            faq_type {
              data {
                attributes {
                  title
                }
              }
            }
            question
            answer
          }
        }
      }
    }
  `;
  const variables = {
    limit: limit,
  };
  const res = await graphcms.request(query, variables);
  return res.faqs.data;
};

export interface FAQTypeStrapi {
  attributes: {
    title: string;
    faqs: {
      data: {
        attributes: {
          faq_type: {
            data: {
              attributes: {
                title: string;
              };
            };
          };
          question: string;
          answer: string;
        };
      }[];
    };
  };
}

export const getStrapiFaqType = async (
  isGeneral: Boolean,
  limit?: number
): Promise<FAQTypeStrapi> => {
  const query = gql`
    query Faq($isGeneral: Boolean, $limit: Int) {
      faqTypes(
        filters: { isGeneral: { eq: $isGeneral } }
        pagination: { limit: $limit }
      ) {
        data {
          attributes {
            title
            faqs(pagination: { limit: $limit }) {
              data {
                attributes {
                  faq_type {
                    data {
                      attributes {
                        title
                      }
                    }
                  }
                  question
                  answer
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    isGeneral: isGeneral ? true : false,
    limit: limit,
  };
  const res = await graphcms.request(query, variables);
  return res.faqTypes.data;
};
