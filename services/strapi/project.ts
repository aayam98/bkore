import { gql } from 'graphql-request';
import getStrapicms from './config';
import { Image, ProductStrapi } from './product';

const graphcms = getStrapicms();

export interface ProjectCategoryStrapi {
  data: {
    attributes: {
      title: string;
      slug: string;
      image: {
        data: Image;
      };
      viewHome: boolean;
      projects: {
        [x: string]: any;
        data: ProjectStrapi[];
      };
    };
  }[];
}

export interface ProjectStrapi {
  attributes: {
    title: string;
    subTitle: string;
    description: string;
    slug: string;
    videos:{
      data: {
        attributes: {
          videoUrl: string;
        }
      }[]
    }
    products: {
      data: ProductStrapi[];
    };
    image: {
      data: Image[];
    };
    projectCategory: ProjectCategoryStrapi;
  };
}

export const getStrapiProjectCategories = async (
  viewHome: boolean = true,
  title?: string
): Promise<ProjectCategoryStrapi> => {
  const query = gql`
    query ProjectCategories($viewHome: Boolean,$title: String) {
      projectCategories(filters: { title:{startsWith:$title},viewHome:{eq:$viewHome}}) {
        data {
          attributes {
            title
            slug
            image {
              data {
                attributes {
                  name
                  url
                  height
                  width
                }
              }
            }
            viewHome
            projects(sort: "sort:asc",pagination:{limit:100}) {
              ... on ProjectRelationResponseCollection {
                data {
                  attributes {
                    title
                    slug
                    image {
                      data {
                        attributes {
                          name
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
    }
  `;
  const variables = {
    viewHome,
    title: title ? title : '',
  };
  
  const res = await graphcms.request(query, variables);
  return res.projectCategories;
};

export const getStrapiProject = async (
  slug: string = 'beverly-hills'
): Promise<ProjectStrapi> => {
  const query = gql`
    query Projects($slug: String) {
      projects(filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            title
            slug
            subTitle
            description
            image(pagination:{limit:100}) {
              data {
                attributes {
                  name
                  url
                  height
                  width
                }
              }
            }
            videos {
              data {
                attributes {
                  videoUrl
                }
              }
            }
            products {
              ... on ProductRelationResponseCollection {
                data {
                  attributes {
                    title
                    handle
                  }
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
  return res.projects.data[0];
};
