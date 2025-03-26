
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
      <Card className="bg-zinc-900 border border-zinc-800 shadow-lg">
        <CardContent className="p-4">
          <h3 className="text-md font-semibold flex items-center text-white mb-4">
            Interview Controls
          </h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button 
                onClick={isRunning ? onPause : onStart}
                variant="default"
                size="lg"
                className={isRunning 
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transition-all flex-1" 
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm transition-all flex-1"}
              >
                {isRunning ? (
                  <Pause className="w-5 h-5 stroke-[2.5px]" />
                ) : (
                  <Play className="w-5 h-5 stroke-[2.5px]" />
                )}
              </Button>
              
              <Button 
                onClick={onEnd}
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all shadow-sm flex-1"
              >
                <StopCircle className="w-5 h-5 stroke-[2.5px]" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 px-2">
              <span className="text-sm text-zinc-400">Audio Level</span>
              <div className="flex items-center space-x-2">
                <Mic className="h-4 w-4 text-zinc-400" />
                <div className="audio-level-indicator">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level}
                      className={`audio-level-bar ${level <= audioLevel ? 'active' : ''}`}
                      style={{ 
                        height: `${8 + level * 3}px`,
                        backgroundColor: level <= audioLevel ? (
                          level > 3 ? '#ef4444' : level > 1 ? '#ffffff' : '#ffffff'
                        ) : 'rgba(161, 161, 170, 0.4)'
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
      <Card className="bg-zinc-900 border border-zinc-800 flex-grow shadow-lg">
        <CardContent className="p-4 h-full">
          <h3 className="text-md font-semibold flex items-center text-white mb-3">
            <Flag className="w-4 h-4 mr-2 text-red-500" />
            Interview Insights
          </h3>
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="bg-black/20 rounded-lg p-4 border border-zinc-800 min-h-[90%]">
              {flags.length === 0 ? (
                <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
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
                          <p className="text-sm text-zinc-300">{flag.text}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
