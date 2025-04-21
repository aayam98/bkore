import Image from 'next/image';

interface OptionProps {
  icon?: string;
  text?: string;
}

interface FadingAndOptionsProps {
  title?: string;
  description?: string;
  bgImage?: string;
  heightbg: string;
  heightGradient: string;
  options: OptionProps[];
}

export default function FadingAndOptions({
  title,
  description,
  bgImage,
  heightbg,
  heightGradient,
  options,
}: FadingAndOptionsProps) {
  return (
    <>
      {/*Main Image*/}
      <div
        className={`bg-no-repeat ${heightbg} w-full bg-center bg-cover ${bgImage}`}
      >
        <div className="bg-gradient-to-r from-black via-black to-transparent">
          <div className="flex items-center pt-5 lg:pl-16 pl-6 max-w-7xl m-auto">
            {options.map((o, i) => {
              return (
                <div key={i} className="flex items-center gap-2">
                  <Image src={o.icon as string} alt="" width={20} height={20} />
                  <h3 className="text-sm text-white font-roboto pr-2 capitalize">
                    {o.text?.replaceAll('-', ' ')}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`bg-gradient-to-r from-black via-black to-transparent ${heightGradient} w-full flex it justify-center lg:pb-16 pb-0`}
        >
          <div className="text-white text-center lg:w-1/2 max-w-7xl m-auto">
            <h1
              className="font-bebas text-5xl font-bold italic"
              style={{ letterSpacing: '2px' }}
            >
              {title?.replaceAll('-', ' ')}
            </h1>
            <p className="font-roboto pt-2 text-sm px-8">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
