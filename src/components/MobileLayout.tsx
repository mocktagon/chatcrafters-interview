
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VideoDisplay from './VideoDisplay';
import VideoControls from './video/VideoControls';
import ProgressBar from './video/ProgressBar';
import BottomPanel from './BottomPanel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronUp } from 'lucide-react';
import Transcription from './Transcription';
import InsightsPanel from './InsightsPanel';
import { Transcript } from '@/types/interview';
import { useMediaHandler } from '@/hooks/useMediaHandler';
import PermissionRequest from './video/PermissionRequest';

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
  const {
    videoRef,
    hasVideoPermission,
    hasMicPermission,
    isRequestingPermission,
    requestMediaPermissions,
    requestVideoPermission
  } = useMediaHandler(onAudioLevelChange);
  
  // Check if we need to show permission request
  const needsInitialPermissions = hasVideoPermission === null || hasMicPermission === null;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white relative">
      {/* Header with timer */}
      <div className="px-4 py-3 flex items-center justify-between bg-zinc-900/80 backdrop-blur-sm">
        <div className="text-sm font-medium">{interviewName}</div>
        <div className="text-sm font-bold text-purple-300">{timer}</div>
      </div>
      
      {/* Top half - Square AI video with PIP */}
      <div className="p-3">
        <div className="aspect-square w-full relative bg-black rounded-lg border border-zinc-800 overflow-hidden">
          {/* Main AI Video */}
          <VideoDisplay useAiAvatar={true} progress={progress} />
          <ProgressBar progress={progress} />
          
          {/* User video PIP - smaller square */}
          <div className="absolute top-3 right-3 w-24 h-24 overflow-hidden rounded-lg border border-zinc-700 shadow-lg">
            {needsInitialPermissions ? (
              <PermissionRequest 
                type="media"
                onRequestPermission={requestMediaPermissions}
                isRequesting={isRequestingPermission}
              />
            ) : (
              hasVideoPermission === false && (
                <PermissionRequest 
                  type="camera"
                  onRequestPermission={requestVideoPermission}
                  isRequesting={isRequestingPermission}
                />
              )
            )}
            
            <VideoDisplay 
              useAiAvatar={false} 
              progress={0} 
              videoRef={videoRef}
              hasVideoPermission={hasVideoPermission}
              isCameraEnabled={isCameraEnabled}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom half - Transcription panel directly visible */}
      <div className="flex-1 p-3 overflow-hidden">
        <Transcription transcripts={transcripts} keywords={keywords} />
      </div>
      
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
