import React, { useState } from 'react';
import { Sparkles, Edit3, CheckCircle2, Tag, Search, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';

interface CatalogPreviewCardProps {
  product: Partial<Product>;
  onSave: (updatedProduct: Partial<Product>) => void;
}

export const CatalogPreviewCard: React.FC<CatalogPreviewCardProps> = ({ product, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product.title || 'Handcrafted Cotton Bag with Traditional Embroidery');
  const [description, setDescription] = useState(
    product.description ||
      'Exquisite cotton tote bag featuring traditional Marwari needlework embroidery. Handcrafted with reinforced cotton handles and inner zippered pouch.'
  );

  const handleSave = () => {
    onSave({
      ...product,
      title,
      description,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#E5E0D8] max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl text-[#1E1B4B] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#C85A32]" /> AI Catalog Generator
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">Automated multilingual e-commerce listing</p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Listing Quality: 94/100
        </span>
      </div>

      <div className="flex gap-4 items-center bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8]">
        <img
          src={product.enhancedImage || product.originalImage}
          alt={title}
          className="w-24 h-24 rounded-2xl object-cover border border-[#E5E0D8] shadow-sm flex-shrink-0"
        />
        <div className="flex-1 space-y-1">
          <span className="text-[11px] font-bold text-[#C85A32] uppercase tracking-wider">AI Generated Title</span>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-1.5 font-bold text-sm text-[#1E1B4B]"
            />
          ) : (
            <h4 className="font-bold text-base text-[#1E1B4B] leading-tight">{title}</h4>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider block">Description</label>
        {isEditing ? (
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#E5E0D8] rounded-2xl p-3 text-xs text-gray-800 leading-relaxed"
          />
        ) : (
          <p className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] text-xs text-gray-700 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5E0D8]">
          <span className="text-gray-500 block text-[11px]">Category</span>
          <span className="font-bold text-[#1E1B4B]">{product.category || 'Handbags'}</span>
        </div>
        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5E0D8]">
          <span className="text-gray-500 block text-[11px]">Material</span>
          <span className="font-bold text-[#1E1B4B]">{product.material || 'Cotton'}</span>
        </div>
        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5E0D8]">
          <span className="text-gray-500 block text-[11px]">Craft</span>
          <span className="font-bold text-[#1E1B4B]">{product.craft || 'Traditional Embroidery'}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1 mb-2">
            <Tag className="w-3.5 h-3.5 text-[#C85A32]" /> Generated Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['#Handmade', '#CottonBag', '#IndianCraft', '#TraditionalEmbroidery', '#ArtisanMade'].map((t, i) => (
              <span key={i} className="bg-[#FAF7F2] text-[#1E1B4B] text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#E5E0D8]">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-[#1E1B4B] flex items-center gap-1 mb-2">
            <Search className="w-3.5 h-3.5 text-indigo-700" /> SEO Search Keywords
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['Handcrafted cotton bag', 'Indian handmade bag', 'Traditional embroidered tote'].map((k, i) => (
              <span key={i} className="bg-indigo-50 text-indigo-900 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-indigo-100">
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex-1 bg-[#1E1B4B] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg"
          >
            Save Listing Edits
          </button>
        ) : (
          <>
            <button
              onClick={() => onSave(product)}
              className="flex-1 bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
            >
              Continue to Pricing <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#FAF7F2] hover:bg-[#f2ece1] text-[#1E1B4B] font-semibold py-3.5 px-4 rounded-2xl border border-[#E5E0D8] transition flex items-center gap-1.5 text-xs"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};
