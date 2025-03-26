
import React from 'react';
import AudioVisualizer from './AudioVisualizer';

interface VideoControlsProps {
  audioLevel: number;
  enabled: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  audioLevel,
  enabled
}) => {
  return (
    <>
      {/* Audio visualizer */}
      <div className="absolute bottom-4 right-4 flex justify-center">
        <AudioVisualizer 
          audioLevel={audioLevel} 
          enabled={enabled} 
        />
      </div>
    </>
  );
};

export default VideoControls;
