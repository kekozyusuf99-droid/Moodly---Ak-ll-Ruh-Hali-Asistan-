
import React, { useEffect, useState } from 'react';
import { useMoods } from '../context/MoodContext';
import { MOODS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { analyzeMoods } from '../services/geminiService';
import { AIAnalysis } from '../types';

export const Stats = () => {
  const { entries, t, language } = useMoods();
  const [aiData, setAiData] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const moodCounts = entries.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(MOODS).map(m => ({
    name: MOODS[m as any].label,
    value: moodCounts[m] || 0,
    color: MOODS[m as any].color.replace('text-', '#').replace('600', '600')
  })).filter(d => d.value > 0);

  const handleAIAnalyze = async () => {
    setLoading(true);
    const result = await analyzeMoods(entries, language);
    setAiData(result);
    setLoading(false);
  };

  useEffect(() => {
    if (entries.length > 2 && !aiData) {
      handleAIAnalyze();
    }
  }, [entries]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-extrabold text-slate-800">{t.stats}</h2>
        <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Beta v1.2</div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">📊</div>
          <div className="text-4xl font-black mb-1">{entries.length}</div>
          <div className="text-[10px] opacity-80 uppercase font-black tracking-widest">Total Entries</div>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="text-5xl mb-1 group-hover:scale-110 transition-transform drop-shadow-sm">
            {entries.length > 0 ? MOODS[entries[entries.length-1].mood].emoji : '—'}
          </div>
          <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Status</div>
        </div>
      </div>

      <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
        <h3 className="font-extrabold text-lg mb-6 text-slate-700">Mood Mix</h3>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={chartData} 
                innerRadius={70} 
                outerRadius={95} 
                paddingAngle={8} 
                dataKey="value"
                animationDuration={1500}
                animationBegin={200}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.color.includes('emerald') ? '#10b981' : 
                      entry.color.includes('blue') ? '#3b82f6' : 
                      entry.color.includes('violet') ? '#8b5cf6' : 
                      entry.color.includes('orange') ? '#f97316' : '#f43f5e'
                    } 
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-3xl font-black text-slate-800">{entries.length}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Days</span>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -top-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-center mb-6 relative">
          <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
             <span className="animate-pulse">✨</span> {t.ai_guide}
          </h3>
          <button 
            onClick={handleAIAnalyze}
            disabled={loading || entries.length < 3}
            className="text-[10px] bg-white/10 hover:bg-white/20 text-indigo-300 px-4 py-2 rounded-full font-black tracking-widest uppercase transition-colors disabled:opacity-30"
          >
            {loading ? t.ai_analyzing : t.refresh}
          </button>
        </div>

        {entries.length < 3 ? (
          <div className="text-indigo-300/60 text-sm font-bold italic text-center py-6 bg-white/5 rounded-3xl border border-white/5">
            {t.need_more_data}
          </div>
        ) : aiData ? (
          <div className="space-y-6 relative">
            <div>
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Summary</div>
              <p className="text-white text-lg font-bold leading-tight">{aiData.summary}</p>
            </div>
            <div>
              <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Insight</div>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">{aiData.insight}</p>
            </div>
            <div className="p-5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-500/20">
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">Recommendation</div>
              <p className="text-emerald-50 text-sm font-bold italic leading-relaxed">{aiData.recommendation}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t.ai_analyzing}</p>
          </div>
        )}
      </section>
    </div>
  );
};
