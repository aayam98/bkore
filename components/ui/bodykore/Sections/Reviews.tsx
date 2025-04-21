import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import { voteReview } from 'services/stamped';

interface ReviewProps {
  id: string;
  rating: number;
  name: string;
  date: string;
  title: string;
  description: string;
  numLikes: number;
  numDislikes: number;
}

const Reviews = ({ reviews }: { reviews: ReviewProps[] }) => {
  const [votes, setVotes] = useState<{ [key: string]: boolean | null }>({});

  // Filter out duplicate reviews by id
  const uniqueReviews = useMemo(() => {
    const seenIds = new Set<string>();
    return reviews.filter(review => {
      if (seenIds.has(review.id)) {
        return false; // Skip this review as we've seen it before
      }
      seenIds.add(review.id);
      return true;
    });
  }, [reviews]);

  // Generate Star Ratings
  const mapRating = (rating: number) => 
    Array.from({ length: 5 }, (_, i) => (
      <Image
        key={i}
        src={Math.round(rating) > i ? '/svg/star.svg' : '/svg/starEmpty.svg'}
        width={22}
        height={21}
        alt={`Star ${i + 1}`}
      />
    ));

  // Handle Vote Action
  const handleVote = async (index: number, vote: boolean) => {
    const reviewId = uniqueReviews[index].id;
    if (votes[reviewId] !== undefined) return; // Prevent duplicate voting

    const res = await voteReview(reviewId, vote);
    if (res) {
      setVotes(prev => ({ ...prev, [reviewId]: vote }));
    }
  };

  return (
    <>
      {uniqueReviews.map((item, index) => (
        <section key={item.id} className="max-w-8xl m-auto">
          <div className="flex flex-row pb-2">
            {/* User Initials Avatar */}
            <div className="w-12 h-12 rounded-full bg-red-bc2026 mr-4 mt-1 flex justify-center items-center font-bebas text-2xl italic text-white">
              {item.name
                .split(' ')
                .map(i => i.charAt(0).toUpperCase())
                .join('')}
            </div>

            <div className="w-full pb-8">
              {/* Header (Name & Date) */}
              <div className="flex justify-between">
                <h3 className="text-black font-bebas font-bold italic text-lg lg:text-2xl">
                  {item.name}
                </h3>
                <span className="text-gray-600 font-roboto text-sm">{item.date}</span>
              </div>

              {/* Rating Stars */}
              <div className="flex justify-start pb-2">{mapRating(item.rating)}</div>

              {/* Review Title & Description */}
              <h3 className="text-black font-bebas font-bold italic lg:text-2xl text-lg tracking-wide">
                {item.title}
              </h3>
              <p className="text-black font-roboto pb-2 text-sm lg:text-base">
                {item.description}
              </p>

              {/* Voting Section */}
              <div className="flex justify-end items-center gap-3">
                <h5>Was this helpful?</h5>

                {/* Upvote Button */}
                <button onClick={() => handleVote(index, true)} disabled={votes[item.id] !== undefined}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.76" height="15.236" viewBox="0 0 16.76 15.236">
                    <path
                      fill={votes[item.id] === true ? '#bc2026' : '#373933'}
                      d="M1.5,16.736H4.547V7.594H1.5Zm16.76-8.38a1.528,1.528,0,0,0-1.524-1.524H11.929l.724-3.481.023-.244a1.147,1.147,0,0,0-.335-.808l-.808-.8L6.52,6.52a1.49,1.49,0,0,0-.449,1.074v7.618a1.528,1.528,0,0,0,1.524,1.524h6.856a1.513,1.513,0,0,0,1.4-.929l2.3-5.371a1.505,1.505,0,0,0,.107-.556V8.425l-.008-.008Z"
                    />
                  </svg>
                </button>
                <h5>{item.numLikes}</h5>

                {/* Downvote Button */}
                <button onClick={() => handleVote(index, false)} disabled={votes[item.id] !== undefined}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.76" height="15.236" viewBox="0 0 16.76 15.236">
                    <path
                      fill={votes[item.id] === false ? '#bc2026' : '#373933'}
                      d="M1.5,16.736H4.547V7.594H1.5Zm16.76-8.38a1.528,1.528,0,0,0-1.524-1.524H11.929l.724-3.481.023-.244a1.147,1.147,0,0,0-.335-.808l-.808-.8L6.52,6.52a1.49,1.49,0,0,0-.449,1.074v7.618a1.528,1.528,0,0,0,1.524,1.524h6.856a1.513,1.513,0,0,0,1.4-.929l2.3-5.371a1.505,1.505,0,0,0,.107-.556V8.425l-.008-.008Z"
                      transform="translate(18.26 16.736) rotate(180)"
                    />
                  </svg>
                </button>
                <h5>{item.numDislikes}</h5>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Reviews;