
import { useState, useEffect } from 'react';
import { usePermissionCheck } from './media/usePermissionCheck';
import { useMediaStream } from './media/useMediaStream';
import { useAudioAnalyzer } from './media/useAudioAnalyzer';
import { usePermissionRequest } from './media/usePermissionRequest';
import { useMicrophoneControl } from './media/useMicrophoneControl';

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

  const {
    isMicEnabled,
    setIsMicEnabled,
    toggleMicrophone
  } = useMicrophoneControl({
    mediaStreamRef,
    requestMicPermission: requestMicPermissionInternal
  });

  // Automatically request permissions when component mounts
  useEffect(() => {
    console.log("useMediaHandler mounted, requesting permissions");
    requestMediaPermissions();
    
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
    videoRef,
    requestMediaPermissions,
    requestVideoPermission,
    requestMicPermission: requestMicPermissionInternal,
    toggleMicrophone
  };
}
