
import React from 'react';
import { Camera, Mic, MicOff, CameraOff } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import AudioVisualizer from './AudioVisualizer';

interface VideoControlsProps {
  hasMicPermission: boolean | null;
  isMicEnabled: boolean;
  isCameraEnabled: boolean;
  audioLevel: number;
  onToggleMicrophone: () => void;
  onToggleCamera: () => void;
  onRequestMicPermission: () => Promise<void>;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  hasMicPermission,
  isMicEnabled,
  isCameraEnabled,
  audioLevel,
  onToggleMicrophone,
  onToggleCamera,
  onRequestMicPermission
}) => {
  return (
    <>
      {/* Camera controls overlay */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-3">
        <Toggle 
          variant="outline" 
          className={`bg-black/30 border-white/10 hover:bg-black/40 text-white w-10 h-10 rounded-full ${!isCameraEnabled ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50' : ''}`}
          pressed={isCameraEnabled}
          onClick={onToggleCamera}
          title={isCameraEnabled ? "Turn off camera" : "Turn on camera"}
        >
          {isCameraEnabled ? (
            <Camera className="w-4 h-4" />
          ) : (
            <CameraOff className="w-4 h-4" />
          )}
        </Toggle>
        
        {hasMicPermission === null ? (
          <Toggle 
            variant="outline" 
            className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-10 h-10 rounded-full"
            onClick={onRequestMicPermission}
            title="Enable Microphone"
          >
            <Mic className="w-4 h-4" />
          </Toggle>
        ) : (
          <Toggle 
            variant="outline" 
            className={`bg-black/30 border-white/10 hover:bg-black/40 text-white w-10 h-10 rounded-full ${!isMicEnabled ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50' : ''}`}
            pressed={isMicEnabled}
            onClick={onToggleMicrophone}
            title={isMicEnabled ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicEnabled ? (
              <Mic className="w-4 h-4" />
            ) : (
              <MicOff className="w-4 h-4" />
            )}
          </Toggle>
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
