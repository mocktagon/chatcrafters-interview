
import { useRef, useEffect } from 'react';

export function useAudioAnalyzer(
  stream: MediaStream | null,
  onAudioLevelChange: (level: number) => void
) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const setupAudioAnalyzer = (mediaStream: MediaStream) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    analyserRef.current = audioContext.createAnalyser();
    analyserRef.current.fftSize = 256;
    
    const source = audioContext.createMediaStreamSource(mediaStream);
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

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    setupAudioAnalyzer
  };
}
