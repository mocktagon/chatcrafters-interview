
import React from 'react';
import { Bot, User } from 'lucide-react';

interface VideoDisplayProps {
  useAiAvatar: boolean;
  progress: number;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ useAiAvatar, progress }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="text-center">
        {useAiAvatar ? (
          <div className="h-16 w-16 rounded-full bg-slate-700/40 flex items-center justify-center mx-auto">
            <Bot className="h-8 w-8 text-interview-blue" />
          </div>
        ) : (
          <div className="h-16 w-16 rounded-full bg-slate-700/40 flex items-center justify-center mx-auto">
            <User className="h-8 w-8 text-interview-green" />
          </div>
        )}
        <p className="text-slate-300 text-sm font-medium mt-2">
          {useAiAvatar ? "AI Interviewer" : "You"}
        </p>
      </div>
    </div>
  );
};

export default VideoDisplay;
