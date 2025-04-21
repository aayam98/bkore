import Image from 'next/image';

interface FacProps {
  icon?: string;
  title?: string;
  description?: string;
}

export interface ThreeProps {
  icon?: string;
  title?: string;
  description?: string;
}

interface ThreekeysProps {
  threekeys: ThreeProps[];
  factors: FacProps[];
  textSize?: string;
  division?: string;
  imgWidth?: string;
  imgHeight?: string;
}

export default function Threekeys({
  threekeys,
  textSize,
  division,
  imgHeight,
  imgWidth,
}: ThreekeysProps) {
  return (
    <div className="max-w-7xl m-auto">
      <div className="grid lg:grid-cols-4 grid-cols-2 items-center gap-4">
        {threekeys.map((f, i) => {
          return (
            <div className="" key={i}>
              <div className="justify-center flex" key={i}>
                <Image
                  src={f.icon as string}
                  alt=""
                  className="pb-2 w-9"
                  width={36}
                  height={44}
                />
              </div>
              <div className="">
                <h6
                  className={`font-bebas italic text-black-373933 text-lg font-bold tracking-wider text-center`}
                >
                  {f.title}
                  <p
                    className={`font-roboto text-black-373933 text-base text-center font-normal`}
                  >
                    {f.description}
                  </p>
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
