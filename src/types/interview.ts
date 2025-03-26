
export interface Transcript {
  id: number;
  text: string;
  speaker: 'ai' | 'user';
  timestamp: string;
}

export interface Flag {
  id: number;
  text: string;
  severity: 'low' | 'medium' | 'high';
}

export type SentimentType = 'positive' | 'neutral' | 'negative';
