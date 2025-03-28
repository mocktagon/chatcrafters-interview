
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Transcription from './Transcription';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Transcript } from '@/types/interview';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatInput from './ChatInput';

interface TranscriptionPanelProps {
  transcripts: Transcript[];
  keywords?: string[];
  onNext: () => void;
}

const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({ 
  transcripts, 
  keywords = [],
  onNext
}) => {
  const [isAttaching, setIsAttaching] = useState(false);
  
  const handleSendMessage = (message: string, attachment?: File) => {
    // In a real application, this would send the message to the backend
    // For now, we'll just log it to the console
    console.log('Message sent:', message, attachment);
  };

  return (
    <Card className="h-full glass-panel bg-zinc-950 border-zinc-800 shadow-md flex flex-col">
      <CardHeader className="pb-0 px-4 pt-3 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-zinc-100">
          Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-3.5rem)] pt-3 px-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-2 mb-3">
          <Transcription transcripts={transcripts} keywords={keywords} />
        </ScrollArea>
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          isAttaching={isAttaching}
          setIsAttaching={setIsAttaching}
        />
        
        <div className="flex justify-end pt-2">
          <Button 
            onClick={onNext} 
            className="bg-purple-600 hover:bg-purple-700 text-zinc-100"
            size="sm"
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptionPanel;
