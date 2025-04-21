import { XIcon } from '@heroicons/react/solid';
import zIndex from '@material-ui/core/styles/zIndex';
import Image from 'next/image';
import { useState } from 'react';

interface OurteamProps {
  title1: string;
  title2: string;
  title3: string;
  img: string;
}

export default function Ourteam({ title1, title2, img }: OurteamProps) {
  const [popImage, setPopImage] = useState(false);
  const [selected, setSelected] = useState<OurteamProps>();

  const togglePopImage = () => {
    if (popImage) {
      return setPopImage(false);
    }
    if (!popImage) {
      return setPopImage(true);
    }
  };

  return (
    <>
      {popImage && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-red-hover"
          style={{ zIndex: 999999, backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="bg-gray-200 lg:w-1/2 w-96 lg:h-auto h-1/2 lg:overflow-hidden lg:mx-0 mx-3 overflow-scroll m-auto px-6 pt-5 pb-5 rounded-md">
            <span
              className="text-gray-600 cursor-pointer flex justify-end"
              onClick={togglePopImage}
            >
              <XIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
            </span>
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-12 gap-3 pb-4 items-start">
                <div className="col-span-12 flex flex-row gap-5">
                  <Image
                    src={selected?.img as string}
                    className="h-opt5top object-cover w-full rounded-lg "
                    width={200}
                    height={200}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />
                  <div className='leading-7 pt-2'>
                  <h5 className="text-gray-700 font-bebas text-4xl italic font-semibold">
                    {selected?.title1}
                  </h5>
                  <p className="text-gray-700 font-bebas text-xl italic">
                    {selected?.title2}
                  </p>
                  </div>
                </div>
                <div className="col-span-12">
                 
                  <p
                    className="text-gray-600 font-roboto text-base"
                    dangerouslySetInnerHTML={{ __html: selected?.title3! }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="max-w-7xl m-auto px-5 md:px-0">
        <div className="flex flex-wrap justify-center m-auto">
          <div className="">
            <div className="flex justify-center lg:justify-center font-bebas italic font-bold text-5xl pb-6">
              <h3 className="text-black-373933 text-3xl lg:text-5xl pr-2 tracking-wider">
                {title1}
              </h3>
              <h3 className="text-red-bc2026  text-3xl lg:text-5xl tracking-wider">
                {title2}
              </h3>
            </div>
          </div>
        </div>
        <div className="grid gap-x-2 gap-y-2 md:grid-cols-4 sm:grid-cols-1 pb-10">
          <div
            className="bg-black "
            onClick={() => {
              togglePopImage();
              setSelected({
                img: '/team/leo.jpeg',
                title1: 'Leo Chang',
                title2: 'CEO',
                title3: `Leo Chang has over 20 years of experience in the fitness industry.  While in college, he started at 24 Hour Fitness as a sales representative for the club. Shortly after graduating, Leo took on a position for a fitness equipment company and developed their ecommerce store and had a role in new product development. After a few years in the business Leo co-founded BodyKore in 2005, which started as a gym solutions and ecommerce business. After 5 years with the business, he was offered a position in Shanghai, China where the fitness industry was beginning to boom. There he worked for GCH (Greater China Hospitality Group) which has built and managed over 100 Five Star Hotels and luxury properties across mainland China. GCH operates the brands Wyndham Grand Plaza Royale and Howard Johnson Hotels through all of Greater China. <br/>
                His role there was to develop the health and wellness facilities and programs for the hotels and properties. While in China he established Qujian Sporting Goods Ltd, an international trade company, and furthered his role as an industry specialist by providing consultation services for equipment manufacturers and fitness brands overseas. Also, while still in China, he set up a joint venture with an equipment manufacturing factory and created the new line of BodyKore Fitness Equipment which focuses on high quality equipment with smaller footprints and full turn-key systems for home gyms. Leo returned to the USA in 2018 and resumed his role as CEO with BodyKore.`,
              });
            }}
          >
            <Image
              src="/team/leo.jpeg"
              className="team-image"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Leo Chang
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">CEO</p>
          </div>

          <div className="bg-black">
            <Image
              src="/team/IanEdgar.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Ian Edgar
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">VP Sales</p>
          </div>
          <div className="bg-black">
            <Image
              src="/team/everett.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Everett Chang
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              VP Strategic Development
            </p>
          </div>
          <div className="bg-black">
            <Image
              src="/team/Scott.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Scott Logan
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Global Sales Director
            </p>
          </div>
          <div className="bg-black">
            <Image
              src="/team/Amorena.jpg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Amorena Scamardella
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Director of Digital Marketing
            </p>
          </div>

          <div className="bg-black">
            <Image
              src="/team/Gabriela_Kurtz.jpg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Gabriela Kurtz
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Sales & Marketing
            </p>
          </div>

          <div className="bg-black">
            <Image
              src="/team/Robert_Simerson.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Robert Simerson
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              VP Project Development
            </p>
          </div>
          <div className="bg-black">
            <Image
              src="/team/DerekShakhshire1.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Derek Shakhshire
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Regional Sales Director- SouthEast
            </p>
          </div>
          <div className="bg-black">
            <Image
              src="/team/tonychavez.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Tony Chavez
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Head Technician
            </p>
          </div>

          <div className="bg-black">
            <Image
              src="/team/alexander.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Alexander Chizhikov
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Industrial Designer
            </p>
          </div>

          <div className="bg-black">
            <Image
              src="/team/MalcolmKing.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Malcolm King
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Athletic Director
            </p>
          </div>

          {/* <div className="bg-black">
            <Image
              src="/team/dimitri.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Dimitri Sonck
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Commercial Sales
            </p>
          </div> */}

          <div className="bg-black">
            <Image
              src="/team/alex.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Alex Kim
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Product Development
            </p>
          </div>

          <div className="bg-black">
            <Image
              src="/team/andrew.jpeg"
              height={374}
              width={374}
              placeholder="blur"
              blurDataURL="/loading.png"
              alt=""
            />
            <h3 className="text-white font-bebas font-bold italic tracking-wider pl-5 pt-2 text-2xl">
              Andrew Gera
            </h3>
            <p className="text-white font-roboto pl-5 text-lg">
              Regional Sales Director- Northwest
            </p>
          </div>
        </div>
      </section>
    </>
  );
}