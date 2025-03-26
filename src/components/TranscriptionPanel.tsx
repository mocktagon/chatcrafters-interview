
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Transcription from './Transcription';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Transcript } from '@/types/interview';

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
  return (
    <Card className="h-full glass-panel bg-zinc-950 border-zinc-800 shadow-md">
      <CardHeader className="pb-0 px-4 pt-3">
        <CardTitle className="text-lg font-semibold text-zinc-100">
          Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-3.5rem)] pt-3 px-4">
        <div className="flex-grow overflow-y-auto pr-2 space-y-2">
          <Transcription transcripts={transcripts} keywords={keywords} />
        </div>
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
