
import React from 'react';
import { AlertCircle, Camera, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface PermissionRequestProps {
  type: 'camera' | 'microphone' | 'media';
  onRequestPermission: () => Promise<void>;
  isRequesting: boolean;
}

const PermissionRequest: React.FC<PermissionRequestProps> = ({ 
  type, 
  onRequestPermission, 
  isRequesting 
}) => {
  const isCameraRequest = type === 'camera';
  const isMediaRequest = type === 'media';
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
      <div className="flex items-center justify-center space-x-2">
        {(isCameraRequest || isMediaRequest) && (
          <Camera className={`w-10 h-10 text-amber-400 ${isRequesting ? 'animate-pulse' : ''}`} />
        )}
        
        {(type === 'microphone' || isMediaRequest) && (
          <Mic className={`w-10 h-10 text-purple-400 ${isRequesting ? 'animate-pulse' : ''}`} />
        )}
      </div>
      
      <h3 className="text-white font-medium my-3">
        {isMediaRequest 
          ? 'Camera & Microphone Permissions Required'
          : `${isCameraRequest ? 'Camera' : 'Microphone'} Permission Required`}
      </h3>
      <p className="text-slate-300 text-sm mb-4 max-w-xs text-center">
        {isMediaRequest
          ? 'This interview simulator needs access to your camera and microphone to provide the full experience.'
          : `This interview simulator needs access to your ${isCameraRequest ? 'camera' : 'microphone'} to provide the full experience.`}
      </p>
      <Button 
        onClick={onRequestPermission} 
        disabled={isRequesting}
        className={isMediaRequest
          ? "bg-gradient-to-r from-amber-500 via-orange-500 to-purple-500 hover:from-amber-600 hover:via-orange-600 hover:to-purple-600 transition-all duration-300"
          : isCameraRequest 
            ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            : "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all duration-300"
        }
      >
        <div className="flex items-center">
          {(isCameraRequest || isMediaRequest) && <Camera className="mr-1 h-4 w-4" />}
          {(type === 'microphone' || isMediaRequest) && <Mic className={`${isMediaRequest ? '' : 'mr-1'} h-4 w-4`} />}
          <span className="ml-1.5">
            {isRequesting ? "Requesting..." : isMediaRequest 
              ? "Enable Camera & Mic" 
              : `Enable ${isCameraRequest ? 'Camera' : 'Microphone'}`}
          </span>
        </div>
      </Button>
    </div>
  );
};

export default PermissionRequest;
