import { mediaUrl } from '@utils/baseUrls';
import Image from 'next/image';

interface ManualCardsParams {
  card: {
    image?: string;
    category?: string;
    title: string;
    file?: string;
  }[];
  placeHolder?: boolean
}

export default function ManualCards({ card,placeHolder = true }: ManualCardsParams) {
  return (
    <>
      <div className="max-w-6xl m-auto">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 lg:px-0 px-4">
          {/*Manual Cards*/}
          {card.map((c, i) => {
            return (
              <div key={i} className="pb-3">
                <div className="">
                  <div className={`border w-full`}>
                    {c.image ? (
                      <Image
                        src={c.image}
                        height={271}
                        width={271}
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
                      <h4 className="text-black-1c2023 font-roboto lg:text-base font-medium leading-normal text-lg py-2 capitalize">{`${c.title}`}</h4>
                    </div>

                    {placeHolder && <p className="text-black-1c2023 font-roboto text-sm lg:h-20 leading-normal pb-2">
                      {`Assembly instructions for the BodyKore ${c.title}`}.
                    </p>}
                    <a
                      href={mediaUrl + c.file}
                      target="_blank" rel="noreferrer"
                    >
                      <button className="w-full px-4 py-2 bg-grey-8C8C8C text-white hover:bg-red-bc2026 hover:text-white-f2f9fa border-2 border-grey-8C8C8C hover:border-red-bc2026 rounded-lg font-bebas transition">
                        <span className="text-sm font-roboto tracking-wide font-medium">
                          Download
                        </span>
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
