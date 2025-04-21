import routes from '@config/routes';
import { NUM_SEARCH } from '@config/siteConfig';
import { imageNotFound } from '@utils/baseUrls';
import debounce from 'lodash.debounce';
import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { ProductSearchInfo, searchProducts } from 'services/shopify/storefront';
import { searchOpenState } from 'state/atoms';
import { getHeader, HeaderData } from '@utils/header';
import { useRouter } from 'next/router';
import ProductCard from '@components/ui/bodykore/Cards/ProductCard';
import paperIcon from '../public/paperIcon.png';
import Image from 'next/image';
import { getSearchArticleStrapi } from 'services/strapi/article';
import { toSingular } from '@utils/checkPlural';
import Head from 'next/head';
import SellCards from '@components/ui/bodykore/Cards/SellCards';
export interface SearchItem {
  name: string;
  link: string;
  image?: string;
  id?: string;
  tags?: string[];
  available?: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
    //// revalidate: 30 * 60,
  };
};
interface SearchPageParams {
  header?: HeaderData;
}

export default function SearchPage({ header }: SearchPageParams) {
  const [isOpen, setIsOpen] = useAtom(searchOpenState);
  const [products, setProducts] = useState<Item[]>([]);
  const [pages, setPages] = useState<Item[]>([]);
  const router = useRouter();
  const mapDynamicSearch = () => {
    const collections = header!.categories.map((item) => ({
      name: `${item.title} (Collection)`,
      link: `${routes.collection.path}/${item.slug}`,
    }));
    const projects = header!.pages.projects.map((item) => ({
      name: `${item.title} (Portfolio)`,
      link: `${routes.inspiration.path}/${item.slug}`,
    }));
    // const articles = header!.pages.articles.map((item) => ({
    //   name: `${item.title} (Blog)`,
    //   link: `${routes.news.path}/${item.slug}`,
    // }));

    const inspirationSubPages = routes.inspiration.subPages.map((item) => ({
      name: `${item.title} (Inspiration)`,
      link: `${routes.inspiration.path}/${item.slug}`,
    }));
    const articlesSubPages = routes.news.subPages.map((item) => ({
      name: `${item.title} (Blog Sub Page)`,
      link: `${routes.news.path}/${item.slug}`,
    }));
    const videoCategoriesSubPages = routes.videos.subPages.map((item) => ({
      name: `${item.title} (Video Sub Page)`,
      link: `${routes.videos.path}/${item.slug}`,
    }));

    return [
      ...collections,
      ...projects,
      ...inspirationSubPages,
      ...articlesSubPages,
      ...videoCategoriesSubPages,
    ];
  };

  async function closeModal() {
    await new Promise((r) => setTimeout(r, 200));
    setIsOpen(false);
    setProducts([]);
    setPages([]);
  }

  function openModal() {
    setIsOpen(true);
  }

  const searchContent = useRef(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const iconOptions = {
    a: 'M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z',
    b: 'M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z',
  };

  const pageList: SearchItem[] = [];
  Object.keys(routes).forEach((key) => {
    const value = routes[key as keyof typeof routes] as {
      path: string;
      hidden?: boolean;
    };
    if (!value.hidden) {
      const name =
        key.charAt(0).toUpperCase() +
        key
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .slice(1);
      pageList.push({
        name: name,
        link: value.path,
      });
    }
  });
  pageList.push(...mapDynamicSearch());

  const [searchKeyword, setSearchKeyword] = useState(
    router.query.search as string
  );

  function countMatches(product: ProductSearchInfo, searchTerms: any[]) {
    let matchCount = 0;
    
    // Convert all values to lowercase for case-insensitive matching
    const title = product.node.title.toLowerCase();
    const tags = product.node.tags ? product.node.tags.map((tag: string) => tag.toLowerCase()) : [];
    const terms = searchTerms.map(term => term.toLowerCase());
    
    // Count matches in title
    terms.forEach(term => {
      if (title.includes(term)) matchCount++;
    });
    
    // Count matches in tags
    terms.forEach(term => {
      if (tags.some((tag: string | any[]) => tag.includes(term))) matchCount++;
    });
    
    return matchCount;
  }
  
  // Update the handleSearch function to sort by match count
  const handleSearch = debounce(async (input: string) => {
    setSearchKeyword(input);
    if (input.length == 0) {
      setProducts([]);
      setPages([]);
    }
  
    if (input.length > 2) {
      setLoading(true);
      const searchTerms = input.split(' ');
      let dynamic = '';
  
      // Build search query for title and tags
      searchTerms.map((item, index) => {
        item = toSingular(item);
        if (index == 0) {
          dynamic += `(title:${item}* OR tag:${item}*)`;
        } else {
          dynamic += ` ${
            item.length > 2 ? 'OR' : 'OR'
          } (title:${item}* OR tag:${item}*)`;
        }
      });
  
      // Add exclusions AND NOT tag:ATTACHMENTS (removed as per your latest version)
      const searchQuery = `${dynamic}  AND NOT tag:assembly AND NOT tag:weightstack AND NOT tag:add-ons`;
  
      const productResults = await searchProducts(NUM_SEARCH, searchQuery);
      
      // Sort products by the number of matches in title and tags
      const sortedProducts = [...productResults].sort((a, b) => {
        const matchesA = countMatches(a, searchTerms);
        const matchesB = countMatches(b, searchTerms);
        return matchesB - matchesA; // Descending order (more matches first)
      });
  
      setProducts(
        sortedProducts.map((item) => ({
          name: item.node.title,
          link: `${routes.products.path}/${item.node.handle}`,
          image:
            item.node.featuredImage != undefined
              ? item.node.featuredImage.url
              : imageNotFound,
          id: item.node.variants.edges[0].node.id,
          tags: item.node.tags,
          available: item.node.availableForSale,
          price: item.node.variants.edges[0].node.priceV2.amount,
          comparePrice:
            item.node.variants.edges[0].node.compareAtPriceV2?.amount,
          description: item.node.description,
          handle: item.node.handle,
          variants: item.node.variants.edges,
        }))
      );
  
      // Blog search - remains the same
      input = toSingular(input);
      const blogResults = await getSearchArticleStrapi(
        input.split(' ').length > 1 ? input.split(' ') : [input]
      );
      if (blogResults.length > 0) {
        blogResults
          .filter((c) => new Date(c?.date || '') < new Date())
          .map((item) => {
            pageList.push({
              name: item.title,
              link: `${routes.news.path}/${item.slug}`,
            });
          });
      }
  
      const regex = new RegExp(`${input}`, 'i');
      setPages(pageList.filter((item) => regex.test(item.name)));
      setLoading(false);
    }
  }, 500);
  useEffect(() => {
    console.log('search key', searchKeyword);
    if (router.query.search) {
      setLoading(true);
      handleSearch(router.query.search as string);
      searchInput.current!.value = router.query.search as string;
    }
  }, []);
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'WebSite',
              name: 'BodyKore',
              url: 'https://www.bodykore.com/',
              potentialAction: {
                '@type': 'SearchAction',
                target:
                  'https://www.bodykore.com/search?search=' + searchKeyword,
                'query-input': 'search=' + searchKeyword,
              },
            }),
          }}
        />
      </Head>
      <div className="px-6 text-center">
        {/* Dialog content */}

        <div
          className="bg-white overflow-auto xl:w-2/4 w-full max-h-full rounded m-auto mt-5"
          ref={searchContent}
        >
          <div className="max-w-6xl m-auto">
            {products.length > 0 && (
              <h3 className="text-center text-3xl font-bebas font-bold py-5">
                {products.length + (pages.length ? pages.length : 0)} results
                for "{searchKeyword}"
              </h3>
            )}
            {products.length == 0 && (
              <h3 className="text-center text-3xl font-bebas font-bold py-5">
                Search for products on our site
              </h3>
            )}
          </div>
          {/* Search form */}
          <form
            className=""
            onSubmit={(event) => {
              event.preventDefault();
              setSearchKeyword(searchKeyword);
              handleSearch(searchKeyword);
            }}
          >
            <div className="relative">
              <label htmlFor="modal-search" className="sr-only">
                Search
              </label>
              <input
                id="modal-search"
                className="form-control mb-4 block w-full h-12  px-3 py-1.5  text-base font-normal text-gray-700  bg-white bg-clip-padding border   rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none"
                type="search"
                placeholder={searchKeyword ? searchKeyword : 'Search Anything…'}
                ref={searchInput}
                onInput={(event) => {
                  setSearchKeyword(
                    event.currentTarget.value.trim().toLowerCase()
                  );
                  handleSearch(event.currentTarget.value.trim().toLowerCase());
                }}
              />
            </div>
          </form>
        </div>
      </div>
      {!loading && (
        <div className="mb-10">
          <main className="w-full flex flex-col md:flex-row justify-center max-w-7xl m-auto">
            <div
              className={`w-full md:w-41 ${
                pages.length === 0 ? 'hidden' : 'block'
              } order-1 md:order-2`}
            >
              {pages.length > 0 && (
                <div className="">
                  <h3 className="text-left px-5 text-3xl font-bebas font-bold py-5">
                    Pages
                  </h3>
                  <div className="px-4">
                    <SearchItems
                      title="Pages"
                      icon={iconOptions.a}
                      items={pages}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={`w-full md:w-61  order-2 md:order-1`}>
              {products.length == 0 && pages.length > 0 && (
                <div className="">
                  <h3 className="text-left px-5 text-3xl font-bebas font-bold lg:py-5 py-2">
                    Products
                  </h3>
                  <span className="font-bebas text-lg tracking-wide text-left px-5  lg:py-5 py-2 italic text-gray-600">
                    No products found
                  </span>
                </div>
              )}
              {products.length > 0 && (
                <div className="">
                  <h3 className="text-left px-5 text-3xl font-bebas font-bold lg:py-5 py-2">
                    Products
                  </h3>
                  {/* <SearchItems
                    title="Products"
                    icon={iconOptions.b}
                    items={products}
                  /> 
                  */}
                  {/* <span onClick={() => console.log('product', products)}>
                    check
                  </span> */}
                  <SellCards
                    title="Products"
                    gap="gap-4" //@ts-ignore
                    cards={products.map((p) => ({
                      id: p.id,
                      slug: p.handle,
                      bgImg: p.image,
                      title: p.name,
                      price: p.price,
                      comparePrice: p.comparePrice,
                      description: p.description,
                      available: p.available,
                      tags: p.tags,
                      variants: p.variants,
                    }))}
                  />
                </div>
              )}
              {products.length == 0 && pages.length == 0 && (
                <div className="font-bebas text-lg tracking-wide text-left px-5  lg:py-5 py-2 italic text-gray-600">
                  <div
                    role="status"
                    className="justify-center items-center flex"
                  >
                    No search results found
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center my-10">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

interface Item {
  name: string;
  link: string;
  image?: string;
  id?: string;
  tags?: string[];
  available?: boolean;
  price?: number;
  comparePrice?: number;
  description?: string;
  handle?: string;
  variants?: any;
}

interface SearchItemsParams {
  title: string;
  icon: string;
  items: Item[];
}

function SearchItems({ title, items }: SearchItemsParams) {
  const mapItems = () => {
    return items.map((item, index) => (
      <li className="w-full" key={index}>
        <div className="">
          {title == 'Products' ? (
            <ProductCard
              id={item.id!}
              slug={item.handle!}
              title={item.name}
              price={item.price! as unknown as string}
              available={item.available!}
              comparePrice={item.comparePrice! as unknown as string}
              description={item.description!}
              bgImg={item.image!}
              tags={item.tags!}
              variants={item.variants!}
            />
          ) : null}
          {title == 'Pages' && (
            <div className="grid grid-cols-12 items-center cursor-pointer hover:underline gap-x-3">
              <Image
                src={paperIcon}
                alt="icon"
                width={40}
                height={40}
                className="object-contain col-span-2"
              />
              <a href={item.link} className="col-span-10">
                <span className="font-bebas text-base tracking-wide">
                  {item.name}
                </span>
              </a>
            </div>
          )}
        </div>
      </li>
    ));
  };
  return (
    <div className="">
      <ul
        className={`${
          title == 'Products'
            ? 'grid lg:grid-cols-3 grid-cols-1 lg:pb-5 pb-5 px-6 gap-3'
            : ''
        } `}
      >
        {mapItems()}
      </ul>
    </div>
    //
  );
}
