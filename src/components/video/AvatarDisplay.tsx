
import React from 'react';
import { Bot, User } from 'lucide-react';

type AvatarType = 'ai' | 'user';

interface AvatarDisplayProps {
  type: AvatarType;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ type }) => {
  const isAiAvatar = type === 'ai';
  
  return (
    <div className="text-center">
      <div className="relative">
        <div className={`h-24 w-24 rounded-full flex items-center justify-center mx-auto border shadow-lg ${
          isAiAvatar 
            ? "bg-purple-800/50 border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
            : "bg-purple-700/40 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        }`}>
          {isAiAvatar ? (
            <Bot className="h-12 w-12 text-purple-200" />
          ) : (
            <User className="h-12 w-12 text-purple-200" />
          )}
        </div>
        
        {isAiAvatar && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isAiAvatar 
              ? "bg-purple-800/20 text-purple-200" 
              : "bg-purple-700/20 text-purple-200"
          }`}>
            {isAiAvatar ? "AI Interviewer" : "You"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarDisplay;
