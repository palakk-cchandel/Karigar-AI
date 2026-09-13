import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ArtisanApp } from './pages/ArtisanApp';
import { BuyerApp } from './pages/BuyerApp';
import { GeMPage } from './pages/GeMPage';
import { PresentationWow } from './pages/PresentationWow';
import { StoryImpact } from './pages/StoryImpact';
import type { Language } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<'artisan' | 'buyer' | 'gem' | 'wow' | 'impact'>('artisan');
  const [language, setLanguage] = useState<Language>('hi');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] flex flex-col font-sans">
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main className="flex-1">
        {currentTab === 'artisan' && (
          <ArtisanApp
            language={language}
            onLanguageChange={setLanguage}
            onOpenBuyerMarketplace={() => setCurrentTab('buyer')}
          />
        )}
        {currentTab === 'buyer' && <BuyerApp />}
        {currentTab === 'gem' && <GeMPage />}
        {currentTab === 'wow' && <PresentationWow />}
        {currentTab === 'impact' && <StoryImpact />}
      </main>

      <footer className="bg-[#1E1B4B] text-white/70 text-xs py-4 px-6 text-center border-t border-[#2E1065] space-y-1">
        <p className="font-semibold text-white">KARIGAR AI — Made for artisans. Powered by AI.</p>
        <p className="text-[11px] text-[#D4AF37]">
          AI-Driven Market Linkage & Smart Cataloging Prototype • Jaipur Craft Cluster Demo
        </p>
      </footer>
    </div>
  );
}

export default App;
