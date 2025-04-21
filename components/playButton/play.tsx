import React from "react";
import { FaPause } from "react-icons/fa";

const CoolPlayButton = ({ onClick }:any) => {
  return (
    <div
      className="relative flex justify-center items-center w-20 h-20 rounded-full bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110"
      onClick={onClick}
    >
      {/* Wave-Like Glowing Circles */}
      <div className="absolute w-20 h-20 rounded-full border-4 border-red-500 opacity-50 animate-ping"></div>
      <div className="absolute w-24 h-24 rounded-full border-4 border-red-500 opacity-40 animate-ping delay-500"></div>
      <div className="absolute w-28 h-28 rounded-full border-4 border-red-500 opacity-30 animate-ping delay-1000"></div>

      {/* Play Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-600 transition-transform duration-300"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
};

export const CoolPauseButton = ({ onClick }:any) => {
  return (
    <div
      className="relative flex justify-center items-center w-20 h-20 rounded-full bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110"
      onClick={onClick}
    >
      {/* Wave-Like Glowing Circles */}
      {/* <div className="absolute w-20 h-20 rounded-full border-4 border-red-500 opacity-50 animate-ping"></div>
      <div className="absolute w-24 h-24 rounded-full border-4 border-red-500 opacity-40 animate-ping delay-500"></div>
      <div className="absolute w-28 h-28 rounded-full border-4 border-red-500 opacity-30 animate-ping delay-1000"></div> */}

      {/* Play Icon */}
     <FaPause className="w-8 h-8 text-black" />
    </div>
  );
};

export default CoolPlayButton;
