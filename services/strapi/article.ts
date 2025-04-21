import { gql } from 'graphql-request';
import getStrapicms from './config';

const graphcms = getStrapicms();

export interface ArticleInfoStrapi {
  attributes: {
    title: string;
    subTitle: string;
    slug: string;
    description: string;
    excert: string;
    nofollow: boolean;
    medias: {
      data: {
        attributes: {
          url: string;
          height: string;
          width: string;
        };
      }[];
    };
    video: {
      data: {
        attributes: {
          url: string;
          height: string;
          width: string;
        };
      };
    };
    article_category: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
    date: string;
    readTime: string;
  };
}

export const getAllArticlesStrapi = async (
  limit?: number,
  category?: string,
  slug?: string
): Promise<ArticleInfoStrapi[]> => {
  const query = gql`
    query AllArticles($limit: Int, $category: String, $slug: String) {
      articles(
        sort: "date:desc"
        pagination: { limit: $limit }
        filters: {
          article_category: { title: { eq: $category } }
          slug: { ne: $slug }
        }
      ) {
        data {
          attributes {
            title
            subTitle
            slug
            description
            excert
            nofollow
            medias {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            article_category {
              data {
                attributes {
                  title
                  slug
                }
              }
            }
            date
            readTime
            video {
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

  const variables = { limit, category, slug };
  const res = await graphcms.request(query, variables);
  return res.articles.data;
};

export interface ArticleSlugStrapi {
  attributes: {
    slug: string;
  };
}

export const getAllArticlesSlugStrapi = async (): Promise<
  ArticleSlugStrapi[]
> => {
  const query = gql`
    query AllArticlesSlug {
      articles {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.articles.data;
};

export interface ArticleStrapi {
  attributes: {
    title: string;
    subTitle: string;
    slug: string;
    description: string;
    excert: string;
    medias: {
      data: {
        attributes: {
          url: string;
          height: string;
          width: string;
        };
      }[];
    };
    article_category: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
    video: {
      data: {
        attributes: {
          url: string;
          height: string;
          width: string;
        };
      };
    };
    date: string;
    readTime: string;
  };
}

export const getArticleStrapi = async (
  slug: string
): Promise<ArticleStrapi | null> => {
  const query = gql`
    query Article($slug: String!) {
      articles(filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            title
            subTitle
            slug
            description
            excert
            article_category {
              data {
                attributes {
                  title
                  slug
                }
              }
            }
            medias {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            date
            readTime
            video {
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
  const variables = {
    slug,
  };
  const res = await graphcms.request(query, variables);
  return res.articles === null ? null : res.articles.data[0];
};

export interface ArticleCategoryStrapi {
  attributes: { slug: string; title: string; subTitle: string };
}

export const getArticleCategoriesStrapi = async (): Promise<
  ArticleCategoryStrapi[]
> => {
  const query = gql`
    query ArticleCategories {
      articleCategories {
        data {
          attributes {
            title
            slug
            subTitle
          }
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.articleCategories.data;
};

export const getArticlesOfCategoryStrapi = async (
  slug: string
): Promise<ArticleInfoStrapi[]> => {
  const query = gql`
    query ArticlesOfCategory($slug: String!) {
      articleCategories(filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            title
            articles {
              data {
                attributes {
                  title
                  slug
                  description
                  excert
                  article_category {
                    data {
                      attributes {
                        title
                        slug
                      }
                    }
                  }
                  medias {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                  date
                  readTime
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
  return res.articleCategories === null
    ? []
    : res.articleCategories.attributes.articles.data;
};

interface ArticleSearchStrapi {
  title: string;
  slug: string;
  date?: string;
}


export const getSearchArticleStrapi = async (
  filters: string[]
): Promise<ArticleSearchStrapi[]> => {
  // Define the GraphQL query with dynamic filters
  const query = gql`
    query Articles($filters: ArticleFiltersInput) {
      articles(filters: $filters) {
        data {
          attributes {
            title
            slug
            date
          }
        }
      }
    }
  `;

  // Construct the filters dynamically
  const filtersObject = {
    and: filters.map((value) => ({
      title: { contains: value },
    })),
  };

  const variables = {
    filters: filtersObject,
  };

  const res = await graphcms.request(query, variables);

  return res.articles
    ? res.articles.data.map((item: any) => item.attributes)
    : [];
};