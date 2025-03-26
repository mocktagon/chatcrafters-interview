
import { useState, useEffect } from 'react';

interface Transcript {
  id: number;
  text: string;
  speaker: 'ai' | 'user';
  timestamp: string;
}

interface Flag {
  id: number;
  text: string;
  severity: 'low' | 'medium' | 'high';
}

export function useInterviewState() {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [interviewType] = useState('behavioral');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [flags, setFlags] = useState<Flag[]>([]);
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [insightScore, setInsightScore] = useState(0);

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
          
          // Update progress
          setProgress(Math.min(newSeconds / 180 * 100, 100));
          
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
    
    // Demo: Add sentiment analysis after 10 seconds
    const sentimentTimeout = setTimeout(() => {
      if (!isRunning) return;
      setSentiment('positive');
      setKeywords(['leadership', 'collaboration', 'problem-solving']);
      setInsightScore(78);
    }, 10000);
    
    return () => {
      clearTimeout(aiMessageTimeout);
      clearTimeout(userResponseTimeout);
      clearTimeout(redFlagTimeout);
      clearTimeout(followupTimeout);
      clearTimeout(highFlagTimeout);
      clearTimeout(sentimentTimeout);
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

  const handleAudioLevelChange = (level: number) => {
    setAudioLevel(level);
  };

  return {
    isRunning,
    timer,
    progress,
    audioLevel,
    interviewType,
    transcripts,
    flags,
    sentiment,
    keywords,
    insightScore,
    handleStart,
    handlePause,
    handleEnd,
    resetInterview,
    handleAudioLevelChange
  };
}
