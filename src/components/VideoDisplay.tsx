
import React, { useEffect, useState, useRef } from 'react';
import AvatarDisplay from './video/AvatarDisplay';

interface VideoDisplayProps {
  useAiAvatar: boolean;
  progress: number;
  videoRef?: React.RefObject<HTMLVideoElement>;
  hasVideoPermission?: boolean | null;
  isCameraEnabled?: boolean;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ 
  useAiAvatar, 
  videoRef,
  hasVideoPermission,
  isCameraEnabled = true
}) => {
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  
  // Separate local video ref in case one isn't provided
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const effectiveVideoRef = videoRef || localVideoRef;

  // This effect ensures the video plays once the videoRef is populated
  useEffect(() => {
    const videoElement = effectiveVideoRef.current;
    if (!videoElement) {
      console.log("No video element available yet");
      setIsVideoPlaying(false);
      return;
    }

    if (!videoElement.srcObject) {
      console.log("Video element exists but no srcObject attached");
      setIsVideoPlaying(false);
      return;
    }
    
    console.log("Video element present with srcObject, attempting to play");
    
    // Try to play the video
    const playVideo = async () => {
      try {
        // For Safari and mobile browsers
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');

        await videoElement.play();
        setIsVideoPlaying(true);
        setVideoError(false);
        console.log("Video playing successfully");
      } catch (err) {
        console.error("Error playing video:", err);
        setVideoError(true);
        setIsVideoPlaying(false);
      }
    };
    
    // Play the video and set up event listeners
    playVideo();
    
    // Set up event listeners to track video playing status
    const handlePlaying = () => {
      console.log("Video is now playing");
      setIsVideoPlaying(true);
      setVideoError(false);
    };
    
    const handleError = (e: Event) => {
      console.error("Video element error:", e);
      setVideoError(true);
      setIsVideoPlaying(false);
    };
    
    videoElement.addEventListener('playing', handlePlaying);
    videoElement.addEventListener('error', handleError);
    
    return () => {
      videoElement.removeEventListener('playing', handlePlaying);
      videoElement.removeEventListener('error', handleError);
      setVideoError(false);
      setIsVideoPlaying(false);
    };
  }, [effectiveVideoRef, effectiveVideoRef.current?.srcObject]);

  // If it's an AI avatar, just render that
  if (useAiAvatar) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-black/50 rounded-lg overflow-hidden">
        <AvatarDisplay type="ai" />
      </div>
    );
  }

  // Determine if we should show the user avatar or video
  const showAvatar = !isCameraEnabled || 
                     hasVideoPermission === false || 
                     hasVideoPermission === null ||
                     videoError ||
                     !effectiveVideoRef.current?.srcObject ||
                     !isVideoPlaying;

  return (
    <div className="h-full w-full flex items-center justify-center bg-black/50 rounded-lg overflow-hidden">
      <div className="w-full h-full relative">
        <video 
          ref={effectiveVideoRef} 
          autoPlay 
          playsInline 
          muted 
          className={`w-full h-full object-cover ${showAvatar ? 'invisible absolute' : 'visible'}`}
        />
        
        {showAvatar && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AvatarDisplay type="user" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDisplay;
