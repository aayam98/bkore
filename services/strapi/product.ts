import { gql } from 'graphql-request';
import getStrapicms from './config';
import axios from 'axios';
import { mediaUrl } from '@utils/baseUrls';
import { Technologies } from './technology';

const graphcms = getStrapicms();

export interface CategoryStrapi {
  data: {
    attributes: {
      title: string;
      slug: string;
      image: {
        data: Image;
      };
      gradientBanner: {
        data: Image;
      };

      features: SubFeature[];
      subcategories: CategoryStrapi;
      products: {
        data: ProductStrapi[];
      };
      elementDescription: string;
      elementFile: {
        data: Image;
      };
    };
  }[];
}

export interface SubcategoryStrapi {
  title: string;
  slug: string;
  image: string;
}

export interface ProductStrapi {
  attributes: {
    title: string;
    description: string;
    descriptionImage: {
      data: Image;
    };
    category: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    subcategory: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    handle: string;
    warranty: {
      data: Image[];
    };
    technologies: {
      data: {
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
      }[];
    };
    featureImage: {
      data: Image;
    };
    accessoriesIncluded: string;
    attachmentsIncluded: string;
    feature: {
      title: string;
      subFeature: {
        title: string;
        description: string;
        images: {
          data: Image[];
        };
      }[];
    }[];
    gallery: { data: Image[] };
    videos: {
      data: {
        attributes: {
          videoUrl: string;
          title: string;
          video_categories: {
            data: {
              attributes: {
                title: string;
              };
            }[];
          };
        };
      }[];
    };
    faqs: {
      data: {
        attributes: {
          question: string;
          answer: string;
        };
      }[];
    };
    techologies: {
      data: {
        attributes: {
          title: string;
          image: { data: Image };
          description: string;
          iconImage: { data: Image };
        };
      }[];
    };
    manuals: {
      data: {
        attributes: {
          title: string;
          contentType: string;
          PDF_File: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
          image: Image;
        };
      }[];
    };
    technical_datasheets: {
      data: {
        attributes: {
          title: string;
          pdf: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
          image: Image;
        };
      }[];
    };
    file3d: { data: Image };
    specification: {
      dimensions: string;
      weight: string;
      footprint: string;
      frame: string;
      frameColor: string;
      weightStack: string;
      ofAdjustableHeightPositions: string;
      ofWeightPegs: string;
      counterBalancedSmithMachine: string;
      halfRackFunction: string;
      dualPulleySystem: string;
      accessoryStorage: string;
      multiGripPullUpHandles: string;
      barStorage: string;
      bodyGroupTarget: string;
      ofWorkouts: string;
      assemblyTime: string;
      ofAdjustableBackPositions: string;
      ofFoamRollerAdjustments: string;
      cushionMaterial: string;
      cushionDimensions: string;
      angles: string;
      wheels: string;
      footrest: string;
      handle: string;
      ofAdjustableSeatPositions: string;
      platformSize: string;
      image: {
        data: Image;
      };
    }[];
    featureList: {
      title: string;
      featuredesc: string;
    }[];
  };
}

export interface ProductAllStrapi {
  attributes: {
    title: string;
  };
}

export interface Image {
  attributes: {
    name: string;
    url: string;
    height: number;
    width: number;
    mime: string;
  };
}
export interface SubFeature {
  title: string;
  description: string;
  images: {
    data: Image[];
  };
}

export interface Subcategory {
  attributes: {
    seo_content: string;
    faqs: {
      data: {
        attributes: {
          question: string;
          answer: string;
        };
      }[];
    };
    bannerImage: {
      data: Image;
    };
    infoImage: {
      data: Image;
    };
    metaTitle:string;
    metaDescription:string;
    bannerDescription: string;
    infoDescription: string;
    infoTitle: string;
  };
}

export const getStrapiCategories = async (): Promise<CategoryStrapi> => {
  const query = gql`
    query ProductCategories {
      categories(sort: "sort:ASC", filters: { seoonly: { eq: false } }) {
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
            subcategories(pagination: { limit: 100 }, sort: "title:DESC") {
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
  `;
  const res = await graphcms.request(query);
  return res.categories;
};

