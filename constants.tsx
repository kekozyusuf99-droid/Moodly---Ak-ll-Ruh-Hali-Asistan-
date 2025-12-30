
import React from 'react';
import { MoodLevel } from './types';

export const MOODS: Record<MoodLevel, { label: string; emoji: string; color: string; bg: string; border: string; glow: string }> = {
  'harika': { 
    label: 'Harika', 
    emoji: '🤩', 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    glow: 'shadow-emerald-200'
  },
  'iyi': { 
    label: 'İyi', 
    emoji: '😊', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    glow: 'shadow-blue-200'
  },
  'normal': { 
    label: 'Normal', 
    emoji: '😐', 
    color: 'text-violet-600', 
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    glow: 'shadow-violet-200'
  },
  'kotu': { 
    label: 'Kötü', 
    emoji: '😔', 
    color: 'text-orange-600', 
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    glow: 'shadow-orange-200'
  },
  'cok-kotu': { 
    label: 'Çok Kötü', 
    emoji: '😫', 
    color: 'text-rose-600', 
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    glow: 'shadow-rose-200'
  },
};

export const STORAGE_KEY = 'moodly_entries_v1';
