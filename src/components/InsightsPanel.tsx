
import React, { useEffect } from 'react';
import { Flag } from 'lucide-react';
import { toast } from 'sonner';

interface InsightsPanelProps {
  flags: Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ flags }) => {
  useEffect(() => {
    // Display new flags as toast notifications
    const showNewFlag = (flag: { id: number; text: string; severity: string }) => {
      const severityColor = 
        flag.severity === 'high' ? 'red' :
        flag.severity === 'medium' ? 'orange' : 'yellow';
      
      toast.info(
        <div className="flex items-start">
          <Flag className={`h-4 w-4 mr-2 text-${severityColor}-500 flex-shrink-0`} />
          <span>{flag.text}</span>
        </div>,
        {
          duration: 5000,
          position: "bottom-right",
          className: `border-l-4 border-${severityColor}-500`
        }
      );
    };

    // Display any new flags that are added
    if (flags.length > 0) {
      const latestFlag = flags[flags.length - 1];
      showNewFlag(latestFlag);
    }
  }, [flags]);

  // This component doesn't render anything, it just shows toasts
  return null;
};

export default InsightsPanel;
