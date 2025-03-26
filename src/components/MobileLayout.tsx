
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VideoDisplay from './VideoDisplay';
import VideoControls from './video/VideoControls';
import ProgressBar from './video/ProgressBar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import BottomPanel from './BottomPanel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronUp } from 'lucide-react';
import Transcription from './Transcription';
import InsightsPanel from './InsightsPanel';
import { Transcript } from '@/types/interview';

interface MobileLayoutProps {
  timer: string;
  progress: number;
  interviewName: string;
  isRunning: boolean;
  audioLevel: number;
  transcripts: Transcript[];
  keywords?: string[];
  flags: Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  onAudioLevelChange: (level: number) => void;
  isCameraEnabled: boolean;
  isMicEnabled: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onEnd: () => void;
  onNext: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  timer,
  progress,
  interviewName,
  isRunning,
  audioLevel,
  transcripts,
  keywords = [],
  flags,
  onAudioLevelChange,
  isCameraEnabled,
  isMicEnabled,
  onToggleMic,
  onToggleCamera,
  onEnd,
  onNext
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white relative">
      {/* Header with timer */}
      <div className="px-4 py-3 flex items-center justify-between bg-zinc-900/80 backdrop-blur-sm">
        <div className="text-sm font-medium">{interviewName}</div>
        <div className="text-sm font-bold text-purple-300">{timer}</div>
      </div>
      
      {/* Main video (AI) */}
      <div className="flex-grow p-3">
        <Card className="h-full w-full bg-zinc-950 border-zinc-800 shadow-md">
          <CardContent className="p-2 h-full">
            <div className="relative h-full rounded-lg overflow-hidden border border-zinc-800/50 bg-black/80">
              <VideoDisplay useAiAvatar={true} progress={progress} />
              <ProgressBar progress={progress} />
              
              {/* User video PIP */}
              <div className="absolute top-3 right-3 w-28 h-40 md:w-32 md:h-44 overflow-hidden rounded-lg border border-zinc-700/40 shadow-lg">
                <VideoDisplay 
                  useAiAvatar={false} 
                  progress={0} 
                  hasVideoPermission={true}
                  isCameraEnabled={isCameraEnabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom sheet with transcription */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="w-full bg-zinc-900/80 backdrop-blur-sm py-2 px-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-zinc-400">
              <ChevronUp className="h-4 w-4" />
              <span>View Transcription</span>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[60vh] overflow-y-auto bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800">
          <div className="h-full overflow-y-auto pb-14">
            <div className="px-1 pt-6 pb-20">
              <Transcription transcripts={transcripts} keywords={keywords} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Bottom controls */}
      <BottomPanel 
        isRunning={isRunning}
        audioLevel={audioLevel}
        isMicEnabled={isMicEnabled}
        isCameraEnabled={isCameraEnabled}
        onToggleMic={onToggleMic}
        onToggleCamera={onToggleCamera}
        onEnd={onEnd}
      />
      
      {/* Insights */}
      <InsightsPanel flags={flags} />
    </div>
  );
};

export default MobileLayout;
