import routes from '@config/routes';
import Image from 'next/image';

interface CardsProps {
  img?: string;
  topic?: string;
  date?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  slug: string;
  nofollow?: boolean;
}
interface BlogCardsProps {
  mainTitle?: string;
  card: CardsProps[];
}
export default function BlogCards({ mainTitle, card }: BlogCardsProps) {
  return (
    <>
      <div className="max-w-7xl mx-auto">
  {card.length === 0 && (
    <div className="flex justify-center py-10">
      <p className="font-bebas uppercase text-xl italic font-bold tracking-wider text-gray-700">
        No Blog Found
      </p>
    </div>
  )}
  
{/* .filter((c) => new Date(c?.date || '') < new Date()) */}

  <div className="grid  lg:grid-cols-3 grid-cols-1 gap-6 lg:px-0 px-3 auto-rows-fr">
    {card.filter((c) => new Date(c?.date || '') < new Date()).map((c, i) => (
      <div key={i} className="rounded-md shadow-md flex flex-col h-full">
        <a href={`${routes.news.path}/${c.slug}`} rel={c.nofollow ? 'nofollow' : ''} className="cursor-pointer h-full flex flex-col">
          {/* Image Section */}
          {c.img && (
            <div className="h-60 w-full">
              <Image
                src={c.img}
                width={500}
                height={300}
                placeholder="blur"
                blurDataURL="/loading.png"
                alt={c.title}
                quality={75}
                className="w-full h-full object-cover rounded-t-md"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="bg-white border-t border-gray-200 flex flex-col flex-grow rounded-b-md p-4 gap-2">
            {/* Topic */}
            {c.topic && (
              <p className="text-gray-500 font-roboto font-medium text-sm">{c.topic}</p>
            )}

            {/* Title */}
            {c.title && (
              <h3 className="text-gray-700 hover:text-red-hover hover:underline tracking-wide font-bebas text-xl leading-6 italic font-semibold">
                {c.title}
              </h3>
            )}

            {/* Description */}
            {c.description && (
              <p className="text-black-1c2023 font-roboto text-sm flex-grow">
                {c.description.slice(0, 150)} {c.description.length > 150 && '[...]'}
              </p>
            )}
          </div>
        </a>
      </div>
    ))}
  </div>
</div>
    </>
  );
}
