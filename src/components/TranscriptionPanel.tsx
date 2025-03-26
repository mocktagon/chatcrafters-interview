
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Bot, User } from 'lucide-react';

interface TranscriptionPanelProps {
  transcripts: Array<{
    id: number;
    text: string;
    speaker: 'ai' | 'user';
    timestamp: string;
  }>;
  keywords: string[];
}

const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({ transcripts, keywords }) => {
  return (
    <Card className="h-full glass-panel dark bg-[#1A1F2C] border border-[#7E69AB]/20 shadow-md">
      <CardContent className="p-4 h-full">
        <h3 className="text-md font-semibold text-slate-200 mb-3 flex items-center">
          <Activity className="w-4 h-4 mr-2 text-[#9b87f5]" />
          Conversation
        </h3>
        <ScrollArea className="h-[calc(100%-2rem)]">
          <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50 min-h-[90%] backdrop-blur-sm">
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
                            <div className="w-6 h-6 rounded-full bg-[#9b87f5]/10 flex items-center justify-center mr-2">
                              <Bot className="w-3 h-3 text-[#9b87f5]" />
                            </div>
                            <span className="text-sm font-medium text-[#9b87f5]">AI Interviewer</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-interview-green/10 flex items-center justify-center mr-2">
                              <User className="w-3 h-3 text-interview-green" />
                            </div>
                            <span className="text-sm font-medium text-interview-green">You</span>
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
                          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-[#7E69AB]/20 text-[#D6BCFA] border border-[#7E69AB]/10">
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
      </CardContent>
    </Card>
  );
};

export default TranscriptionPanel;
