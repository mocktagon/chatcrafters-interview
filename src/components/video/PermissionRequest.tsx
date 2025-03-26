
import React from 'react';
import { AlertCircle, Camera, Mic, Info } from 'lucide-react';
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
  
  const handlePermissionRequest = async () => {
    try {
      await onRequestPermission();
    } catch (error) {
      console.error("Permission request failed:", error);
      toast.error("Could not access your device");
    }
  };
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 p-2">
      <div className="flex items-center justify-center space-x-1 mb-2">
        {(isCameraRequest || isMediaRequest) && (
          <Camera className={`w-6 h-6 text-amber-400 ${isRequesting ? 'animate-pulse' : ''}`} />
        )}
        
        {(type === 'microphone' || isMediaRequest) && (
          <Mic className={`w-6 h-6 text-purple-400 ${isRequesting ? 'animate-pulse' : ''}`} />
        )}
      </div>
      
      <h3 className="text-white font-medium text-xs sm:text-sm mb-1 text-center">
        {isMediaRequest 
          ? 'Enable Camera & Mic'
          : `Enable ${isCameraRequest ? 'Camera' : 'Microphone'}`}
      </h3>
      <p className="text-slate-300 text-[10px] sm:text-xs mb-2 text-center">
        {isMediaRequest
          ? 'Tap to allow access to your devices'
          : `Tap to allow ${isCameraRequest ? 'camera' : 'microphone'} access`}
      </p>
      <Button 
        onClick={handlePermissionRequest} 
        disabled={isRequesting}
        size="sm"
        className={isMediaRequest
          ? "bg-gradient-to-r from-amber-500 via-orange-500 to-purple-500 hover:from-amber-600 hover:via-orange-600 hover:to-purple-600 transition-all duration-300 text-xs h-8 px-2"
          : isCameraRequest 
            ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-xs h-8 px-2"
            : "bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 transition-all duration-300 text-xs h-8 px-2"
        }
      >
        <div className="flex items-center">
          {(isCameraRequest || isMediaRequest) && <Camera className="mr-1 h-3 w-3" />}
          {(type === 'microphone' || isMediaRequest) && <Mic className={`${isMediaRequest ? '' : 'mr-1'} h-3 w-3`} />}
          <span className="ml-1">
            {isRequesting ? "Requesting..." : "Allow"}
          </span>
        </div>
      </Button>
      
      <div className="mt-4 p-2 bg-slate-900/50 rounded-md max-w-[90%] text-center">
        <div className="flex items-center justify-center mb-1">
          <Info className="w-3 h-3 text-blue-400 mr-1" />
          <p className="text-blue-400 text-[9px] sm:text-[11px] font-medium">Browser Permission Required</p>
        </div>
        <p className="text-slate-400 text-[8px] sm:text-[10px] text-center">
          Look for a permission popup at the top of your browser.
          <br />
          Click "Allow" when prompted to enable your {isCameraRequest ? 'camera' : isMediaRequest ? 'devices' : 'microphone'}
        </p>
      </div>
    </div>
  );
};

export default PermissionRequest;
