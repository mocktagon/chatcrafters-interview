
import { useRef, useEffect } from 'react';
import { toast } from "sonner";

export function useMediaStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const getMediaStream = async (constraints: MediaStreamConstraints): Promise<MediaStream | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      
      if (constraints.video && stream.getVideoTracks().length > 0) {
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
      } else {
        toast.error(`Error: ${error.message}`);
      }
      
      return null;
    }
  };

  const updateVideoStream = (stream: MediaStream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error("Error playing video:", err);
      });
    }
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
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
