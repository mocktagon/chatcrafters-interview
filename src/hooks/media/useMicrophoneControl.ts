
import { useState } from 'react';
import { toast } from "sonner";

interface UseMicrophoneControlProps {
  mediaStreamRef: React.MutableRefObject<MediaStream | null>;
  requestMicPermission: () => Promise<void>;
}

export function useMicrophoneControl({
  mediaStreamRef,
  requestMicPermission
}: UseMicrophoneControlProps) {
  const [isMicEnabled, setIsMicEnabled] = useState(false);

  const toggleMicrophone = () => {
    if (!mediaStreamRef.current) {
      console.log("No media stream available for toggling microphone");
      return;
    }
    
    const audioTracks = mediaStreamRef.current.getAudioTracks();
    if (audioTracks.length === 0) {
      console.log("No audio tracks found, requesting microphone permission");
      requestMicPermission();
      return;
    }
    
    const newState = !isMicEnabled;
    console.log(`Setting microphone enabled state to: ${newState}`);
    audioTracks.forEach(track => {
      track.enabled = newState;
    });
    
    setIsMicEnabled(newState);
    toast.success(newState ? "Microphone enabled" : "Microphone muted");
  };

  return {
    isMicEnabled,
    toggleMicrophone
  };
}
