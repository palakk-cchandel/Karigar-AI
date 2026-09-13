import React from 'react';
import { Users, Package, IndianRupee, TrendingUp, CheckCircle2, XCircle } from 'lucide-react';

export const StoryImpact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-[#C85A32] text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Social Impact Dashboard
          </span>
          <h2 className="text-3xl font-black text-[#1E1B4B] font-serif-craft">Empowering Marginalized Indian Artisans</h2>
          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            Metrics below represent prototype simulation data across Shilp Samagam & Surajkund Mela artisan clusters.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-lg space-y-2">
            <div className="w-12 h-12 bg-indigo-50 text-[#1E1B4B] rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-[#1E1B4B] block">1,240</span>
            <span className="text-xs font-semibold text-gray-500">Artisans Onboarded</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-lg space-y-2">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-[#1E1B4B] block">18,600</span>
            <span className="text-xs font-semibold text-gray-500">Products Digitized</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-lg space-y-2">
            <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
              <IndianRupee className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-[#1E1B4B] block">₹2.4 Cr</span>
            <span className="text-xs font-semibold text-gray-500">Potential GMV</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-lg space-y-2">
            <div className="w-12 h-12 bg-purple-50 text-purple-800 rounded-2xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-3xl font-black text-[#1E1B4B] block">7,800</span>
            <span className="text-xs font-semibold text-gray-500">B2B Leads Matched</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E0D8] space-y-6">
          <h3 className="font-bold text-xl text-[#1E1B4B] text-center">Transformation Story: Before vs After Karigar AI</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 space-y-3">
              <h4 className="font-bold text-red-900 flex items-center gap-2 text-base">
                <XCircle className="w-5 h-5 text-red-600" /> BEFORE KARIGAR AI
              </h4>
              <ul className="space-y-2 text-gray-700 text-xs">
                <li>• Dependence on physical fairs (Surajkund, Shilp Samagam)</li>
                <li>• Low digital literacy & language barriers</li>
                <li>• Poor quality mobile photos & manual cataloging friction</li>
                <li>• Arbitrary under-pricing & exploitation by middlemen</li>
                <li>• No access to corporate hotel B2B buyers or GeM government tenders</li>
              </ul>
            </div>

            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 space-y-3">
              <h4 className="font-bold text-emerald-900 flex items-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> AFTER KARIGAR AI
              </h4>
              <ul className="space-y-2 text-gray-700 text-xs font-medium">
                <li>✓ Year-round continuous digital market access</li>
                <li>✓ Voice-first interaction in native Hindi (No typing needed)</li>
                <li>✓ AI Studio auto-enhances studio photography</li>
                <li>✓ Smart Pricing Engine protects profit margins (₹999 recommended)</li>
                <li>✓ Direct B2B enterprise matching & Government GeM readiness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
