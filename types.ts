
export type MoodLevel = 'harika' | 'iyi' | 'normal' | 'kotu' | 'cok-kotu';
export type Language = 'tr' | 'en' | 'de';
export type Theme = 'light' | 'dark';

export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
}

export interface UserProfile {
  userId: string;
  name: string;
  bio: string;
  avatar: string;
}

export interface MoodEntry {
  id: string;
  timestamp: number;
  mood: MoodLevel;
  note: string;
  tags: string[];
  location?: UserLocation;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: number;
  isAI?: boolean;
}

export interface Alarm {
  id: string;
  time: string;
  enabled: boolean;
  label: string;
}

export interface AIAnalysis {
  insight: string;
  recommendation: string;
  summary: string;
}
