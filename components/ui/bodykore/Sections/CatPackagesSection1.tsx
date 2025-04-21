import Image from 'next/image';

interface ParagraphsProps {
  text: string;
}

interface CatPackagesSection1Props {
  title1?: string;
  title2?: string;
  paragraphs: ParagraphsProps[];
  description?: string;
  img?: string;
}

export default function CatPackagesSection1({
  title1,
  title2,
  paragraphs,
  description,
  img,
}: CatPackagesSection1Props) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="lg:w-3/5 w-full lg:pr-10 px-5">
            <div className="leading-none text-left">
              <span className="text-2xl lg:text-5xl text-red-bc2026 font-bebas font-bold italic text-left lg:leading-snug leading-10">
                <span className="text-black-373933 pr-2">{title1}</span>
                {title2}
              </span>
            </div>
            <div className="pt-2">
              {paragraphs.map((p, i) => {
                return (
                  <p
                    key={i}
                    className="text-black-373933 font-roboto py-3 text-left"
                  >
                    {p.text}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="lg:w-2/5 w-full lg:p-0 p-5">
            <Image
              src={img as string}
              alt=""
              placeholder="blur"
              width={444}
              height={434}
              blurDataURL="/loading.png"
            />
          </div>
        </div>
      </section>
    </>
  );
}
