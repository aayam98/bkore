import SeoHeader from '@components/seoHeader';
import TransparentBtn from '@components/ui/bodykore/Buttons/TransparentBtn';
import SellCards, { CardProps } from '@components/ui/bodykore/Cards/SellCards';
import CheckBox from '@components/ui/bodykore/CheckBox/CheckBox';
import SortBy from '@components/ui/bodykore/Dropdown/SortBy';
import { OptionProps } from '@components/ui/bodykore/NavOptions/SwitchPagesOptions';
import VFilterOptions from '@components/ui/bodykore/NavOptions/VFilterOptions';
import PriceRange from '@components/ui/bodykore/PriceRange';
import { NUM_PRODUCTS } from '@config/siteConfig';
import { getHeader, HeaderData } from '@utils/header';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import seo from '../../../../public/SEO/subcat.json';
import {
  getAllProducts,
  GetAllProductsResponse,
  getCountOfAllProducts,
  getCountOfProductsOfCollection,
  getProductsOfCollection,
  getShopifyCollectionQuery,
  ShopifyProductQuery,
  Sort,
} from 'services/shopify/storefront';
import { getStrapiSubCategoriesSingle, Subcategory } from 'services/strapi';
import FadingForCategories from '@components/ui/bodykore/Banners/FadingForCategories';
import FadingAndOptions from '@components/ui/bodykore/Banners/FadingAndOptions';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products;
  if (context.query.subcategory) {
    products = await getAllProducts(100, undefined, {
      tag: context.query.subcategory as string,
    });
  } else {
    products = await getAllProducts(100, undefined, {
      tag: context.query.slug as string,
    });
  }

  let slug =
    (context.query.slug as string) || (context.query.subcategory as string);

  const header = await getHeader();
  const numProducts = await getCountOfAllProducts();
  const bestSeller = await getShopifyCollectionQuery('tag:bestseller');

  const subCategory = await getStrapiSubCategoriesSingle(
    context.query.subcategory as string
  );

  return {
    props: { products, header, numProducts, bestSeller, subCategory, slug },
  };
};

interface AllProductsParams {
  products: GetAllProductsResponse;
  subCategory: Subcategory;
  header: HeaderData;
  numProducts: number;
  bestSeller: ShopifyProductQuery;
  slug: string;
}

function useDidUpdateEffect(fn: () => void, inputs: any[]) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
}

