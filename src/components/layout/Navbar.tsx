import React from 'react';
import { Sparkles, Globe, ShoppingBag, Landmark, PlayCircle, BarChart3, UserCheck } from 'lucide-react';
import type { Language } from '../../types';

interface NavbarProps {
  currentTab: 'artisan' | 'buyer' | 'gem' | 'wow' | 'impact';
  onTabChange: (tab: 'artisan' | 'buyer' | 'gem' | 'wow' | 'impact') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
}) => {
  return (
    <header className="bg-[#1E1B4B] text-white sticky top-0 z-40 shadow-xl border-b border-[#2E1065]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#C85A32] to-[#D4AF37] rounded-2xl flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white font-serif-craft leading-none flex items-center gap-1.5">
              KARIGAR AI
              <span className="bg-[#C85A32] text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                HACKATHON DEMO
              </span>
            </h1>
            <p className="text-[11px] text-[#D4AF37] font-medium tracking-wide">From Craft to Commerce</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#2E1065] p-1 rounded-2xl border border-white/10 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => onTabChange('artisan')}
            className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'artisan' ? 'bg-[#C85A32] text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Artisan Mobile App
          </button>
          <button
            onClick={() => onTabChange('buyer')}
            className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'buyer' ? 'bg-[#C85A32] text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Buyer Marketplace
          </button>
          <button
            onClick={() => onTabChange('gem')}
            className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'gem' ? 'bg-[#C85A32] text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Landmark className="w-4 h-4" /> GeM-Ready Portal
          </button>
          <button
            onClick={() => onTabChange('wow')}
            className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'wow' ? 'bg-[#D4AF37] text-[#1E1B4B] font-bold shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <PlayCircle className="w-4 h-4" /> "Craft to Commerce" WOW Screen
          </button>
          <button
            onClick={() => onTabChange('impact')}
            className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'impact' ? 'bg-[#C85A32] text-white shadow-md' : 'text-gray-300 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Impact & Analytics
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Demo Mode (Offline Ready)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs">
            <Globe className="w-4 h-4 text-[#D4AF37]" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
            >
              <option value="hi" className="bg-[#1E1B4B] text-white">Hindi (हिंदी)</option>
              <option value="en" className="bg-[#1E1B4B] text-white">English</option>
              <option value="pa" className="bg-[#1E1B4B] text-white">Punjabi (ਪੰਜਾਬੀ)</option>
              <option value="ta" className="bg-[#1E1B4B] text-white">Tamil (தமிழ்)</option>
              <option value="te" className="bg-[#1E1B4B] text-white">Telugu (తెలుగు)</option>
              <option value="bn" className="bg-[#1E1B4B] text-white">Bengali (বাংলা)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
