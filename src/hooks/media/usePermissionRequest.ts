import { useState } from 'react';
import { toast } from "sonner";

interface UsePermissionRequestProps {
  getMediaStream: (constraints: MediaStreamConstraints) => Promise<MediaStream | null>;
  setupAudioAnalyzer: (stream: MediaStream) => void;
  mediaStreamRef: React.MutableRefObject<MediaStream | null>;
  updateVideoStream: (stream: MediaStream) => void;
  setHasVideoPermission: (value: boolean) => void;
  setHasMicPermission: (value: boolean) => void;
  setIsMicEnabled: (value: boolean) => void;
}

export function usePermissionRequest({
  getMediaStream,
  setupAudioAnalyzer,
  mediaStreamRef,
  updateVideoStream,
  setHasVideoPermission,
  setHasMicPermission,
  setIsMicEnabled
}: UsePermissionRequestProps) {
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const requestMediaPermissions = async () => {
    setIsRequestingPermission(true);
    try {
      console.log("Requesting camera and microphone permissions");
      const stream = await getMediaStream({ video: true, audio: true });
      
      if (stream) {
        console.log("Got media stream with tracks:", stream.getTracks().map(t => t.kind));
        mediaStreamRef.current = stream;
        
        // Check if we actually got video tracks
        const hasVideo = stream.getVideoTracks().length > 0;
        const hasAudio = stream.getAudioTracks().length > 0;
        
        setHasVideoPermission(hasVideo);
        setHasMicPermission(hasAudio);
        setIsMicEnabled(hasAudio);
        
        // Setup audio analyzer if we got audio
        if (hasAudio) {
          setupAudioAnalyzer(stream);
        }
        
        toast.success(
          hasVideo && hasAudio 
            ? "Camera and microphone permissions granted" 
            : hasVideo 
              ? "Camera permission granted" 
              : "Microphone permission granted"
        );
      } else {
        console.log("Failed to get media stream, trying video only");
        tryRequestVideoOnly();
      }
    } catch (error) {
      console.error("Error in requestMediaPermissions:", error);
      // Errors are already handled in getMediaStream
      tryRequestVideoOnly();
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const tryRequestVideoOnly = async () => {
    try {
      console.log("Requesting camera permission only");
      const stream = await getMediaStream({ video: true });
      
      if (stream) {
        console.log("Got video-only stream");
        mediaStreamRef.current = stream;
        
        setHasVideoPermission(true);
        setHasMicPermission(false);
        toast.success("Camera permission granted");
        toast.warning("Microphone permission denied");
      } else {
        console.log("Failed to get video-only stream");
        setHasVideoPermission(false);
      }
    } catch (error) {
      console.error("Error in tryRequestVideoOnly:", error);
      // Errors are already handled in getMediaStream
      setHasVideoPermission(false);
    }
  };

  const requestVideoPermission = async () => {
    setIsRequestingPermission(true);
    try {
      console.log("Explicitly requesting camera permission");
      const stream = await getMediaStream({ video: true });
      
      if (stream) {
        console.log("Got video stream, checking existing stream for audio tracks");
        // If we already have a stream with audio, keep those tracks
        if (mediaStreamRef.current) {
          const audioTracks = mediaStreamRef.current.getAudioTracks();
          if (audioTracks.length > 0) {
            console.log("Combining existing audio tracks with new video tracks");
            const newStream = new MediaStream([...stream.getVideoTracks(), ...audioTracks]);
            mediaStreamRef.current = newStream;
            updateVideoStream(newStream);
          } else {
            console.log("No existing audio tracks, using just the video stream");
            mediaStreamRef.current = stream;
            updateVideoStream(stream);
          }
        } else {
          console.log("No existing stream, using new video stream");
          mediaStreamRef.current = stream;
          updateVideoStream(stream);
        }
        
        setHasVideoPermission(true);
        toast.success("Camera permission granted");
      } else {
        console.log("Failed to get video stream");
        setHasVideoPermission(false);
      }
    } catch (error) {
      console.error("Error in requestVideoPermission:", error);
      // Errors are already handled in getMediaStream
      setHasVideoPermission(false);
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const requestMicPermission = async () => {
    try {
      console.log("Requesting microphone permission");
      const stream = await getMediaStream({ audio: true });
      
      if (stream) {
        console.log("Got audio stream, checking for existing video tracks");
        // If we already have a video stream, add the audio tracks to it
        if (mediaStreamRef.current) {
          const videoTracks = mediaStreamRef.current.getVideoTracks();
          if (videoTracks.length > 0) {
            console.log("Combining existing video tracks with new audio tracks");
            const newStream = new MediaStream([...videoTracks, ...stream.getAudioTracks()]);
            mediaStreamRef.current = newStream;
            updateVideoStream(newStream);
          } else {
            console.log("No existing video tracks, using just the audio stream");
            mediaStreamRef.current = stream;
          }
        } else {
          console.log("No existing stream, using new audio stream");
          mediaStreamRef.current = stream;
        }
        
        // Setup audio analyzer
        setupAudioAnalyzer(stream);
        
        setHasMicPermission(true);
        setIsMicEnabled(true);
        toast.success("Microphone permission granted");
      } else {
        console.log("Failed to get audio stream");
        setHasMicPermission(false);
      }
    } catch (error) {
      console.error("Error in requestMicPermission:", error);
      // Errors are already handled in getMediaStream
      setHasMicPermission(false);
    }
  };

  return {
    isRequestingPermission,
    requestMediaPermissions,
    requestVideoPermission,
    requestMicPermission
  };
}
