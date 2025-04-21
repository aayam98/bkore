import { imageNotFound, mediaUrl } from '@utils/baseUrls';
import ReactPlayer from 'react-player';
import ImageBanner from '@components/ui/bodykore/Banners/ImageBanner';
import { ArticleStrapi } from 'services/strapi/article';
import Image from 'next/image';

interface SingleArticleProps {
  topic?: string;
  title: string;
  date: string;
  readingTime?: number;
  content: string;
  video: string | undefined;
  article: ArticleStrapi;
}

export default function SingleArticle({
  topic,
  title,
  date,
  readingTime,
  content,
  video,
  article,
}: SingleArticleProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="pb-3">
          <Image
            src={
              article.attributes.medias.data.length > 0
                ? mediaUrl + article.attributes.medias.data[0].attributes.url
                : imageNotFound
            }
            width={500}
            height={300}
            alt={title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            objectFit="cover"
            style={{
              borderRadius: '10px', //
            }}
          />
        </div>
        <div>
          <div className="text-center lg:text-left py-2 space-y-1">
            <h3 className="text-gray-700 font-bebas text-3xl tracking-wider font-bold italic">
              {title}
            </h3>

            {video != undefined && (
              <div className="grid gap-x-2 gap-y-2 md:grid-cols-1 sm:grid-cols-1 pb-10">
                <div className="col-span-1 flex justify-center">
                  <ReactPlayer
                    className="video_player_index"
                    url={mediaUrl + video}
                    loop={true}
                    controls={true}
                    width="w-full"
                    height="400px"
                    config={{
                      file: {
                        attributes: {
                          controlsList: 'nodownload',
                        },
                      },
                    }}
                    onPlay={() => {}}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-row items-center gap-x-2">
              <p className="text-gray-600 font-roboto font-medium text-base ">
                {topic}
              </p>
              <p className="text-gray-600 font-roboto font-medium text-base ">
                |
              </p>
              <p className="text-gray-600 font-roboto font-medium text-base ">
                {date}
              </p>
              <p className="text-gray-600 font-roboto font-medium text-base ">
                |
              </p>
              <p className="text-gray-600 font-roboto font-medium text-base ">
                {`${readingTime} min read`}
              </p>
            </div>
          </div>
          <div className="post">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </section>
      {/* <section className="max-w-7xl m-auto">
      <div className="pb-3">
      <ImageBanner
            height={'lg:h-CatBanner h-40'}
            bgImage={
              article.attributes.medias.data.length > 0
                ? mediaUrl + article.attributes.medias.data[0].attributes.url
                : imageNotFound
            }
          />
           </div>
        <div>
          <div className="text-center lg:text-left">
            <h5
              className="text-grey-8C8C8C font-bebas text-lg font-bold italic"
              style={{ letterSpacing: '0.5px' }}
            >
              {topic}
            </h5>
            <h1
              className="text-black-1c2023 font-bebas text-4xl font-bold italic py-2"
              style={{ letterSpacing: '0.5px' }}
            >
              {title}
            </h1>

            <div className="grid gap-x-2 gap-y-2 md:grid-cols-1 sm:grid-cols-1 pb-10">
            {video != undefined && (
              <div className="col-span-1 flex justify-center">
                <ReactPlayer
                  className="video_player_index"
                  url={mediaUrl + video}
                  loop={true}
                  controls={true}
                  width="w-full"
                  height="400px"
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload',
                      },
                    },
                  }}
                  onPlay={() => {}}
                />
              </div>
            )}
          </div>
            <div className="flex justify-center lg:justify-start pb-4">
              <span
                className="text-grey-8C8C8C font-roboto text-sm"
                style={{ letterSpacing: '0.5px' }}
              >
                {date}
              </span>
              <li
                className="text-grey-8C8C8C font-roboto text-sm pl-2 list-inside"
                style={{ letterSpacing: '0.5px' }}
              >
                {`${readingTime} min read`}
              </li>
            </div>
          </div>
          <div className="post">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </section> */}
    </>
  );
}
