import React from 'react';
import { Landmark, CheckCircle2, ShieldCheck, Download, AlertTriangle } from 'lucide-react';
import type { Product, GeMOpportunity } from '../../types';

interface GeMReadyModalProps {
  product: Product;
  opportunity?: GeMOpportunity;
  onClose: () => void;
}

export const GeMReadyModal: React.FC<GeMReadyModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[#E5E0D8] max-w-xl w-full space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#1E1B4B]">Government Marketplace Ready (GeM)</h3>
              <p className="text-xs text-gray-500">Integration-Ready Procurement Specification</p>
            </div>
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
            GeM Standard 3.0
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] space-y-2 text-xs">
          <h4 className="font-bold text-[#1E1B4B] mb-2 uppercase tracking-wider text-[11px]">Compliance Checklist</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-white p-2 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" /> Product Details Complete
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-white p-2 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" /> High-Res Images Ready
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-white p-2 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" /> Cost & Pricing Compliant
            </div>
            <div className="flex items-center gap-2 text-amber-700 font-semibold bg-white p-2 rounded-xl border border-amber-100">
              <AlertTriangle className="w-4 h-4" /> GST / HSN Provided ({product.hsnCode || '42022210'})
            </div>
          </div>
        </div>

        <div className="border border-[#E5E0D8] rounded-2xl overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-[#E5E0D8]">
              <tr className="bg-[#FAF7F2]">
                <td className="p-3 font-bold text-gray-600 w-1/3">Item Name:</td>
                <td className="p-3 font-bold text-[#1E1B4B]">{product.title}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-600">Category:</td>
                <td className="p-3 font-medium text-[#1E1B4B]">{product.category} (Handicrafts)</td>
              </tr>
              <tr className="bg-[#FAF7F2]">
                <td className="p-3 font-bold text-gray-600">HSN Code:</td>
                <td className="p-3 font-bold text-[#1E1B4B]">{product.hsnCode || '42022210'}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-600">GST Rate:</td>
                <td className="p-3 font-medium text-[#1E1B4B]">{product.gstRate || 12}%</td>
              </tr>
              <tr className="bg-[#FAF7F2]">
                <td className="p-3 font-bold text-gray-600">Artisan Credentials:</td>
                <td className="p-3 font-medium text-[#1E1B4B]">Meena Devi — Verified Rajasthan Handicrafts Cluster</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-gray-600">Production Capacity:</td>
                <td className="p-3 font-medium text-[#1E1B4B]">500 units / month</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#1E1B4B] text-white p-4 rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" /> Scalable GeM Integration Architecture
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            In production, authorized government APIs / approved integration mechanisms connect seamlessly through the Karigar AI Marketplace Adapter.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              alert('Government Marketplace (GeM) compliant XML/JSON payload exported successfully!');
              onClose();
            }}
            className="flex-1 bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-xs"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" /> Export GeM Procurement Listing
          </button>
          <button
            onClick={onClose}
            className="bg-[#FAF7F2] hover:bg-[#f2ece1] text-gray-700 font-semibold py-3.5 px-4 rounded-2xl border border-[#E5E0D8] text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
