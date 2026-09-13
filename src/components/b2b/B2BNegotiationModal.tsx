import React, { useState } from 'react';
import { Building2, CheckCircle2, Zap, X, Send } from 'lucide-react';
import type { B2BInquiry } from '../../types';

interface B2BNegotiationModalProps {
  inquiry: B2BInquiry;
  onClose: () => void;
  onAccept: () => void;
  onSendCounter: (counterPrice: number) => void;
}

export const B2BNegotiationModal: React.FC<B2BNegotiationModalProps> = ({
  inquiry,
  onClose,
  onAccept,
  onSendCounter,
}) => {
  const [counterPrice, setCounterPrice] = useState(979);

  const originalPrice = 999;
  const buyerOffer = inquiry.offeredPricePerUnit || 950;
  const totalUnits = inquiry.quantityRequested || 200;

  const totalOrderValue = counterPrice * totalUnits;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[#E5E0D8] max-w-lg w-full space-y-5">
        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-900 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1E1B4B]">{inquiry.buyerCompany}</h3>
              <p className="text-xs text-gray-500">{inquiry.buyerName} — {inquiry.buyerLocation}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Product:</span>
            <span className="font-bold text-[#1E1B4B]">{inquiry.productTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Quantity Needed:</span>
            <span className="font-bold text-emerald-700">{totalUnits} units</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Buyer Budget:</span>
            <span className="font-bold text-[#1E1B4B]">
              ₹{inquiry.budgetPerUnit.min} – ₹{inquiry.budgetPerUnit.max} / unit
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Deadline:</span>
            <span className="font-bold text-[#1E1B4B]">{inquiry.deliveryDays} Days</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1E1B4B] to-[#2E1065] text-white p-5 rounded-2xl shadow-lg space-y-3">
          <div className="flex justify-between text-xs text-[#D4AF37] font-bold">
            <span>Original Catalog Price: ₹{originalPrice}</span>
            <span>Buyer Requested: ₹{buyerOffer}</span>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/20 text-xs text-gray-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#D4AF37]">
              <Zap className="w-4 h-4" /> AI Smart Counter Recommendation
            </div>
            <p className="text-[11px] leading-relaxed text-gray-200">
              "Based on your ₹750 production cost and market demand, ₹979 balances bulk volume margin while respecting the buyer budget."
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-bold text-white">
              <span>Counter Offer Per Unit:</span>
              <span className="text-[#D4AF37] text-base">₹{counterPrice}</span>
            </div>
            <input
              type="range"
              min={buyerOffer}
              max={originalPrice}
              step={5}
              value={counterPrice}
              onChange={(e) => setCounterPrice(Number(e.target.value))}
              className="w-full accent-[#C85A32] cursor-pointer"
            />
          </div>

          <div className="flex justify-between text-xs border-t border-white/20 pt-2">
            <span>Total Estimated Deal Value:</span>
            <span className="font-bold text-emerald-300 text-sm">₹{totalOrderValue.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onSendCounter(counterPrice)}
            className="flex-1 bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-3.5 px-5 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" /> Send Counter (₹{counterPrice}/unit)
          </button>
          <button
            onClick={onAccept}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-2xl transition text-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Accept (₹{buyerOffer})
          </button>
        </div>
      </div>
    </div>
  );
};
