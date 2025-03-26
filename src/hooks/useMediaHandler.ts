
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

  // Initialize state before passing it to other hooks
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);

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

  // Improved camera toggle function that properly handles camera state
  const toggleCamera = async () => {
    console.log("Toggle camera requested, current active state:", isCameraActive);
    
    // If camera is currently active, we just need to disable it
    if (isCameraActive) {
      setIsCameraActive(false);
      
      // If we have video tracks, disable them instead of stopping
      if (mediaStreamRef.current) {
        const videoTracks = mediaStreamRef.current.getVideoTracks();
        if (videoTracks.length > 0) {
          videoTracks.forEach(track => {
            track.enabled = false;
          });
          console.log("Camera tracks disabled");
        }
      }
      return;
    }
    
    // If camera is currently inactive, we need to enable it or request permission
    try {
      if (!mediaStreamRef.current || mediaStreamRef.current.getVideoTracks().length === 0) {
        console.log("No video stream, requesting camera permission");
        await requestVideoPermission();
        setIsCameraActive(true);
      } else {
        // Enable existing video tracks
        const videoTracks = mediaStreamRef.current.getVideoTracks();
        videoTracks.forEach(track => {
          track.enabled = true;
        });
        setIsCameraActive(true);
        console.log("Camera tracks enabled");
      }
    } catch (error) {
      console.error("Failed to toggle camera:", error);
      toast.error("Failed to enable camera");
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
    isCameraActive,
    isLoading,
    videoRef,
    requestMediaPermissions,
    requestVideoPermission,
    requestMicPermission: requestMicPermissionInternal,
    toggleMicrophone,
    toggleCamera
  };
}
