import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import BottomBar from '@/components/BottomBar';
import ControlPanel from '@/components/ControlPanel';
import VideoDisplay from '@/components/VideoDisplay';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Brain, Sigma, Sparkles } from 'lucide-react';

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
  
  // Add sentiment analysis state
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
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
      <TopBar timer={timer} />
      
      <div className="flex-grow p-4">
        <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)]">
          {/* First column: Video displays stacked vertically */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <ResizablePanelGroup direction="vertical">
              {/* Top panel - Candidate Video */}
              <ResizablePanel defaultSize={50}>
                <Card className="h-full glass-panel dark">
                  <CardContent className="p-2 h-full">
                    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800 h-full relative">
                      <VideoDisplay useAiAvatar={false} progress={0} />
                      
                      {/* Audio visualizer */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <div className="audio-visualizer flex space-x-1">
                          {[...Array(8)].map((_, i) => (
                            <div 
                              key={i} 
                              className="h-6 w-1 bg-slate-600 rounded-full"
                              style={{ 
                                height: `${Math.random() * 16 + 4}px`,
                                opacity: isRunning ? 1 : 0.4,
                                transition: 'height 0.2s ease-in-out'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Bottom panel - AI Avatar */}
              <ResizablePanel defaultSize={50}>
                <Card className="h-full glass-panel dark">
                  <CardContent className="p-2 h-full">
                    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800 h-full relative">
                      <VideoDisplay useAiAvatar={true} progress={progress} />
                      
                      {/* Progress bar */}
                      <div className="absolute bottom-0 left-0 right-0 progress-bar bg-slate-700">
                        <div 
                          className="progress-bar-inner bg-interview-blue" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Second column - Transcriptions (Enlarged) */}
          <ResizablePanel defaultSize={45} minSize={30}>
            <Card className="h-full glass-panel dark">
              <CardContent className="p-4 h-full">
                <h3 className="text-md font-semibold text-slate-200 mb-3 flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-interview-blue" />
                  Conversation
                </h3>
                <ScrollArea className="h-[calc(100%-2rem)]">
                  <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700 min-h-[90%]">
                    {transcripts.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-slate-500 text-sm">
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
                              <span className="text-xs text-slate-500">{item.timestamp}</span>
                            </div>
                            <p className="text-base text-slate-300 leading-relaxed">
                              {item.text}
                            </p>
                            {keywords.length > 0 && item.speaker === 'user' && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {keywords.map((keyword, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 rounded-full bg-blue-600/20 text-blue-400">
                                    #{keyword}
                                  </span>
                                ))}
                              </div>
                            )}
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
          
          {/* Third column - Insights Dashboard */}
          <ResizablePanel defaultSize={30} minSize={25}>
            <ResizablePanelGroup direction="vertical">
              {/* Top panel - Red Flags */}
              <ResizablePanel defaultSize={60}>
                <Card className="h-full glass-panel dark">
                  <CardContent className="p-4 h-full">
                    <h3 className="text-md font-semibold flex items-center text-slate-200 mb-3">
                      <span className="h-3.5 w-3.5 mr-1.5 text-interview-red">🚩</span>
                      Insights
                    </h3>
                    <ScrollArea className="h-[calc(100%-2rem)]">
                      <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700 min-h-[90%]">
                        {flags.length === 0 ? (
                          <div className="flex h-full items-center justify-center text-slate-500 text-sm">
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
                                    flag.severity === 'high' ? 'rgba(239, 68, 68, 0.15)' :
                                    flag.severity === 'medium' ? 'rgba(245, 158, 11, 0.15)' :
                                    'rgba(234, 179, 8, 0.15)'
                                }}
                              >
                                <div className="flex items-start">
                                  <div
                                    className="w-2 h-2 mt-1.5 rounded-full mr-2 flex-shrink-0"
                                    style={{
                                      backgroundColor:
                                        flag.severity === 'high' ? '#ef4444' :
                                        flag.severity === 'medium' ? '#f59e0b' :
                                        '#eab308'
                                    }}
                                  />
                                  <p className="text-sm text-slate-300">{flag.text}</p>
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
              
              <ResizableHandle withHandle />
              
              {/* Bottom panel - Analytics Dashboard (Surprise feature) */}
              <ResizablePanel defaultSize={40}>
                <Card className="h-full glass-panel dark">
                  <CardContent className="p-4 h-full">
                    <h3 className="text-md font-semibold flex items-center text-slate-200 mb-3">
                      <Brain className="w-4 h-4 mr-2 text-purple-400" />
                      AI Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Sentiment</span>
                          <div className={`h-2 w-2 rounded-full ${
                            sentiment === 'positive' ? 'bg-green-400' : 
                            sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                          }`}></div>
                        </div>
                        <p className="text-lg font-medium text-slate-200 capitalize mt-1">{sentiment}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400">Insight Score</span>
                          <Sigma className="h-3 w-3 text-blue-400" />
                        </div>
                        <p className="text-lg font-medium text-slate-200 mt-1">{insightScore}/100</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 h-[calc(100%-7rem)]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-400">AI Summary</span>
                        <Sparkles className="h-3 w-3 text-amber-400" />
                      </div>
                      {isRunning ? (
                        <div className="animate-pulse space-y-2 mt-2">
                          <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                          <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                          <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                          <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-300 mt-1">
                          {transcripts.length > 1 ? 
                          "The candidate demonstrates some experience with project management and teamwork, but could provide more specific metrics and concrete examples." : 
                          "Start the interview to generate an AI summary."}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
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
