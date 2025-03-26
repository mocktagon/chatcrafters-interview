
import React, { useEffect } from 'react';
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
  // This effect ensures the video plays once the videoRef is populated
  useEffect(() => {
    if (videoRef?.current && videoRef.current.srcObject) {
      console.log("Video element present with srcObject, attempting to play");
      videoRef.current.play().catch(err => {
        console.error("Error playing video:", err);
      });
    } else if (videoRef?.current) {
      console.log("Video element present but no srcObject");
    }
  }, [videoRef]);

  const renderContent = () => {
    if (useAiAvatar) {
      return <AvatarDisplay type="ai" />;
    }

    // Show avatar if camera is disabled or no permission
    const showAvatar = !isCameraEnabled || hasVideoPermission === false || hasVideoPermission === null;

    return (
      <div className="relative w-full h-full">
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
    );
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-black/50 rounded-lg">
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default VideoDisplay;
