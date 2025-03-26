
import React, { useEffect, useState } from 'react';
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

  // This effect ensures the video plays once the videoRef is populated
  useEffect(() => {
    if (!videoRef?.current) {
      // No video element yet
      setIsVideoPlaying(false);
      return;
    }

    if (!videoRef.current.srcObject) {
      console.log("Video element exists but no srcObject");
      setIsVideoPlaying(false);
      return;
    }
    
    console.log("Video element present with srcObject, attempting to play");
    
    // Try to play the video
    const playVideo = async () => {
      try {
        await videoRef.current!.play();
        setIsVideoPlaying(true);
        setVideoError(false);
        console.log("Video playing successfully");
      } catch (err) {
        console.error("Error playing video:", err);
        setVideoError(true);
        setIsVideoPlaying(false);
      }
    };
    
    playVideo();

    return () => {
      setVideoError(false);
      setIsVideoPlaying(false);
    };
  }, [videoRef, videoRef?.current?.srcObject]);

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
                     !videoRef?.current?.srcObject ||
                     !isVideoPlaying;

  return (
    <div className="h-full w-full flex items-center justify-center bg-black/50 rounded-lg overflow-hidden">
      <div className="w-full h-full relative">
        {!showAvatar && (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
        )}
        
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
