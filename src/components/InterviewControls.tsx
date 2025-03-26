
import React from 'react';
import { ChevronDown, User, Bot } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface InterviewControlsProps {
  interviewType: string;
  setInterviewType: (type: string) => void;
  useAiAvatar: boolean;
  setUseAiAvatar: (useAi: boolean) => void;
}

const InterviewControls: React.FC<InterviewControlsProps> = ({
  interviewType,
  setInterviewType,
  useAiAvatar,
  setUseAiAvatar
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-3">
        <label className="text-sm font-medium text-interview-darkText">
          Interview Type
        </label>
        <Select value={interviewType} onValueChange={setInterviewType}>
          <SelectTrigger className="w-full bg-white border border-interview-border rounded-lg focus:ring-interview-blue">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="behavioral">Behavioral</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="cultural">Cultural Fit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="ai-toggle" className="cursor-pointer">
            <span className="font-medium text-sm text-interview-darkText">AI Interviewer</span>
          </Label>
          <span className="text-xs text-interview-lightText">
            {useAiAvatar ? 'AI avatar mode' : 'Self-video mode'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <User className={`h-4 w-4 ${!useAiAvatar ? 'text-interview-blue' : 'text-gray-400'}`} />
          <Switch
            id="ai-toggle"
            checked={useAiAvatar}
            onCheckedChange={setUseAiAvatar}
            className="data-[state=checked]:bg-interview-blue"
          />
          <Bot className={`h-4 w-4 ${useAiAvatar ? 'text-interview-blue' : 'text-gray-400'}`} />
        </div>
      </div>
    </div>
  );
};

export default InterviewControls;
