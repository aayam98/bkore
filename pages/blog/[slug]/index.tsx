import SingleArticle from '@components/ui/bodykore/Sections/Article';
import { NUM_FEATURED } from '@config/siteConfig';
import { dateFormat } from '@utils/date';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../../../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import {
  ArticleInfoStrapi,
  ArticleStrapi,
  getAllArticlesStrapi,
  getArticleStrapi,
} from 'services/strapi/article';
import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import ReactPlayer from 'react-player';
import Head from 'next/head';

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
  const relatedArticles = await getAllArticlesStrapi(
    4,//@ts-ignore
    article.attributes.article_category.data.attributes.slug,
    slug as string
  );
  const header = await getHeader();

  return {
    props: { article, articles, header, relatedArticles },
  };
};

interface SingleBlogParams {
  article: ArticleStrapi;
  articles: ArticleInfoStrapi[];
  relatedArticles: ArticleInfoStrapi[];
  header: HeaderData;
}

const SingleBlog = ({
  article,
  articles,
  relatedArticles,
}: SingleBlogParams) => {
  // dynamically change seo title
  const dinamycSeo = () => {
    return {
      title: article.attributes.title,
      description: article.attributes.excert,
      noIndex: false,
      nofollow: false,
      Index: true,
      image: {
        url: `${
          mediaUrl +
          article?.attributes.medias.data.map((d) => d.attributes.url)
        }`,
      },
    };
  };


  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://www.bodykore.com/blog/'+article.attributes.slug,
              },
              headline: article.attributes.title,
              description: article.attributes.excert,
              image:
                mediaUrl + article.attributes.medias.data[0].attributes.url,
              author: {
                '@type': 'Organization',
                name: 'Bodykore',
                url: 'https://www.bodykore.com/',
              },
              publisher: {
                '@type': 'Organization',
                name: 'BodyKore',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.bodykore.com/_next/image?url=%2Fheader%2Flogowhitered.png&w=640&q=75',
                },
              },
              datePublished: article.attributes.date,
            }),
          }}
        />
      </Head>

      <SeoHeader seo={dinamycSeo()} />

      {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
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
      </main>
      {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default SingleBlog;
