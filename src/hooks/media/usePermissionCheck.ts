
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export function usePermissionCheck() {
  const [hasVideoPermission, setHasVideoPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // First try to use Permissions API (not supported in all browsers)
        try {
          // Check camera permission
          const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
          if (cameraPermission.state === 'denied') {
            setHasVideoPermission(false);
            toast.error("Camera access is blocked. Please update your browser settings to allow camera access.");
          } else if (cameraPermission.state === 'granted') {
            setHasVideoPermission(true);
          } else {
            // 'prompt' state - we'll handle this when user attempts to access camera
            setHasVideoPermission(null);
          }
          
          // Check microphone permission
          const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          if (micPermission.state === 'denied') {
            setHasMicPermission(false);
            toast.error("Microphone access is blocked. Please update your browser settings to allow microphone access.");
          } else if (micPermission.state === 'granted') {
            setHasMicPermission(true);
          } else {
            // 'prompt' state - we'll handle this when user attempts to access mic
            setHasMicPermission(null);
          }
        } catch (error) {
          console.log("Permissions API not fully supported, will check permissions during access attempt");
          // If Permissions API fails, we'll rely on getUserMedia results
          setHasVideoPermission(null);
          setHasMicPermission(null);
        }
      } catch (error) {
        console.log("Permissions API error:", error);
        // Default to null (unknown) state if Permissions API fails
        setHasVideoPermission(null);
        setHasMicPermission(null);
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
