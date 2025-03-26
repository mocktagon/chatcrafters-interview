
import React, { useEffect, useState } from 'react';
import { Flag, X } from 'lucide-react';
import { toast } from 'sonner';

interface InsightsPanelProps {
  flags: Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ flags }) => {
  const [lastProcessedId, setLastProcessedId] = useState<number | null>(null);

  useEffect(() => {
    // Display new flags as toast notifications
    const showNewFlag = (flag: { id: number; text: string; severity: string }) => {
      const severityColor = 
        flag.severity === 'high' ? 'red' :
        flag.severity === 'medium' ? 'orange' : 'yellow';
      
      toast.info(
        <div className="flex items-start justify-between w-full">
          <div className="flex items-start">
            <Flag className={`h-4 w-4 mr-2 text-${severityColor}-500 flex-shrink-0`} />
            <span>{flag.text}</span>
          </div>
        </div>,
        {
          duration: 5000,
          position: "bottom-right",
          className: `border-l-4 border-${severityColor}-500`,
          dismissible: true,
          closeButton: true,
          style: { 
            marginBottom: '8px',
            maxWidth: '320px'
          },
        }
      );
      
      setLastProcessedId(flag.id);
    };

    // Display any new flags that are added
    if (flags.length > 0) {
      const latestFlag = flags[flags.length - 1];
      
      // Only show the notification if this flag hasn't been processed yet
      if (lastProcessedId === null || latestFlag.id !== lastProcessedId) {
        showNewFlag(latestFlag);
      }
    }
  }, [flags, lastProcessedId]);

  // This component doesn't render anything, it just shows toasts
  return null;
};

export default InsightsPanel;
