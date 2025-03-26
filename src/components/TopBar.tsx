
import React from 'react';
import { Clock, Download, BarChart, Settings } from 'lucide-react';

interface TopBarProps {
  timer: string;
}

const TopBar: React.FC<TopBarProps> = ({ timer }) => {
  return (
    <div className="h-16 px-6 flex items-center justify-between animate-fade-in bg-black/80 backdrop-blur-sm border-b border-zinc-800/50">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-white">
          Interview<span className="text-gradient-to-r from-amber-400 to-orange-500">AI</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-zinc-800/50 transition-colors">
          <BarChart className="h-5 w-5 text-slate-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-800/50 transition-colors">
          <Download className="h-5 w-5 text-slate-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-800/50 transition-colors">
          <Settings className="h-5 w-5 text-slate-300" />
        </button>
        <div className="flex items-center space-x-2 text-white bg-black/50 px-3 py-1.5 rounded-full border border-zinc-800/50">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{timer}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
