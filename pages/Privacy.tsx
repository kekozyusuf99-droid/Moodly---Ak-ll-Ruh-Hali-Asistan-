
import React from 'react';
import { useMoods } from '../context/MoodContext';
import { Link } from 'react-router-dom';

export const Privacy = () => {
  const { theme, t } = useMoods();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 px-2">
      <div className="flex items-center gap-4">
        <Link to="/settings" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xl transition-all active:scale-90">←</Link>
        <h2 className="text-2xl font-bold">{t.privacy_policy}</h2>
      </div>

      <div className={`p-6 rounded-[2.5rem] border text-[13px] leading-relaxed space-y-10 ${
        theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-white border-slate-100 text-slate-600'
      }`}>
        
        {/* TR SECTION */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-[10px] uppercase">TR - Gizlilik Özeti</div>
          <section className="space-y-2">
            <h3 className="font-bold text-indigo-400 text-[11px] uppercase tracking-widest">1. Veri Saklama</h3>
            <p>Ruh hali kayıtlarınız, notlarınız ve konum verileriniz <strong>sadece cihazınızda</strong> saklanır. Bizim herhangi bir sunucumuzda verileriniz barındırılmaz.</p>
          </section>
          <section className="space-y-2">
            <h3 className="font-bold text-indigo-400 text-[11px] uppercase tracking-widest">2. AI İşleme</h3>
            <p>Analiz özelliklerini kullandığınızda, verileriniz anonim olarak Google Gemini API'sine gönderilir. Kişisel kimliğiniz asla paylaşılmaz.</p>
          </section>
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

        {/* EN SECTION */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] uppercase">EN - Privacy Summary</div>
          <section className="space-y-2">
            <h3 className="font-bold text-emerald-400 text-[11px] uppercase tracking-widest">1. Local Storage</h3>
            <p>Your mood logs, notes, and location data are <strong>stored locally</strong> on your device. We do not host your data on our servers.</p>
          </section>
          <section className="space-y-2">
            <h3 className="font-bold text-emerald-400 text-[11px] uppercase tracking-widest">2. AI Processing</h3>
            <p>When using AI Insights, your data is processed anonymously via Google Gemini API. Your identity is never shared.</p>
          </section>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[11px] opacity-70 italic">Google Play Developer Policies Compliant.</p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Last Updated: March 2024</p>
        <div className="flex justify-center gap-6">
            <button className="text-indigo-500 text-xs font-bold underline">Terms</button>
            <button className="text-indigo-500 text-xs font-bold underline">Support</button>
        </div>
      </div>
    </div>
  );
};
