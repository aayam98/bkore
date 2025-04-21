import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import { ArticleInfoStrapi, ArticleStrapi } from 'services/strapi/article';
import Image from 'next/image';
import Link from 'next/link';
import SubscriptionBlog from '../Index/SubscriptionBlog';
import SubscriptionBlogSide from '../Index/SubscriptionBlogSide';
import { ChevronRight } from '@components/icons';
import routes from '@config/routes';

interface SingleArticleProps {
  topic?: string;
  title: string;
  subTitle: string;
  date: string;
  readingTime?: number;
  content: string;
  video: string | undefined;
  article: ArticleStrapi;
  articles: ArticleInfoStrapi[];
  relatedArticles: ArticleInfoStrapi[];
}

export default function SingleArticle({
  title,
  subTitle,
  date,
  readingTime,
  content,
  article,
  articles,
  relatedArticles
}: SingleArticleProps) {

  function cleanHtml(html: string) {
    // Remove consecutive <br> tags
    return html.replace(/(<br\s*\/?>\s*){1,}/g, "<p style='padding: 5px 0;margin:0'></p>");
  }
  return (
    <>
      <section className="blogstyle">
        <div className="bg-gray-800 w-full">
          <div className="grid lg:grid-cols-2 grid-cols-1 items-center">
            <Image
              src={
                article.attributes.medias.data.length > 0
                  ? mediaUrl + article.attributes.medias.data[0].attributes.url
                  : imageNotFound
              }
              width={500}
              height={350}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
              objectFit="cover"
              style={{}}
            />
            <div className="grid grid-cols-1 gap-2 lg:p-36 p-6">
              <div className="flex flex-row items-center gap-x-2 text-white font-roboto text-sm tracking-wide">
                <p className=""><a href='/'>Home</a></p>
                <p className=""> <ChevronRight /> </p>
                <p className=""><a href='/blog'>Blog + News</a></p>
                <p className=""> <ChevronRight /> </p>
                <p className=""><a href={`/blog?category=${article.attributes.article_category.data.attributes.slug}`}>{article.attributes.article_category.data.attributes.title}</a></p>
              </div>
              <h3 className="text-white font-bebas lg:text-4xl text-xl lg:tracking-wider tracking-widest font-bold italic leading-9">
                {title}
              </h3>
              <p className="text-white font-roboto text-sm tracking-wide">
                {subTitle}
              </p>
              <div className="flex flex-row items-center gap-x-2 text-white font-roboto text-sm tracking-wide">
                <p className="">{date}</p>
                <p className="">|</p>
                <p className="">{`${readingTime} min. read`}</p>
              </div>
              {/* <div className="flex flex-row items-center align-middle gap-x-2 text-white font-roboto text-sm font-normal tracking-wide">
                <p className="m-0">Share</p>
                <Link href={'https://www.facebook.com/BodyKore/'}>
                  <Image
                    src="/svg/facebook-footer.svg"
                    alt=""
                    className="cursor-pointer"
                    width={25}
                    height={25}
                  />
                </Link>
                <Link href={'https://twitter.com/bodykore'}>
                  <Image
                    src="/svg/twitter-footer.svg"
                    alt=""
                    className="cursor-pointer"
                    width={25}
                    height={25}
                  />
                </Link>
                <Link
                  href={'https://www.instagram.com/bodykore/'}
                  target="_blank" rel="noreferrer"
                >
                  <Image
                    src="/svg/instagram-footer.svg"
                    alt=""
                    className="cursor-pointer"
                    width={25}
                    height={25}
                  />
                </Link>

                <Link href={'https://www.youtube.com/user/BodyKore'}>
                  <Image
                    src="/svg/youtube-footer.svg"
                    alt=""
                    className="cursor-pointer"
                    width={28}
                    height={28}
                  />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        <div className="max-w-6xl m-auto">
          <div className="grid grid-cols-12 lg:gap-10 pt-7">
            <div className="lg:col-span-8 col-span-12 p-5">
              <div className="post blogdescription">
                <div dangerouslySetInnerHTML={{ __html: cleanHtml(content) }}></div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:p-0 p-5">
              <div>
                <h6 className="text-red-bc2026 font-bebas text-3xl tracking-wider font-semibold pb-2">
                  Trending Now
                </h6>
                {articles.map((item, index) => <a
                  key={index}
                  href={`${routes.news.path}/${item.attributes.slug}`}
                  className="cursor-pointer w-full"
                ><div className="grid grid-cols-12 gap-x-3 gap-2 mb-3" key={index}>

                    <div className="col-span-6">
                      <Image
                        src={
                          item.attributes.medias.data.length > 0
                            ? mediaUrl + item.attributes.medias.data[0].attributes.url
                            : imageNotFound
                        }
                        width={500}
                        height={300}
                        alt={item.attributes.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        objectFit="cover"
                        style={{}}
                      />
                    </div>
                    <div className="col-span-6">
                      <h3 className="text-gray-600 font-bebas text-lg tracking-wider font-semibold italic hover:text-red-hover">
                        {item.attributes.title}
                      </h3>
                    </div>

                  </div></a>)}
              </div>
              <div className='pt-5'>
               
              <SubscriptionBlogSide buttonColor='bg-black' textColor='text-gray-600' />
              </div>
            </div>
          </div>
          <div className="pt-10 pb-16 lg:p-0 p-5">
            <h6 className="text-red-bc2026 font-bebas text-3xl tracking-wider font-semibold pb-2">
              Related Articles
            </h6>
            <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-3 gap-y-3 pb-10">
              {relatedArticles.map((item, index) => <div key={index}>
                <a
                  href={`${routes.news.path}/${item.attributes.slug}`}
                  className="cursor-pointer"
                >
                  <Image
                    src={
                      item.attributes.medias.data.length > 0
                        ? mediaUrl + item.attributes.medias.data[0].attributes.url
                        : imageNotFound
                    }
                    width={500}
                    height={300}
                    alt={title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    objectFit="cover"
                    style={{}}
                  />

                  <h3 className="text-gray-600 font-bebas text-lg tracking-wider font-semibold italic pt-2 hover:text-red-hover">
                    {item.attributes.title}
                  </h3>
                </a>
              </div>)}
            </div>
          </div>
        </div>
      </section>
      <SubscriptionBlog />
    </>
  );
}
