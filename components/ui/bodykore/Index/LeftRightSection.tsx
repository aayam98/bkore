
import ReactPlayer from 'react-player';

type LeftRightSectionProps = {
  position: string;
  data: {
    title: string;
    video: string;
    list: string[];
    ref: string;
  };
};


const LeftRightSection = ({ position, data }: LeftRightSectionProps) => {
  return (
    <div className=''>
      <span className="anchor" id={data.ref}></span>
      <div
        className={`w-full lg:py-28 py-8 lg:px-0 px-5 ${position !== 'left'
          ? 'flex-row-reverse bg-gray-100'
          : 'flex-row bg-white'
          }`}

      >
        <div
          className={`max-w-6xl m-auto flex lg:flex-nowrap lg:gap-0 gap-5 flex-wrap justify-between ${position !== 'left' ? 'flex-row-reverse' : 'flex-row'
            }`}
        >
          <div className="lg:w-4/12 w-full">
            <h1 className="text-left text-3xl font-bebas mb-3">
              <span className="text-red-bc2026">{data.title.split(' ')[0]}</span>{' '}
              <span className="text-black-373933">
                {data.title.split(' ')[1]} Exercises
              </span>{' '}
            </h1>
            <ul className="list-disc pl-8 flex flex-col gap-1">
              {data.list.map((list, index) => {
                return (
                  <li
                    key={index}
                    className="font-roboto font-normal text-lg text-gray-600"
                  >
                    {list}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={`lg:w-8/12 w-full m-auto flex justify-center ${position !== 'left' ? 'lg:pr-20' : 'lg:pl-20'
              }`}
          >
            <ReactPlayer
              className="lg:h-full h-72 w-full videoBox"
              url={data.video}
              playing={false}
              loop={false}
              controls={true}
              volume={1}
              width="100%"
              height="400px"
              playsInline={true}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
              onPlay={() => { }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftRightSection;
