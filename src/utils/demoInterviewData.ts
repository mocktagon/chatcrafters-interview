
import { Transcript, Flag } from '../types/interview';

export function setupDemoData(
  isRunning: boolean,
  setTranscripts: React.Dispatch<React.SetStateAction<Transcript[]>>,
  setFlags: React.Dispatch<React.SetStateAction<Flag[]>>,
  setSentiment: React.Dispatch<React.SetStateAction<'positive' | 'neutral' | 'negative'>>,
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>,
  setInsightScore: React.Dispatch<React.SetStateAction<number>>,
  timer: string
) {
  if (!isRunning) return;
  
  const timeouts: NodeJS.Timeout[] = [];
  
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
  timeouts.push(aiMessageTimeout);
  
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
  timeouts.push(userResponseTimeout);
  
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
  timeouts.push(redFlagTimeout);
  
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
  timeouts.push(followupTimeout);
  
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
  timeouts.push(highFlagTimeout);
  
  // Demo: Add sentiment analysis after 10 seconds
  const sentimentTimeout = setTimeout(() => {
    if (!isRunning) return;
    setSentiment('positive');
    setKeywords(['leadership', 'collaboration', 'problem-solving']);
    setInsightScore(78);
  }, 10000);
  timeouts.push(sentimentTimeout);
  
  return () => {
    timeouts.forEach(timeout => clearTimeout(timeout));
  };
}
