
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export function usePermissionCheck() {
  const [hasVideoPermission, setHasVideoPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Check camera permission
        try {
          const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
          if (cameraPermission.state === 'denied') {
            setHasVideoPermission(false);
            toast.error("Camera access is blocked. Please update your browser settings to allow camera access.");
          } else if (cameraPermission.state === 'granted') {
            setHasVideoPermission(true);
          }
        } catch (error) {
          console.log("Camera Permissions API not fully supported");
        }
        
        // Check microphone permission
        try {
          const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          if (micPermission.state === 'denied') {
            setHasMicPermission(false);
            toast.error("Microphone access is blocked. Please update your browser settings to allow microphone access.");
          } else if (micPermission.state === 'granted') {
            setHasMicPermission(true);
          }
        } catch (error) {
          console.log("Microphone Permissions API not fully supported");
        }
      } catch (error) {
        console.log("Permissions API not fully supported", error);
      }
    };
    
    checkPermissions();
  }, []);

  return {
    hasVideoPermission,
    setHasVideoPermission,
    hasMicPermission,
    setHasMicPermission
  };
}
