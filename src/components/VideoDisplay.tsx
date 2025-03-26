
import React from 'react';
import { Bot, User } from 'lucide-react';

interface VideoDisplayProps {
  useAiAvatar: boolean;
  progress: number;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ useAiAvatar, progress }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {useAiAvatar ? (
        <Bot className="h-12 w-12 text-interview-blue" />
      ) : (
        <User className="h-12 w-12 text-interview-green" />
      )}
    </div>
  );
};

export default VideoDisplay;
