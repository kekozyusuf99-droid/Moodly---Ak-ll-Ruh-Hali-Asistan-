
import React, { useState } from 'react';
import { useMoods, ALARM_SOUNDS } from '../context/MoodContext';
import { Language, Theme } from '../types';
import { Link } from 'react-router-dom';

export const Settings = () => {
  const { t, language, setLanguage, theme, setTheme, alarmSound, setAlarmSound, playAlarmSound, entries } = useMoods();
  const [showDataSafety, setShowDataSafety] = useState(false);

  const handleReset = () => {
    if(confirm(t.reset_confirm)) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "moodly_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleSoundChange = (key: keyof typeof ALARM_SOUNDS) => {
    setAlarmSound(key);
    setTimeout(playAlarmSound, 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <h2 className="text-2xl font-bold">{t.settings}</h2>
      
      <div className="space-y-6">
        {/* Language & Theme */}
        <div className="grid grid-cols-1 gap-4">
          <div className={`p-6 border rounded-3xl space-y-4 shadow-sm ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.language}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['tr', 'en', 'de'] as Language[]).map(l => (
                <button 
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`py-3 rounded-xl border font-bold transition-all ${
                    language === l 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-900/20' 
                      : 'bg-slate-50/10 text-slate-500 border-transparent hover:bg-slate-50/20'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-6 border rounded-3xl space-y-4 shadow-sm ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.theme}</label>
            <div className="grid grid-cols-2 gap-2">
              {(['light', 'dark'] as Theme[]).map(th => (
                <button 
                  key={th}
                  onClick={() => setTheme(th)}
                  className={`py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 ${
                    theme === th 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-900/20' 
                      : 'bg-slate-50/10 text-slate-500 border-transparent hover:bg-slate-50/20'
                  }`}
                >
                  <span>{th === 'dark' ? '🌙' : '☀️'}</span>
                  <span>{th === 'dark' ? t.dark_mode : t.light_mode}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alarm Sound */}
        <div className={`p-6 border rounded-3xl space-y-4 shadow-sm ${
          theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.alarm_sound}</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(ALARM_SOUNDS) as (keyof typeof ALARM_SOUNDS)[]).map(key => (
              <button 
                key={key}
                onClick={() => handleSoundChange(key)}
                className={`py-3 rounded-xl border font-bold transition-all capitalize ${
                  alarmSound === key 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                    : 'bg-slate-50/10 text-slate-500 border-transparent hover:bg-slate-50/20'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Play Console & Data Helper */}
        <div className={`p-6 border rounded-3xl space-y-4 shadow-sm ${
          theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.data_safety}</label>
            <button onClick={() => setShowDataSafety(!showDataSafety)} className="text-indigo-400 text-xs font-bold">
              {showDataSafety ? 'Kapat' : 'Göster'}
            </button>
          </div>
          {showDataSafety && (
            <div className="text-[11px] space-y-2 opacity-80 animate-in fade-in slide-in-from-top-2">
              <p><strong>Toplanan Veriler:</strong> Yaklaşık Konum, Uygulama Etkileşimleri, Teşhis Bilgileri.</p>
              <p><strong>Veri Kullanımı:</strong> Veriler cihazınızda saklanır ve uygulama özellikleri için kullanılır.</p>
              <p><strong>Veri Paylaşımı:</strong> Üçüncü taraflarla veri paylaşılmaz.</p>
              <p><strong>Güvenlik:</strong> Veriler yerel olarak şifrelenmeden saklanır; ancak cihaz güvenliği ile korunur.</p>
            </div>
          )}
        </div>

        {/* Legal & Export */}
        <div className="space-y-3">
          <Link to="/privacy" className={`w-full text-left p-5 rounded-2xl border flex justify-between items-center transition-all ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50' : 'bg-white border-slate-100 hover:bg-slate-50'
          }`}>
            <span className="font-bold">{t.privacy_policy}</span>
            <span className="text-indigo-500">📜</span>
          </Link>
          
          <button 
            onClick={handleExport}
            className={`w-full text-left p-5 rounded-2xl border flex justify-between items-center transition-all ${
              theme === 'dark' ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50' : 'bg-white border-slate-100 hover:bg-slate-50'
            }`}
          >
            <span className="font-bold">{t.export_data}</span>
            <span className="text-indigo-500">📥</span>
          </button>

          <button 
            onClick={handleReset}
            className={`w-full text-left p-5 rounded-2xl border flex justify-between items-center font-bold transition-all ${
              theme === 'dark' 
                ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20' 
                : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'
            }`}
          >
            <span>{t.reset_data}</span>
            <span>🗑️</span>
          </button>
        </div>
      </div>

      <div className="text-center space-y-2 pt-10">
        <div className="text-[10px] text-slate-500 dark:text-slate-600 font-bold uppercase tracking-widest">
          Moodly v1.5.0 • Google Play Compliant
        </div>
        <div className="text-[8px] text-slate-500 opacity-40 italic">
          Designed with ❤️ for your mental well-being.
        </div>
      </div>
    </div>
  );
};
