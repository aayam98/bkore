interface DoubleTextProps {
  title1?: string;
  title2?: string;
  title3?: string;
  description?: string;
  items?: string[];
}

export default function DoubleText({
  title1,
  title2,
  title3,
  description,
  items,
}: DoubleTextProps) {
  const mapItems = () => {
    return items?.map((item, index) => (
      <li key={index}>
        <div className="text-black">{item}</div>
      </li>
    ));
  };
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="grid grid-cols-5 space-x-5 py-5">
          <div className="col-span-3">
            {/* <h1 className="text-black-373933 lg:text-5xl text-3xl font-bebas font-bold italic">
              {title1}
            </h1> */}
            <div
              className="text-black-373933 text-base font-roboto text-left md:text-left"
              dangerouslySetInnerHTML={{
                __html: description!,
              }}
            ></div>
          </div>
          <div className="col-span-2">
            <h2 className="text-black-373933 text-3xl font-bebas pb-2 lg:pt-0 pt-4">
              EQUIPMENT
            </h2>
            <ul className="text-red leading-6 list-disc font-roboto font-bold text-sm pl-5">
              {mapItems()}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
