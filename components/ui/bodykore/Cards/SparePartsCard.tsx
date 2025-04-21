import { mediaUrl } from '@utils/baseUrls';
import Image from 'next/image';
interface SparePartsCardParams {
  card: {
    image?: string;
    category?: string;
    title: string;
    file?: string;
  }[];
}
export default function SparePartsCard({ card }: SparePartsCardParams) {
  return (
    <>
      <div className="max-w-6xl m-auto">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 lg:px-0 px-4">
          {/*Manual Cards*/}
          {card.map((c, i) => {
            return (
              <div key={i} className="">
                <div className="">
                  <div className={`border w-full`}>
                    {c.image ? (
                      <Image
                        src={c.image}
                        height={300}
                        width={300}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                        objectFit="contain"
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div className="px-1">
                    <p className="text-grey-848484 font-roboto text-sm pt-2">
                      {c.category}
                    </p>

                    <div>
                      <h3
                        className="text-black-1c2023 font-bebas text-xl font-medium italic pr-2 h-16"
                        style={{ letterSpacing: '1px' }}
                      >{`${c.title}`}</h3>
                    </div>

                    <p className="text-black-1c2023 font-roboto text-sm pb-2 h-20">
                      {`Spare Parts for BodyKore ${c.title}`}.
                    </p>
                    <a
                      href={mediaUrl + c.file}
                      target="_blank" rel="noreferrer"
                    >
                      <button
                        className="px-4 py-3 bg-transparent text-black-373933 hover:bg-red-bc2026 hover:text-white-f2f9fa border border-black-373933 hover:border-red-bc2026 rounded-lg font-bebas"
                        style={{ letterSpacing: '1.5px' }}
                      >
                        <span className="mr-2">DOWNLOAD explosion diagram</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
