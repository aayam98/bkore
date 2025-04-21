import React, { useEffect, useState } from 'react';
import MainBanner from '@components/ui/bodykore/Banners/MainBanner';
import NavOptions from '@components/ui/bodykore/NavOptions/NavOptions';
import BlogCards from '@components/ui/bodykore/Cards/BlogCards';
import Blacktitle from '@components/ui/bodykore/Text/Titles/Blacktitle';
import Pagination from '@components/ui/bodykore/Pagination';
import { GetServerSideProps } from 'next';
import { dateFormat } from 'utils/date';
import { NUM_ARTICLES } from '@config/siteConfig';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  ArticleCategoryStrapi,
  ArticleInfoStrapi,
  getAllArticlesStrapi,
  getArticleCategoriesStrapi,
} from 'services/strapi/article';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articles = await getAllArticlesStrapi(1000);
  const categories = await getArticleCategoriesStrapi();
  const header = await getHeader();
  console.log(context.query)
  const params = context.query.category ? context.query.category as string : '';
  return {
    props: {
      articles,
      categories,
      header,
      params
    },
    // revalidate: 30 * 60,
  };
};

interface BlogParams {
  articles: ArticleInfoStrapi[];
  categories: ArticleCategoryStrapi[];
  header: HeaderData;
  params: string
}

const Blog = ({ articles, categories, header ,params}: BlogParams) => {


  const [filter, setFilter] = useState({
    page: 1,
    category: params,
  });
  const [maxArticles, setMaxArticles] = useState(
    Math.ceil(articles.length / NUM_ARTICLES)
  );
  const [articlesShow, setArticlesShow] = useState(articles);
  const [sort, setSort] = useState("true");

  useEffect(() => {
    const { page, category } = filter;
    let displayedArticles: ArticleInfoStrapi[] = articles;
    if (category !== '') {
      displayedArticles = articles.filter(
        (item) =>
          item.attributes.article_category.data.attributes?.slug === category
      );
    }
    setArticlesShow(
      displayedArticles.slice((page - 1) * NUM_ARTICLES, page * NUM_ARTICLES)
    );
    setMaxArticles(Math.ceil(displayedArticles.length / NUM_ARTICLES));
  }, [filter]);

  const mapCategories = () => {
    return categories.map((item) => ({
      text: item.attributes.title,
      id: item.attributes.slug,
      subTitle : item.attributes.subTitle
    }));
  };

  const mapArticles = () => {
    let news: any[] = [];
    let newsEdu: any[] = [];
    for (let item of articlesShow) {
      news.push({
        img:
          item.attributes.medias.data.length > 0
            ? mediaUrl + item.attributes.medias.data[0].attributes.url
            : imageNotFound,
        topic: item.attributes.article_category.data.attributes?.title,
        date: dateFormat(item.attributes.date),
        title: item.attributes.title,
        description: item.attributes.excert,
        slug: item.attributes.slug,
        nofollow:item.attributes.nofollow
      });
    }
    return [...news, ...newsEdu];
  };

  const oldMapArticles = () => {
    let news: any[] = [];
    let newsEdu: any[] = [];
    for (let item of articlesShow) {
      news.unshift({
        img:
          item.attributes.medias.data.length > 0
            ? mediaUrl + item.attributes.medias.data[0].attributes.url
            : imageNotFound,
        topic: item.attributes.article_category.data.attributes?.title,
        date: dateFormat(item.attributes.date),
        title: item.attributes.title,
        description: item.attributes.excert,
        slug: item.attributes.slug,
        nofollow:item.attributes.nofollow
      });
    }
    return [...news, ...newsEdu];
  };

  const [titlePage,setTitlePage] = useState({
    title:"BODYKORE BEAT",
    subTitle:"Keep your pulse on the latest trends in fitness, wellness and nutrition. Get inspired by BodyKore athletes, customers and fitness pros. Plus, be the first to hear our latest news, including product releases, promotions and special events."
  })

  return (
    <>
      <SeoHeader seo={seo.blog} />
      <main className="w-full bg-gray-200">
        <MainBanner
          title={titlePage.title}
          description={titlePage.subTitle}
          bgImage={'/Blog/coverImage.jpg'}
        />

        <div
          id="belowBanner"
          className="max-w-7xl m-auto grid grid-cols-12 items-center lg:pt-5 lg:pb-0 pt-5 pb-5 lg:px-0 px-3"
        >
          <div className="lg:col-span-9 col-span-12">
            {/* <Blacktitle
              title={'LATEST ARTICLES'}
              textSize={'text-5xl'}
              textColor="text-black-373933"
            /> */}
            <NavOptions
              title1={'ALL Topics'}
              titles={mapCategories().reverse()}
              type={filter.category}
              setter={setFilter}
              setTitlePage={setTitlePage}
            />
          </div>

          <div className="lg:col-span-3 col-span-12">
            <div className='flex items-center md:justify-end justify-start md:mt-0 mt-4'>
              <span className='w-16 font-bebas uppercase text-lg italic font-bold tracking-wider text-gray-600'> Sort By:</span>
              <select name="" id="" className='w-2/3 border border-gray-400 p-2 rounded-md bg-gray-100' onChange={(e) => setSort(e.target.value)}>
                <option value="true">Newest To Oldest</option>
                <option value="false">Oldest To Newest</option>
              </select>
            </div>
          </div>
        </div>

        {sort === "true" && <BlogCards card={mapArticles()} />}
        {sort === "false" && <BlogCards card={oldMapArticles()} />}

        <Pagination
          current={filter.page}
          setter={setFilter}
          max={maxArticles}
        />
      </main>
    </>
  );
};

export default Blog;
