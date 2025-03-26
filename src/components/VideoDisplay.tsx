
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
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#7E69AB]/30 to-[#9b87f5]/20 flex items-center justify-center mx-auto border border-[#9b87f5]/30 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
            <Bot className="h-10 w-10 text-[#9b87f5]" />
          </div>
        ) : (
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-interview-green/20 to-interview-green/10 flex items-center justify-center mx-auto border border-interview-green/30 shadow-[0_0_15px_rgba(52,199,89,0.2)]">
            <User className="h-10 w-10 text-interview-green" />
          </div>
        )}
        <p className="text-slate-300 text-sm font-medium mt-3 flex items-center justify-center">
          {useAiAvatar ? (
            <>
              <span className="bg-[#9b87f5]/10 px-3 py-1 rounded-full">AI Interviewer</span>
            </>
          ) : (
            <>
              <span className="bg-interview-green/10 px-3 py-1 rounded-full">You</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default VideoDisplay;
