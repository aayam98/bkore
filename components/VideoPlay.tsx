import React, { useState, useRef, useEffect } from 'react';
import CoolPlayButton, { CoolPauseButton } from './playButton/play';

interface CustomVideoPlayerProps {
  src: string;
  thumbnailSrc: string;
  videoClassName?: string;
  thumbClassName?: string;
  href?: string;
  height?: number;
}

const VideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  src,
  thumbnailSrc,
  videoClassName,
  thumbClassName,
  href,
  height = 650,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  // Handle mouse movement
  const handleMouseMove = (): void => {
    // Only update controls visibility if video is playing
    if (isPlaying) {
      setShowControls(true);
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout to hide controls after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // When play state changes, update controls visibility
  useEffect(() => {
    if (isPlaying) {
      // Show controls briefly when video starts playing
      setShowControls(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    } else {
      // Always show controls when video is paused
      setShowControls(true);
    }
  }, [isPlaying]);

  // Update current time while video is playing and ensure duration is set properly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    const updateDuration = () => {
      if (video.duration && isFinite(video.duration)) {
        setDuration(video.duration);
      }
    };

    // Make sure to try to get duration as soon as possible
    if (video.readyState >= 1 && isFinite(video.duration)) {
      setDuration(video.duration);
    }

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('durationchange', updateDuration);
    video.addEventListener('canplay', updateDuration);
    video.addEventListener('loadeddata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('durationchange', updateDuration);
      video.removeEventListener('canplay', updateDuration);
      video.removeEventListener('loadeddata', updateDuration);
    };
  }, [videoRef]);

  // Toggle play/pause
  const togglePlay = (e?: React.MouseEvent): void => {
    // Prevent event propagation if event exists
    if (e) {
      e.stopPropagation();
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Try to get duration before playing if possible
        if (videoRef.current.readyState >= 1 && isFinite(videoRef.current.duration)) {
          setDuration(videoRef.current.duration);
        }
        
        videoRef.current.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video loaded event
  const handleVideoLoaded = (): void => {
    setVideoLoaded(true);
    if (videoRef.current && isFinite(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle progress bar input change
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.stopPropagation(); // Important: prevent click from bubbling to video element
  };

  // Preload the video to get duration as soon as possible
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = "metadata";
    }
  }, []);

  // Format time as MM:SS
  const formatTime = (time: number): string => {
    if (!isFinite(time) || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Thumbnail image shown when video is not playing */}
      {!isPlaying && thumbnailSrc && (
        <img 
          src={thumbnailSrc}
          alt="Video thumbnail"
          style={{height}}
          className={`w-full cursor-pointer object-cover object-top absolute inset-0 ${thumbClassName || ''}`}
          onClick={togglePlay}
        />
      )}
      
      <div className={`relative ${videoClassName}`}>
        <video
          ref={videoRef}
          src={src}
          loop
          preload="metadata"
          style={{height}}
          className={`w-full object-contain cursor-pointer ${!isPlaying && thumbnailSrc ? 'opacity-0' : ''} ${videoClassName || ''}`}
          onClick={() => togglePlay()}
          onLoadedData={handleVideoLoaded}
          poster={thumbnailSrc}
        />
           
        {/* Bottom section - timeline controller */}
        {isPlaying && showControls && 
          <div className="w-full absolute bottom-0 left-0 right-0 bg-gray-500 bg-opacity-60 flex items-center justify-center px-4 py-4 z-10">
            <div className="flex items-center w-full">
              {/* Current time */}
              <div className="text-white text-sm mr-2">
                {formatTime(currentTime)}
              </div>
              
              {/* Progress bar */}
              <input
                ref={progressRef}
                type="range"
                min="0"
                max={duration || 100}
                step="0.01"
                value={currentTime}
                onChange={handleProgressChange}
                onClick={handleProgressClick}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer z-20"
                style={{
                  backgroundImage: `linear-gradient(to right, blue ${(currentTime / (duration || 1)) * 100}%, transparent 0)`,
                  // Improve range slider visibility and interactivity
                  accentColor: 'blue',
                  outline: 'none'
                }}
              />
              
              {/* Duration */}
              <div className="text-white text-sm ml-2">
                {formatTime(duration)}
              </div>
            </div>
          </div>
        }
      </div>
      
      {/* Play button only shown when video is not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            role="button"
            onClick={(e) => togglePlay(e)}
            className="p-4 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <CoolPlayButton />
          </div>
        </div>
      )}
      
      {/* Controls overlay - Only shown when video is playing and controls are visible */}
      {isPlaying && showControls && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            role="button"
            onClick={(e) => togglePlay(e)}
            className="p-4 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <CoolPauseButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;