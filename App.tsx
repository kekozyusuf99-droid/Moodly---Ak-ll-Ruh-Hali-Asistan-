
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MoodProvider } from './context/MoodContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar';
import { Stats } from './pages/Stats';
import { Alarms } from './pages/Alarms';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Privacy } from './pages/Privacy';

const App: React.FC = () => {
  return (
    <MoodProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/alarms" element={<Alarms />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Layout>
      </HashRouter>
    </MoodProvider>
  );
};

export default App;
