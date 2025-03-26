
import React, { useState } from 'react';
import TopBar from '@/components/TopBar';
import VideoPanels from '@/components/VideoPanels';
import TranscriptionPanel from '@/components/TranscriptionPanel';
import InsightsPanel from '@/components/InsightsPanel';
import BottomPanel from '@/components/BottomPanel';
import { useInterviewState } from '@/hooks/useInterviewState';
import { useMediaHandler } from '@/hooks/useMediaHandler';
import { toast } from 'sonner';

const Index = () => {
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

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
  
  const {
    hasMicPermission,
    isMicEnabled,
    toggleMicrophone
  } = useMediaHandler(handleAudioLevelChange);

  const handleToggleMic = () => {
    toggleMicrophone();
  };

  const handleToggleCamera = () => {
    setIsCameraEnabled(!isCameraEnabled);
  };
  
  const handleNext = () => {
    toast.info("Moving to next question", {
      description: "AI will provide the next question in the interview sequence.",
      position: "bottom-right"
    });
    
    // This would typically trigger the next AI question
    // For now, we'll just show a toast notification
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-black to-zinc-900 text-white pb-16">
      <TopBar timer={timer} progress={progress} />
      
      <div className="flex-grow p-4 grid grid-cols-12 gap-4">
        {/* First column: Video displays stacked vertically (4 cols) */}
        <div className="col-span-4">
          <VideoPanels 
            isRunning={isRunning} 
            progress={progress} 
            audioLevel={audioLevel}
            onAudioLevelChange={handleAudioLevelChange}
            isCameraEnabled={isCameraEnabled}
            onToggleCamera={handleToggleCamera}
          />
        </div>
        
        {/* Second column: Transcriptions (Enlarged) (8 cols) */}
        <div className="col-span-8">
          <TranscriptionPanel 
            transcripts={transcripts} 
            keywords={keywords}
            onNext={handleNext} 
          />
        </div>
      </div>
      
      {/* Bottom panel with controls */}
      <BottomPanel 
        isRunning={isRunning}
        audioLevel={audioLevel}
        isMicEnabled={isMicEnabled}
        isCameraEnabled={isCameraEnabled}
        onToggleMic={handleToggleMic}
        onToggleCamera={handleToggleCamera}
        onEnd={handleEnd}
      />
      
      {/* Invisible component that handles showing insight toasts */}
      <InsightsPanel flags={flags} />
    </div>
  );
};

export default Index;
