
import React from 'react';
import TopBar from '@/components/TopBar';
import VideoPanels from '@/components/VideoPanels';
import TranscriptionPanel from '@/components/TranscriptionPanel';
import InsightsPanel from '@/components/InsightsPanel';
import { useInterviewState } from '@/hooks/useInterviewState';

const Index = () => {
  const {
    isRunning,
    timer,
    progress,
    audioLevel,
    transcripts,
    flags,
    sentiment,
    keywords,
    insightScore,
    handleStart,
    handlePause,
    handleEnd,
    handleAudioLevelChange
  } = useInterviewState();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-black to-zinc-900 text-white">
      <TopBar timer={timer} />
      
      <div className="flex-grow p-4 grid grid-cols-12 gap-4">
        {/* First column: Video displays stacked vertically (3 cols) */}
        <div className="col-span-3">
          <VideoPanels 
            isRunning={isRunning} 
            progress={progress} 
            audioLevel={audioLevel}
            onAudioLevelChange={handleAudioLevelChange}
          />
        </div>
        
        {/* Second column: Transcriptions (Enlarged) (6 cols) */}
        <div className="col-span-6">
          <TranscriptionPanel transcripts={transcripts} keywords={keywords} />
        </div>
        
        {/* Third column: Controls and Insights (3 cols) */}
        <div className="col-span-3">
          <InsightsPanel 
            flags={flags} 
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onEnd={handleEnd}
            audioLevel={audioLevel}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
