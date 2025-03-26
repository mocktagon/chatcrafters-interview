
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VideoDisplay from './VideoDisplay';
import { Camera, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPanelsProps {
  isRunning: boolean;
  progress: number;
}

const VideoPanels: React.FC<VideoPanelsProps> = ({ isRunning, progress }) => {
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top panel - Candidate Video */}
      <Card className="h-1/2 glass-panel dark bg-[#1A1F2C] shadow-md border-[#7E69AB]/20">
        <CardContent className="p-2 h-full">
          <div className="rounded-lg overflow-hidden border border-slate-700/50 bg-slate-800/80 h-full relative backdrop-blur-sm">
            <VideoDisplay useAiAvatar={false} progress={0} />
            
            {/* Camera controls overlay */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-black/30 border-white/10 hover:bg-black/40 text-white"
              >
                <Camera className="w-4 h-4 mr-1" />
                <span className="text-xs">Camera</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-black/30 border-white/10 hover:bg-black/40 text-white"
              >
                {isRunning ? <Mic className="w-4 h-4 mr-1" /> : <MicOff className="w-4 h-4 mr-1" />}
                <span className="text-xs">Mic</span>
              </Button>
            </div>
            
            {/* Audio visualizer */}
            <div className="absolute bottom-4 right-4 flex justify-center">
              <div className="audio-visualizer flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-6 w-1 bg-[#9b87f5]/60 rounded-full"
                    style={{ 
                      height: `${Math.random() * 16 + 4}px`,
                      opacity: isRunning ? 1 : 0.4,
                      transition: 'height 0.2s ease-in-out'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bottom panel - AI Avatar */}
      <Card className="h-1/2 glass-panel dark bg-[#1A1F2C] shadow-md border-[#7E69AB]/20">
        <CardContent className="p-2 h-full">
          <div className="rounded-lg overflow-hidden border border-slate-700/50 bg-slate-800/80 h-full relative backdrop-blur-sm">
            <VideoDisplay useAiAvatar={true} progress={progress} />
            
            {/* Progress bar - modernized with glow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/40">
              <div 
                className="h-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-r-full shadow-[0_0_10px_rgba(155,135,245,0.5)]" 
                style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPanels;
