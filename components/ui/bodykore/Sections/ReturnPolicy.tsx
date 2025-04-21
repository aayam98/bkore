interface ParagraphsProps {
  text: string;
}

interface ReturnPolicyProps {
  title: string;
  subTitle: string;
  text1: string;
  text2: string;
  paragraphs1: ParagraphsProps[];
  text3: string;
  paragraphs2: ParagraphsProps[];
  text4: string;
}

export default function ReturnPolicy({
  title,
  subTitle,
  text1,
  text2,
  text3,
  paragraphs1,
  paragraphs2,
  text4,
}: ReturnPolicyProps) {
  return (
    <>
      <section className="">
        <div className="lg:flex text-center font-bebas text-4xl lg:text-5xl font-bold italic bg-manuals-image bg-no-repeat w-full bg-center bg-cover lg:h-96 h-52">
          <div className="bg-gradient-to-r from-black via-black to-transparent lg:h-96 h-52 py-5 w-full flex items-center justify-center">
            <h3 className="text-white">{title}</h3>
          </div>
        </div>
        <div className="px-16 mt-5 max-w-7xl m-auto py-10">
          <div className="font-roboto text-center lg:text-left">
            <p className="font-bold">{subTitle}</p>
            <p className="py-2">{text1}</p>
            <p className="pb-2">{text2}</p>
            <p className="pb-2">{text3}</p>
            {paragraphs1.map((p, i) => {
              return <p key={i}>{p.text}</p>;
            })}
            <p className="py-2">{text4}</p>
            {paragraphs2.map((p, i) => {
              return <p key={i}>{p.text}</p>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
