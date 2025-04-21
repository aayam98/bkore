import { Dispatch } from 'react';

interface NavOptionsParams {
  title1: string;
  titles: {
    text: string;
    id?: string;
    subTitle?: string;
  }[];
  type?: string;
  setter?: (value: { page: number; category: string }) => void;
  setTitlePage?: ({ title, subTitle }: { title: string; subTitle: string }) => void;
}

export default function NavOptions({
  title1,
  titles,
  type,
  setter,
  setTitlePage
}: NavOptionsParams) {
  const scrollDown = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  function setCategory(category: string) {
    if (setter) {
      setter({ page: 1, category: category });
    }
  }

  return (
    <>
      {/*Main Image*/}
      <div
        className="flex flex-row gap-8 lg:justify-start pl-5 lg:px-2 px-4 overflow-x-auto lg:overflow-hidden justify-start w-full m-auto pt-8 pb-4 whitespace-nowrap"
        style={{ letterSpacing: '1px' }}
      >
        <div className="font-bebas uppercase text-lg italic font-bold tracking-wider">
          <h5
            className={
              type === '' || type === undefined
                ? 'text-red-bc2026 border-b-2 border-red-bc2026'
                : 'cursor-pointer text-gray-500'
            }
            onClick={() => {
              if (type !== '') {
                setCategory('');
                setTitlePage &&
                  setTitlePage({
                    title: 'BODYKORE BEAT',
                    subTitle:
                      'Keep your pulse on the latest trends in fitness, wellness and nutrition. Get inspired by BodyKore athletes, customers and fitness pros. Plus, be the first to hear our latest news, including product releases, promotions and special events.',
                  });
              }
            }}
          >
            {title1}
          </h5>
        </div>
        {titles.map((t, i) => (
          <div
            className="font-bebas uppercase text-lg italic font-bold tracking-wider"
            key={i}
          >
            <h5
              className={
                type === t.id
                  ? 'text-red-bc2026 border-b-2 border-red-bc2026'
                  : 'cursor-pointer text-gray-500'
              }
              onClick={() => {
                if (t.id && type !== t.id) {
                  scrollDown(t.id);
                  setCategory(t.id);
                }
                setTitlePage &&
                  setTitlePage({
                    title: t.text,
                    subTitle: t.subTitle || '',
                  });
              }}
            >
              {t.text}
            </h5>
          </div>
        ))}
      </div>
    </>
  );
}
