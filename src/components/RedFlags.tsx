
import React from 'react';
import { Flag } from 'lucide-react';

interface RedFlagsProps {
  flags: Array<{
    id: number;
    text: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

const RedFlags: React.FC<RedFlagsProps> = ({ flags }) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-semibold flex items-center text-interview-darkText mb-3">
        <Flag className="h-3.5 w-3.5 mr-1.5 text-interview-red" />
        Red Flags
      </h3>
      <div className="h-[150px] overflow-y-auto custom-scrollbar bg-white/60 rounded-lg p-3 border border-interview-border">
        {flags.length === 0 ? (
          <div className="flex h-full items-center justify-center text-interview-lightText text-sm">
            No red flags detected
          </div>
        ) : (
          <div className="space-y-2.5">
            {flags.map((flag) => (
              <div 
                key={flag.id} 
                className="p-2 rounded-md animate-scale-in"
                style={{
                  backgroundColor: 
                    flag.severity === 'high' ? 'rgba(255, 59, 48, 0.1)' :
                    flag.severity === 'medium' ? 'rgba(255, 149, 0, 0.1)' :
                    'rgba(255, 204, 0, 0.1)'
                }}
              >
                <div className="flex items-start">
                  <div
                    className="w-2 h-2 mt-1.5 rounded-full mr-2 flex-shrink-0"
                    style={{
                      backgroundColor:
                        flag.severity === 'high' ? '#FF3B30' :
                        flag.severity === 'medium' ? '#FF9500' :
                        '#FFCC00'
                    }}
                  />
                  <p className="text-sm text-interview-darkText">{flag.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RedFlags;