export const getStrapiProduct = async (
  handle: String
): Promise<ProductStrapi> => {
  const query = gql`
    query Products($handle: String!) {
      products(filters: { handle: { eq: $handle } }) {
        data {
          attributes {
            title
            description
            descriptionImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            category {
              data {
                attributes {
                  title
                }
              }
            }
            subcategory {
              data {
                attributes {
                  title
                }
              }
            }
            handle
            technologies {
              data {
                attributes {
                  title
                  description
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
            accessoriesIncluded
            attachmentsIncluded
            featureImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            technologies {
              data {
                attributes {
                  title
                  description
                  image {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
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
            feature {
              title
              subFeature {
                title
                description
                images {
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
            gallery(pagination: { limit: 100 }) {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
            }
            videos(pagination: { limit: 100 }) {
              data {
                attributes {
                  videoUrl
                  title
                  video_categories {
                    data {
                      attributes {
                        title
                      }
                    }
                  }
                }
              }
            }
            faqs {
              data {
                attributes {
                  question
                  answer
                }
              }
            }
            file3d {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            warranty {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            manuals {
              data {
                attributes {
                  title
                  contentType
                  image {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                  PDF_File {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            technical_datasheets {
              data {
                attributes {
                  title
                  pdf {
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
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
            specification {
              dimensions
              weight
              footprint
              frame
              frameColor
              weightStack
              ofAdjustableHeightPositions
              ofWeightPegs
              counterBalancedSmithMachine
              halfRackFunction
              dualPulleySystem
              accessoryStorage
              multiGripPullUpHandles
              barStorage
              bodyGroupTarget
              ofWorkouts
              assemblyTime
              ofAdjustableBackPositions
              ofFoamRollerAdjustments
              cushionMaterial
              cushionDimensions
              angles
              wheels
              footrest
              handle
              ofAdjustableSeatPositions
              platformSize
              image {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
            }
            featureList {
              title
              featuredesc
            }
          }
        }
      }
    }
  `;
  const variables = {
    handle,
  };
  const res = await graphcms.request(query, variables);

  return res.products.data[0];
};

export const getStrapiAllProduct = async (): Promise<ProductAllStrapi[]> => {
  const query = gql`
    query Products {
      products(pagination:{limit:300}) {
        data {
          attributes {
            title
        }
      }
    }
    }
  `;

  const res = await graphcms.request(query);

  return res.products.data;
};

