
import React from 'react';
import { Clock } from 'lucide-react';

interface TopBarProps {
  timer: string;
}

const TopBar: React.FC<TopBarProps> = ({ timer }) => {
  return (
    <div className="h-16 px-6 flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-interview-darkText">
          Interview<span className="text-interview-blue">AI</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-interview-darkText">
        <Clock className="h-4 w-4" />
        <span className="font-medium">{timer}</span>
      </div>
    </div>
  );
};

export default TopBar;
