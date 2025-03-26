
import { useState, useEffect } from 'react';
import { Transcript, Flag, SentimentType } from '../types/interview';
import { setupDemoData } from '../utils/demoInterviewData';
import { formatTimer, calculateProgress } from '../utils/timerUtils';

export function useInterviewState() {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState('00:00');
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [interviewType] = useState('behavioral');
  const [transcripts, setTranscripts] = useState<Transcript[]>([{
    id: 1,
    text: "Tell me about a challenging project you've worked on and how you overcame obstacles.",
    speaker: 'ai',
    timestamp: '00:00'
  }]);
  const [flags, setFlags] = useState<Flag[]>([]);
  const [sentiment, setSentiment] = useState<SentimentType>('neutral');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [insightScore, setInsightScore] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          setTimer(formatTimer(newSeconds));
          
          // Update progress
          setProgress(calculateProgress(newSeconds));
          
          return newSeconds;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  // Demo data effect
  useEffect(() => {
    if (!isRunning) return;
    
    const cleanupFn = setupDemoData(
      isRunning,
      setTranscripts,
      setFlags,
      setSentiment,
      setKeywords,
      setInsightScore,
      timer
    );
    
    return cleanupFn;
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
    setTranscripts([{
      id: 1,
      text: "Tell me about a challenging project you've worked on and how you overcame obstacles.",
      speaker: 'ai',
      timestamp: '00:00'
    }]);
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
