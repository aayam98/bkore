import Image from 'next/image';

interface TextRImgProps {
  title?: string;
  description?: string;
  img?: string;
}

export default function TextRImg({ title, description, img }: TextRImgProps) {
  return (
    <>
      <div className="max-w-6xl m-auto py-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 lg:px-0 px-4">
          <div>
            <h3 className="text-black-373933 lg:text-5xl text-2xl font-bebas font-bold italic tracking-wide">
              {title}
            </h3>

            <div
              className="font-roboto text-base text-left text-gray-600 lg:px-0 lg:leading-7 pb-2 dangeriousstyle"
              dangerouslySetInnerHTML={{ __html: description || '' }}
            ></div>
          </div>
          <div>
            <Image
              src={img as string}
              alt=""
              width={570}
              height={351}
              placeholder="blur"
              blurDataURL="/loading.png"
              objectFit='cover'
            />
          </div>
        </div>
      </div>
    </>
  );
}