export const getStrapiProductPopulate = async (): Promise<ProductStrapi> => {
  const query = gql`
    query Products {
      products(
        pagination: { limit: 200, start: 80 }
        filters: { category: { not: null } }
      ) {
        data {
          attributes {
            title
            description
            descriptionImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            category {
              data {
                attributes {
                  title
                }
              }
            }
            subcategory {
              data {
                attributes {
                  title
                }
              }
            }
            handle
            technologies {
              data {
                attributes {
                  title
                  description
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
            accessoriesIncluded
            attachmentsIncluded
            featureImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            technologies {
              data {
                attributes {
                  title
                  description
                  image {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
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
            feature {
              title
              subFeature {
                title
                description
                images {
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
            gallery(pagination: { limit: 100 }) {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
            }
            videos {
              data {
                attributes {
                  videoUrl
                  title
                }
              }
            }
            faqs {
              data {
                attributes {
                  question
                  answer
                }
              }
            }
            file3d {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            warranty {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            manuals {
              data {
                attributes {
                  title
                  contentType
                  image {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                  PDF_File {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            technical_datasheets {
              data {
                attributes {
                  title
                  pdf {
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
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
            specification {
              dimensions
              weight
              footprint
              frame
              frameColor
              weightStack
              ofAdjustableHeightPositions
              ofWeightPegs
              counterBalancedSmithMachine
              halfRackFunction
              dualPulleySystem
              accessoryStorage
              multiGripPullUpHandles
              barStorage
              bodyGroupTarget
              ofWorkouts
              assemblyTime
              ofAdjustableBackPositions
              ofFoamRollerAdjustments
              cushionMaterial
              cushionDimensions
              angles
              wheels
              footrest
              handle
              ofAdjustableSeatPositions
              platformSize
              image {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
            }
            featureList {
              title
              featuredesc
            }
          }
        }
      }
    }
  `;

  const res = await graphcms.request(query);
  for (let ele of res.products.data) {
    if (ele.attributes.category.data && ele.attributes.descriptionImage.data) {
      const productImport = {
        name: ele.attributes.title,
        description: ele.attributes.description,
        slug: ele.attributes.handle,
        status: 'active',
        category: ele.attributes.category.data.attributes.title,
        subCategory: ele.attributes.subCategory
          ? ele.attributes.subCategory.data.attributes.title
          : null,
        image: mediaUrl + ele.attributes.descriptionImage.data.attributes.url,
        technologies:
          ele.attributes.technologies &&
          ele.attributes.technologies.data.map((tech: Technologies) => ({
            name: tech.attributes.title,
            description: tech.attributes.description,
            images: tech.attributes.image.data.map((image: any) => ({
              url: mediaUrl + image.attributes.url,
            })),
            iconImage: mediaUrl + tech.attributes.iconImage.data.attributes.url,
          })),
        manuals: ele.attributes.manuals.data.map((manual: any) => ({
          name: manual.attributes.title,
          pdf: mediaUrl + manual.attributes.PDF_File.data.attributes.url,
          image: mediaUrl + manual.attributes.image.data.attributes.url,
          contentType: manual.attributes.contentType,
        })),
        technicalDatasheets: ele.attributes.technical_datasheets.data.map(
          (dataSheet: any) => ({
            name: dataSheet.attributes.title,
            pdf: mediaUrl + dataSheet.attributes.pdf.data.attributes.url,
            image: mediaUrl + dataSheet.attributes.image.data.attributes.url,
            contentType: 'technicalDatasheets',
          })
        ),
        features: ele.attributes.feature.map((feature: any) => ({
          name: feature.title,
          subFeatures: feature.subFeature.map((subFeature: any) => ({
            name: subFeature.title,
            description: subFeature.description,
            images: subFeature.images.data.map((image: any) => ({
              url: mediaUrl + image.attributes.url,
            })),
          })),
        })),
        specifications: ele.attributes.specification.map((spec: any) => ({
          dimensions: spec.dimensions,
          weight: spec.weight,
          footprint: spec.footprint,
          frame: spec.frame,
          frameColor: spec.frameColor,
          weightStack: spec.weightStack,
          ofAdjustableHeightPositions: spec.ofAdjustableHeightPositions,
          ofWeightPegs: spec.ofWeightPegs,
          counterBalancedSmithMachine: spec.counterBalancedSmithMachine,
          halfRackFunction: spec.halfRackFunction,
          dualPulleySystem: spec.dualPulleySystem,
          accessoryStorage: spec.accessoryStorage,
          multiGripPullUpHandles: spec.multiGripPullUpHandles,
          barStorage: spec.barStorage,
          bodyGroupTarget: spec.bodyGroupTarget,
          ofWorkouts: spec.ofWorkouts,
          assemblyTime: spec.assemblyTime,
          ofAdjustableBackPositions: spec.ofAdjustableBackPositions,
          ofFoamRollerAdjustments: spec.ofFoamRollerAdjustments,
          cushionMaterial: spec.cushionMaterial,
          cushionDimensions: spec.cushionDimensions,
          angles: spec.angles,
          wheels: spec.wheels,
          footrest: spec.footrest,
          handle: spec.handle,
          ofAdjustableSeatPositions: spec.ofAdjustableSeatPositions,
          platformSize: spec.platformSize,
          image: spec.image.data
            ? mediaUrl + spec.image.data.attributes.url
            : null,
        })),
      };
      const response = await axios.post(
        'https://app.bodykore.com/api/v1/product/importProduct',
        productImport,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTIyODBmZTJiODE2ZjA1YWE4NWQ0ZGEiLCJ1c2VySGFuZGxlIjoiQF9iaW5hMTA2MiIsImlhdCI6MTcwOTc4NDA0OCwiZXhwIjoxNzEyMzc2MDQ4fQ.kkLhuQGpK5QaUe9UVK4gPlymA86f0LHJYzs-oWPnTDA',
          },
        }
      );
      console.log(response.status);
    }
  }

  return res.products.data[0];
};
export const getStrapiCompareProduct = async (
  handle1: string = 'a',
  handle2: string = 'a',
  handle3: string = 'a'
): Promise<ProductStrapi[]> => {
  const query = gql`
    query Products($handle1: String, $handle2: String, $handle3: String) {
      products(
        filters: {
          or: [
            { handle: { eq: $handle1 } }
            { handle: { eq: $handle2 } }
            { handle: { eq: $handle3 } }
          ]
        }
      ) {
        data {
          attributes {
            title
            description
            descriptionImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            handle
            technologies {
              data {
                attributes {
                  title
                  description
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
            accessoriesIncluded
            attachmentsIncluded
            feature {
              title
              subFeature {
                title
                description
                images {
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
            gallery {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
            }
            videos {
              data {
                attributes {
                  videoUrl
                  title
                }
              }
            }
            file3d {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            specification {
              dimensions
              weight
              footprint
              frame
              frameColor
              weightStack
              ofAdjustableHeightPositions
              ofWeightPegs
              counterBalancedSmithMachine
              halfRackFunction
              dualPulleySystem
              accessoryStorage
              multiGripPullUpHandles
              barStorage
              bodyGroupTarget
              ofWorkouts
              assemblyTime
              image {
                data {
                  attributes {
                    url
                    width
                    height
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
    handle1,
    handle2,
    handle3,
  };

  const res = await graphcms.request(query, variables);
  return res.products.data;
};

export const getStrapiCategoriesSingle = async (
  slug: string
): Promise<CategoryStrapi> => {
  const query = gql`
    query ProductCategories($slug: String) {
      categories(filters: { slug: { eq: $slug } }) {
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
            gradientBanner {
              data {
                attributes {
                  name
                  url
                  height
                  width
                }
              }
            }
            subcategories {
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
            features {
              title
              description
              images {
                data {
                  attributes {
                    url
                    height
                    width
                  }
                }
              }
            }
            elementDescription
            elementFile {
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

  return res.categories;
};

export const getStrapiSubCategoriesSingle = async (
  slug: string
): Promise<Subcategory> => {
  const query = gql`
    query ProductCategories($slug: String) {
      subcategories(filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            seo_content
            bannerImage {
              data {
                attributes {
                  url
                  height
                  width
                  mime
                }
              }
            }
            infoImage {
              data {
                attributes {
                  url
                  height
                  width
                }
              }
            }
            bannerDescription
            infoDescription
            infoTitle
            metaTitle
            metaDescription
            faqs {
              data {
                attributes {
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
    slug,
  };
  const res = await graphcms.request(query, variables);

  return res.subcategories.data[0];
};
