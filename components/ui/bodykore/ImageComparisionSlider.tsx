import React, { useState, useRef, useEffect } from "react";
interface ImageProps {
    beforeImage: string;
    afterImage: string;
}
const ImageComparisionSlider = ({
    beforeImage,
    afterImage,
}: ImageProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleMove = (clientX: number) => {
            if (!isResizing || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setPosition(percentage);
        };

        const handleMouseMove = (e: MouseEvent) => {
            handleMove(e.clientX);
        };

        const handleTouchMove = (e: TouchEvent) => {
            handleMove(e.touches[0].clientX);
        };

        const handleUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleUp);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleUp);
        };
    }, [isResizing]);

    return (
        <div className="relative flex justify-center items-center p-1 rounded-[20px] w-full h-mobileImageComparisionHeight lg:h-imageComparisionHeight  border-2 border-border_color shadow">
            <div className="relative rounded-[20px] w-full h-full max-h-imageComparisionHeight  mx-auto overflow-hidden border-2 border-border_color shadow-inner">
                <div
                    ref={containerRef}
                    className="relative w-full h-full  select-none "
                >
                    {/* After Image (Full width) */}
                    <div className="absolute inset-0 ">
                        <div className=" relative h-full w-full">
                            <img
                                src={afterImage}
                                alt="After"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                    {/* Before Image (Clipped) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            clipPath: `inset(0 ${100 - position}% 0 0)`,
                            width: "100%", // This ensures the before image maintains full width
                        }}
                    >
                        <div className=" relative h-full w-full">
                            <img
                                src={beforeImage}
                                alt="Before"
                                className="h-full w-full filter brightness-[90%] object-contain"
                            />
                        </div>
                    </div>
                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-pointer"
                        style={{ left: `${position}%` }}
                        onMouseDown={() => setIsResizing(true)}
                        onTouchStart={() => setIsResizing(true)}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                            style={{ transform: 'translateX(-50%)' }}
                        >
                            <div className="w-6 h-6 gap-[2px] flex items-center justify-center">
                                {/* left arrow */}
                                <svg
                                    width="10"
                                    height="14"
                                    viewBox="0 0 7 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.96069 9.01953L1.96069 5.01953L5.96069 1.01953"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                {/* right arrow  */}
                                <svg
                                    width="10"
                                    height="14"
                                    viewBox="0 0 7 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.96069 9.01953L5.96069 5.01953L1.96069 1.01953"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ImageComparisionSlider;