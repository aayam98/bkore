interface BlacktitleProps {
  title?: string;
  textSize?: string;
  textColor?: string;
  id?: string;
}

export default function Blacktitle({
  title,
  textSize,
  textColor,
  id,
}: BlacktitleProps) {
  return (
    <>
      <div id={id} className="">
        <h3
          className={`font-bebas lg:text-3xl text-2xl italic font-bold tracking-wider pb-2`}
        >
          {title}
        </h3>
      </div>
    </>
  );
}
