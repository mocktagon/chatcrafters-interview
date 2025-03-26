
import React from 'react';
import { Camera, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioVisualizer from './AudioVisualizer';

interface VideoControlsProps {
  hasMicPermission: boolean | null;
  isMicEnabled: boolean;
  audioLevel: number;
  onToggleMicrophone: () => void;
  onRequestMicPermission: () => Promise<void>;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  hasMicPermission,
  isMicEnabled,
  audioLevel,
  onToggleMicrophone,
  onRequestMicPermission
}) => {
  return (
    <>
      {/* Camera controls overlay */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-3">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-9 h-9 rounded-full"
          title="Camera"
        >
          <Camera className="w-4 h-4" />
        </Button>
        
        {hasMicPermission === null ? (
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-9 h-9 rounded-full"
            title="Enable Microphone"
            onClick={onRequestMicPermission}
          >
            <Mic className="w-4 h-4" />
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-9 h-9 rounded-full"
            title={isMicEnabled ? "Mute Microphone" : "Unmute Microphone"}
            onClick={onToggleMicrophone}
          >
            {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
        )}
      </div>
      
      {/* Audio visualizer */}
      <div className="absolute bottom-4 right-4 flex justify-center">
        <AudioVisualizer 
          audioLevel={audioLevel} 
          enabled={hasMicPermission === true && isMicEnabled} 
        />
      </div>
    </>
  );
};

export default VideoControls;
