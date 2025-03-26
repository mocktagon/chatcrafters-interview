
import React, { useState } from 'react';
import TopBar from '@/components/TopBar';
import VideoPanels from '@/components/VideoPanels';
import TranscriptionPanel from '@/components/TranscriptionPanel';
import InsightsPanel from '@/components/InsightsPanel';
import BottomPanel from '@/components/BottomPanel';
import { useInterviewState } from '@/hooks/useInterviewState';
import { useMediaHandler } from '@/hooks/useMediaHandler';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import MobileLayout from '@/components/MobileLayout';

const Index = () => {
  const [interviewName] = useState("MBA Mock Interview L2");
  const isMobile = useIsMobile();

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
    isCameraActive,
    toggleMicrophone,
    toggleCamera
  } = useMediaHandler(handleAudioLevelChange);

  const handleNext = () => {
    toast.info("Moving to next question", {
      description: "AI will provide the next question in the interview sequence.",
      position: "bottom-right",
      duration: 5000,
    });
    
    // This would typically trigger the next AI question
    // For now, we'll just show a toast notification
  };
  
  // Render different layouts based on device
  if (isMobile) {
    return (
      <MobileLayout
        timer={timer}
        progress={progress}
        interviewName={interviewName}
        isRunning={isRunning}
        audioLevel={audioLevel}
        transcripts={transcripts}
        keywords={keywords}
        onAudioLevelChange={handleAudioLevelChange}
        isCameraEnabled={isCameraActive}
        isMicEnabled={isMicEnabled}
        onToggleMic={toggleMicrophone}
        onToggleCamera={toggleCamera}
        onEnd={handleEnd}
        onNext={handleNext}
        flags={flags}
      />
    );
  }
  
  // Desktop layout
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white pb-16">
      <TopBar timer={timer} progress={progress} interviewName={interviewName} />
      
      <div className="flex-grow p-3 grid grid-cols-12 gap-3">
        <div className="col-span-4">
          <VideoPanels 
            isRunning={isRunning} 
            progress={progress} 
            audioLevel={audioLevel}
            onAudioLevelChange={handleAudioLevelChange}
            isCameraEnabled={isCameraActive}
            onToggleCamera={toggleCamera}
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
        isCameraEnabled={isCameraActive}
        onToggleMic={toggleMicrophone}
        onToggleCamera={toggleCamera}
        onEnd={handleEnd}
      />
      
      <InsightsPanel flags={flags} />
    </div>
  );
};

export default Index;
