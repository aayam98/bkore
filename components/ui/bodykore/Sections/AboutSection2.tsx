import VideoPlayer from '@components/VideoPlay';
import ReactPlayer from 'react-player';

interface WeAreBKProps {
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  description6: string;
  btnText: string;
  img: string;
}

export default function WeAreBK({
  title1,
  title2,
  description1,
  description2,
  description3,
  description4,
  description5,
  description6,
  btnText,
  img,
}: WeAreBKProps) {
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center max-w-4xl h-fit m-auto">
          <div className="w-full md:pr-10 sm:pr-0">
            <div className="flex justify-center lg:justify-center font-bebas italic font-bold text-5xl text-center">
              <h3
                className="text-black-373933 text-3xl lg:text-5xl pr-2"
                style={{ letterSpacing: '1px' }}
              >
                {title1}
              </h3>
              <h3
                className="text-red-bc2026  text-3xl lg:text-5xl"
                style={{ letterSpacing: '1px' }}
              >
                {title2}
              </h3>
            </div>
            <p className="font-bebas italic text-3xl font-semibold tracking-wider text-black-1c2023 leading-relaxed text-center lg:text-center lg:px-0 px-6">
              {description1}
            </p>
            <div className="w-full md:pt-0 py-6">
                    <VideoPlayer
                      height={470}
                      thumbnailSrc="/aboutcover.jpg"
                      src="https://cdn.shopify.com/videos/c/o/v/86c2e6e1e9d5473eaa4673c03128664b.mov"
                      videoClassName="h-[450px] object-cover"
                    />
                  </div>

          <div className='text-center'>
            <p className="font-roboto text-black-1c2023 leading-relaxed">
              {description2}
            </p>
            <p className="font-roboto text-black-1c2023 leading-relaxed">
              {description3}
            </p>
            <p className="font-roboto text-black-1c2023 leading-relaxed">
              {description4}
            </p>
            <p className="font-roboto text-black-1c2023 leading-relaxed">
              {description5}
            </p>
            <p className="font-roboto text-black-1c2023 leading-relaxed">
              {description6}
            </p>

            {/* <div className='flex justify-center lg:justify-start'>
                        <button className='w-48 h-12 mt-5 bg-transparent text-black hover:text-red-bc2026 border-2 border-black hover:border-red-bc2026 rounded-lg font-bebas' style={{ letterSpacing: '1.5px' }}>
                        <a href="/contact"> {btnText}</a>
                        </button>
                    </div> */}
          </div>
          </div>

        
        </div>
      </section>
    </>
  );
}
