import React, { useState } from 'react';
import { IndianRupee, TrendingUp, HelpCircle, ArrowRight, Zap } from 'lucide-react';
import type { CostBreakdown } from '../../types';
import { calculateSmartPrice } from '../../services/pricingEngine';

interface SmartPricingCardProps {
  initialCost: CostBreakdown;
  onSelectPrice: (price: number) => void;
}

export const SmartPricingCard: React.FC<SmartPricingCardProps> = ({ initialCost, onSelectPrice }) => {
  const [cost, setCost] = useState<CostBreakdown>(initialCost);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const recommendation = calculateSmartPrice(cost, 'Handbags', 'HIGH', 'HIGH');
  const [selectedPrice, setSelectedPrice] = useState<number>(recommendation.suggestedPrice);

  const handleCostChange = (field: keyof CostBreakdown, val: number) => {
    const updatedCost = { ...cost, [field]: Math.max(0, val) };
    updatedCost.totalProductionCost =
      updatedCost.rawMaterial + updatedCost.labour + updatedCost.packaging + updatedCost.other;
    setCost(updatedCost);
  };

  const totalCost = cost.totalProductionCost;
  const currentProfit = Math.max(0, selectedPrice - totalCost);
  const currentMargin = Number(((currentProfit / selectedPrice) * 100).toFixed(1));

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#E5E0D8] max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl text-[#1E1B4B] flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-[#C85A32]" /> Smart Pricing Engine
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">Based on production cost & real-time market signals</p>
        </div>
        <span className="bg-[#FAF7F2] text-[#C85A32] text-xs font-bold px-3 py-1 rounded-full border border-[#E5E0D8]">
          AI Recommended
        </span>
      </div>

      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] space-y-3">
        <h4 className="font-bold text-xs text-[#1E1B4B] uppercase tracking-wider">1. Production Cost Breakdown</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-gray-600 block mb-1">Raw Material (₹)</label>
            <input
              type="number"
              value={cost.rawMaterial}
              onChange={(e) => handleCostChange('rawMaterial', Number(e.target.value))}
              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 font-bold text-[#1E1B4B]"
            />
          </div>
          <div>
            <label className="text-gray-600 block mb-1">Labour / Craft (₹)</label>
            <input
              type="number"
              value={cost.labour}
              onChange={(e) => handleCostChange('labour', Number(e.target.value))}
              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 font-bold text-[#1E1B4B]"
            />
          </div>
          <div>
            <label className="text-gray-600 block mb-1">Packaging (₹)</label>
            <input
              type="number"
              value={cost.packaging}
              onChange={(e) => handleCostChange('packaging', Number(e.target.value))}
              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 font-bold text-[#1E1B4B]"
            />
          </div>
          <div>
            <label className="text-gray-600 block mb-1">Other Costs (₹)</label>
            <input
              type="number"
              value={cost.other}
              onChange={(e) => handleCostChange('other', Number(e.target.value))}
              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 font-bold text-[#1E1B4B]"
            />
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-[#E5E0D8] flex items-center justify-between font-bold text-sm text-[#1E1B4B]">
          <span>Total Production Cost:</span>
          <span className="text-[#C85A32] text-lg">₹{totalCost.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5E0D8]">
          <span className="text-gray-500 block">Comparable Products</span>
          <span className="font-bold text-[#1E1B4B] text-sm">
            ₹{recommendation.comparableRange.min} – ₹{recommendation.comparableRange.max}
          </span>
        </div>
        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5E0D8]">
          <span className="text-gray-500 block">Market Demand Signal</span>
          <span className="font-bold text-emerald-700 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> {recommendation.demandLevel} (+18%)
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#1E1B4B] to-[#2E1065] text-white p-6 rounded-3xl shadow-xl relative overflow-hidden text-center space-y-2">
        <div className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest flex items-center justify-center gap-1">
          <Zap className="w-4 h-4" /> AI RECOMMENDED PRICE
        </div>
        <div className="text-5xl font-black text-white">₹{selectedPrice.toLocaleString()}</div>
        <div className="flex justify-center items-center gap-4 text-xs pt-1">
          <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
            Profit: ₹{currentProfit.toLocaleString()}
          </span>
          <span className="bg-[#D4AF37]/20 text-[#D4AF37] font-semibold px-3 py-1 rounded-full border border-[#D4AF37]/30">
            Margin: {currentMargin}%
          </span>
        </div>
        <p className="text-[11px] text-gray-300 pt-2 leading-relaxed max-w-md mx-auto">{recommendation.explanation}</p>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-xs text-[#D4AF37] hover:underline flex items-center justify-center gap-1 mx-auto pt-1"
        >
          <HelpCircle className="w-3.5 h-3.5" /> Why this price?
        </button>
      </div>

      {showBreakdown && (
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] text-xs space-y-2 text-gray-700">
          <h5 className="font-bold text-[#1E1B4B]">Transparent Pricing Rationale</h5>
          <ul className="list-disc pl-4 space-y-1">
            <li>Production Cost Base: ₹{totalCost}</li>
            <li>Market Reference: Similar Marwari bags sell for ₹899 – ₹1,199</li>
            <li>Uniqueness Premium: High hand embroidery craft factor added (+4%)</li>
            <li>Target Profit: Delivers ₹{currentProfit} profit at a healthy {currentMargin}% margin</li>
          </ul>
        </div>
      )}

      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-[#1E1B4B]">
          <span>Price Simulator</span>
          <span>Adjust Price: ₹{selectedPrice}</span>
        </div>

        <input
          type="range"
          min={Math.round(totalCost * 1.1)}
          max={Math.round(totalCost * 1.6)}
          step={10}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(Number(e.target.value))}
          className="w-full accent-[#C85A32] cursor-pointer"
        />

        <div className="flex justify-between text-[11px] text-gray-500">
          <span>₹{Math.round(totalCost * 1.1)} (High Sales / Lower Margin)</span>
          <span>₹{Math.round(totalCost * 1.6)} (Higher Profit / Lower Volume)</span>
        </div>
      </div>

      <button
        onClick={() => onSelectPrice(selectedPrice)}
        className="w-full bg-[#C85A32] hover:bg-[#b04d29] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-lg"
      >
        Confirm Price & Continue <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
