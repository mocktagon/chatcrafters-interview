
import { useRef, useEffect } from 'react';
import { toast } from "sonner";

export function useMediaStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const getMediaStream = async (constraints: MediaStreamConstraints): Promise<MediaStream | null> => {
    try {
      console.log("Requesting media with constraints:", JSON.stringify(constraints));
      
      // Safari may need a timeout before requesting permissions
      if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Media stream obtained successfully with tracks:", 
                  stream.getTracks().map(t => `${t.kind} (${t.label})`));
      
      mediaStreamRef.current = stream;
      
      if (constraints.video && stream.getVideoTracks().length > 0) {
        console.log("Updating video stream");
        updateVideoStream(stream);
      }
      
      return stream;
    } catch (error: any) {
      console.error("Error accessing media devices:", error);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        if (constraints.video && constraints.audio) {
          toast.error("Camera and microphone access denied");
        } else if (constraints.video) {
          toast.error("Camera access denied");
        } else if (constraints.audio) {
          toast.error("Microphone access denied");
        }
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        if (constraints.video) {
          toast.error("No camera found on this device");
        } else if (constraints.audio) {
          toast.error("No microphone found on this device");
        }
      } else {
        toast.error(`Error: ${error.message || 'Unknown media error'}`);
      }
      
      return null;
    }
  };

  const updateVideoStream = (stream: MediaStream) => {
    if (videoRef.current) {
      console.log("Setting stream to video element");
      
      // If there's already a stream, stop it first to avoid memory leaks
      if (videoRef.current.srcObject instanceof MediaStream) {
        console.log("Replacing existing stream");
      }
      
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error("Error playing video:", err);
      });
    } else {
      console.warn("Video ref is not available");
    }
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      console.log("Stopping all media tracks");
      mediaStreamRef.current.getTracks().forEach(track => {
        console.log(`Stopping ${track.kind} track: ${track.label}`);
        track.stop();
      });
      mediaStreamRef.current = null;
    }
    
    // Clear video element source
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopMediaStream();
    };
  }, []);

  return {
    videoRef,
    mediaStreamRef,
    getMediaStream,
    updateVideoStream,
    stopMediaStream
  };
}
