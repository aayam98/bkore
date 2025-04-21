import React from 'react';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import seo from '../public/SEO/en.json';
import SeoHeader from '@components/seoHeader';
import FadingBanner from '@components/ui/bodykore/Banners/FadingBanner';
import { getHomeReviews, Review } from 'services/stamped';
import Image from 'next/image';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();
  const reviews = await getHomeReviews();

  return {
    props: { header, reviews },
    // revalidate: 30 * 60,
  };
};

interface LoyaltyProgramParams {
  header: HeaderData;
  reviews: Review[];
}

const LoyaltyProgram = ({ reviews }: LoyaltyProgramParams) => {
  const mapRating = (rating: number) => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(
        <Image
          src={Math.round(rating) > i ? '/svg/star.svg' : '/svg/starEmpty.svg'}
          width={22}
          height={21}
          key={i}
          alt=""
        />
      );
    }
    return arr;
  };

  function handleVote(index: number, arg1: boolean) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <SeoHeader seo={seo.loyaltyProgram} />
      <main className="w-full">
        <FadingBanner
          title={'Reviews'}
          bgImage={'bg-manuals-image'}
          description={''}
          height={'h-72'}
        />
        <section className="m-auto">
          {reviews.length !== 0 ? (
            <div className="py-16">
              <div className="masonry sm:masonry-sm md:masonry-md max-w-7xl m-auto p-5">
                {reviews.map((review, index) => (
                  <div
                    className="p-3 mb-4 break-inside border-2 border-gray-300 rounded-xl"
                    key={index}
                  >
                    <div className="flex flex-row">
                      <div>
                        <div className="w-12 h-12 rounded-full bg-red-bc2026 mr-4 mt-1 flex justify-center items-center font-bebas text-2xl italic text-white-f2f9fa">
                          {review.author
                            .split(' ')
                            .map((i) => i.charAt(0).toUpperCase())}
                        </div>
                      </div>
                      <div className="w-2/4">
                        <h3 className="text-black-373933 font-bebas font-bold italic text-2xl w-2/4">
                          {review.author}
                        </h3>
                        <span className="text-black-373933">
                          {mapRating(review.reviewRating)}
                        </span>
                      </div>
                      <div className="w-2/4 flex justify-end items-center">
                        <h3 className="text-gray-500 font-medium font-roboto">
                          {review.reviewDate}
                        </h3>
                      </div>
                    </div>

                    <h5 className="text-black-373933 font-bebas font-bold italic text-xl py-2 tracking-wide">
                      {review.reviewTitle}
                    </h5>
                    <p className="text-black-373933 font-roboto text-base">
                      {review.reviewMessage}
                    </p>
                    <div className="flex flex-row justify-start items-center gap-3 pt-2">
                      <Image
                        src={review.productImageLargeUrl}
                        alt=""
                        className="h-20 w-20 object-contain border"
                        width={80}
                        height={80}
                        placeholder="blur"
                        blurDataURL="/loading.png"
                      />
                      <Link href={`${review.productUrl}`}>
                        <h3 className="text-gray-500 font-bebas italic text-xl cursor-pointer">
                          {review.productName}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <h5>Was this helpful?</h5>
                      <button
                        onClick={() => {
                          handleVote(index, true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.76"
                          height="15.236"
                          viewBox="0 0 16.76 15.236"
                        >
                          <path
                            id={`${index}up`}
                            data-name="Icon material-thumb-up"
                            d="M1.5,16.736H4.547V7.594H1.5Zm16.76-8.38a1.528,1.528,0,0,0-1.524-1.524H11.929l.724-3.481.023-.244a1.147,1.147,0,0,0-.335-.808l-.808-.8L6.52,6.52a1.49,1.49,0,0,0-.449,1.074v7.618a1.528,1.528,0,0,0,1.524,1.524h6.856a1.513,1.513,0,0,0,1.4-.929l2.3-5.371a1.505,1.505,0,0,0,.107-.556V8.425l-.008-.008Z"
                            transform="translate(-1.5 -1.5)"
                            fill="#373933"
                          />
                        </svg>
                      </button>
                      <h5 className="text-gray-400">{review.reviewVotesUp}</h5>
                      <button
                        onClick={() => {
                          handleVote(index, false);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16.76"
                          height="15.236"
                          viewBox="0 0 16.76 15.236"
                        >
                          <path
                            id={`${index}down`}
                            data-name="Icon material-thumb-up"
                            d="M1.5,16.736H4.547V7.594H1.5Zm16.76-8.38a1.528,1.528,0,0,0-1.524-1.524H11.929l.724-3.481.023-.244a1.147,1.147,0,0,0-.335-.808l-.808-.8L6.52,6.52a1.49,1.49,0,0,0-.449,1.074v7.618a1.528,1.528,0,0,0,1.524,1.524h6.856a1.513,1.513,0,0,0,1.4-.929l2.3-5.371a1.505,1.505,0,0,0,.107-.556V8.425l-.008-.008Z"
                            transform="translate(18.26 16.736) rotate(180)"
                            fill="#373933"
                          />
                        </svg>
                      </button>
                      <h5 className="text-gray-400">
                        {review.reviewVotesDown}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
};

export default LoyaltyProgram;
