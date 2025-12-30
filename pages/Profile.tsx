
import React, { useState } from 'react';
import { useMoods } from '../context/MoodContext';

const AVATARS = ['😊', '😎', '🐱', '🦊', '🦄', '🤖', '👻', '🍕', '🚀', '🌈'];

export const Profile = () => {
  const { profile, setProfile, t, theme } = useMoods();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [showSaved, setShowSaved] = useState(false);

  const handleUpdate = () => {
    setProfile({ ...profile, name, bio, avatar });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const copyId = () => {
    navigator.clipboard.writeText(profile.userId);
    alert('ID Kopyalandı!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.profile_info}</h2>
        <div 
          onClick={copyId}
          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter cursor-pointer transition-colors ${
            theme === 'dark' ? 'bg-slate-800 text-indigo-400 border border-slate-700' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
          }`}
        >
          {profile.userId} 📋
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center text-6xl border-4 shadow-2xl relative transition-transform hover:scale-105 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-white'
        }`}>
          {avatar}
          <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[8px] p-2 rounded-full font-black">EDIT</div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-[280px]">
          {AVATARS.map(a => (
            <button 
              key={a}
              onClick={() => setAvatar(a)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                avatar === a 
                  ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-900/20' 
                  : theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50 hover:bg-slate-50'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{t.name}</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-5 rounded-[1.5rem] border-2 outline-none transition-all ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-500'
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{t.bio}</label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`w-full p-5 rounded-[1.5rem] border-2 outline-none transition-all h-28 resize-none ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 focus:bg-white focus:border-indigo-500'
            }`}
          />
        </div>

        <button 
          onClick={handleUpdate}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold py-5 rounded-[1.5rem] shadow-xl shadow-indigo-900/20 hover:shadow-indigo-500/40 active:scale-95 transition-all"
        >
          {t.update}
        </button>
      </div>

      {showSaved && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-8 py-3 rounded-full shadow-2xl animate-bounce z-50">
          {t.saved}
        </div>
      )}
    </div>
  );
};
