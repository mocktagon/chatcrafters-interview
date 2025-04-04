
import React from 'react';
import { Mic, Pause, Play, StopCircle } from 'lucide-react';

interface BottomBarProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onEnd: () => void;
  audioLevel: number;
}

const BottomBar: React.FC<BottomBarProps> = ({ 
  isRunning, 
  onStart, 
  onPause, 
  onEnd,
  audioLevel 
}) => {
  return (
    <div className="h-16 px-6 border-t border-interview-border flex items-center justify-between animate-fade-in">
      <div className="flex items-center space-x-3">
        {isRunning ? (
          <button 
            onClick={onPause}
            className="bg-blue-500 text-white rounded-full p-2.5 shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Pause className="h-5 w-5 text-white" />
          </button>
        ) : (
          <button 
            onClick={onStart}
            className="bg-blue-500 text-white rounded-full p-2.5 shadow-sm hover:bg-blue-600 transition-colors"
          >
            <Play className="h-5 w-5 text-white" fill="white" />
          </button>
        )}
        
        <button 
          onClick={onEnd}
          className="bg-red-500 text-white rounded-full p-2.5 shadow-sm hover:bg-red-600 transition-colors"
        >
          <StopCircle className="h-5 w-5 text-white" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Mic className="h-4 w-4 text-interview-darkText" />
        <div className="audio-level-indicator">
          {[1, 2, 3, 4, 5].map((level) => (
            <div 
              key={level}
              className={`audio-level-bar ${level <= audioLevel ? 'active' : ''}`}
              style={{ height: `${8 + level * 3}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
