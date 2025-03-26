
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900/40">
      <div 
        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
        style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
      />
    </div>
  );
};

export default ProgressBar;
