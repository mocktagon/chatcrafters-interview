
import React, { useRef, useEffect } from 'react';
import { Transcript } from '@/types/interview';

interface TranscriptionProps {
  transcripts: Transcript[];
  keywords?: string[];
}

const Transcription: React.FC<TranscriptionProps> = ({ transcripts, keywords = [] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcripts]);
  
  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-semibold text-zinc-300 mb-3">
        Transcription
      </h3>
      <div 
        ref={scrollRef}
        className="h-[220px] overflow-y-auto custom-scrollbar bg-zinc-950 rounded-lg p-3"
      >
        {transcripts.length === 0 ? (
          <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
            Interview transcription will appear here...
          </div>
        ) : (
          <div className="space-y-4">
            {transcripts.map((item) => (
              <div key={item.id} className="animate-scale-in">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${
                    item.speaker === 'ai' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {item.speaker === 'ai' ? 'AI Interviewer' : 'You'}
                  </span>
                  <span className="text-xs text-zinc-500">{item.timestamp}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
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
