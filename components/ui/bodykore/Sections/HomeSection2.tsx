import Image from 'next/image';
import Slider from 'react-slick';

interface OptionsProps {
  icon: string;
  title: string;
}

interface HomeSection2Props {
  title1: string;
  title2: string;
  description: string;
  options: OptionsProps[];
}
const settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 2000,
  centerPadding: "40px",
  centerMode: true,
};

export default function HomeSection2({
  title1,
  title2,
  description,
  options,
}: HomeSection2Props) {
  return (
    <>
      <section className="w-full border-t-8 border-b-8 border-red-bc2026 bg-black py-16">
        <div className="max-w-7xl m-auto">
          <div className="flex justify-center px-10 text-2xl lg:text-5xl">
            <h3 className="text-red-bc2026 pr-2  font-bebas font-bold italic tracking-wider">
              {title1}
            </h3>
            <h3 className="text-white-f2f9fa font-bebas font-bold italic tracking-wider">
              {title2}
            </h3>
          </div>
          <p className="text-white text-center font-roboto text-base lg:w-5/12 lg:px-0 px-3 m-auto">
            {description}
          </p>

          <div className="hidden lg:grid lg:grid-cols-5 grid-cols-2 gap-4 pt-11">
            {options.map((o, i) => {
              return (
                <div className="pt-5 flex flex-col items-center justify-center" key={i}>
                  <Image
                    src={o.icon}
                    alt=""
                    className=""
                    width={50}
                    height={50}
                    placeholder="blur"
                    blurDataURL="/loading.png"
                  />

                  <p className="font-roboto pt-4 text-center text-white">
                    {o.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="pt-11 lg:hidden block justify-center items-center">
            <Slider {...settings}>
              {options.map((o, i) => {
                {
                  return (
                    <div className='flex justify-center items-center' key={i}>
                      <Image
                        src={o.icon}
                        alt=""
                        className="max-w-full m-auto"
                        width={50}
                        height={50}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <p className="font-roboto pt-4 text-left text-white">
                        {o.title}
                      </p>
                    </div>
                  );
                }
              })}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
