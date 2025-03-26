
import React from 'react';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
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
    handleEnd
  } = useInterviewState();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
      <TopBar timer={timer} />
      
      <div className="flex-grow p-4">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)]">
          {/* First column: Video displays stacked vertically */}
          <VideoPanels isRunning={isRunning} progress={progress} />
          
          <ResizableHandle withHandle />
          
          {/* Second column - Transcriptions (Enlarged) */}
          <ResizablePanel defaultSize={45} minSize={30}>
            <TranscriptionPanel transcripts={transcripts} keywords={keywords} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Third column - Insights Dashboard */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <InsightsPanel 
              flags={flags} 
              sentiment={sentiment} 
              insightScore={insightScore} 
              isRunning={isRunning}
              transcripts={transcripts}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      <BottomBar
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onEnd={handleEnd}
        audioLevel={audioLevel}
      />
    </div>
  );
};

export default Index;
