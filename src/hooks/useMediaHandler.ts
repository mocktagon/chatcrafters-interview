import { useState, useRef, useEffect } from 'react';
import { toast } from "sonner";

export function useMediaHandler(onAudioLevelChange: (level: number) => void) {
  const [hasVideoPermission, setHasVideoPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
        if (permissions.state === 'denied') {
          setHasVideoPermission(false);
          toast.error("Camera access is blocked. Please update your browser settings to allow camera access.");
        }
      } catch (error) {
        console.log("Permissions API not fully supported");
      }
    };
    
    checkPermissions();
  }, []);

  useEffect(() => {
    // Automatically request permissions when component mounts
    requestMediaPermissions();
  }, []);

  const requestMediaPermissions = async () => {
    setIsRequestingPermission(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setHasVideoPermission(true);
      setHasMicPermission(true);
      setIsMicEnabled(true);
      
      // Setup audio analyzer
      setupAudioAnalyzer(stream);
      
      toast.success("Camera and microphone permissions granted");
    } catch (error: any) {
      console.error("Error accessing media devices:", error);
      
      // Try to request just video if both fail
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        tryRequestVideoOnly();
      } else {
        setHasVideoPermission(false);
        setHasMicPermission(false);
        toast.error("Media permissions denied");
      }
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const tryRequestVideoOnly = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setHasVideoPermission(true);
      setHasMicPermission(false);
      toast.success("Camera permission granted");
      toast.warning("Microphone permission denied");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasVideoPermission(false);
      setHasMicPermission(false);
      toast.error("Camera permission denied");
    }
  };

  const requestVideoPermission = async () => {
    setIsRequestingPermission(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // If we already have a stream with audio, keep those tracks
      if (mediaStreamRef.current) {
        const audioTracks = mediaStreamRef.current.getAudioTracks();
        const newStream = new MediaStream([...stream.getVideoTracks(), ...audioTracks]);
        mediaStreamRef.current = newStream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } else {
        mediaStreamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
      
      setHasVideoPermission(true);
      toast.success("Camera permission granted");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasVideoPermission(false);
      toast.error("Camera permission denied");
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // If we already have a video stream, add the audio tracks to it
      if (mediaStreamRef.current) {
        const videoTracks = mediaStreamRef.current.getVideoTracks();
        const newStream = new MediaStream([...videoTracks, ...stream.getAudioTracks()]);
        mediaStreamRef.current = newStream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } else {
        mediaStreamRef.current = stream;
      }
      
      // Setup audio analyzer
      setupAudioAnalyzer(stream);
      
      setHasMicPermission(true);
      setIsMicEnabled(true);
      toast.success("Microphone permission granted");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setHasMicPermission(false);
      toast.error("Microphone permission denied");
    }
  };

  const setupAudioAnalyzer = (stream: MediaStream) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    analyserRef.current = audioContext.createAnalyser();
    analyserRef.current.fftSize = 256;
    
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
    
    // Start monitoring audio levels
    monitorAudioLevel();
  };

  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;
    
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const updateLevel = () => {
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average level
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      
      // Convert to a scale of 1-5
      const level = Math.min(5, Math.max(1, Math.ceil(average / 50)));
      onAudioLevelChange(level);
      
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };
    
    updateLevel();
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

  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
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
    requestMicPermission,
    toggleMicrophone
  };
}
