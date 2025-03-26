
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Sigma, Sparkles } from 'lucide-react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface InsightsPanelProps {
  flags: Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  sentiment: 'positive' | 'neutral' | 'negative';
  insightScore: number;
  isRunning: boolean;
  transcripts: Array<{
    id: number;
    text: string;
    speaker: 'ai' | 'user';
    timestamp: string;
  }>;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ 
  flags, 
  sentiment, 
  insightScore, 
  isRunning,
  transcripts
}) => {
  return (
    <ResizablePanelGroup direction="vertical">
      {/* Top panel - Red Flags */}
      <ResizablePanel defaultSize={60}>
        <Card className="h-full glass-panel dark">
          <CardContent className="p-4 h-full">
            <h3 className="text-md font-semibold flex items-center text-slate-200 mb-3">
              <span className="h-3.5 w-3.5 mr-1.5 text-interview-red">🚩</span>
              Insights
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
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Bottom panel - Analytics Dashboard */}
      <ResizablePanel defaultSize={40}>
        <Card className="h-full glass-panel dark">
          <CardContent className="p-4 h-full">
            <h3 className="text-md font-semibold flex items-center text-slate-200 mb-3">
              <Brain className="w-4 h-4 mr-2 text-purple-400" />
              AI Analysis
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Sentiment</span>
                  <div className={`h-2 w-2 rounded-full ${
                    sentiment === 'positive' ? 'bg-green-400' : 
                    sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                  }`}></div>
                </div>
                <p className="text-lg font-medium text-slate-200 capitalize mt-1">{sentiment}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Insight Score</span>
                  <Sigma className="h-3 w-3 text-blue-400" />
                </div>
                <p className="text-lg font-medium text-slate-200 mt-1">{insightScore}/100</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 h-[calc(100%-7rem)]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">AI Summary</span>
                <Sparkles className="h-3 w-3 text-amber-400" />
              </div>
              {isRunning ? (
                <div className="animate-pulse space-y-2 mt-2">
                  <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                  <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                </div>
              ) : (
                <p className="text-sm text-slate-300 mt-1">
                  {transcripts.length > 1 ? 
                  "The candidate demonstrates some experience with project management and teamwork, but could provide more specific metrics and concrete examples." : 
                  "Start the interview to generate an AI summary."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default InsightsPanel;
