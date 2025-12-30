
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { MoodEntry, Alarm, Language, UserProfile, Theme, ChatMessage, UserLocation } from '../types';
import { STORAGE_KEY } from '../constants';
import { translations } from '../translations';

const ALARM_STORAGE_KEY = 'moodly_alarms_v1';
const LANG_STORAGE_KEY = 'moodly_lang_v1';
const PROFILE_STORAGE_KEY = 'moodly_profile_v1';
const THEME_STORAGE_KEY = 'moodly_theme_v1';
const CHAT_STORAGE_KEY = 'moodly_chat_v1';
const SOUND_STORAGE_KEY = 'moodly_sound_v1';

export const ALARM_SOUNDS = {
  soft: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
  digital: 'https://assets.mixkit.co/active_storage/sfx/2857/2857-preview.mp3',
  bell: 'https://assets.mixkit.co/active_storage/sfx/2855/2855-preview.mp3'
};

interface MoodContextType {
  entries: MoodEntry[];
  addEntry: (entry: MoodEntry) => void;
  deleteEntry: (id: string) => void;
  alarms: Alarm[];
  addAlarm: (alarm: Alarm) => void;
  toggleAlarm: (id: string) => void;
  deleteAlarm: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  alarmSound: keyof typeof ALARM_SOUNDS;
  setAlarmSound: (key: keyof typeof ALARM_SOUNDS) => void;
  playAlarmSound: () => void;
  t: any;
  loading: boolean;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 9).toUpperCase();

const defaultProfile: UserProfile = {
  userId: `USER-${generateId()}`,
  name: 'Gezgin',
  bio: 'Mutluluğun peşinde...',
  avatar: '😊'
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [language, setLanguageState] = useState<Language>('tr');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [profile, setProfileState] = useState<UserProfile>(defaultProfile);
  const [alarmSound, setAlarmSoundState] = useState<keyof typeof ALARM_SOUNDS>('soft');
  const [loading, setLoading] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    const savedAlarms = localStorage.getItem(ALARM_STORAGE_KEY);
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const savedChat = localStorage.getItem(CHAT_STORAGE_KEY);
    const savedSound = localStorage.getItem(SOUND_STORAGE_KEY);
    
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedAlarms) setAlarms(JSON.parse(savedAlarms));
    if (savedLang) setLanguageState(savedLang as Language);
    if (savedProfile) {
      const p = JSON.parse(savedProfile);
      if (!p.userId) p.userId = `USER-${generateId()}`;
      setProfileState(p);
    }
    if (savedTheme) setThemeState(savedTheme as Theme);
    if (savedChat) setMessages(JSON.parse(savedChat));
    if (savedSound) setAlarmSoundState(savedSound as keyof typeof ALARM_SOUNDS);
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(ALARM_STORAGE_KEY, JSON.stringify(alarms));
      localStorage.setItem(LANG_STORAGE_KEY, language);
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      localStorage.setItem(SOUND_STORAGE_KEY, alarmSound);
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Update audio source when sound type changes
      audioRef.current = new Audio(ALARM_SOUNDS[alarmSound]);
    }
  }, [alarms, language, profile, theme, messages, alarmSound, loading]);

  const playAlarmSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.warn("User interaction required."));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const activeAlarm = alarms.find(a => a.enabled && a.time === currentTimeStr);
      
      if (activeAlarm && now.getSeconds() === 0) {
        const msg = language === 'tr' ? 'Ruh halini kaydetme zamanı!' : language === 'en' ? 'Time to record your mood!' : 'Zeit, deine Stimmung aufzuzeichnen!';
        
        playAlarmSound();

        if ('vibrate' in navigator) {
          navigator.vibrate([300, 100, 300]);
        }

        if (Notification.permission === 'granted') {
          new Notification('Moodly', { body: msg });
        } else {
          alert(`⏰ Moodly: ${msg}`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [alarms, language, alarmSound]);

  const addEntry = (entry: MoodEntry) => setEntries(prev => [...prev, entry]);
  const deleteEntry = (id: string) => setEntries(entries.filter(e => e.id !== id));
  const addAlarm = (alarm: Alarm) => setAlarms(prev => [...prev, alarm]);
  const toggleAlarm = (id: string) => setAlarms(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  const deleteAlarm = (id: string) => setAlarms(prev => prev.filter(a => a.id !== id));
  const addMessage = (msg: ChatMessage) => setMessages(prev => [...prev, msg]);
  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setTheme = (t: Theme) => setThemeState(t);
  const setProfile = (newProfile: UserProfile) => setProfileState(newProfile);
  const setAlarmSound = (key: keyof typeof ALARM_SOUNDS) => setAlarmSoundState(key);

  return (
    <MoodContext.Provider value={{ 
      entries, addEntry, deleteEntry, 
      alarms, addAlarm, toggleAlarm, deleteAlarm,
      language, setLanguage,
      theme, setTheme,
      profile, setProfile,
      messages, addMessage,
      alarmSound, setAlarmSound,
      playAlarmSound,
      t: translations[language],
      loading 
    }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMoods = () => {
  const context = useContext(MoodContext);
  if (!context) throw new Error("useMoods must be used within MoodProvider");
  return context;
};
