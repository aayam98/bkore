import Image from 'next/image';
import Link from 'next/link';

interface ImageProps {
  img: string;
  title?: string;
  description: string;
}

interface ImgDescriptionAmbsProps {
  images: ImageProps[];
  imgHeight: string;
  imgWidth: string;
  textSize?: string;
  link?: string;
}

export default function ImgDescriptionAmbs({
  images,
  imgHeight,
  imgWidth,
  textSize,
  link,
}: ImgDescriptionAmbsProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center">
          {images.map((img, i) => {
            // console.log(img)
            return (
              <div className="lg:w-72 w-full pb-5" key={i}>
                <div className="flex justify-center pb-5">
                  <Image
                    className={`w-full h-24 object-contain`}
                    src={img.img}
                    height={96}
                    width={288}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                    alt=""
                  />
                </div>
                <h2 className="lg:text-6xl text-4xl font-bebas font-bold italic text-gray-700 text-center">
                  {img.title}
                </h2>
                <div
                  className={`${textSize} font-roboto text-black-1c2023 text-center text-lg`}
                  dangerouslySetInnerHTML={{ __html: img.description }}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex pt-14">
          <Link target="_blank" rel="noreferrer" href={`${link}`}>
            <button
              className="w-48 lg:py-4 py-2 lg:px-10 px-3 font-roboto rounded-md font-normal lg:text-lg text-base text-white bg-red-bc2026 hover:bg-red-hover m-auto"
              style={{ letterSpacing: '2px' }}
            >
              Apply Now
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
