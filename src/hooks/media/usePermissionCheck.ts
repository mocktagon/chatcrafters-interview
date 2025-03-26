
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export function usePermissionCheck() {
  const [hasVideoPermission, setHasVideoPermission] = useState<boolean | null>(null);
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
        if (permissions.state === 'denied') {
          setHasVideoPermission(false);
          toast.error("Camera access is blocked. Please update your browser settings to allow camera access.");
        }
      } catch (error) {
        console.log("Permissions API not fully supported");
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
