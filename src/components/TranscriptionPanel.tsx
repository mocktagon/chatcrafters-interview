
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
    <Card className="h-full glass-panel bg-zinc-900 border-zinc-800 shadow-md">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-semibold">
          Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-4rem)] pt-4">
        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          <Transcription transcripts={transcripts} keywords={keywords} />
        </div>
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onNext} 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
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
