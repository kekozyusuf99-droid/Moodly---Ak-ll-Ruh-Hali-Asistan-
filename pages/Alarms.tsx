
import React, { useState, useEffect } from 'react';
import { useMoods } from '../context/MoodContext';
import { Alarm } from '../types';

export const Alarms = () => {
  const { alarms, addAlarm, toggleAlarm, deleteAlarm, t, theme, playAlarmSound } = useMoods();
  const [showAdd, setShowAdd] = useState(false);
  const [newTime, setNewTime] = useState('09:00');
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleAdd = () => {
    const alarm: Alarm = {
      id: crypto.randomUUID(),
      time: newTime,
      enabled: true,
      label: newLabel || t.alarms
    };
    addAlarm(alarm);
    setShowAdd(false);
    setNewLabel('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{t.notifications}</h2>
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Sesli Hatırlatıcılar</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={playAlarmSound}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 border ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700 text-indigo-400' : 'bg-white border-slate-100 text-indigo-500'
            }`}
            title={t.test_sound}
          >
            <span className="text-xl animate-pulse">🔊</span>
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all active:scale-90"
          >
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alarms.map((alarm) => (
          <div 
            key={alarm.id} 
            className={`p-6 rounded-[2rem] border flex items-center justify-between transition-all ${
              alarm.enabled 
                ? theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-indigo-900/5 shadow-xl' : 'bg-white border-indigo-100 shadow-sm' 
                : theme === 'dark' ? 'bg-slate-900/30 border-slate-900 opacity-40' : 'bg-slate-50 border-slate-100 opacity-60'
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{alarm.time}</span>
                {alarm.enabled && <span className="text-indigo-500 animate-pulse text-sm">🔔</span>}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{alarm.label}</span>
            </div>
            <div className="flex items-center gap-5">
              <button 
                onClick={() => toggleAlarm(alarm.id)}
                className={`w-12 h-6 rounded-full relative transition-all ${alarm.enabled ? 'bg-indigo-600' : 'bg-slate-700/50'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${alarm.enabled ? 'left-7 shadow-lg shadow-indigo-900/50' : 'left-1'}`} />
              </button>
              <button onClick={() => deleteAlarm(alarm.id)} className="text-slate-500 hover:text-rose-500 transition-colors">✕</button>
            </div>
          </div>
        ))}
        {alarms.length === 0 && !showAdd && (
          <div className={`text-center py-16 border-2 border-dashed rounded-[2.5rem] ${theme === 'dark' ? 'border-slate-800 bg-slate-900/20' : 'border-slate-100'}`}>
            <span className="text-5xl mb-4 block opacity-20">⏰</span>
            <p className="text-slate-500 font-bold italic">{t.no_alarm}</p>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-end justify-center p-4">
          <div className={`w-full max-w-sm rounded-[2.5rem] p-8 space-y-8 animate-in slide-in-from-bottom-10 shadow-2xl border ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <h3 className="text-xl font-bold text-center">Set Reminder</h3>
            <div className="flex justify-center">
              <input 
                type="time" 
                value={newTime} 
                onChange={(e) => setNewTime(e.target.value)} 
                className={`text-5xl font-black p-6 rounded-3xl text-indigo-500 text-center border-none outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${
                  theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'
                }`} 
              />
            </div>
            <input 
              type="text" 
              placeholder={t.alarms} 
              value={newLabel} 
              onChange={(e) => setNewLabel(e.target.value)} 
              className={`w-full p-5 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-50'
              }`} 
            />
            <div className="flex gap-4">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-4 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl">Cancel</button>
              <button onClick={handleAdd} className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-900/40">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
