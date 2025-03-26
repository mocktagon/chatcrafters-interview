
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VideoDisplay from './VideoDisplay';
import PermissionRequest from './video/PermissionRequest';
import VideoControls from './video/VideoControls';
import ProgressBar from './video/ProgressBar';
import { useMediaHandler } from '@/hooks/useMediaHandler';

interface VideoPanelsProps {
  isRunning: boolean;
  progress: number;
  audioLevel: number;
  onAudioLevelChange: (level: number) => void;
  isCameraEnabled?: boolean;
}

const VideoPanels: React.FC<VideoPanelsProps> = ({ 
  isRunning, 
  progress, 
  audioLevel, 
  onAudioLevelChange,
  isCameraEnabled = true
}) => {
  const {
    hasVideoPermission,
    hasMicPermission,
    isRequestingPermission,
    isMicEnabled,
    videoRef,
    requestMediaPermissions,
    requestVideoPermission,
    requestMicPermission,
    toggleMicrophone
  } = useMediaHandler(onAudioLevelChange);

  // Check if we need to show the initial permission request
  const needsInitialPermissions = hasVideoPermission === null || hasMicPermission === null;

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top panel - Candidate Video */}
      <Card className="h-1/2 glass-panel dark bg-[#111111] shadow-md border-[#333333]/20">
        <CardContent className="p-2 h-full">
          <div className="rounded-lg overflow-hidden border border-zinc-800/50 bg-black/80 h-full relative backdrop-blur-sm">
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
        </CardContent>
      </Card>
      
      {/* Bottom panel - AI Avatar */}
      <Card className="h-1/2 glass-panel dark bg-[#111111] shadow-md border-[#333333]/20">
        <CardContent className="p-2 h-full">
          <div className="rounded-lg overflow-hidden border border-zinc-800/50 bg-black/80 h-full relative backdrop-blur-sm">
            <VideoDisplay useAiAvatar={true} progress={progress} />
            <ProgressBar progress={progress} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPanels;
