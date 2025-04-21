import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import {
  GetAllProductsResponse,
  getAllProductsSiteMap,
} from 'services/shopify/storefront';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const products1 = await getAllProductsSiteMap(250);
  const products2 =
    products1.edges.length - 1 &&
    (await getAllProductsSiteMap(
      250,
      products1.edges[products1.edges.length - 1].cursor
    ));
  const products3 =
    products2 &&
    products2.edges.length > 0 &&
    (await getAllProductsSiteMap(
      250,
      products2.edges[products2.edges.length - 1].cursor
    ));
  const products4 =
    products3 &&
    products3.edges.length > 0 &&
    (await getAllProductsSiteMap(
      250,
      products3.edges[products3.edges.length - 1].cursor
    ));
  const products5 =
    products4 &&
    products4.edges.length > 0 &&
    (await getAllProductsSiteMap(
      250,
      products4.edges[products4.edges.length - 1].cursor
    ));

  return {
    props: {
      header,
      products1,
      products2,
      products3,
      products4,
      products5,
    },
  };
};

interface ReturnPolicyPageParams {
  header: HeaderData;
  products1: GetAllProductsResponse;
  products2: GetAllProductsResponse;
  products3: GetAllProductsResponse;
  products4: GetAllProductsResponse;
  products5: GetAllProductsResponse;
}

const Sitemap = ({
  header,
  products1,
  products2,
  products3,
  products4,
  products5,
}: ReturnPolicyPageParams) => {
  const [proudcts, setProducts] = useState<
    { id: String; title: String; handle: String }[]
  >([]);

  useEffect(() => {
    if (products1.edges.length > 0) {
      setProducts([...products1.edges.map((product) => product.node)]);
    }
    if (products2 && products2.edges.length > 0) {
      setProducts((prev) => [
        ...prev,
        ...products2.edges.map((product) => product.node),
      ]);
    }
    if (products3 && products3.edges.length > 0) {
      setProducts((prev) => [
        ...prev,
        ...products3.edges.map((product) => product.node),
      ]);
    }
    if (products4 && products4.edges.length > 0) {
      setProducts((prev) => [
        ...prev,
        ...products4.edges.map((product) => product.node),
      ]);
    }
    if (products5 && products5.edges.length > 0) {
      setProducts((prev) => [
        ...prev,
        ...products5.edges.map((product) => product.node),
      ]);
    }
  }, [products1, products2, products3, products4, products5]);

  return (
    <>
      {/* <SeoHeader seo={seo.return_policy} /> */}
      <main className="w-full">
        <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic bg-manuals-image bg-no-repeat w-full bg-center bg-cover lg:h-96 h-52">
          <div className="bg-gradient-to-r from-black via-black to-transparent lg:h-96 h-52 py-5 w-full flex items-center justify-center">
            <h3 className="text-white">Sitemap</h3>
          </div>
        </div>
        <div className="max-w-6xl m-auto py-5 px-5 sitemapbullets">
          <div className="">
            <h4 className="font-bebas italic font-semibold text-2xl tracking-wide py-2">
              Pages
            </h4>
            <ul className="">
              <li className="hover:underline hover:text-red-hover">
                <a href="/product">Shop</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/aboutus">#WeAreBodyKore</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/blog">News</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/our-portfolio">Videos</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/portfolio">Inspiration</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/storeLocator">Dealer Location</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/contact">Contact</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/reviews">Reviews</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/product-manuals">Manuals</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/datasheets">Technical Datasheets</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/technology">Performance Technology</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/finance">Financing</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/warranty">Warranty</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/terms-of-use">Return Policy</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/spareParts">Spare Parts</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="https://cms.bodykore.com/uploads/Body_Kore_Catalog_2025_78c9d8c010.pdf">
                  Equipment Catalog
                </a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/PDFs/Product-Catalog.pdf">Product Catalog</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/PDFs/Home-Gyms-Catalog.pdf">Home Gym Catalog</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/PDFs/Linx_Rack_Catalog.pdf">Linx Rack Catalog</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="font-bebas italic font-semibold text-2xl tracking-wide py-2">
              Categories
            </h4>
            <ul className="font-roboto text-base">
              <li className="hover:underline hover:text-red-hover">
                <a href="/product?category=Machines">Machines</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/product?category=Benches">Benches</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/product?category=Weights">Weights</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/product?category=Functional%20Training">
                  Functional Training
                </a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/product?category=Accessories">Accessories</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/product?category=Smart%20Sled">Smart Sled</a>
              </li>
              <li className="hover:underline hover:text-red-hover">
                <a href="/product?category=Packages">Packages</a>
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="font-bebas italic font-semibold text-2xl tracking-wide py-2">
              Products
            </h4>
            <ul className="font-roboto text-base">
              {proudcts.map((ele, index) => (
                <li className="hover:underline hover:text-red-hover" key={index}>
                  <a href={"/product/" + ele.handle}>
                    {ele.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sitemap;
