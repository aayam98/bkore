import Image from 'next/image';
import Link from 'next/link';

interface SledColProps {
  title1: string;
  title2: string;
  text: String;
  texthead: String;
  textpara: String;
  texthead1: String;
  textpara1: String;
  texthead2: String;
  textpara2: String;
  texthead3: String;
  textpara3: String;
  texthead4: String;
  textpara4: String[];
  img: string;
}

export default function SledCol({
  title1,
  title2,
  text,
  texthead,
  textpara,
  texthead1,
  textpara1,
  texthead2,
  textpara2,
  texthead3,
  textpara3,
  texthead4,
  textpara4,
  img,
}: SledColProps) {
  return (
    <>
      <section className="w-full">
        <div className="max-w-7xl flex flex-col justify-center items-center m-auto">
          <h6 className="text-center lg:text-left font-bebas italic font-bold text-3xl lg:text-6xl leading-10 pt-5 lg:pt-16">
            {title1}
            <span className="pt-1 font-roboto font-thin not-italic text-lg lg:text-3xl leading-normal block text-center">
              {title2}
            </span>
          </h6>
        </div>
        <div className="flex flex-wrap justify-center max-w-7xl m-auto pt-5 lg:pt-14">
          <div className="lg:w-2/5 w-full lg:pb-0 pb-10">
            <Image
              className="w-full"
              src={img}
              alt=""
              width={512}
              height={735}
              placeholder="blur"
              blurDataURL="/loading.png"
            />
          </div>
          <div className="lg:pt-0 lg:pl-10 lg:w-3/5">
            <p className="font-roboto text-base tracking-normal text-black-373933 text-left">
              {text}
            </p>
            <h6 className="font-bebas text-black text-left lg:text-left text-3xl pt-2 pb-1">
              {texthead}
            </h6>
            <p className="font-roboto text-base tracking-normal text-black-373933 text-left">
              {textpara}
            </p>
            <h6 className="font-bebas text-black text-left lg:text-left text-3xl pt-2 pb-1">
              {texthead1}
            </h6>
            <p className="font-roboto text-base tracking-normal text-black-373933 text-left">
              {textpara1}
            </p>
            <h6 className="font-bebas text-black text-left lg:text-left text-3xl pt-2 pb-1">
              {texthead2}
            </h6>
            <p className="font-roboto text-base tracking-normal text-black-373933 text-left">
              {textpara2}
            </p>
            <h6 className="font-bebas text-black text-left lg:text-left text-3xl pt-2 pb-1">
              {texthead3}
            </h6>
            <p className="font-roboto text-base tracking-normal text-black-373933 text-left">
              {textpara3}
            </p>
            <h6 className="font-bebas text-black text-left lg:text-left text-3xl pt-2 pb-1">
              {texthead4}
            </h6>
            <p className="font-roboto text-base tracking-normal text-black-373933 text-left">
              <ul>
                {textpara4.map((ele, i) => {
                  return <li key={i}>- {ele}</li>;
                })}
              </ul>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
