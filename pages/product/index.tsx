import SeoHeader from '@components/seoHeader';
import FadingAndOptions from '@components/ui/bodykore/Banners/FadingAndOptions';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await getAllProducts(NUM_PRODUCTS);
  const header = await getHeader();
  const numProducts = await getCountOfAllProducts();
  const bestSeller = await getShopifyCollectionQuery('tag:bestseller');

  return {
    props: { products, header, numProducts, bestSeller },
  };
};

interface AllProductsParams {
  products: GetAllProductsResponse;
  header: HeaderData;
  numProducts: number;
  bestSeller: ShopifyProductQuery;
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

const AllProducts = ({ products, header, numProducts }: AllProductsParams) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);

  const mapProducts = (
    products: GetAllProductsResponse
  ): (CardProps & { cursor: string })[] => {
    return products.edges.map((item) => ({
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
    if (router.isReady && router.query.category !== undefined) {
      const { category, subcategory } = router.query;
      setFilter((prevState) => ({
        ...prevState,
        category: (category as string) || '',
        subcategory: (subcategory as string) || '',
      }));
    }
  }, [/* router.isReady */ router.query.subcategory, router.query.category]);

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

  useDidUpdateEffect(() => {
    updateProducts();
    setSwitchPage(generateSwitchPage());
  }, [filter]);

  const loadMore = async () => {
    if (!nextPage || isLoading || displayed.length === 0) return;
    
    setIsLoading(true);
    const lastCursor = displayed[displayed.length - 1].cursor;
    let moreProducts: GetAllProductsResponse;
    
    try {
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
    
      // Get unique products by id to avoid duplicates
      setDisplayed((prev) => {
        const newProducts = mapProducts(moreProducts);
        
        // Create a set of existing product IDs for faster lookup
        const existingIds = new Set(prev.map(product => product.id));
        
        // Filter out any products that already exist in the displayed list
        const uniqueNewProducts = newProducts.filter(product => !existingIds.has(product.id));
        
        // Combine previous products with unique new products
        const combinedProducts = [...prev, ...uniqueNewProducts];
    
        // Apply the sorting logic to the entire combined list
        return combinedProducts.sort((a, b) => {
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
      });
    
      setNextPage(moreProducts.pageInfo.hasNextPage);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Setup the intersection observer for infinite scrolling
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && nextPage && !isLoading && displayed.length < count) {
      loadMore();
    }
  }, [nextPage, isLoading, displayed.length, count]);

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
  }, [handleObserver]);

  const dinamycSeo = () => {
    return {
      title: (router.query.subcategory != undefined
        ? router.query.subcategory
        : router.query.category) as string,
      description: '',
      noIndex: false,
      nofollow: false,
      Index: true,
      image: {
        url: '',
      },
    };
  };

  return (
    <>
      <SeoHeader seo={dinamycSeo()} />
      <section className="w-full">
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

        <div className="flex flex-wrap justify-end items-center pt-8 max-w-7xl m-auto lg:px-0 px-8">
          <div className="">
            <section className="flex max-w-7xl m-auto items-end gap-8 lg:gap-20 xl:gap-36">
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

        <div className="px-0 lg:hidden py-5">
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
          <div className="w-full px-5 ">
            <SellCards gap="gap-4" cards={displayed} />

            {/* Loading indicator */}
            {isLoading && (
              <div className="w-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              </div>
            )}

            {/* Intersection Observer Target */}
            {nextPage && displayed.length < count && (
              <div ref={observerTarget} className="h-10 w-full"></div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProducts;