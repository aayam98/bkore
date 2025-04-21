import { mediaUrl } from '@utils/baseUrls';
import ReactPlayer from 'react-player';
import { Subcategory } from 'services/strapi';

interface OptionProps {
  icon?: string;
  text?: string;
}

interface FadingForCategoriesProps {
  title?: string;
  data?: Subcategory;
}

export default function FadingForCategories({
  title,
  data,
}: FadingForCategoriesProps) {
  return (
    <>
      {/* bg ma if image cha bhane image or else black color #000 */}
      <div
        className="w-full bg-black"
        style={{
          width: '100%',
          height: '700px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="opacity-60">
          {data?.attributes.bannerImage.data &&
            data?.attributes.bannerImage.data.attributes.mime.split('/')[0] ==
              'image' && (
              <img
                src={
                  data?.attributes.bannerImage.data
                    ? mediaUrl +
                      data?.attributes.bannerImage.data.attributes.url
                    : '/Blog/coverImage.jpg'
                }
                alt="BodyKore"
                className="w-full h-full object-cover absolute"
              />
            )}
          {data?.attributes.bannerImage.data &&
            data?.attributes.bannerImage.data.attributes.mime.split('/')[0] ==
              'video' && (
              <ReactPlayer
                className="absolute object-cover w-full videBox"
                url={
                  mediaUrl + data?.attributes.bannerImage.data.attributes.url
                }
                loop={true}
                muted={true}
                playing={true}
                controls={false}
                width="100%"
                height="100%"
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      disablePictureInPicture: true,
                    },
                  },
                }}
                onPlay={() => {}}
              />
            )}
        </div>
        <div className="max-w-8xl m-auto grid grid-cols-1 items-center lg:px-7 px-5">
          <div className="space-y-2 pt-24 lg:pb-24 pb-20 relative z-50 items-center align-middle justify-center">
            <h2 className="font-bebas lg:text-7xl text-5xl tracking-wide font-bold italic text-red-bc2026 w-full leading-none">
              {title?.replaceAll('-', ' ')}
            </h2>
            {!data?.attributes.bannerDescription && (
              <p className="text-white font-roboto lg:text-lg text-base w-1/3 lg:pb-12 pb-0">
                Experience the ultimate in durability with BodyKore’s
                plate-loaded machines, designed for heavy commercial use.
                Crafted with precision from laser-cut frames, our robust
                equipment supports a higher weight capacity, making it ideal for
                advanced lifters yet accessible for beginners.
              </p>
            )}
            {data?.attributes.bannerDescription && (
              <div
                className="text-white font-roboto text-lg lg:w-1/3 pb-12"
                dangerouslySetInnerHTML={{
                  __html: data.attributes.bannerDescription,
                }}
              />
            )}
            <a
              className="text-white font-roboto font-medium tracking-wider border border-white px-11 py-4 rounded-full hover:bg-white hover:text-gray-900"
              href="#productsec"
            >
              View all {title?.replaceAll('-', ' ')}{' '}
            </a>
          </div>
          <a className="pb-5" href="#belowfold">
            <img
              src="/svg/reviewArrowdown.svg"
              alt="BodyKore"
              className="cursor-pointer lg:h-16 h-11 translate-y-full animate-bounce"
            />
          </a>
        </div>
      </div>

      <div className="bg-white" id="belowfold">
        <div className="max-w-8xl m-auto grid lg:grid-cols-2 grid-cols-1 items-center lg:px-7 px-5 pt-8 pb-10">
          <div className="space-y-2 w-full lg:pb-0 pb-10">
            {data?.attributes.infoTitle && (
              <div
                className="font-bebas lg:text-5xl text-4xl tracking-wide font-bold italic text-red-bc2026 leading-none lg:w-5/6 w-full"
                dangerouslySetInnerHTML={{ __html: data.attributes.infoTitle }}
              />
            )}
            {data?.attributes.infoDescription && (
              <div
                className="text-gray-600 font-roboto text-base lg:w-4/6 w-full lg:pb-12 pb-10"
                dangerouslySetInnerHTML={{
                  __html: data.attributes.infoDescription,
                }}
              />
            )}
            {!data?.attributes.infoTitle && (
              <>
                <h2 className="font-bebas text-5xl tracking-wide font-bold italic text-red-bc2026 leading-none w-5/6">
                  Engineered for Strength, Designed for Durability
                </h2>
                <p className="text-gray-600 font-roboto text-base w-4/6 pb-12">
                  BodyKore’s Plate-Loaded series sets the standard in strength
                  training equipment worldwide. We have relentlessly refined our
                  machines to complement the human body’s movements, maximizing
                  the effectiveness of every workout. Choosing BodyKore
                  Plate-Loaded signifies more than a preference—it signifies a
                  dedication to surpassing ordinary limits.
                </p>
              </>
            )}

            <a
              className="text-white bg-red-bc2026 font-roboto font-medium tracking-wider border border-white px-11 py-4 rounded-full hover:bg-white hover:border-red-bc2026 hover:text-red-bc2026 "
              href="#productsec"
            >
              View {title?.replaceAll('-', ' ')} Equipment
            </a>
          </div>

          <img
            src={
              data?.attributes.infoImage.data
                ? mediaUrl + data?.attributes.infoImage.data.attributes.url
                : 'https://cms.bodykore.com/uploads/plateloaded_6ebd969a99.jpg'
            }
            alt="BodyKore"
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}
