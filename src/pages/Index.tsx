
import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import ControlPanel from '@/components/ControlPanel';
import VideoDisplay from '@/components/VideoDisplay';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  // Fixed interview type - no longer selectable
  const interviewType = 'behavioral';
  
  // Sample transcript data
  const [transcripts, setTranscripts] = useState<Array<{
    id: number;
    text: string;
    speaker: 'ai' | 'user';
    timestamp: string;
  }>>([]);
  
  // Sample red flags data
  const [flags, setFlags] = useState<Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>>([]);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          const minutes = Math.floor(newSeconds / 60);
          const remainingSeconds = newSeconds % 60;
          setTimer(`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`);
          
          // Demo: Update progress (in a real app, this would be based on interview duration)
          setProgress(Math.min(newSeconds / 180 * 100, 100));
          
          // Demo: Random audio level
          setAudioLevel(Math.floor(Math.random() * 5) + 1);
          
          return newSeconds;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  // Demo data effect - adds sample transcripts and flags when interview is running
  useEffect(() => {
    if (!isRunning) return;
    
    // Demo: Add sample AI message after 3 seconds
    const aiMessageTimeout = setTimeout(() => {
      if (!isRunning) return;
      
      setTranscripts(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Tell me about a challenging project you've worked on and how you overcame obstacles.",
          speaker: 'ai',
          timestamp: timer
        }
      ]);
    }, 3000);
    
    // Demo: Add sample user response after 8 seconds
    const userResponseTimeout = setTimeout(() => {
      if (!isRunning) return;
      
      setTranscripts(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "In my previous role, I led a team that was tasked with migrating our legacy system to a modern architecture...",
          speaker: 'user',
          timestamp: timer
        }
      ]);
    }, 8000);
    
    // Demo: Add sample red flag after 12 seconds
    const redFlagTimeout = setTimeout(() => {
      if (!isRunning) return;
      
      setFlags(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Candidate used vague descriptions without specific metrics or outcomes",
          severity: 'medium'
        }
      ]);
    }, 12000);
    
    // Demo: Add another AI message after 15 seconds
    const followupTimeout = setTimeout(() => {
      if (!isRunning) return;
      
      setTranscripts(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "That's interesting. Could you share some specific metrics that demonstrate the impact of your solution?",
          speaker: 'ai',
          timestamp: timer
        }
      ]);
    }, 15000);
    
    // Demo: Add a high severity flag after 20 seconds
    const highFlagTimeout = setTimeout(() => {
      if (!isRunning) return;
      
      setFlags(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Candidate showed signs of exaggeration when discussing their role in the project",
          severity: 'high'
        }
      ]);
    }, 20000);
    
    return () => {
      clearTimeout(aiMessageTimeout);
      clearTimeout(userResponseTimeout);
      clearTimeout(redFlagTimeout);
      clearTimeout(followupTimeout);
      clearTimeout(highFlagTimeout);
    };
  }, [isRunning, timer]);
  
  const handleStart = () => {
    setIsRunning(true);
  };
  
  const handlePause = () => {
    setIsRunning(false);
  };
  
  const handleEnd = () => {
    setIsRunning(false);
    
    // Demo: Add a final message when interview ends
    if (transcripts.length > 0) {
      setTranscripts(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Thank you for your time. The interview has been completed and will be analyzed.",
          speaker: 'ai',
          timestamp: timer
        }
      ]);
    }
  };
  
  const resetInterview = () => {
    setSeconds(0);
    setTimer('00:00');
    setProgress(0);
    setTranscripts([]);
    setFlags([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-interview-lightBg">
      <TopBar timer={timer} />
      
      <div className="flex-grow p-4">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)]">
          {/* Left panel - Candidate Video */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Card className="h-full glass-panel overflow-hidden">
              <CardContent className="p-2 h-full">
                <div className="rounded-lg overflow-hidden border border-interview-border bg-gray-50 h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-interview-blue/10 flex items-center justify-center mx-auto">
                        <VideoDisplay useAiAvatar={false} progress={0} />
                      </div>
                      <p className="text-interview-darkText text-sm font-medium mt-4">You</p>
                      <p className="text-interview-lightText text-xs">Camera preview</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Second panel - AI Avatar */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Card className="h-full glass-panel overflow-hidden">
              <CardContent className="p-2 h-full">
                <div className="rounded-lg overflow-hidden border border-interview-border bg-gray-50 h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-interview-blue/10 flex items-center justify-center mx-auto animate-pulse-subtle">
                        <VideoDisplay useAiAvatar={true} progress={progress} />
                      </div>
                      <p className="text-interview-darkText text-sm font-medium mt-4">AI Interviewer</p>
                      <p className="text-interview-lightText text-xs">
                        {isRunning ? "Speaking..." : "Waiting to start"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 progress-bar">
                    <div 
                      className="progress-bar-inner" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Third panel - Transcriptions (Enlarged) */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <Card className="h-full glass-panel overflow-hidden">
              <CardContent className="p-4 h-full">
                <h3 className="text-md font-semibold text-interview-darkText mb-3">
                  Transcription
                </h3>
                <ScrollArea className="h-[calc(100%-2rem)]">
                  <div className="bg-white/60 rounded-lg p-4 border border-interview-border min-h-[90%]">
                    {transcripts.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-interview-lightText text-sm">
                        Interview transcription will appear here...
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {transcripts.map((item) => (
                          <div key={item.id} className="animate-scale-in">
                            <div className="flex justify-between items-center mb-2">
                              <span className={`text-sm font-medium ${
                                item.speaker === 'ai' ? 'text-interview-blue' : 'text-interview-green'
                              }`}>
                                {item.speaker === 'ai' ? 'AI Interviewer' : 'You'}
                              </span>
                              <span className="text-xs text-interview-lightText">{item.timestamp}</span>
                            </div>
                            <p className="text-base text-interview-darkText leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Fourth panel - Red Flags and Insights */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <Card className="h-full glass-panel overflow-hidden">
              <CardContent className="p-4 h-full">
                <h3 className="text-md font-semibold flex items-center text-interview-darkText mb-3">
                  <span className="h-3.5 w-3.5 mr-1.5 text-interview-red">🚩</span>
                  Insights
                </h3>
                <ScrollArea className="h-[calc(100%-2rem)]">
                  <div className="bg-white/60 rounded-lg p-4 border border-interview-border min-h-[90%]">
                    {flags.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-interview-lightText text-sm">
                        Interview insights will appear here...
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {flags.map((flag) => (
                          <div 
                            key={flag.id} 
                            className="p-3 rounded-md animate-scale-in"
                            style={{
                              backgroundColor: 
                                flag.severity === 'high' ? 'rgba(255, 59, 48, 0.1)' :
                                flag.severity === 'medium' ? 'rgba(255, 149, 0, 0.1)' :
                                'rgba(255, 204, 0, 0.1)'
                            }}
                          >
                            <div className="flex items-start">
                              <div
                                className="w-2 h-2 mt-1.5 rounded-full mr-2 flex-shrink-0"
                                style={{
                                  backgroundColor:
                                    flag.severity === 'high' ? '#FF3B30' :
                                    flag.severity === 'medium' ? '#FF9500' :
                                    '#FFCC00'
                                }}
                              />
                              <p className="text-sm text-interview-darkText">{flag.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
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
