import SeoHeader from '@components/seoHeader';
import FadingAndOptions from '@components/ui/bodykore/Banners/FadingAndOptions';
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
import React, { useEffect, useRef, useState } from 'react';
import seo from 'public/SEO/subcat.json';
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
    }));
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
            path[3].slice(1, 20).replace('-', ' ').trim()) as string) || '',
      }));
    }
  }, [/* router.isReady */ path[3], path[2]]);

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
    const lastCursor = displayed[displayed.length - 1].cursor;
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
  };
  const key = path[3].replaceAll('-', '_') as any;

  const dinamycSeo = () => {
    return {
      title: (path[3] != undefined
        ? path[3][0].toUpperCase() + path[3].slice(1, 30)
        : path[2]
      )
        .replace('-', ' ')
        .trim() as string,
      metaTitle: seo[key as keyof typeof seo].title,
      description: seo[key as keyof typeof seo].description,
      noIndex: false,
      nofollow: false,
      Index: true,
      image: {
        url: '',
      },
    };
  };

  const [placements, setPlacements] = useState<any[]>([]);
//   const [bread, setBread] = useState<any>();

//   useEffect(() => {
//     let pr = [];
//     for (let ele of displayed) {
//       pr.push({
//         allowCheckout: false,
//         domID:
//           'bread-checkout-btn-' +
//           ele.id.split('/')[ele.id.split('/').length - 1],
//         financingType: 'installment',
//         locationType: 'product',
//         order: {
//           items: [
//             {
//               name: ele.title,
//               sku: ele.title,
//               category: '',
//               unitPrice: {
//                 value: ele.comparePrice
//                   ? (ele.comparePrice as unknown as number)
//                   : (ele.price as unknown as number),
//                 currency: 'USD',
//               },
//               unitTax: {
//                 value: 0,
//                 currency: 'USD',
//               },
//               brand: ele.title,
//               quantity: 1,
//               shippingDescription: 'Ground',
//               shippingProvider: 'UPS',
//               shippingCost: {
//                 value: 0,
//                 currency: 'USD',
//               },
//             },
//           ],
//           subTotal: {
//             value: ele.price,
//             currency: 'USD',
//           },
//           totalPrice: {
//             value: ele.price,
//             currency: 'USD',
//           },
//           totalTax: {
//             value: 0,
//             currency: 'USD',
//           },
//           totalShipping: {
//             value: 0,
//             currency: 'USD',
//           },
//           totalDiscounts: {
//             value: 0,
//             currency: 'USD',
//           },
//         },
//       });

//       setPlacements(pr);

//       setBread(
//         <>
//           <script src="https://connect.breadpayments.com/sdk.js" />
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `
//               const buyer = {
//                 givenName: "John",
//                 familyName: "Smith",
//                 additionalName: "C.",
//                 birthDate: "1974-08-21",
//                 email: "jsmith@breadfinance.com",
//                 phone: "2123344141",
//                 billingAddress: {
//                   address1: "323 something lane",
//                   address2: "apt. B",
//                   country: "US",
//                   locality: "NYC",
//                   region: "NY",
//                   postalCode: "11222",
//                 },
//                 shippingAddress: {
//                   address1: "323 something lane",
//                   address2: "apt. B",
//                   country: "US",
//                   locality: "NYC",
//                   region: "NY",
//                   postalCode: "11222",
//                 },
//               };
//               BreadPayments.setup({
//   integrationKey: "3b76e624-7832-4957-93d0-19a24caba2ed",
//   buyer: buyer,
// });
// `,
//             }}
//           />
//           <script
//             type="application/javascript"
//             dangerouslySetInnerHTML={{
//               __html: `
//               BreadPayments.registerPlacements(${JSON.stringify(placements)});
//               BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {
//                 console.log(installmentResult);
//               });   
//               BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {
//                 console.log("Checkout Successful");
//                 console.log(installmentResult);
//               });
//            `,
//             }}
//           />
//         </>
//       );
//     }
//   }, [displayed]);

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

        <div className="pt-8 max-w-7xl m-auto">
          <div className="pl-8">
            <section className="text-right">
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
            
            <script
              type="application/javascript"
              dangerouslySetInnerHTML={{
                __html: `
              BreadPayments.registerPlacements(
                
                  ${JSON.stringify(
                    displayed.map((ele) => ({
                      allowCheckout: false,
                      domID: `bread-checkout-btn-${
                        ele.id.split('/')[ele.id.split('/').length - 1]
                      }`,
                      financingType: 'installment',
                      locationType: 'product',
                      order: {
                        items: [
                          {
                            name: `${ele.title}`,
                            category: '',
                            unitPrice: {
                              value: ele.comparePrice
                                ? parseFloat(ele.comparePrice) * 100
                                : parseFloat(ele.price) * 100,
                              currency: 'USD',
                            },
                            unitTax: { value: 0, currency: 'USD' },
                            brand: ele.title,
                            quantity: 1,
                            shippingDescription: 'Ground',
                            shippingProvider: 'UPS',
                            shippingCost: { value: 0, currency: 'USD' },
                          },
                        ],
                        subTotal: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalPrice: {
                          value: ele.comparePrice
                            ? parseFloat(ele.comparePrice) * 100
                            : parseFloat(ele.price) * 100,
                          currency: 'USD',
                        },
                        totalTax: { value: 0, currency: 'USD' },
                        totalShipping: { value: 0, currency: 'USD' },
                        totalDiscounts: { value: 0, currency: 'USD' },
                      },
                    }))
                  )}
                );
              BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {
                console.log(installmentResult);
              });   
              BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {
                console.log("Checkout Successful");
                console.log(installmentResult);
              });
           `,
              }}
            />

            <div className="pt-8 pb-8 flex text-red">
              {nextPage ? (
                <TransparentBtn
                  text="View more products"
                  width="w-60"
                  fontSize="text-md"
                  onClick={() => loadMore()}
                />
              ) : null}
            </div>
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
          </div>
        </div>
      </section>

      {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default AllProducts;
