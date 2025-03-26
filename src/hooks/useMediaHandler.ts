import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { usePermissionCheck } from './media/usePermissionCheck';
import { useMediaStream } from './media/useMediaStream';
import { useAudioAnalyzer } from './media/useAudioAnalyzer';

export function useMediaHandler(onAudioLevelChange: (level: number) => void) {
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  
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

  const requestMediaPermissions = async () => {
    setIsRequestingPermission(true);
    try {
      const stream = await getMediaStream({ video: true, audio: true });
      
      if (stream) {
        mediaStreamRef.current = stream;
        updateVideoStream(stream);
        
        setHasVideoPermission(true);
        setHasMicPermission(true);
        setIsMicEnabled(true);
        
        // Setup audio analyzer
        setupAudioAnalyzer(stream);
        
        toast.success("Camera and microphone permissions granted");
      }
    } catch (error) {
      // Errors are already handled in getMediaStream
      tryRequestVideoOnly();
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const tryRequestVideoOnly = async () => {
    try {
      const stream = await getMediaStream({ video: true });
      
      if (stream) {
        mediaStreamRef.current = stream;
        updateVideoStream(stream);
        
        setHasVideoPermission(true);
        setHasMicPermission(false);
        toast.success("Camera permission granted");
        toast.warning("Microphone permission denied");
      }
    } catch (error) {
      // Errors are already handled in getMediaStream
      setHasVideoPermission(false);
      setHasMicPermission(false);
    }
  };

  const requestVideoPermission = async () => {
    setIsRequestingPermission(true);
    try {
      const stream = await getMediaStream({ video: true });
      
      if (stream) {
        // If we already have a stream with audio, keep those tracks
        if (mediaStreamRef.current) {
          const audioTracks = mediaStreamRef.current.getAudioTracks();
          const newStream = new MediaStream([...stream.getVideoTracks(), ...audioTracks]);
          mediaStreamRef.current = newStream;
          updateVideoStream(newStream);
        } else {
          mediaStreamRef.current = stream;
          updateVideoStream(stream);
        }
        
        setHasVideoPermission(true);
        toast.success("Camera permission granted");
      }
    } catch (error) {
      // Errors are already handled in getMediaStream
      setHasVideoPermission(false);
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const requestMicPermission = async () => {
    try {
      const stream = await getMediaStream({ audio: true });
      
      if (stream) {
        // If we already have a video stream, add the audio tracks to it
        if (mediaStreamRef.current) {
          const videoTracks = mediaStreamRef.current.getVideoTracks();
          const newStream = new MediaStream([...videoTracks, ...stream.getAudioTracks()]);
          mediaStreamRef.current = newStream;
          updateVideoStream(newStream);
        } else {
          mediaStreamRef.current = stream;
        }
        
        // Setup audio analyzer
        setupAudioAnalyzer(stream);
        
        setHasMicPermission(true);
        setIsMicEnabled(true);
        toast.success("Microphone permission granted");
      }
    } catch (error) {
      // Errors are already handled in getMediaStream
      setHasMicPermission(false);
    }
  };

  const toggleMicrophone = () => {
    if (!mediaStreamRef.current) return;
    
    const audioTracks = mediaStreamRef.current.getAudioTracks();
    if (audioTracks.length === 0) {
      requestMicPermission();
      return;
    }
    
    const newState = !isMicEnabled;
    audioTracks.forEach(track => {
      track.enabled = newState;
    });
    
    setIsMicEnabled(newState);
    toast.success(newState ? "Microphone enabled" : "Microphone muted");
  };

  // Automatically request permissions when component mounts
  useEffect(() => {
    requestMediaPermissions();
  }, []);

  return {
    hasVideoPermission,
    hasMicPermission,
    isRequestingPermission,
    isMicEnabled,
    videoRef,
    requestMediaPermissions,
    requestVideoPermission,
    requestMicPermission,
    toggleMicrophone
  };
}
