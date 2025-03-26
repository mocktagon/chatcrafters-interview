
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Bot, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TranscriptionPanelProps {
  transcripts: Array<{
    id: number;
    text: string;
    speaker: 'ai' | 'user';
    timestamp: string;
  }>;
  keywords: string[];
  onNext?: () => void;
}

const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({ 
  transcripts, 
  keywords, 
  onNext = () => {}
}) => {
  return (
    <Card className="h-full glass-panel dark bg-[#111111] border border-[#333333]/20 shadow-md">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="mb-3">
          <h3 className="text-md font-semibold text-slate-200 flex items-center">
            <Activity className="w-4 h-4 mr-2 text-amber-400" />
            Conversation
          </h3>
        </div>
        <ScrollArea className="flex-grow">
          <div className="bg-black/60 rounded-lg p-4 border border-zinc-800/50 min-h-[90%] backdrop-blur-sm">
            {transcripts.length === 0 ? (
              <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                Interview transcription will appear here...
              </div>
            ) : (
              <div className="space-y-5">
                {transcripts.map((item) => (
                  <div key={item.id} className="animate-scale-in transition-all duration-300 hover:translate-y-[-1px]">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {item.speaker === 'ai' ? (
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center mr-2">
                              <Bot className="w-3 h-3 text-amber-400" />
                            </div>
                            <span className="text-sm font-medium text-amber-400">AI Interviewer</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center mr-2">
                              <User className="w-3 h-3 text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-purple-400">You</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{item.timestamp}</span>
                    </div>
                    <p className="text-base text-slate-300 leading-relaxed pl-8">
                      {item.text}
                    </p>
                    {keywords.length > 0 && item.speaker === 'user' && (
                      <div className="mt-2 flex flex-wrap gap-1 pl-8">
                        {keywords.map((keyword, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/10">
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-3 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            onClick={onNext}
          >
            Next <ArrowRight className="ml-1 w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptionPanel;
