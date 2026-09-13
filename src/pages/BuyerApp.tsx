import React, { useState } from 'react';
import { Search, Sparkles, Building2, ShieldCheck, MapPin } from 'lucide-react';
import { demoProducts } from '../data/mockData';
import type { Product } from '../types';

export const BuyerApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(demoProducts[0]);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const categories = ['All', 'Handbags', 'Textiles', 'Paintings', 'Home Decor', 'Woodcraft', 'Pottery', 'Bags'];

  const filteredProducts = demoProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.craft.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#C85A32] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-[#D4AF37] text-[#1E1B4B] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              B2B Enterprise Marketplace
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif-craft">Discover India’s Authentic Artisans</h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              Direct market linkage linking hotels, corporate buyers, and exporters with verified regional craft clusters.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-2 text-center md:text-left">
            <div className="font-bold text-[#D4AF37] flex items-center gap-1.5 justify-center md:justify-start">
              <ShieldCheck className="w-4 h-4" /> AI Authenticity & Provenance Verified
            </div>
            <p className="text-gray-300">Direct sourcing with 0% intermediary markup</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-md border border-[#E5E0D8] space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by craft (e.g. Marwari Embroidery, Banarasi Silk), material, or location..."
              className="w-full bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-[#C85A32] text-white shadow-md'
                    : 'bg-[#FAF7F2] hover:bg-[#f2ece1] text-[#1E1B4B] border border-[#E5E0D8]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#E5E0D8] hover:shadow-2xl transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.enhancedImage || product.originalImage}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E1B4B]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {product.craft}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" /> 92% AI Match
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C85A32]" /> {product.location}
                  </span>
                  <h3 className="font-bold text-sm text-[#1E1B4B] line-clamp-2">{product.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="p-4 border-t border-[#E5E0D8] bg-[#FAF7F2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Wholesale Price</span>
                  <span className="text-lg font-black text-[#1E1B4B]">₹{product.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                    setShowBulkModal(true);
                  }}
                  className="bg-[#1E1B4B] hover:bg-[#2E1065] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow"
                >
                  Bulk Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showBulkModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[#E5E0D8] max-w-lg w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-900 rounded-full flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#1E1B4B]">Submit B2B Bulk Order Request</h3>
                <p className="text-xs text-gray-500">Connecting with Artisan Meena Devi (Jaipur)</p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5E0D8] text-xs space-y-1">
              <span className="font-bold text-[#1E1B4B]">{selectedProduct.title}</span>
              <div className="flex justify-between text-gray-600">
                <span>Unit Price: ₹{selectedProduct.price}</span>
                <span>Available Stock: {selectedProduct.stock} units</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1E1B4B] block mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  defaultValue="Heritage Hotels Pvt. Ltd."
                  className="w-full bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl px-3 py-2 font-bold text-[#1E1B4B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1E1B4B] block mb-1">Quantity Needed</label>
                  <input
                    type="number"
                    defaultValue={200}
                    className="w-full bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl px-3 py-2 font-bold text-[#1E1B4B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1E1B4B] block mb-1">Target Price (₹/unit)</label>
                  <input
                    type="number"
                    defaultValue={950}
                    className="w-full bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl px-3 py-2 font-bold text-[#1E1B4B]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  alert('B2B Bulk Inquiry of 200 units sent to Meena Devi! Notification sent to Artisan Dashboard.');
                  setShowBulkModal(false);
                }}
                className="flex-1 bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg text-sm"
              >
                Send Bulk Inquiry (₹1,90,000)
              </button>
              <button
                onClick={() => setShowBulkModal(false)}
                className="bg-[#FAF7F2] text-gray-600 font-semibold py-3.5 px-4 rounded-2xl border border-[#E5E0D8] text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
