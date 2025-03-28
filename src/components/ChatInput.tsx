
import React, { useState, useRef, ChangeEvent } from 'react';
import { Paperclip, X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (message: string, attachment?: File) => void;
  isAttaching: boolean;
  setIsAttaching: (isAttaching: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isAttaching, 
  setIsAttaching 
}) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && !attachment) {
      return;
    }
    
    onSendMessage(message, attachment || undefined);
    setMessage('');
    setAttachment(null);
    setIsAttaching(false);
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Maximum file size is 5MB"
      });
      return;
    }
    
    setAttachment(file);
  };
  
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };
  
  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      {attachment && (
        <div className="flex items-center bg-zinc-800/50 rounded-md p-2 text-xs text-zinc-300">
          <span className="truncate flex-1">{attachment.name}</span>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 text-zinc-400 hover:text-zinc-100"
            onClick={removeAttachment}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className="flex items-center space-x-2 bg-zinc-900/80 rounded-lg p-1 border border-zinc-800">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100 h-8 w-8"
          onClick={handleAttachClick}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-300 placeholder:text-zinc-600 px-2 h-8"
        />
        
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          disabled={!message.trim() && !attachment}
          className="text-zinc-400 hover:text-zinc-100 h-8 w-8 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </form>
  );
};

export default ChatInput;
