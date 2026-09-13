import React, { useState } from 'react';
import { Camera, Sparkles, Mic, Languages, FileText, IndianRupee, ShoppingBag, Building2, Landmark, Play, RefreshCw } from 'lucide-react';

export const PresentationWow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineNodes = [
    { title: 'PHOTO', icon: Camera, desc: 'Mobile photo captured by artisan', color: 'from-amber-500 to-orange-600' },
    { title: 'AI IMAGE STUDIO', icon: Sparkles, desc: 'Background removed, studio lighting corrected', color: 'from-purple-600 to-indigo-600' },
    { title: 'VOICE NOTE', icon: Mic, desc: 'Artisan speaks naturally in Hindi', color: 'from-rose-500 to-red-600' },
    { title: 'LANGUAGE AI', icon: Languages, desc: 'Speech-to-text, translation & spec extraction', color: 'from-blue-600 to-cyan-600' },
    { title: 'SMART CATALOG', icon: FileText, desc: 'Auto-generated e-commerce title, tags, SEO keywords', color: 'from-emerald-600 to-teal-600' },
    { title: 'DYNAMIC PRICE', icon: IndianRupee, desc: 'Cost + Market signals pricing algorithm (₹999)', color: 'from-[#C85A32] to-amber-600' },
    { title: 'MARKETPLACE', icon: ShoppingBag, desc: 'Instant multi-channel listing published', color: 'from-indigo-700 to-purple-800' },
    { title: 'B2B BULK DEALS', icon: Building2, desc: '92% AI match for hotel & corporate orders', color: 'from-[#1E1B4B] to-slate-900' },
    { title: 'GeM GOVERNMENT', icon: Landmark, desc: 'Prepared for public procurement tenders', color: 'from-amber-700 to-[#1E1B4B]' },
  ];

  const handleStepNext = () => {
    setActiveStep((prev) => (prev + 1) % pipelineNodes.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#0F0D25] text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10 text-center">
        <div className="space-y-3">
          <span className="bg-[#D4AF37] text-[#1E1B4B] font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-widest">
            HACKATHON DEMO PRESENTATION SCREEN
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-serif-craft text-[#FAF7F2]">From Craft to Commerce</h2>
          <p className="text-xl text-[#D4AF37] font-semibold">"One product. One voice note. An entire digital business."</p>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleStepNext}
            className="bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition transform hover:scale-105 flex items-center gap-3 text-lg"
          >
            <Play className="w-6 h-6 fill-current" /> Step Through Pipeline ({activeStep + 1} / {pipelineNodes.length})
          </button>
          <button
            onClick={() => setActiveStep(0)}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-5 rounded-2xl border border-white/20 transition"
          >
            <RefreshCw className="w-5 h-5" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {pipelineNodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <div
                key={node.title}
                onClick={() => setActiveStep(index)}
                className={`p-6 rounded-3xl border transition duration-300 text-left cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-white text-[#1E1B4B] border-[#D4AF37] ring-4 ring-[#D4AF37]/50 shadow-2xl scale-105'
                    : isCompleted
                    ? 'bg-white/10 text-white border-emerald-500/50'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${node.color} text-white shadow-lg`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-gray-400">0{index + 1}</span>
                </div>

                <h3 className="font-bold text-lg leading-tight mb-1">{node.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">{node.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center max-w-3xl mx-auto space-y-3">
          <p className="text-lg text-gray-200 italic font-medium">
            "The artisan should not need to understand technology. The technology should adapt to the artisan."
          </p>
          <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest">KARIGAR AI — Made for artisans. Powered by AI.</div>
        </div>
      </div>
    </div>
  );
};
