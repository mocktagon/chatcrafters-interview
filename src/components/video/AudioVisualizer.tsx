
import React from 'react';

interface AudioVisualizerProps {
  audioLevel: number;
  enabled: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioLevel, enabled }) => {
  return (
    <div className="audio-visualizer flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="h-6 w-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full"
          style={{ 
            height: `${i < audioLevel ? 4 + (i + 1) * 3 : 4}px`,
            opacity: enabled ? 1 : 0.4,
            transition: 'height 0.2s ease-in-out'
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
