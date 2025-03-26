
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
  const [processedIds, setProcessedIds] = useState<number[]>([]);

  useEffect(() => {
    // Display new flags as toast notifications
    const showNewFlag = (flag: { id: number; text: string; severity: string }) => {
      const severityColor = 
        flag.severity === 'high' ? 'red' :
        flag.severity === 'medium' ? 'orange' : 'yellow';
      
      toast.info(
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-center">
            <Flag className={`h-4 w-4 mr-2 text-${severityColor}-500 flex-shrink-0`} />
            <span className="text-sm text-black">{flag.text}</span>
          </div>
        </div>,
        {
          duration: 8000,
          position: "bottom-right",
          className: `border-l-4 border-${severityColor}-500`,
          dismissible: true,
          closeButton: true,
          style: { 
            marginBottom: '12px',
            maxWidth: '320px'
          },
          action: {
            label: (
              <div className="bg-neutral-200 hover:bg-neutral-300 transition-colors px-3 py-1.5 rounded-md shadow-sm">
                <X className="h-5 w-5 text-neutral-700" />
              </div>
            ),
            onClick: () => {
              // This is called when the close button is clicked
            },
          },
        }
      );
      
      // Add this flag ID to processed IDs to avoid duplicates
      setProcessedIds(prev => [...prev, flag.id]);
    };

    // Display any new flags that are added
    if (flags.length > 0) {
      const latestFlag = flags[flags.length - 1];
      
      // Only show the notification if this flag hasn't been processed yet
      if (!processedIds.includes(latestFlag.id)) {
        showNewFlag(latestFlag);
      }
    }
  }, [flags, processedIds]);

  // This component doesn't render anything, it just shows toasts
  return null;
};

export default InsightsPanel;
