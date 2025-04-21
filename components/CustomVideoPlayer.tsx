import React, { useState, useRef, useEffect } from 'react';

// Play and Pause icon components
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

interface InstagramStylePlayerProps {
  src: string;
}

const InstagramStylePlayer: React.FC<InstagramStylePlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  const togglePlay = (): void => {
    if (!videoRef.current || !isLoaded) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Error playing video:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleVideoClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    togglePlay();
    showControlsTemporarily();
  };

  const showControlsTemporarily = (): void => {
    setShowControls(true);
    
    // Clear any existing timeout
    if (controlsTimeoutRef.current !== null) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    // Hide controls after 2 seconds
    controlsTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  // Show controls when hovering
  const handleMouseEnter = (): void => {
    setShowControls(true);
  };

  const handleMouseLeave = (): void => {
    // Only auto-hide if video is playing
    if (isPlaying) {
      setShowControls(false);
    }
  };

  useEffect(() => {
    // Clean up timeout on unmount
    return () => {
      if (controlsTimeoutRef.current !== null) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-black rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onCanPlay={() => setIsLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handleVideoClick}
        playsInline
      />
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Play/Pause overlay */}
      {(showControls || !isPlaying) && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300">
          <button 
            className="w-16 h-16 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white transition-all duration-200 hover:bg-opacity-70 focus:outline-none"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      )}
    </div>
  );
};

export default InstagramStylePlayer;