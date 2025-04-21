import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  title?: string;
  current: number;
  max: number;
  setter: Dispatch<
    SetStateAction<{
      page: number;
      category: string;
    }>
  >;
}

export default function Pagination({ title, current, max, setter }: PaginationProps) {
  const setPage = (value: number) => setter((prevState) => ({ ...prevState, page: value }));

  return (
    <section className="max-w-7xl mx-auto">
      <div className="py-8">
        <ul className="flex justify-center gap-3">
          {/* Previous Button */}
          {current > 1 && (
            <li>
              <button
                className="h-11 w-11 text-base text-white rounded-md transition duration-150 bg-gray-600 hover:bg-red-hover flex items-center justify-center"
                onClick={() => setPage(current - 1)}
                aria-label="Previous Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 12.885 8.525"
                >
                  <path
                    d="M0,3.343H11.316m0,0L7.972,0m3.343,3.343L7.972,6.687"
                    transform="scale(-1 1) translate(-12.235 0.919)"
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                  />
                </svg>
              </button>
            </li>
          )}

          {/* Dynamic Numbered Pages */}
          {Array.from({ length: max }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                className={`h-11 w-11 text-base rounded-md transition duration-150 ${
                  page === current ? "bg-red-bc2026 text-white" : "bg-gray-600 text-white hover:bg-red-hover"
                }`}
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          {/* Next Button */}
          {current < max && (
            <li>
              <button
                className="h-11 w-11 text-base text-white rounded-md transition duration-150 bg-gray-600 hover:bg-red-hover flex items-center justify-center"
                onClick={() => setPage(current + 1)}
                aria-label="Next Page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 12.885 8.525"
                >
                  <path
                    d="M0,3.343H11.316m0,0L7.972,0m3.343,3.343L7.972,6.687"
                    transform="translate(0.65 0.919)"
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                  />
                </svg>
              </button>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}