const AllProducts = ({
  products,
  header,
  numProducts,
  subCategory,
  slug,
}: AllProductsParams) => {
  const router = useRouter();
  const [path, setPath] = useState(router.asPath.split('/'));
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);

  const mapProducts = (
    products: GetAllProductsResponse
  ): (CardProps & { cursor: string })[] => {
    return products.edges
      .map((item) => ({
        id: item.node.variants.edges[0].node.id,
        slug: item.node.handle,
        bgImg: item.node.featuredImage?.url,
        title: item.node.title,
        price: item.node.variants.edges[0].node.priceV2.amount,
        comparePrice: item.node.variants.edges[0].node.compareAtPriceV2?.amount,
        description: item.node.description,
        available: item.node.availableForSale,
        cursor: item.cursor,
        tags: item.node.tags,
        variants: item.node.variants.edges,
      }))
      .sort((a, b) => {
        const aSpecialTags = a.tags?.some(tag => ['specialOrder'].includes(tag));
        const bSpecialTags = b.tags?.some(tag => ['specialOrder'].includes(tag));

        // Both have special tags or both don't have special tags
        if ((aSpecialTags && bSpecialTags) || (!aSpecialTags && !bSpecialTags)) {
          if (!a.tags?.length) return -1;
          if (!b.tags?.length) return 1;
          return 0;
        }

        // One has special tags
        return aSpecialTags ? 1 : -1;
      });
  };

  const [displayed, setDisplayed] = useState(mapProducts(products));
  const [nextPage, setNextPage] = useState(products.pageInfo.hasNextPage);
  const [filter, setFilter] = useState<{
    category: string;
    subcategory: string;
    minPrice: any;
    maxPrice: any;
    sort: Sort | undefined;
  }>({
    category: '',
    subcategory: '',
    minPrice: undefined,
    maxPrice: undefined,
    sort: undefined,
  });

  const generateSwitchPage = () => {
    const switchPage: OptionProps[] = [
      {
        icon: '/svg/white-home.svg',
        text: 'Products',
      },
    ];
    if (filter.category !== '') {
      switchPage.push({
        text: filter.category,
        icon: '/svg/rightArrow.svg',
      });
    }
    if (filter.subcategory !== '') {
      switchPage.push({
        text: filter.subcategory,
        icon: '/svg/rightArrow.svg',
      });
    }
    return switchPage;
  };

  const [switchPage, setSwitchPage] = useState(generateSwitchPage());
  const [count, setCount] = useState(numProducts);
  let maxPrice: number[] = [];

  useEffect(() => {
    if (router.isReady && path[2] !== undefined) {
      setFilter((prevState) => ({
        ...prevState,
        category:
          ((path[2][0].toUpperCase() + path[2].slice(1, 10)).replace(
            '-',
            ' '
          ) as string) || '',
        subcategory:
          ((path[3][0].toUpperCase() +
            (path[3].slice(1, 20).replace('-', ' ').trim().split('#').length > 1
              ? path[3].slice(1, 20).replace('-', ' ').trim().split('#')[0]
              : path[3].slice(1, 20).replace('-', ' ').trim())) as string) ||
          '',
      }));
    }
  }, [router.isReady, path[3], path[2]]);

  const updateProducts = async () => {
    let products: GetAllProductsResponse;
    let numProducts: number;
    if (filter.subcategory !== '') {
      products = await getAllProducts(
        NUM_PRODUCTS,
        undefined,
        {
          tag: filter.subcategory,
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
      numProducts = await getCountOfAllProducts({
        tag: filter.subcategory,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
      });
    } else if (filter.category !== '') {
      products = await getProductsOfCollection(
        filter.category.toLowerCase().replaceAll(' ', '-') ===
          'functional-training'
          ? 'functional-training-equipment'
          : filter.category.toLowerCase().replaceAll(' ', '-'),
        NUM_PRODUCTS,
        undefined,
        { minPrice: filter.minPrice, maxPrice: filter.maxPrice },
        filter.sort
      );
      numProducts = await getCountOfProductsOfCollection(
        filter.category.toLowerCase().replaceAll(' ', '-') ===
          'functional-training'
          ? 'functional-training-equipment'
          : filter.category.toLowerCase().replaceAll(' ', '-'),
        {
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        }
      );
    } else {
      products = await getAllProducts(
        NUM_PRODUCTS,
        undefined,
        {
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
      numProducts = await getCountOfAllProducts({
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
      });
    }

    setDisplayed(mapProducts(products));
    setNextPage(products.pageInfo.hasNextPage);
    setCount(numProducts);
  };

  const [loading, setLoading] = useState(false);
  useDidUpdateEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await updateProducts();
      await setSwitchPage(generateSwitchPage());
      setLoading(false);
    };
    fetchData();
  }, [filter]);

  const loadMore = async () => {
    if (!nextPage || isLoading) return;
    
    setIsLoading(true);
    const lastCursor = displayed[displayed.length - 1]?.cursor;
    
    if (!lastCursor) {
      setIsLoading(false);
      return;
    }
    
    let moreProducts: GetAllProductsResponse;
    if (filter.subcategory !== '') {
      moreProducts = await getAllProducts(
        NUM_PRODUCTS,
        lastCursor,
        {
          tag: filter.subcategory,
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
    } else if (filter.category !== '') {
      moreProducts = await getProductsOfCollection(
        filter.category,
        NUM_PRODUCTS,
        lastCursor,
        { minPrice: filter.minPrice, maxPrice: filter.maxPrice },
        filter.sort
      );
    } else {
      moreProducts = await getAllProducts(
        NUM_PRODUCTS,
        lastCursor,
        {
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
        filter.sort
      );
    }
    
    setDisplayed((prev) => [...prev, ...mapProducts(moreProducts)]);
    setNextPage(moreProducts.pageInfo.hasNextPage);
    setIsLoading(false);
  };

  // Setup the intersection observer for infinite scrolling
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && nextPage && !isLoading) {
      loadMore();
    }
  }, [nextPage, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px 400px 0px',
      threshold: 0.1,
    });

    const currentObserver = observerTarget.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [handleObserver, nextPage]);

  const key = path[3].replaceAll('-', '_') as any;

  const dinamycSeo = () => {
    return {
      title: subCategory.attributes.metaTitle ? subCategory.attributes.metaTitle : (path[3] != undefined
        ? path[3][0].toUpperCase() + path[3].slice(1, 30)
        : path[2]
      )
        .replace('-', ' ')
        .trim() as string,
      metaTitle: subCategory.attributes.metaTitle ? subCategory.attributes.metaTitle : seo[key as keyof typeof seo]
        ? seo[key as keyof typeof seo].title
        : '',
      description: subCategory.attributes.metaTitle ? subCategory.attributes.metaDescription :seo[key as keyof typeof seo]
        ? seo[key as keyof typeof seo].description
        : '',
      noIndex: false,
      nofollow: false,
      Index: true,
      image: {
        url: '',
      },
    };
  };

  const [active, setActive] = useState(-1);
  function toggleAccordion(index: number) {
    if (active === index) {
      setActive(-1);
    } else {
      setActive(index);
    }
  }

  const mapFaqs = () => {
    return subCategory.attributes.faqs.data.map((item) => ({
      question: item.attributes.question,
      answer: item.attributes.answer,
    }));
  };

  const [showOld, setShowOld] = useState(true);
  const checkCondition = () => {
    if (
      subCategory?.attributes.bannerImage.data &&
      subCategory?.attributes.infoImage.data &&
      subCategory?.attributes.infoTitle &&
      subCategory?.attributes.infoDescription
    ) {
      setShowOld(false);
    } else {
      setShowOld(true);
    }
  };

  useEffect(() => {
    checkCondition();
  }, [subCategory]);
  
  return (
    <>
      <SeoHeader seo={dinamycSeo()} />

      <section className="w-full">
        {showOld && (
          <FadingAndOptions
            //Switch pages
            options={switchPage}
            title={
              filter.subcategory !== ''
                ? filter.subcategory
                : filter.category !== ''
                  ? filter.category
                  : 'All products'
            }
            description={''}
            bgImage={'bg-allProducts-image'}
            heightbg={'h-72'}
            heightGradient={'h-56'}
          />
        )}

        {!showOld && (
          <FadingForCategories
            title={
              filter.subcategory !== ''
                ? filter.subcategory
                : filter.category !== ''
                  ? filter.category
                  : 'All products'
            }
            data={subCategory}
          />
        )}

        <div className="pt-8 max-w-7xl m-auto">
          <div className="pl-8">
            <section className="text-right" id="productsec">
              <CheckBox img="/AllProducts/affirm.png" />
              <button
                className="font-sm font-roboto underline text-black-1c2023"
                onClick={() => {
                  setFilter((prevState) => ({
                    ...prevState,
                    category: '',
                    subcategory: '',
                    minPrice: undefined,
                    maxPrice: undefined,
                    sort: undefined,
                  }));
                }}
              >
                Reset all filters
              </button>
            </section>
          </div>
        </div>

        <div className="border-b border-gray-300 pt-4 max-w-7xl m-auto"></div>
        <div className="flex justify-end max-w-7xl m-auto pt-5">
          <SortBy
            setter={(value) => {
              setFilter((prevState) => ({
                ...prevState,
                sort: value,
              }));
            }}
            numItems={count}
          />
        </div>

        <div className="lg:px-0 lg:hidden py-5">
          <VFilterOptions
            titles={header.categories.map((item) => ({
              text: item.title,
              id: item.title,
              subcategories: item.subcategories,
            }))}
            setter={(value, subvalue = filter.subcategory) => {
              setFilter((prevState) => ({
                ...prevState,
                category: value,
                subcategory: subvalue,
                sort: undefined,
              }));
            }}
            type={filter.category}
            subtype={filter.subcategory}
          />
          <div className="px-5">
            <h5 className="font-bebas text-2xl italic font-bold tracking-wideer mt-2 mb-3">
              Shop By Price
            </h5>
          </div>
        </div>
        <div className="flex flex-row max-w-7xl m-auto">
          <div className="justify-start w-1/4 lg:block hidden lg:visible">
            <VFilterOptions
              titles={header.categories.map((item) => ({
                text: item.title,
                id: item.title,
                subcategories: item.subcategories,
              }))}
              setter={(value, subvalue = filter.subcategory) => {
                setFilter((prevState) => ({
                  ...prevState,
                  category: value,
                  subcategory: subvalue,
                  sort: undefined,
                }));
              }}
              type={filter.category}
              subtype={filter.subcategory}
            />

            <div className="px-5">
              <h5 className="font-bebas text-2xl italic font-bold tracking-wideer mt-2 mb-3">
                Shop By Price
              </h5>
              <PriceRange
                value={filter.maxPrice}
                maxValue={displayed}
                setter={(value) => {
                  setFilter((prevState) => ({
                    ...prevState,
                    maxPrice: value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="w-full px-5">
            <SellCards gap="gap-4" cards={displayed} />
            
            {isLoading && (
              <div className="w-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              </div>
            )}
            
            {/* Intersection Observer Target */}
            {nextPage && <div ref={observerTarget} className="h-10 w-full"></div>}
          </div>
        </div>
        <div className="flex flex-row max-w-7xl m-auto">
          <div className="justify-start w-1/4 lg:block hidden lg:visible"></div>
          <div className="w-full px-5">
            <div className="pb-10 h2Dymanic">
              {subCategory.attributes.seo_content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: subCategory.attributes.seo_content,
                  }}
                ></div>
              )}
            </div>
            {/*------------------ faq------------------ */}
            <div>
              <div className="grid lg:grid-cols-1 grid-cols-1 items-start lg:pb-8">
                {mapFaqs().length > 0 && (
                  <div className=" col-span-3">
                    <h3 className="font-bebas text-left lg:text-4xl text-2xl italic tracking-wide pt-5 pb-3">
                      frequently asked questions (FAQ)
                    </h3>

                    {mapFaqs().map((a, i) => {
                      return (
                        <div className="flex flex-col pb-3" key={i}>
                          <div
                            className="py-1 cursor-pointer"
                            onClick={() => toggleAccordion(i)}
                          >
                            <div className="flex items-center gap-4">
                              <Image
                                onClick={() => toggleAccordion(i)}
                                src={`${active === i
                                  ? '/svg/substraction.svg'
                                  : '/svg/sum.svg'
                                  }`}
                                width={16}
                                height={16}
                                alt=""
                              />
                              <p className="inline-block font-bebas italic text-lg tracking-wide text-black-373933 text-left">
                                {a.question}
                              </p>
                            </div>
                          </div>
                          {active === i && (
                            <div>
                              <div className="overflow-auto transition-height duration-700 ease-in-out faqs-container">
                                <div
                                  className="pl-8 text-gray-600 font-roboto text-base tracking-wide"
                                  dangerouslySetInnerHTML={{ __html: a.answer }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {/*------------------ faq------------------ */}
          </div>
        </div>
      </section>

      {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default AllProducts;