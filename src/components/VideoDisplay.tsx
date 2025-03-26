
import React from 'react';
import { Bot, User } from 'lucide-react';

interface VideoDisplayProps {
  useAiAvatar: boolean;
  progress: number;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ useAiAvatar, progress }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow rounded-lg overflow-hidden border border-interview-border bg-gray-50 relative">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
          {useAiAvatar ? (
            <>
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-interview-blue/10 flex items-center justify-center animate-pulse-subtle">
                  <Bot className="h-12 w-12 text-interview-blue" />
                </div>
                <div className="absolute -bottom-2 right-0 w-6 h-6 rounded-full bg-interview-green flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-interview-darkText text-sm font-medium">AI Interviewer</p>
                <p className="text-interview-lightText text-xs">Speaking...</p>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-interview-blue/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-interview-blue" />
                </div>
                <div className="absolute -bottom-2 right-0 w-6 h-6 rounded-full bg-interview-green flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-interview-darkText text-sm font-medium">Camera Off</p>
                <p className="text-interview-lightText text-xs">Click Start to begin</p>
              </div>
            </>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 progress-bar">
          <div 
            className="progress-bar-inner" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDisplay;
