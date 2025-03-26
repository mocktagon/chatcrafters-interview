
import React, { useRef, useEffect } from 'react';

interface TranscriptionProps {
  transcripts: Array<{
    id: number;
    text: string;
    speaker: 'ai' | 'user';
    timestamp: string;
  }>;
}

const Transcription: React.FC<TranscriptionProps> = ({ transcripts }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcripts]);
  
  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-semibold text-interview-darkText mb-3">
        Transcription
      </h3>
      <div 
        ref={scrollRef}
        className="h-[220px] overflow-y-auto custom-scrollbar bg-white/60 rounded-lg p-3 border border-interview-border"
      >
        {transcripts.length === 0 ? (
          <div className="flex h-full items-center justify-center text-interview-lightText text-sm">
            Interview transcription will appear here...
          </div>
        ) : (
          <div className="space-y-4">
            {transcripts.map((item) => (
              <div key={item.id} className="animate-scale-in">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${
                    item.speaker === 'ai' ? 'text-interview-blue' : 'text-interview-green'
                  }`}>
                    {item.speaker === 'ai' ? 'AI Interviewer' : 'You'}
                  </span>
                  <span className="text-xs text-interview-lightText">{item.timestamp}</span>
                </div>
                <p className="text-sm text-interview-darkText leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transcription;
