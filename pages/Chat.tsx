
import React, { useState, useEffect, useRef } from 'react';
import { useMoods } from '../context/MoodContext';
import { ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

export const Chat = () => {
  const { profile, messages, addMessage, t, theme, entries } = useMoods();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      senderId: profile.userId,
      senderName: profile.name,
      senderAvatar: profile.avatar,
      text: inputText,
      timestamp: Date.now()
    };

    addMessage(userMsg);
    setInputText('');
    setIsTyping(true);

    try {
      const lastMood = entries.length > 0 ? entries[entries.length - 1].mood : 'bilinmiyor';
      const prompt = `Sen Moodly topluluk rehberisin. Kullanıcı "${inputText}" dedi. Kullanıcının son ruh hali "${lastMood}". 
      Topluluktan biriymiş gibi sıcak, kısa ve destekleyici bir cevap yaz. Türkçe cevap ver.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        senderId: 'AI-SUPPORT',
        senderName: 'Moodly Rehberi',
        senderAvatar: '🌟',
        text: response.text || 'Harika bir düşünce!',
        timestamp: Date.now(),
        isAI: true
      };

      addMessage(aiMsg);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t.community}</h2>
        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full uppercase tracking-widest">
          Live Feed
        </span>
      </div>

      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 rounded-3xl border ${
          theme === 'dark' ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-inner'
        }`}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2 opacity-40">
            <span className="text-4xl">👋</span>
            <p className="text-xs font-bold uppercase tracking-widest">İlk mesajı sen at!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.senderId === profile.userId ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-end gap-2 ${msg.senderId === profile.userId ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm border ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
              }`}>
                {msg.senderAvatar}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                msg.senderId === profile.userId 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : theme === 'dark' ? 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700' : 'bg-white text-slate-800 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 mx-10">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 opacity-50 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">🌟</div>
            <div className="bg-slate-800/20 p-3 rounded-2xl rounded-bl-none text-xs">...</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.type_message}
          className={`flex-1 p-4 rounded-2xl border-2 outline-none transition-all ${
            theme === 'dark' 
              ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' 
              : 'bg-white border-slate-100 focus:border-indigo-500'
          }`}
        />
        <button 
          onClick={handleSend}
          className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-900/20 hover:bg-indigo-700 active:scale-90 transition-all"
        >
          🚀
        </button>
      </div>
    </div>
  );
};
