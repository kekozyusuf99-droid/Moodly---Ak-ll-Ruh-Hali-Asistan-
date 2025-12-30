
import React, { useState, useEffect } from 'react';
import { MOODS } from '../constants';
import { MoodLevel, MoodEntry, UserLocation } from '../types';
import { useMoods } from '../context/MoodContext';

export const Home = () => {
  const { addEntry, entries, t, profile, language, theme } = useMoods();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [note, setNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<UserLocation | undefined>(undefined);
  const [locLoading, setLocLoading] = useState(false);

  useEffect(() => {
    if (selectedMood && !currentLocation) {
      setLocLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setLocLoading(false);
        },
        () => setLocLoading(false),
        { timeout: 5000 }
      );
    }
  }, [selectedMood]);

  const handleSubmit = () => {
    if (!selectedMood) return;
    const newEntry: MoodEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      mood: selectedMood,
      note: note,
      tags: [],
      location: currentLocation
    };
    addEntry(newEntry);
    setIsSuccess(true);
    setNote('');
    setSelectedMood(null);
    setCurrentLocation(undefined);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const todayEntry = entries.find(e => 
    new Date(e.timestamp).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="relative">
        <div className={`absolute -right-4 -top-8 w-24 h-24 rounded-full blur-3xl opacity-60 ${
          theme === 'dark' ? 'bg-indigo-900/40' : 'bg-indigo-100'
        }`}></div>
        <h2 className={`text-3xl font-extrabold mb-1 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
          {t.hello} <span className="text-indigo-500">{profile.name}</span>! 👋
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{t.how_feel}</p>
      </section>

      {todayEntry ? (
        <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] shadow-2xl shadow-indigo-900/20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="text-7xl mb-4 animate-float drop-shadow-lg">{MOODS[todayEntry.mood].emoji}</div>
          <h3 className="font-bold text-white text-xl mb-2">{t.saved}</h3>
          <p className="text-indigo-100 text-sm italic bg-black/20 py-3 px-4 rounded-2xl inline-block backdrop-blur-sm border border-white/5">
            "{todayEntry.note || t.no_note}"
          </p>
          {todayEntry.location && (
            <div className="mt-4 text-[10px] text-indigo-200 font-bold uppercase tracking-widest flex items-center justify-center gap-1 opacity-70">
              📍 {todayEntry.location.latitude.toFixed(2)}, {todayEntry.location.longitude.toFixed(2)}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-5 gap-3">
            {(Object.keys(MOODS) as MoodLevel[]).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMood(m)}
                className={`mood-btn-pop flex flex-col items-center p-4 rounded-3xl border-2 transition-all duration-300 ${
                  selectedMood === m 
                    ? `dark:bg-indigo-500/10 dark:border-indigo-500/50 shadow-2xl scale-110 z-10 ${theme === 'dark' ? '' : MOODS[m].bg + ' ' + MOODS[m].border}` 
                    : theme === 'dark' ? 'bg-slate-900/50 border-slate-800 shadow-sm hover:border-indigo-900/50' : 'bg-white border-slate-50 shadow-sm hover:border-indigo-100'
                }`}
              >
                <span className="text-3xl mb-2 drop-shadow-sm">{MOODS[m].emoji}</span>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider truncate w-full text-center ${selectedMood === m ? 'text-indigo-500' : 'text-slate-500 dark:text-slate-500'}`}>
                  {MOODS[m].label}
                </span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="animate-in slide-in-from-top-4 fade-in duration-500 space-y-4">
              <div className="relative">
                <textarea
                  placeholder="..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={`w-full p-6 rounded-[2rem] border-2 focus:ring-4 outline-none transition-all h-36 shadow-inner ${
                    theme === 'dark' 
                      ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-indigo-900/20' 
                      : 'bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-indigo-50'
                  }`}
                />
                <div className="absolute bottom-4 right-6 flex items-center gap-2">
                  {locLoading ? (
                    <span className="text-[10px] text-slate-400 font-bold animate-pulse">{t.getting_location}</span>
                  ) : currentLocation ? (
                    <span className="text-[10px] text-emerald-500 font-bold">📍 Konum Eklendi</span>
                  ) : null}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold py-5 rounded-[2rem] shadow-xl shadow-indigo-900/20 hover:shadow-indigo-500/40 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t.save}</span>
                <span className="group-hover:translate-x-1 transition-transform">✨</span>
              </button>
            </div>
          )}
        </div>
      )}

      {isSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white px-8 py-4 rounded-full shadow-2xl animate-in slide-in-from-top-10 fade-in duration-300 flex items-center gap-3 z-50">
          <span className="bg-emerald-500 rounded-full p-1 text-white">✔️</span>
          <span className="font-bold text-sm tracking-wide">{t.saved}</span>
        </div>
      )}

      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t.last_entries}</h3>
          <div className="w-10 h-1 bg-indigo-500/30 rounded-full"></div>
        </div>
        <div className="space-y-4">
          {entries.slice(-3).reverse().map((entry) => (
            <div key={entry.id} className={`group flex items-center p-5 border rounded-[2rem] gap-5 shadow-sm transition-all cursor-pointer ${
              theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:border-indigo-900/50' : 'bg-white border-slate-100 hover:border-indigo-100'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110 ${
                theme === 'dark' ? 'bg-slate-800' : MOODS[entry.mood].bg
              }`}>
                {MOODS[entry.mood].emoji}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold text-base ${theme === 'dark' ? 'text-white' : MOODS[entry.mood].color}`}>{MOODS[entry.mood].label}</span>
                  <div className="flex items-center gap-2">
                    {entry.location && <span className="text-[10px] opacity-40">📍</span>}
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${theme === 'dark' ? 'text-slate-500 bg-slate-800/50' : 'text-slate-400 bg-slate-50'}`}>
                      {new Date(entry.timestamp).toLocaleDateString(language === 'tr' ? 'tr-TR' : language === 'en' ? 'en-US' : 'de-DE')}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-1 font-medium italic opacity-80">
                  {entry.note ? `"${entry.note}"` : t.no_note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
