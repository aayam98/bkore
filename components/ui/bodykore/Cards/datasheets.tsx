import Image from 'next/image';

interface ManualCardsParams {
  card: {
    image?: string;
    category?: string;
    title: string;
    ref: string;
    file?: string;
  }[];
}
export default function ManualCards({ card }: ManualCardsParams) {
  return (
    <>
      <div className="max-w-6xl m-auto">
        <div className="grid lg:grid-cols-4 grid-cols-2 justify-start items-start align-middle lg:gap-3 px-2">
          {/*Manual Cards*/}
          {card.map((c, i) => {
            return (
              <div key={i} className="p-2">
                <div className="bg-white">
                  <div
                    className={`flex justify-between bg-no-repeat bg-center border-2 border-grey`}
                  >
                    {c.image ? (
                      <Image
                        src={c.image}
                        height={194}
                        width={255}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                        objectFit="contain"
                        alt=""
                      />
                    ) : null}
                  </div>
                  <div className="px-1 flex flex-wrap items-start align-top justify-start">
                    <div>
                      <h4 className="text-black-1c2023 font-roboto lg:text-base font-medium leading-normal text-base py-2 capitalize">{`${c.title}`}</h4>
                    </div>

                    <p className="text-black-1c2023 font-roboto text-sm lg:h-20 leading-normal pb-2">
                      {`Technical Datasheets for Bodykore ${c.title}`}.
                    </p>
                    <a href={c.file} target="_blank" rel="noreferrer" download>
                      <button className="px-4 py-2 bg-grey-8C8C8C text-white hover:bg-red-bc2026 hover:text-white-f2f9fa border-2 border-grey-8C8C8C hover:border-red-bc2026 rounded-lg font-bebas transition">
                        <span className="text-sm font-roboto tracking-wide font-medium">
                          Download Datasheet
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
