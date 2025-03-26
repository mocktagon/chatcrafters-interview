
import React from 'react';
import { StopCircle, Mic, MicOff, Camera, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { toast } from 'sonner';

interface BottomPanelProps {
  isRunning: boolean;
  audioLevel: number;
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onEnd: () => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({
  isRunning,
  audioLevel,
  isMicEnabled,
  isCameraEnabled,
  onToggleMic,
  onToggleCamera,
  onEnd
}) => {
  const handleEnd = () => {
    onEnd();
    toast.info("Interview ended", {
      description: "The interview has been successfully ended.",
      position: "bottom-right"
    });
  };
  
  const handleToggleMic = () => {
    onToggleMic();
  };
  
  const handleToggleCamera = () => {
    onToggleCamera();
    toast.info(isCameraEnabled ? "Camera disabled" : "Camera enabled");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur border-t border-zinc-800 py-3 px-6 z-10">
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <Toggle
            pressed={isMicEnabled}
            onClick={handleToggleMic}
            className={`rounded-full h-10 w-10 ${!isMicEnabled ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700'}`}
            aria-label={isMicEnabled ? "Mute microphone" : "Unmute microphone"}
          >
            {isMicEnabled ? (
              <Mic className="h-5 w-5 stroke-[2.5px]" />
            ) : (
              <MicOff className="h-5 w-5 stroke-[2.5px]" />
            )}
          </Toggle>
          
          <Toggle
            pressed={isCameraEnabled}
            onClick={handleToggleCamera}
            className={`rounded-full h-10 w-10 ${!isCameraEnabled ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700'}`}
            aria-label={isCameraEnabled ? "Turn off camera" : "Turn on camera"}
          >
            {isCameraEnabled ? (
              <Camera className="h-5 w-5 stroke-[2.5px]" />
            ) : (
              <CameraOff className="h-5 w-5 stroke-[2.5px]" />
            )}
          </Toggle>
          
          <Button
            onClick={handleEnd}
            variant="default"
            size="icon"
            className="bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm h-12 w-12 rounded-full"
          >
            <StopCircle className="w-6 h-6 stroke-[2.5px]" />
            <span className="sr-only">End Interview</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomPanel;
