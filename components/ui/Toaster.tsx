import React, { useEffect } from "react";

export type ToasterProps = {
  id: number;
  title: string;
  message: string;
  duration?: number;
  onClose: (id: number) => void;
};

const Toaster: React.FC<ToasterProps> = ({ id, title, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50" style={{zIndex:99999}}>
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-8 z-50 text-center"
        style={{width:"500px"}}
      >
        {/* Icon Section */}
        <div className="flex justify-center">
          {title === "Success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"

              color="green" viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm-1 17.93L5.075 12l1.414-1.415L11 15.1l6.511-6.511L19 10.1z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm6.364 16.364l-1.414 1.414L12 13.415l-4.95 4.95-1.414-1.414L10.585 12 5.636 7.05l1.414-1.414L12 10.585l4.95-4.95 1.414 1.414L13.415 12z"
              />
            </svg>
          )}
        </div>

        {/* Title Section */}
        <h4 className="font-bold text-2xl text-blue-800 mt-4 text-center">{title === "Success" ? "THANK YOU!" : "WHOOPS!"}</h4>

        {/* Message Section */}
        <p className="mt-2 text-gray-600 text-center">{message}</p>

        {/* Button Section */}
        <button
          className={`mt-6 py-2 px-4 rounded-full text-black flex m-auto items-center text-center justify-center gap-2 "
            }`}
          style={{ background: title === "Success" ? '#02A898' : '#F36051', color: 'white' }}
          onClick={() => onClose(id)}
        >
          {title === "Success" ? (
            <>
              KEEP EXPLORING

            </>
          ) : (
            <>
              TRY AGAIN
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m-15 0h15v15"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>

  );
};

export default Toaster;
