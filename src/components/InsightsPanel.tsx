
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Flag, Play, Pause, StopCircle, Mic, ChevronRight } from 'lucide-react';

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
      <Card className="glass-panel dark bg-[#1A1F2C] border border-[#7E69AB]/20 shadow-md">
        <CardContent className="p-4">
          <h3 className="text-md font-semibold flex items-center text-slate-200 mb-4">
            Interview Controls
          </h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button 
                onClick={isRunning ? onPause : onStart}
                className={isRunning 
                  ? "bg-amber-600 hover:bg-amber-700 transition-all duration-300 flex-1" 
                  : "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8a76e4] hover:to-[#6d5a9c] transition-all duration-300 shadow-[0_4px_12px_rgba(155,135,245,0.3)] flex-1"}
                size="lg"
              >
                {isRunning ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              
              <Button 
                onClick={onEnd}
                variant="destructive"
                size="lg"
                className="hover:bg-red-700 transition-all duration-300 shadow-sm flex-1"
              >
                <StopCircle className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 px-2">
              <span className="text-sm text-slate-400">Audio Level</span>
              <div className="flex items-center space-x-2">
                <Mic className="h-4 w-4 text-slate-400" />
                <div className="audio-level-indicator">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level}
                      className={`audio-level-bar ${level <= audioLevel ? 'active' : ''}`}
                      style={{ 
                        height: `${8 + level * 3}px`,
                        backgroundColor: level <= audioLevel ? (
                          level > 3 ? '#FF3B30' : level > 1 ? '#9b87f5' : '#9b87f5'
                        ) : 'rgba(100, 116, 139, 0.4)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bottom panel - Red Flags */}
      <Card className="glass-panel dark bg-[#1A1F2C] flex-grow border border-[#7E69AB]/20 shadow-md">
        <CardContent className="p-4 h-full">
          <h3 className="text-md font-semibold flex items-center text-slate-200 mb-3">
            <Flag className="w-4 h-4 mr-2 text-interview-red" />
            Interview Insights
          </h3>
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50 min-h-[90%] backdrop-blur-sm">
              {flags.length === 0 ? (
                <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                  Interview insights will appear here...
                </div>
              ) : (
                <div className="space-y-4">
                  {flags.map((flag) => (
                    <div 
                      key={flag.id} 
                      className="p-3 rounded-md animate-scale-in transition-all duration-300 hover:translate-y-[-2px] group cursor-pointer"
                      style={{
                        backgroundColor: 
                          flag.severity === 'high' ? 'rgba(239, 68, 68, 0.15)' :
                          flag.severity === 'medium' ? 'rgba(245, 158, 11, 0.15)' :
                          'rgba(234, 179, 8, 0.15)',
                        boxShadow: flag.severity === 'high' ? '0 2px 8px rgba(239, 68, 68, 0.1)' : 'none'
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
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
                        <ChevronRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
