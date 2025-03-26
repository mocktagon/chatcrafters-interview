import React from 'react';
import AvatarDisplay from './video/AvatarDisplay';

interface VideoDisplayProps {
  useAiAvatar: boolean;
  progress: number;
  videoRef?: React.RefObject<HTMLVideoElement>;
  hasVideoPermission?: boolean | null;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ 
  useAiAvatar, 
  videoRef,
  hasVideoPermission 
}) => {
  const renderContent = () => {
    if (useAiAvatar) {
      return <AvatarDisplay type="ai" />;
    }

    if (hasVideoPermission === true) {
      return (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover" 
        />
      );
    }
    
    return <AvatarDisplay type="user" />;
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
