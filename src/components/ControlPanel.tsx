
import React from 'react';
import Transcription from './Transcription';
import RedFlags from './RedFlags';

interface ControlPanelProps {
  transcripts: Array<{
    id: number;
    text: string;
    speaker: 'ai' | 'user';
    timestamp: string;
  }>;
  flags: Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  transcripts,
  flags
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-5 space-y-6 flex-grow overflow-y-auto custom-scrollbar">
        <div className="pt-2">
          <Transcription transcripts={transcripts} />
        </div>
        
        <div className="pt-2">
          <RedFlags flags={flags} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
