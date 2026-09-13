import React, { useState } from 'react';
import { Landmark, CheckCircle2, Award, FileText } from 'lucide-react';
import { demoGeMOpportunities, demoProducts } from '../data/mockData';
import { GeMReadyModal } from '../components/government/GeMReadyModal';

export const GeMPage: React.FC = () => {
  const selectedGeMProduct = demoProducts[0];
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-amber-900 text-white p-8 rounded-3xl shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-300 rounded-2xl flex items-center justify-center border border-amber-500/30">
              <Landmark className="w-7 h-7" />
            </div>
            <div>
              <span className="bg-amber-400 text-[#1E1B4B] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                GeM Standard Ready
              </span>
              <h2 className="text-3xl font-black font-serif-craft mt-1">Government Marketplace Procurement Portal</h2>
            </div>
          </div>
          <p className="text-sm text-gray-200 max-w-3xl leading-relaxed">
            Architected for direct compatibility with Indian Government e-Marketplace (GeM) standards, enabling marginalized handicraft artisans to bid on public sector tenders and corporate PSU procurement contracts.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl text-[#1E1B4B] flex items-center gap-2">
            <Award className="w-6 h-6 text-[#C85A32]" /> Matching Government Opportunities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demoGeMOpportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-3xl p-6 shadow-xl border border-[#E5E0D8] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">{opp.department}</span>
                      <h4 className="font-bold text-lg text-[#1E1B4B] leading-tight mt-0.5">{opp.title}</h4>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {opp.aiMatchScore}% Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5E0D8]">
                    <div><span className="text-gray-500 block">Quantity Needed</span><strong className="text-[#1E1B4B]">{opp.quantityNeeded} units</strong></div>
                    <div><span className="text-gray-500 block">Est. Budget / Unit</span><strong className="text-[#1E1B4B]">₹{opp.estimatedBudgetPerUnit}</strong></div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <span className="font-bold text-gray-700 block">Match Criteria:</span>
                    <ul className="space-y-1">
                      {opp.matchReasons.map((r, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-xs"
                >
                  <FileText className="w-4 h-4 text-[#D4AF37]" /> Prepare Government Tender Spec
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <GeMReadyModal product={selectedGeMProduct} onClose={() => setShowModal(false)} />}
    </div>
  );
};
