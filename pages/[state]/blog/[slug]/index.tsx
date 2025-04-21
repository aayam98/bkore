import SingleArticle from '@components/ui/bodykore/Sections/Article';
import { dateFormat } from '@utils/date';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { HeaderData, getHeader } from '@utils/header';
import SeoHeader from '@components/seoHeader';
import {
  ArticleInfoStrapi,
  ArticleStrapi,
  getAllArticlesStrapi,
  getArticleStrapi,
} from 'services/strapi/article';

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;
  const article = await getArticleStrapi(slug as string);
  if (article === undefined) {
    return {
      notFound: true,
    };
  }

  const articles = await getAllArticlesStrapi(5);
  //@ts-ignore
  const relatedArticles = await getAllArticlesStrapi(4,article.attributes.article_category.data.attributes.slug,slug as string);
  const header = await getHeader();

  return {
    props: { article, articles, header,relatedArticles },
    // revalidate: 30 * 60,
  };
};

interface SingleBlogParams {
  article: ArticleStrapi;
  articles: ArticleInfoStrapi[];
  relatedArticles: ArticleInfoStrapi[];
  header: HeaderData;
}

const SingleBlog = ({ article, articles, header ,relatedArticles}: SingleBlogParams) => {

  // dynamically change seo title
  const dinamycSeo = () => {
    return {
      title: article.attributes.title,
      description: article.attributes.excert,
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

      {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
      

        <div className="px-10 lg:px-52 py-12">
          <SingleArticle
            topic={article.attributes.article_category.data.attributes.title}
            title={article.attributes.title}
            subTitle={article.attributes.subTitle}
            date={dateFormat(article.attributes.date)}
            readingTime={parseInt(article.attributes.readTime)}
            content={article.attributes.description}
            video={
              article.attributes.video.data
                ? article.attributes.video.data.attributes.url
                : undefined
  
            }
            article={article}
            articles={articles}
            relatedArticles={relatedArticles}
          />
        </div>
      </main>
      {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default SingleBlog;
