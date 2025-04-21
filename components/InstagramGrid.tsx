import { useEffect, useState } from "react";
import Slider from "react-slick";
import InstagramStylePlayer from "./InstagramPlayer";


type InstagramProps = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
}

const InstagramGrid = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramProps[]>([])

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer mr-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 text-black cursor-pointer ml-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
      </button>
    );
  };

  const settings = {
    centerPadding: "80px",
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    // console.log(IGKEY)
    const fetchData = async () => {
      try {
        const accessToken = "IGAANtHDf77fhBZAE1SdWNKZA0Y3cHA0V3FsUmU0aTNGOUNCMkdRQXBKZAzNDODFNZAFlndE9NRXJwNHhvVjQ2NTktOGtrVDYwX3Q3TlZAqdHY1RTJyNG5kMExUVlJjSFJBcGU3NWJPX2xjU01HQnNjNlVOZAXRuamN2VEFqT2FaUWdrZAwZDZD";
        const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`);

        const data = await res.json();
        setInstagramPosts(data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, []);

  return (
    <div className="w-full py-10">
      <div className="max-w-7xl m-auto px-5 justify-between flex flex-row items-cente gap-5 mb-4 items-center">
        <div className="lg:col-span-3 flex flex-row space-x-2 text-2xl lg:text-5xl font-bebas font-bold italic tracking-wide">
          <p className="text-gray-700">Instagram</p>
          <p className="text-red-bc2026">Highlights</p>
        </div>
        <div>
        <a href="https://www.instagram.com/bodykore/" target="blank" className="bg-red-bc2026 hover:bg-red-hover text-white py-2 px-3 text-xs lg:text-base font-roboto font-medium rounded-md">Follow On Instagram</a>
      </div>
      </div>

      <Slider {...settings} className="outline-none -mx-2">
        {instagramPosts
          // .filter(post => post?.media_url && post.media_url.startsWith('https://instagram'))
          .map((post, i) => (
            <div key={i} className="px-2">
              {post?.media_url && <div >
                <div className="w-full lg:h-opt5top h-96">
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                    {post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM" ? (
                      <img
                        src={post.media_url}
                        alt="Instagram post"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : post.media_type === "VIDEO" && (
                      <InstagramStylePlayer src={post.media_url} />

                    )}
                  </a>
                </div>
              </div>}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default InstagramGrid;