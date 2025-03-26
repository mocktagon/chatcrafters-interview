
import React from 'react';
import { Bot, User } from 'lucide-react';

interface VideoDisplayProps {
  useAiAvatar: boolean;
  progress: number;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ useAiAvatar, progress }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-800/50 rounded-lg">
      <div className="text-center">
        {useAiAvatar ? (
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#7E69AB]/30 to-[#9b87f5]/20 flex items-center justify-center mx-auto border border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
              <Bot className="h-12 w-12 text-[#9b87f5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#9b87f5] flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <span className="bg-[#9b87f5]/10 px-3 py-1 rounded-full text-[#9b87f5] text-sm font-medium">
                AI Interviewer
              </span>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-interview-green/20 to-interview-green/10 flex items-center justify-center mx-auto border border-interview-green/30 shadow-[0_0_15px_rgba(52,199,89,0.2)]">
              <User className="h-12 w-12 text-interview-green" />
            </div>
            <div className="mt-4 flex items-center justify-center">
              <span className="bg-interview-green/10 px-3 py-1 rounded-full text-interview-green text-sm font-medium">
                You
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDisplay;
