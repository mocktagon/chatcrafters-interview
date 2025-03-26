
import React from 'react';
import InterviewControls from './InterviewControls';
import Transcription from './Transcription';
import RedFlags from './RedFlags';

interface ControlPanelProps {
  interviewType: string;
  setInterviewType: (type: string) => void;
  useAiAvatar: boolean;
  setUseAiAvatar: (useAi: boolean) => void;
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
  interviewType,
  setInterviewType,
  useAiAvatar,
  setUseAiAvatar,
  transcripts,
  flags
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-5 space-y-6 flex-grow overflow-y-auto custom-scrollbar">
        <InterviewControls
          interviewType={interviewType}
          setInterviewType={setInterviewType}
          useAiAvatar={useAiAvatar}
          setUseAiAvatar={setUseAiAvatar}
        />
        
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
