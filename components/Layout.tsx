
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMoods } from '../context/MoodContext';

const NavItem = ({ to, icon, label, active }: { to: string; icon: string; label: string; active: boolean }) => (
  <Link 
    to={to} 
    className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
      active ? 'text-indigo-500 scale-110' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-400'
    }`}
  >
    <span className={`text-2xl mb-1 ${active ? 'animate-pulse' : ''}`}>{icon}</span>
    <span className={`text-[9px] font-bold uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t, profile, theme } = useMoods();

  return (
    <div className={`flex flex-col min-h-screen max-w-md mx-auto shadow-2xl relative pb-20 ring-1 backdrop-blur-[2px] transition-colors duration-500 ${
      theme === 'dark' ? 'bg-slate-950 text-white ring-slate-800' : 'bg-white/40 text-slate-900 ring-slate-100'
    }`}>
      <header className={`px-6 py-5 flex justify-between items-center border-b sticky top-0 backdrop-blur-xl z-30 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-slate-950/80 border-slate-900' : 'bg-white/70 border-slate-100'
      }`}>
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold bg-gradient-to-br from-indigo-500 via-violet-500 to-rose-400 bg-clip-text text-transparent">
            Moodly
          </h1>
          <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] -mt-1">{profile.name}</span>
        </div>
        <Link to="/profile" className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-rose-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className={`relative w-11 h-11 rounded-full flex items-center justify-center text-2xl shadow-sm border transition-all active:scale-90 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            {profile.avatar}
          </div>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6">
        {children}
      </main>

      <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-around items-center px-2 z-40 h-20 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl border-t transition-colors duration-500 ${
        theme === 'dark' ? 'bg-slate-950/80 border-slate-900' : 'bg-white/70 border-white/30'
      }`}>
        <NavItem to="/" icon="🏠" label={t.home} active={location.pathname === '/'} />
        <NavItem to="/calendar" icon="📅" label={t.calendar} active={location.pathname === '/calendar'} />
        <NavItem to="/chat" icon="💬" label={t.chat} active={location.pathname === '/chat'} />
        <NavItem to="/alarms" icon="⏰" label={t.alarms} active={location.pathname === '/alarms'} />
        <NavItem to="/stats" icon="📊" label={t.stats} active={location.pathname === '/stats'} />
        <NavItem to="/settings" icon="⚙️" label={t.settings} active={location.pathname === '/settings'} />
      </nav>
    </div>
  );
};
