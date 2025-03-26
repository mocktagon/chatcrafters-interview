
import React from 'react';
import { Bot, User } from 'lucide-react';

interface VideoDisplayProps {
  useAiAvatar: boolean;
  progress: number;
  videoRef?: React.RefObject<HTMLVideoElement>;
  hasVideoPermission?: boolean | null;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ 
  useAiAvatar, 
  progress, 
  videoRef,
  hasVideoPermission 
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-black/50 rounded-lg">
      {useAiAvatar ? (
        <div className="text-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-500/30 to-purple-500/20 flex items-center justify-center mx-auto border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Bot className="h-12 w-12 text-amber-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <span className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 px-3 py-1 rounded-full text-amber-400 text-sm font-medium">
                AI Interviewer
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {hasVideoPermission === true ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="text-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mx-auto border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <User className="h-12 w-12 text-purple-400" />
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <span className="bg-purple-500/10 px-3 py-1 rounded-full text-purple-400 text-sm font-medium">
                    You
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoDisplay;
