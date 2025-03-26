
import { useState, useEffect } from 'react';
import { usePermissionCheck } from './media/usePermissionCheck';
import { useMediaStream } from './media/useMediaStream';
import { useAudioAnalyzer } from './media/useAudioAnalyzer';
import { usePermissionRequest } from './media/usePermissionRequest';
import { useMicrophoneControl } from './media/useMicrophoneControl';
import { toast } from 'sonner';

export function useMediaHandler(onAudioLevelChange: (level: number) => void) {
  const { 
    hasVideoPermission, 
    setHasVideoPermission,
    hasMicPermission, 
    setHasMicPermission 
  } = usePermissionCheck();
  
  const {
    videoRef,
    mediaStreamRef,
    getMediaStream,
    updateVideoStream,
    stopMediaStream
  } = useMediaStream();
  
  const { setupAudioAnalyzer } = useAudioAnalyzer(mediaStreamRef.current, onAudioLevelChange);

  // Initialize isMicEnabled state before passing it to other hooks
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isRequestingPermission,
    requestMediaPermissions,
    requestVideoPermission,
    requestMicPermission: requestMicPermissionInternal
  } = usePermissionRequest({
    getMediaStream,
    setupAudioAnalyzer,
    mediaStreamRef,
    updateVideoStream,
    setHasVideoPermission,
    setHasMicPermission,
    setIsMicEnabled
  });

  // Ensure we correctly handle mic toggle with better feedback
  const toggleMicrophone = async () => {
    console.log("Toggle microphone requested, current status:", isMicEnabled);
    setIsLoading(true);
    
    try {
      if (!mediaStreamRef.current) {
        console.log("No media stream, requesting microphone permission");
        await requestMicPermissionInternal();
      } else {
        // Toggle existing tracks
        const audioTracks = mediaStreamRef.current.getAudioTracks();
        if (audioTracks.length > 0) {
          const newState = !isMicEnabled;
          audioTracks.forEach(track => {
            track.enabled = newState;
          });
          setIsMicEnabled(newState);
          console.log(`Microphone ${newState ? 'enabled' : 'disabled'}`);
          toast.success(`Microphone ${newState ? 'enabled' : 'disabled'}`);
        } else {
          console.log("No audio tracks found, requesting microphone permission");
          await requestMicPermissionInternal();
        }
      }
    } catch (error) {
      console.error("Failed to toggle microphone:", error);
      toast.error("Failed to toggle microphone");
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically request permissions when component mounts
  useEffect(() => {
    console.log("useMediaHandler mounted, requesting permissions");
    const initializeMedia = async () => {
      try {
        await requestMediaPermissions();
      } catch (error) {
        console.error("Failed to initialize media:", error);
      }
    };
    
    initializeMedia();
    
    return () => {
      console.log("useMediaHandler unmounted, stopping media stream");
      stopMediaStream();
    };
  }, []);

  return {
    hasVideoPermission,
    hasMicPermission,
    isRequestingPermission,
    isMicEnabled,
    isLoading,
    videoRef,
    requestMediaPermissions,
    requestVideoPermission,
    requestMicPermission: requestMicPermissionInternal,
    toggleMicrophone
  };
}
