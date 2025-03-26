
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Flag, Mic, Play, Pause, StopCircle } from 'lucide-react';

interface InsightsPanelProps {
  flags: Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onEnd: () => void;
  audioLevel: number;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ 
  flags, 
  isRunning,
  onStart,
  onPause,
  onEnd,
  audioLevel
}) => {
  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top panel - Controls */}
      <Card className="glass-panel dark bg-[#1A1F2C]">
        <CardContent className="p-4">
          <h3 className="text-md font-semibold flex items-center text-slate-200 mb-4">
            Interview Controls
          </h3>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={isRunning ? onPause : onStart}
              className={isRunning ? "bg-amber-600 hover:bg-amber-700" : "bg-[#9b87f5] hover:bg-[#7E69AB]"}
              size="lg"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause Interview
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Interview
                </>
              )}
            </Button>
            
            <Button 
              onClick={onEnd}
              variant="destructive"
              size="lg"
            >
              <StopCircle className="w-5 h-5" />
              End Interview
            </Button>
            
            <div className="flex items-center justify-between mt-2 px-2">
              <span className="text-sm text-slate-400">Audio Level</span>
              <div className="flex items-center space-x-2">
                <Mic className="h-4 w-4 text-slate-400" />
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
          </div>
        </CardContent>
      </Card>
      
      {/* Bottom panel - Red Flags */}
      <Card className="glass-panel dark bg-[#1A1F2C] flex-grow">
        <CardContent className="p-4 h-full">
          <h3 className="text-md font-semibold flex items-center text-slate-200 mb-3">
            <Flag className="w-4 h-4 mr-2 text-interview-red" />
            Interview Insights
          </h3>
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700 min-h-[90%]">
              {flags.length === 0 ? (
                <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                  Interview insights will appear here...
                </div>
              ) : (
                <div className="space-y-4">
                  {flags.map((flag) => (
                    <div 
                      key={flag.id} 
                      className="p-3 rounded-md animate-scale-in"
                      style={{
                        backgroundColor: 
                          flag.severity === 'high' ? 'rgba(239, 68, 68, 0.15)' :
                          flag.severity === 'medium' ? 'rgba(245, 158, 11, 0.15)' :
                          'rgba(234, 179, 8, 0.15)'
                      }}
                    >
                      <div className="flex items-start">
                        <div
                          className="w-2 h-2 mt-1.5 rounded-full mr-2 flex-shrink-0"
                          style={{
                            backgroundColor:
                              flag.severity === 'high' ? '#ef4444' :
                              flag.severity === 'medium' ? '#f59e0b' :
                              '#eab308'
                          }}
                        />
                        <p className="text-sm text-slate-300">{flag.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
