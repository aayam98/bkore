interface FeaturestitleProps {
  title?: string;
  textSize?: string;
  textColor?: string;
  id?: string;
}

export default function Featurestitle({
  title,
  textSize,
  textColor,
  id,
}: FeaturestitleProps) {
  return (
    <>
      <section id={id} className="max-w-7xl m-auto px-6">
        <div className="flex justify-start lg:justify-center">
        <h3
            className={`text-black-1c2023 lg:text-4xl text-3xl font-bebas font-bold italic text-left md:text-left`}
          >
            {title}
          </h3>
        </div>
      </section>
    </>
  );
}
