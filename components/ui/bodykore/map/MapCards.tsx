/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';

export interface CardsProps {
  title: string;
  phone: string;
  email: string;
  website: string;
  direction: string;
  distance?: number;
  latitude: number;
  longitude: number;
  zipCode?: string;
}
interface MapCardsProps {
  cards: CardsProps[];
  defaultLocation: CardsProps;
  setter: (latitude: number, longitude: number) => void;
}

export default function MapCards({
  cards,
  setter,
  defaultLocation,
}: MapCardsProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        {cards.map((c, i) => {
          return c.distance && c.distance <= 300 ? (
            <div className="py-3" key={i}>
              <div className="flex flex-wrap">
                <div className="w-4/6">
                  <h3 className="text-black-373933 text-2xl font-bebas italic">
                    {c.title}
                  </h3>
                  <a href={`tel:${c.phone}`}>
                    <h5 className="text-black-373933 text-lg font-bebas flex gap-2 tracking-wider cursor-pointer">
                      <Image
                        src="/svg/phone.svg"
                        width={18}
                        height={18}
                        alt=""
                      />
                      {c.phone}
                    </h5>
                  </a>
                  <a href={`//${c.website}`} target="_blank" rel="noreferrer">
                    <h5 className="text-black-373933 text-lg font-bebas flex gap-2 tracking-wider cursor-pointer">
                      <Image
                        src="/svg/website.svg"
                        width={18}
                        height={18}
                        alt=""
                      />
                      {c.website}
                    </h5>
                  </a>

                  <h5 className="text-black-373933 text-lg font-bebas flex gap-2 tracking-wide">
                    <Image
                      src="/svg/location.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    {c.direction}
                  </h5>
                </div>
                <div className="w-2/6 justify-end">
                  <button
                    type="button"
                    className="flex items-center gap-2 p-4 border border-red-bc2026 text-red-bc2026 font-medium text-sm leading-tight rounded "
                    onClick={() => {
                      setter(c.latitude, c.longitude);
                    }}
                  >
                    <Image
                      src="/svg/btnMarker.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                    Direction (
                    {c.distance !== undefined
                      ? c.distance?.toFixed(1) + ' mi'
                      : null}
                    )
                  </button>
                </div>
              </div>
            </div>
          ) : (
            i == 0 && (
              <div>
                <h2
                  key={i}
                  className="text-black-373933 text-md font-bebas italic text-left tracking-wide pr-12"
                >
                  Sorry we currently do not have any dealers in your area.
                  please contact our headquarters and we can check on shipping
                  directly to you. {c.zipCode}
                </h2>

                <div className="py-3" key={i}>
                  <div className="flex flex-row">
                    <div className="w-4/6">
                      <h3 className="text-black-373933 text-2xl font-bebas italic">
                        {defaultLocation.title}
                      </h3>
                      <a href={`tel:${c.phone}`}>
                        <h5 className="text-black-373933 text-lg font-bebas flex gap-2 tracking-wider cursor-pointer">
                          <Image
                            src="/svg/phone.svg"
                            width={18}
                            height={18}
                            alt=""
                          />
                          {defaultLocation.phone}
                        </h5>
                      </a>
                      <a
                        href={`//${c.website}`}
                        target="_blank" rel="noreferrer"
          
                      >
                        <h5 className="text-black-373933 text-lg font-bebas flex gap-2 tracking-wider cursor-pointer">
                          <Image
                            src="/svg/website.svg"
                            width={18}
                            height={18}
                            alt=""
                          />
                          {defaultLocation.website}
                        </h5>
                      </a>

                      <h5 className="text-black-373933 text-lg font-bebas flex gap-2 tracking-wide">
                        <Image
                          src="/svg/location.svg"
                          width={18}
                          height={18}
                          alt=""
                        />
                        {defaultLocation.direction}
                      </h5>
                    </div>
                    <div className="w-2/6 justify-end">
                      <button
                        type="button"
                        className="flex items-center gap-2 p-4 border border-red-bc2026 text-red-bc2026 font-medium text-sm leading-tight rounded "
                        onClick={() => {
                          setter(
                            defaultLocation.latitude,
                            defaultLocation.longitude
                          );
                        }}
                      >
                        <Image
                          src="/svg/btnMarker.svg"
                          alt=""
                          width={18}
                          height={18}
                        />
                        Direction (
                        {defaultLocation.distance !== undefined
                          ? defaultLocation.distance?.toFixed(1) + ' mi'
                          : null}
                        )
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </section>
    </>
  );
}
