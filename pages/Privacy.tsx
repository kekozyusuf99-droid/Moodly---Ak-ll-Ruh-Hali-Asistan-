
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

      <div className={`p-6 rounded-[2.5rem] border text-[13px] leading-relaxed space-y-8 ${
        theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-white border-slate-100 text-slate-600'
      }`}>
        
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-bold text-[10px] uppercase">Giriş</div>
          <p>Moodly, gizliliğinizi temel bir hak olarak görür. Uygulama "Privacy by Design" (Tasarım Gereği Gizlilik) ilkesiyle geliştirilmiştir.</p>
        </div>

        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] uppercase">Veri Güvenliği</div>
          <p>Verileriniz (ruh hali, notlar, konum) asla bizim sunucularımıza yüklenmez. Tüm işlemler cihazınızın güvenli yerel depolamasında gerçekleşir.</p>
        </div>

        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-bold text-[10px] uppercase">AI ve Veri İşleme</div>
          <p>AI Analizi özelliğini kullandığınızda, ruh hali notlarınız Google'ın güvenli altyapısı (Gemini API) üzerinden işlenir. Bu işlem anonimdir ve kişisel kimliğinizle eşleştirilmez.</p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[11px] opacity-70 italic">Not: Bu uygulama Google Play Store politikalarıyla tam uyumludur. Verilerinizi dışa aktarabilir veya saniyeler içinde silebilirsiniz.</p>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Son Güncelleme: Mart 2024</p>
        <div className="flex justify-center gap-4">
            <button className="text-indigo-500 text-xs font-bold underline">{t.terms_service}</button>
            <button className="text-indigo-500 text-xs font-bold underline">{t.contact_support}</button>
        </div>
      </div>
    </div>
  );
};
