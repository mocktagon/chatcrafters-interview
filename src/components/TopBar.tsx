
import React from 'react';
import { Clock, Settings } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface TopBarProps {
  timer: string;
  progress?: number;
  interviewName?: string;
}

const TopBar: React.FC<TopBarProps> = ({ timer, progress = 0, interviewName = "Product Manager Interview" }) => {
  return (
    <div className="h-16 px-8 flex items-center justify-between animate-fade-in bg-zinc-950 backdrop-blur-sm border-b border-zinc-800/50">
      <div className="flex items-center">
        <div className="text-xl font-semibold text-zinc-100">
          {interviewName}
        </div>
      </div>
      
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-3 w-80">
          <Progress 
            value={35} 
            className="h-3 bg-zinc-800" 
            indicatorClass="bg-purple-500" 
          />
          <span className="text-xs text-zinc-400 min-w-[40px] text-right">35%</span>
        </div>
        <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
          <Settings className="h-5 w-5 text-zinc-100" />
        </button>
        <div className="flex items-center space-x-2 text-zinc-100 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800/50">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{timer}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
