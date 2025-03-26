
import React from 'react';
import { Clock, Download, BarChart, Settings } from 'lucide-react';

interface TopBarProps {
  timer: string;
}

const TopBar: React.FC<TopBarProps> = ({ timer }) => {
  return (
    <div className="h-16 px-6 flex items-center justify-between animate-fade-in bg-white/80 backdrop-blur-sm border-b border-interview-border">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-interview-darkText">
          Interview<span className="text-interview-blue">AI</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <BarChart className="h-5 w-5 text-interview-darkText" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Download className="h-5 w-5 text-interview-darkText" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings className="h-5 w-5 text-interview-darkText" />
        </button>
        <div className="flex items-center space-x-2 text-interview-darkText bg-white px-3 py-1.5 rounded-full border border-interview-border">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{timer}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
