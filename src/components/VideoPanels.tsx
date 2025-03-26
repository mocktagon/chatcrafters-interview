
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import VideoDisplay from './VideoDisplay';

interface VideoPanelsProps {
  isRunning: boolean;
  progress: number;
}

const VideoPanels: React.FC<VideoPanelsProps> = ({ isRunning, progress }) => {
  return (
    <ResizablePanel defaultSize={25} minSize={20}>
      <ResizablePanelGroup direction="vertical">
        {/* Top panel - Candidate Video */}
        <ResizablePanel defaultSize={50}>
          <Card className="h-full glass-panel dark">
            <CardContent className="p-2 h-full">
              <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800 h-full relative">
                <VideoDisplay useAiAvatar={false} progress={0} />
                
                {/* Audio visualizer */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="audio-visualizer flex space-x-1">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-6 w-1 bg-slate-600 rounded-full"
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
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Bottom panel - AI Avatar */}
        <ResizablePanel defaultSize={50}>
          <Card className="h-full glass-panel dark">
            <CardContent className="p-2 h-full">
              <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800 h-full relative">
                <VideoDisplay useAiAvatar={true} progress={progress} />
                
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 progress-bar bg-slate-700">
                  <div 
                    className="progress-bar-inner bg-interview-blue" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  );
};

export default VideoPanels;
