import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Review } from 'services/stamped';

interface OneReviewProps {
  img: string;
  reviews: Review[];
}

export default function OneReview({ img, reviews }: OneReviewProps) {
  const [displayed, setDisplayed] = useState(0);
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
  useEffect(() => {
    setInterval(() => {
      if (displayed < reviews.length - 1) {
        setDisplayed((prev) => (prev + 1) % reviews.length);
      } else {
        displayed > 0 &&
        setDisplayed((prev) => (prev - 1) % reviews.length);
      }
    }, 7000);
  }, []);
  return (
    <>
      <section className="max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center items-center w-full h-fit max-w-7xl m-auto lg:px-40 sm:px-2">
         
          <div className="w-2/3 lg:pl-7 sm:pl-1">
            <h5
              className="justify-center font-bebas text-white-f2f9fa italic font-bold text-xl text-center tracking-widest"
              style={{ letterSpacing: '1px' }}
            >
              “{reviews[displayed].reviewTitle}”
            </h5>
            {/*Rating component*/}
            <div className="flex justify-center pt-5 gap-1">
              {mapRating(reviews[displayed].reviewRating)}
            </div>

            <p className="font-roboto text-white-f2f9fa text-center lg:px-0 pt-8 leading-relaxed">
              "{reviews[displayed].reviewMessage}"
            </p>
            <h2
              className="flex justify-center pt-5 font-bebas text-white-f2f9fa italic font-bold text-2xl"
              style={{ letterSpacing: '1px' }}
            >
              - {reviews[displayed].author}
            </h2>

            {/* Arrow */}
            {reviews.length > 1 ? (
              <>
              
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
