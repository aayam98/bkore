import Image from 'next/image';

interface OptionsProps {
  icon: string;
  title: string;
  description: string;
  url: string;
}

interface HomeSection1Props {
  options: OptionsProps[];
}

export default function HomeSection1({ options }: HomeSection1Props) {
  return (
    <>
      <section>
        <div className="bg-black w-full text-white h-fit py-10 text-sm">
          <div className="max-w-7xl m-auto justify-center gap-4 grid lg:grid-cols-4">
            {options.map((o, i) => {
              return (
                <div className="flex" key={i}>
                  <div className="mt-2 pr-2">
                    <Image
                      src={o.icon}
                      alt=""
                      className="w-10"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className="pl-2">
                    <a href={o.url}>
                      <p className="font-bebas italic text-xl pb-0 tracking-wider uppercase">
                        {o.title}
                      </p>
                      <p className="font-roboto text-gray-200 tracking-wide">
                        {o.description}
                      </p>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
