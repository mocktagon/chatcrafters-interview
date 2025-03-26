
import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import ControlPanel from '@/components/ControlPanel';
import VideoDisplay from '@/components/VideoDisplay';

const Index = () => {
  const [interviewType, setInterviewType] = useState('behavioral');
  const [useAiAvatar, setUseAiAvatar] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
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
      
      <div className="flex-grow flex">
        {/* Left panel */}
        <div className="w-1/3 p-4 border-r border-interview-border">
          <div className="h-full glass-panel p-1">
            <ControlPanel
              interviewType={interviewType}
              setInterviewType={setInterviewType}
              useAiAvatar={useAiAvatar}
              setUseAiAvatar={setUseAiAvatar}
              transcripts={transcripts}
              flags={flags}
            />
          </div>
        </div>
        
        {/* Right panel */}
        <div className="w-2/3 p-4">
          <div className="h-full glass-panel p-1">
            <VideoDisplay 
              useAiAvatar={useAiAvatar}
              progress={progress}
            />
          </div>
        </div>
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
