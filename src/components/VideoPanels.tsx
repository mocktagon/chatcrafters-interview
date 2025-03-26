
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VideoDisplay from './VideoDisplay';
import { Camera, Mic, MicOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface VideoPanelsProps {
  isRunning: boolean;
  progress: number;
  audioLevel: number;
  onAudioLevelChange: (level: number) => void;
}

const VideoPanels: React.FC<VideoPanelsProps> = ({ 
  isRunning, 
  progress, 
  audioLevel, 
  onAudioLevelChange 
}) => {
  const [hasVideoPermission, setHasVideoPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Request camera permission
  const requestVideoPermission = async () => {
    setIsRequestingPermission(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
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

  // Request microphone permission
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

  // Setup audio analyzer for real audio level monitoring
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

  // Monitor audio levels and update the audioLevel state
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

  // Toggle microphone on/off
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

  // Clean up resources when component unmounts
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

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top panel - Candidate Video */}
      <Card className="h-1/2 glass-panel dark bg-[#111111] shadow-md border-[#333333]/20">
        <CardContent className="p-2 h-full">
          <div className="rounded-lg overflow-hidden border border-zinc-800/50 bg-black/80 h-full relative backdrop-blur-sm">
            {hasVideoPermission === null ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
                <AlertCircle className="w-12 h-12 text-amber-400 mb-4 animate-pulse" />
                <h3 className="text-white font-medium mb-3">Camera Permission Required</h3>
                <p className="text-slate-300 text-sm mb-4 max-w-xs text-center">
                  This interview simulator needs access to your camera to provide the full experience.
                </p>
                <Button 
                  onClick={requestVideoPermission} 
                  disabled={isRequestingPermission}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {isRequestingPermission ? "Requesting..." : "Enable Camera"}
                </Button>
              </div>
            ) : (
              hasVideoPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
                  <AlertCircle className="w-12 h-12 text-interview-red mb-4" />
                  <h3 className="text-white font-medium mb-3">Camera Access Denied</h3>
                  <p className="text-slate-300 text-sm mb-4 max-w-xs text-center">
                    Please enable camera access in your browser settings to use the interview simulator.
                  </p>
                  <Button 
                    onClick={requestVideoPermission} 
                    variant="outline"
                    className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              )
            )}
            
            <VideoDisplay 
              useAiAvatar={false} 
              progress={0} 
              videoRef={videoRef}
              hasVideoPermission={hasVideoPermission}
            />
            
            {/* Camera controls overlay */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-9 h-9 rounded-full"
                title="Camera"
              >
                <Camera className="w-4 h-4" />
              </Button>
              
              {hasMicPermission === null ? (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-9 h-9 rounded-full"
                  title="Enable Microphone"
                  onClick={requestMicPermission}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-9 h-9 rounded-full"
                  title={isMicEnabled ? "Mute Microphone" : "Unmute Microphone"}
                  onClick={toggleMicrophone}
                >
                  {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
              )}
            </div>
            
            {/* Audio visualizer */}
            <div className="absolute bottom-4 right-4 flex justify-center">
              <div className="audio-visualizer flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-6 w-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full"
                    style={{ 
                      height: `${i < audioLevel ? 4 + (i + 1) * 3 : 4}px`,
                      opacity: hasMicPermission && isMicEnabled ? 1 : 0.4,
                      transition: 'height 0.2s ease-in-out'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bottom panel - AI Avatar */}
      <Card className="h-1/2 glass-panel dark bg-[#111111] shadow-md border-[#333333]/20">
        <CardContent className="p-2 h-full">
          <div className="rounded-lg overflow-hidden border border-zinc-800/50 bg-black/80 h-full relative backdrop-blur-sm">
            <VideoDisplay useAiAvatar={true} progress={progress} />
            
            {/* Progress bar - modernized with glow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900/40">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPanels;
