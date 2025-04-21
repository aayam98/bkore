interface FadingAndInfoProps {
  title?: string;
  description?: string;
  icon?: string;
  btnText?: string;
  bgImage?: string;
  heightbg?: string;
  heightGradient?: string;
  link?: string;
}
export default function FadingAndInfo({
  title,
  description,
  icon,
  btnText,
  bgImage,
  heightbg,
  heightGradient,
  link,
}: FadingAndInfoProps) {
  return (
    <>
      {/*Main Image*/}

      <div
        className="bg-no-repeat w-full bg-bottom bg-cover bg-black grid grid-cols-1"
        style={{
          height: `${heightbg}`,
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center right',
          backgroundSize: 'initial',
        }}
      >
        <div className="max-w-6xl m-auto px-5">
          <h3 className="font-bebas text-5xl font-bold italic text-left text-white">
            {title}
          </h3>
          <div
            className="font-roboto text-base text-left text-white lg:w-1/2 lg:px-0 lg:leading-7 pb-2"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          ></div>
            <a href={link} target="_blank" rel="noreferrer">
            <button className="flex align-middle flex-wrap gap-2 px-7 bg-red-bc2026 hover:bg-red-hover py-4 text-white hover:text-white rounded-lg font-roboto">
              <img src={icon} alt="" />
              {btnText}
            </button>
          </a>
        </div>
     
      </div>
    </>
  );
}
