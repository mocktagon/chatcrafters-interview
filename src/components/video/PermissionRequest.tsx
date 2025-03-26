
import React from 'react';
import { AlertCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface PermissionRequestProps {
  type: 'camera' | 'microphone';
  onRequestPermission: () => Promise<void>;
  isRequesting: boolean;
}

const PermissionRequest: React.FC<PermissionRequestProps> = ({ 
  type, 
  onRequestPermission, 
  isRequesting 
}) => {
  const isCameraRequest = type === 'camera';
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
      <AlertCircle className={`w-12 h-12 ${isCameraRequest ? 'text-amber-400' : 'text-purple-400'} mb-4 ${isRequesting ? 'animate-pulse' : ''}`} />
      <h3 className="text-white font-medium mb-3">
        {isCameraRequest ? 'Camera' : 'Microphone'} Permission Required
      </h3>
      <p className="text-slate-300 text-sm mb-4 max-w-xs text-center">
        This interview simulator needs access to your {isCameraRequest ? 'camera' : 'microphone'} to provide the full experience.
      </p>
      <Button 
        onClick={onRequestPermission} 
        disabled={isRequesting}
        className={isCameraRequest 
          ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          : "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all duration-300"
        }
      >
        {isCameraRequest ? <Camera className="mr-2 h-4 w-4" /> : null}
        {isRequesting ? "Requesting..." : `Enable ${isCameraRequest ? 'Camera' : 'Microphone'}`}
      </Button>
    </div>
  );
};

export default PermissionRequest;
