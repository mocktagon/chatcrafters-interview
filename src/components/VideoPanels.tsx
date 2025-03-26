
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VideoDisplay from './VideoDisplay';
import { Camera, Mic, MicOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface VideoPanelsProps {
  isRunning: boolean;
  progress: number;
}

const VideoPanels: React.FC<VideoPanelsProps> = ({ isRunning, progress }) => {
  const [hasVideoPermission, setHasVideoPermission] = useState<boolean | null>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const requestVideoPermission = async () => {
    setIsRequestingPermission(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
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
            
            <VideoDisplay useAiAvatar={false} progress={0} />
            
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
              
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-black/30 border-white/10 hover:bg-black/40 text-white w-9 h-9 rounded-full"
                title="Microphone"
              >
                {isRunning ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
            </div>
            
            {/* Audio visualizer */}
            <div className="absolute bottom-4 right-4 flex justify-center">
              <div className="audio-visualizer flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-6 w-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full"
                    style={{ 
                      height: `${Math.random() * 16 + 4}px`,
                      opacity: isRunning ? 1 : 0.4,
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
