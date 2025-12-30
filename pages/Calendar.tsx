
import React, { useState } from 'react';
import { useMoods } from '../context/MoodContext';
import { MOODS } from '../constants';

export const Calendar = () => {
  const { entries, theme } = useMoods();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: (firstDayOfMonth + 6) % 7 }, (_, i) => i);

  const getEntryForDay = (day: number) => {
    return entries.find(e => {
      const d = new Date(e.timestamp);
      return d.getDate() === day && d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
    });
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Takvim</h2>
        <div className={`flex items-center gap-4 px-4 py-2 rounded-2xl border ${
          theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100'
        }`}>
          <button onClick={prevMonth} className="text-indigo-500 hover:scale-125 transition-transform">◀</button>
          <span className="font-bold text-sm min-w-[120px] text-center uppercase tracking-widest">
            {currentDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth} className="text-indigo-500 hover:scale-125 transition-transform">▶</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'].map(d => (
          <div key={d} className="text-center text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-2">{d}</div>
        ))}
        {padding.map(i => <div key={`p-${i}`} />)}
        {days.map(day => {
          const entry = getEntryForDay(day);
          return (
            <div 
              key={day} 
              className={`aspect-square flex flex-col items-center justify-center rounded-2xl border relative transition-all group hover:scale-105 active:scale-95 cursor-pointer ${
                entry 
                  ? theme === 'dark' ? 'bg-indigo-600/20 border-indigo-500/30' : MOODS[entry.mood].bg + ' border-transparent'
                  : theme === 'dark' ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50/50 border-transparent'
              }`}
            >
              <span className={`text-[10px] font-bold absolute top-1.5 left-1.5 ${
                entry ? 'text-indigo-400' : 'text-slate-500 opacity-40'
              }`}>
                {day}
              </span>
              {entry && <span className="text-xl animate-in zoom-in-50 duration-300 drop-shadow-sm">{MOODS[entry.mood].emoji}</span>}
            </div>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold">Aylık Özet</h3>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800/50"></div>
        </div>
        <div className="space-y-3">
          {entries
            .filter(e => new Date(e.timestamp).getMonth() === currentDate.getMonth())
            .slice(-10)
            .reverse()
            .map(e => (
              <div key={e.id} className={`p-4 border rounded-[1.5rem] flex items-center gap-4 transition-all ${
                theme === 'dark' ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-100 shadow-sm'
              }`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                   theme === 'dark' ? 'bg-slate-800' : MOODS[e.mood].bg
                }`}>
                  {MOODS[e.mood].emoji}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{new Date(e.timestamp).toLocaleDateString('tr-TR')}</div>
                   <div className="text-sm font-medium text-slate-400 truncate">{e.note || '...'}</div>
                </div>
              </div>
            ))
          }
          {entries.length === 0 && <p className="text-slate-500 text-center italic py-10 opacity-40">Henüz bir kayıt yok.</p>}
        </div>
      </div>
    </div>
  );
};
