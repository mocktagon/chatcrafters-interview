
import { useRef, useEffect } from 'react';
import { toast } from "sonner";

export function useMediaStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const getMediaStream = async (constraints: MediaStreamConstraints): Promise<MediaStream | null> => {
    try {
      console.log("Requesting media with constraints:", JSON.stringify(constraints));
      
      // Safari needs a timeout before requesting permissions
      if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported in this browser");
      }
      
      // Prepare video constraints with proper fallbacks for all browsers
      let effectiveConstraints = { ...constraints };
      
      // iOS Safari and other mobile browsers need specific constraints
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (constraints.video) {
        // For mobile browsers, especially iOS Safari
        if (isIOS || isMobile) {
          effectiveConstraints.video = {
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 }
          };
          console.log("Using iOS/mobile optimized video constraints");
        } 
        // For Safari desktop
        else if (isSafari) {
          effectiveConstraints.video = {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          };
          console.log("Using Safari desktop optimized video constraints");
        }
        // For other browsers that might need explicit values
        else if (typeof constraints.video === 'boolean') {
          effectiveConstraints.video = {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          };
        }
      }
      
      console.log("Using effective constraints:", JSON.stringify(effectiveConstraints));
      const stream = await navigator.mediaDevices.getUserMedia(effectiveConstraints);
      
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
      } else if (error.name === 'NotSupportedError') {
        toast.error("Your browser doesn't support media devices");
      } else {
        toast.error(`Error: ${error.message || 'Unknown media error'}`);
      }
      
      return null;
    }
  };

  const updateVideoStream = (stream: MediaStream) => {
    if (videoRef.current) {
      console.log("Setting stream to video element");
      
      try {
        // If there's already a stream, stop it first to avoid memory leaks
        if (videoRef.current.srcObject instanceof MediaStream) {
          console.log("Replacing existing stream");
        }
        
        videoRef.current.srcObject = stream;
        
        // Make sure autoplay works even on mobile browsers
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.setAttribute('autoplay', '');
        videoRef.current.setAttribute('muted', '');
        
        videoRef.current.muted = true; // Important for autoplay
        
        // Try playing immediately
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Error playing video after setting srcObject:", err);
            // For iOS Safari, we might need to play on user interaction
            if (err.name === 'NotAllowedError') {
              console.log("Autoplay prevented. Video will play on user interaction.");
            }
          });
        }
      } catch (err) {
        console.error("Error setting video srcObject:", err);
      }
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
