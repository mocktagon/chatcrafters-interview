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
  const [interviewName] = useState("MBA Mock Interview L2");

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white pb-16">
      <TopBar timer={timer} progress={progress} interviewName={interviewName} />
      
      <div className="flex-grow p-4 grid grid-cols-12 gap-4">
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
        
        <div className="col-span-8">
          <TranscriptionPanel 
            transcripts={transcripts} 
            keywords={keywords}
            onNext={handleNext} 
          />
        </div>
      </div>
      
      <BottomPanel 
        isRunning={isRunning}
        audioLevel={audioLevel}
        isMicEnabled={isMicEnabled}
        isCameraEnabled={isCameraEnabled}
        onToggleMic={handleToggleMic}
        onToggleCamera={handleToggleCamera}
        onEnd={handleEnd}
      />
      
      <InsightsPanel flags={flags} />
    </div>
  );
};

export default Index;
