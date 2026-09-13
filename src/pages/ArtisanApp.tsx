import React, { useState } from 'react';
import {
  Plus, Sparkles, TrendingUp, ChevronRight, CheckCircle2, ArrowRight, Mic, Camera, Upload, Bot, ShieldCheck, ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Language, Product, B2BInquiry } from '../types';
import { dictionaries } from '../data/dictionary';
import { demoArtisans, demoProducts, demoB2BInquiries, demoAIInsights } from '../data/mockData';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { VoicePipelineModal } from '../components/voice/VoicePipelineModal';
import { SmartPricingCard } from '../components/pricing/SmartPricingCard';
import { CatalogPreviewCard } from '../components/catalog/CatalogPreviewCard';
import { KarigarAiAssistantModal } from '../components/assistant/KarigarAiAssistantModal';
import { B2BNegotiationModal } from '../components/b2b/B2BNegotiationModal';
import { GeMReadyModal } from '../components/government/GeMReadyModal';

interface ArtisanAppProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBuyerMarketplace: () => void;
}

export const ArtisanApp: React.FC<ArtisanAppProps> = ({
  language,
  onLanguageChange,
  onOpenBuyerMarketplace,
}) => {
  const dict = dictionaries[language] || dictionaries.en;
  const meena = demoArtisans[0];

  const [screen, setScreen] = useState<string>('dashboard');

  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    originalImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    enhancedImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    title: 'Handcrafted Cotton Bag with Traditional Embroidery',
    description: 'Exquisite cotton tote bag featuring traditional Marwari needlework embroidery. Handcrafted with reinforced cotton handles, inner zippered pouch, and eco-friendly organic canvas material.',
    category: 'Handbags',
    material: 'Cotton',
    craft: 'Traditional Embroidery',
    color: 'Multicolor / Beige',
    price: 999,
    costBreakdown: { rawMaterial: 450, labour: 250, packaging: 50, other: 0, totalProductionCost: 750 },
    stock: 38,
    reserved: 12,
    sold: 42,
    demandScore: 'HIGH',
    uniquenessScore: 'HIGH',
    tags: ['#Handmade', '#CottonBag', '#IndianCraft', '#TraditionalEmbroidery', '#ArtisanMade'],
    seoKeywords: ['Handcrafted cotton bag', 'Indian handmade bag', 'Traditional embroidered tote'],
    listingQualityScore: 94,
    imageQualityScore: { visibility: 97, lighting: 96, background: 98 },
    gemReady: true,
  });

  const productsList = demoProducts;
  const inquiriesList = demoB2BInquiries;
  const [activeInquiry, setActiveInquiry] = useState<B2BInquiry | null>(null);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showGeMModal, setShowGeMModal] = useState(false);

  const handlePublish = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
    setScreen('success');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-4 px-2 sm:px-4">
      <div className="max-w-md mx-auto bg-white rounded-[40px] shadow-2xl border-4 border-[#1E1B4B]/10 overflow-hidden relative min-h-[750px] flex flex-col justify-between">
        <div className="bg-[#1E1B4B] text-white px-6 py-2.5 flex items-center justify-between text-xs font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" /> KARIGAR AI MOBILE
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">
          {screen === 'splash' && (
            <div className="text-center space-y-8 py-10 my-auto flex flex-col items-center justify-center">
              <div className="w-28 h-28 bg-gradient-to-br from-[#C85A32] to-[#D4AF37] rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-subtle">
                <Sparkles className="w-14 h-14 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#1E1B4B] font-serif-craft">{dict.appName}</h2>
                <p className="text-[#C85A32] font-bold text-base">{dict.tagline}</p>
                <p className="text-xs text-gray-500">{dict.subtext}</p>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] max-w-xs text-xs text-gray-600">
                "An artisan should not need to learn e-commerce to participate in e-commerce."
              </div>

              <button
                onClick={() => setScreen('onboarding')}
                className="w-full bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-4 px-6 rounded-2xl transition shadow-xl text-lg flex items-center justify-center gap-2"
              >
                {dict.getStarted} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {screen === 'onboarding' && (
            <div className="space-y-6 py-4">
              <div className="text-center space-y-1">
                <h3 className="font-bold text-2xl text-[#1E1B4B]">{dict.chooseLanguage}</h3>
                <p className="text-xs text-gray-500">अपनी पसंदीदा भाषा चुनें</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { code: 'hi', label: 'Hindi (हिंदी)', ready: true },
                  { code: 'en', label: 'English', ready: true },
                  { code: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)', ready: false },
                  { code: 'ta', label: 'Tamil (தமிழ்)', ready: false },
                  { code: 'te', label: 'Telugu (తెలుగు)', ready: false },
                  { code: 'bn', label: 'Bengali (বাংলা)', ready: false },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code as Language);
                      setScreen('login');
                    }}
                    className={`p-4 rounded-2xl border text-left transition font-bold ${
                      language === l.code
                        ? 'bg-[#1E1B4B] text-white border-[#1E1B4B] shadow-md'
                        : 'bg-[#FAF7F2] hover:bg-[#f2ece1] text-[#1E1B4B] border-[#E5E0D8]'
                    }`}
                  >
                    {l.label}
                    {!l.ready && <span className="block text-[10px] text-gray-400 font-normal">Architecture Ready</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen === 'login' && (
            <div className="space-y-6 py-6 text-center">
              <div className="w-20 h-20 bg-indigo-50 text-[#1E1B4B] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-10 h-10 text-[#C85A32]" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-[#1E1B4B]">Welcome to Karigar AI</h3>
                <p className="text-xs text-gray-500 mt-1">Artisan Authentication Portal</p>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] text-left space-y-3">
                <div className="flex items-center gap-3">
                  <img src={meena.avatar} alt="Meena Devi" className="w-12 h-12 rounded-full object-cover border-2 border-[#C85A32]" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1E1B4B]">{meena.name}</h4>
                    <p className="text-xs text-gray-500">{meena.craft} — {meena.location}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen('dashboard')}
                className="w-full bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-bold py-4 px-6 rounded-2xl transition shadow-xl text-base flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> {dict.loginAsDemo}
              </button>
            </div>
          )}

          {screen === 'dashboard' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8]">
                <div className="flex items-center gap-3">
                  <img src={meena.avatar} alt="Meena Devi" className="w-12 h-12 rounded-full object-cover border-2 border-[#C85A32]" />
                  <div>
                    <h3 className="font-bold text-base text-[#1E1B4B]">{dict.greeting}</h3>
                    <p className="text-xs text-gray-600">{dict.subtitle}</p>
                  </div>
                </div>
                <span className="bg-[#D4AF37]/20 text-[#1E1B4B] font-bold text-xs px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                  ★ {meena.rating}
                </span>
              </div>

              <button
                onClick={() => setScreen('add-photo')}
                className="w-full bg-gradient-to-r from-[#C85A32] to-[#e06d44] hover:brightness-110 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl transition shadow-xl flex items-center justify-center gap-3 text-lg"
              >
                <Plus className="w-6 h-6 bg-white/20 rounded-full p-1" /> {dict.addNewProduct}
              </button>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-2xl border border-[#E5E0D8] shadow-sm">
                  <span className="text-gray-400 block text-[10px]">Products</span>
                  <span className="font-bold text-base text-[#1E1B4B]">{meena.totalProducts}</span>
                </div>
                <div className="bg-white p-2.5 rounded-2xl border border-[#E5E0D8] shadow-sm">
                  <span className="text-gray-400 block text-[10px]">Orders</span>
                  <span className="font-bold text-base text-[#1E1B4B]">{meena.totalOrders}</span>
                </div>
                <div className="bg-white p-2.5 rounded-2xl border border-[#E5E0D8] shadow-sm">
                  <span className="text-gray-400 block text-[10px]">Sales</span>
                  <span className="font-bold text-xs text-emerald-700">₹48.7K</span>
                </div>
                <div className="bg-white p-2.5 rounded-2xl border border-[#E5E0D8] shadow-sm">
                  <span className="text-gray-400 block text-[10px]">Inquiries</span>
                  <span className="font-bold text-base text-[#C85A32]">8</span>
                </div>
              </div>

              <div className="bg-indigo-900 text-white p-4 rounded-2xl shadow-lg border border-indigo-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#D4AF37] flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> {dict.newB2bInquiry}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    92% Match
                  </span>
                </div>
                <p className="text-xs text-gray-200">
                  <strong>Heritage Hotels Pvt. Ltd.</strong> requested 200 handcrafted cotton bags (Est. ₹1,99,800).
                </p>
                <button
                  onClick={() => setActiveInquiry(inquiriesList[0])}
                  className="w-full bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-2 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1"
                >
                  View Inquiry & Negotiate <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#1E1B4B] flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-[#C85A32]" /> {dict.aiBusinessManager}
                  </h4>
                  <span className="text-xs text-emerald-700 font-semibold">Readiness: 82/100</span>
                </div>

                {demoAIInsights.map((insight) => (
                  <div key={insight.id} className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E5E0D8] space-y-1.5 text-xs">
                    <h5 className="font-bold text-[#1E1B4B]">{insight.title}</h5>
                    <p className="text-gray-600 leading-relaxed">{insight.description}</p>
                    {insight.actionText && (
                      <button
                        onClick={() => {
                          if (insight.type === 'PRICING') setScreen('pricing');
                          else if (insight.type === 'B2B') setActiveInquiry(inquiriesList[0]);
                          else setScreen('inventory');
                        }}
                        className="text-[#C85A32] font-bold hover:underline flex items-center gap-1 pt-1"
                      >
                        {insight.actionText} →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen === 'add-photo' && (
            <div className="space-y-6 py-4 text-center">
              <div>
                <span className="text-xs font-bold text-[#C85A32] uppercase tracking-widest">Step 1 of 4</span>
                <h3 className="font-bold text-2xl text-[#1E1B4B] mt-1">Add your product</h3>
                <p className="text-xs text-gray-500">Take a photo or describe naturally by voice</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setScreen('image-studio')}
                  className="bg-[#FAF7F2] hover:bg-[#f2ece1] p-6 rounded-2xl border-2 border-dashed border-[#C85A32]/40 flex flex-col items-center justify-center gap-2 transition group"
                >
                  <Camera className="w-8 h-8 text-[#C85A32] group-hover:scale-110 transition" />
                  <span className="font-bold text-sm text-[#1E1B4B]">{dict.takePhoto}</span>
                </button>
                <button
                  onClick={() => setScreen('image-studio')}
                  className="bg-[#FAF7F2] hover:bg-[#f2ece1] p-6 rounded-2xl border-2 border-dashed border-[#1E1B4B]/30 flex flex-col items-center justify-center gap-2 transition group"
                >
                  <Upload className="w-8 h-8 text-[#1E1B4B] group-hover:scale-110 transition" />
                  <span className="font-bold text-sm text-[#1E1B4B]">{dict.uploadPhoto}</span>
                </button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E0D8]"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or Describe by Voice</span></div>
              </div>

              <button
                onClick={() => setScreen('voice-nlp')}
                className="w-full bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-bold py-4 px-6 rounded-2xl transition shadow-xl text-base flex items-center justify-center gap-3"
              >
                <Mic className="w-6 h-6 text-[#D4AF37] animate-bounce" /> 🎙 Describe by Voice (Hindi / Voice Note)
              </button>
            </div>
          )}

          {screen === 'image-studio' && (
            <div className="space-y-4 py-2">
              <BeforeAfterSlider
                originalImage={currentProduct.originalImage!}
                enhancedImage={currentProduct.enhancedImage!}
                scores={currentProduct.imageQualityScore!}
                onConfirm={() => setScreen('voice-nlp')}
                onTryAgain={() => setScreen('add-photo')}
              />
            </div>
          )}

          {screen === 'voice-nlp' && (
            <VoicePipelineModal
              onComplete={(voiceRes) => {
                setCurrentProduct({
                  ...currentProduct,
                  title: `${voiceRes.extractedInfo.product} with ${voiceRes.extractedInfo.craft}`,
                  material: voiceRes.extractedInfo.material,
                  craft: voiceRes.extractedInfo.craft,
                });
                setScreen('catalog');
              }}
              onCancel={() => setScreen('catalog')}
            />
          )}

          {screen === 'catalog' && (
            <div className="space-y-4 py-2">
              <CatalogPreviewCard
                product={currentProduct}
                onSave={(updated) => {
                  setCurrentProduct(updated);
                  setScreen('pricing');
                }}
              />
            </div>
          )}

          {screen === 'pricing' && (
            <div className="space-y-4 py-2">
              <SmartPricingCard
                initialCost={currentProduct.costBreakdown!}
                onSelectPrice={(confirmedPrice) => {
                  setCurrentProduct({ ...currentProduct, price: confirmedPrice });
                  setScreen('preview');
                }}
              />
            </div>
          )}

          {screen === 'preview' && (
            <div className="space-y-5 py-2">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">Step 4 of 4 — Final Check</span>
                <h3 className="font-bold text-xl text-[#1E1B4B]">Buyer Listing Preview</h3>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#E5E0D8] space-y-3 shadow-md">
                <img
                  src={currentProduct.enhancedImage || currentProduct.originalImage}
                  alt={currentProduct.title}
                  className="w-full h-48 rounded-2xl object-cover border border-[#E5E0D8]"
                />
                <div>
                  <h4 className="font-bold text-base text-[#1E1B4B]">{currentProduct.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{currentProduct.description}</p>
                </div>

                <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-[#E5E0D8]">
                  <span className="text-xs text-gray-500">Market Price:</span>
                  <span className="text-2xl font-black text-[#1E1B4B]">₹{currentProduct.price?.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-[#E5E0D8]"><span className="text-gray-400 block">Artisan</span><strong>{meena.name} ({meena.location})</strong></div>
                  <div className="bg-white p-2 rounded-xl border border-[#E5E0D8]"><span className="text-gray-400 block">Material & Craft</span><strong>{currentProduct.material} • {currentProduct.craft}</strong></div>
                </div>
              </div>

              <button
                onClick={handlePublish}
                className="w-full bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-4 px-6 rounded-2xl transition shadow-xl text-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6 text-white" /> Publish Product to Marketplace
              </button>
            </div>
          )}

          {screen === 'success' && (
            <div className="text-center space-y-6 py-8">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-[#1E1B4B]">{dict.publishSuccessTitle}</h3>
                <p className="text-xs text-gray-500 mt-1">Product ID: <strong className="text-[#C85A32]">KA-2026-001</strong></p>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold"><CheckCircle2 className="w-4 h-4" /> Catalog Created & SEO Keywords Generated</div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold"><CheckCircle2 className="w-4 h-4" /> Smart Price Optimized (₹999)</div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold"><CheckCircle2 className="w-4 h-4" /> Stock Added & AI Inventory Forecast Enabled</div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold"><CheckCircle2 className="w-4 h-4" /> B2B Buyer Matching Enabled</div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold"><CheckCircle2 className="w-4 h-4" /> Government Marketplace (GeM) Ready</div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={onOpenBuyerMarketplace}
                  className="w-full bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" /> View in Buyer Marketplace
                </button>
                <button
                  onClick={() => setScreen('dashboard')}
                  className="w-full bg-[#FAF7F2] hover:bg-[#f2ece1] text-[#1E1B4B] font-bold py-3.5 px-6 rounded-2xl border border-[#E5E0D8] transition"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}

          {screen === 'inventory' && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-[#1E1B4B]">Inventory & Forecast</h3>
                <button onClick={() => setScreen('dashboard')} className="text-xs text-[#C85A32] font-bold">Back to Dashboard</button>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] space-y-3">
                <h4 className="font-bold text-xs text-[#1E1B4B] uppercase tracking-wider">AI Demand Forecast (7 Days)</h4>
                <div className="flex items-center justify-between text-sm bg-white p-3 rounded-xl border border-[#E5E0D8]">
                  <span>Expected Demand:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +18% Surge</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  "Based on festive orders in Jaipur and B2B corporate inquiries, consider producing <strong>15–20 more cotton bags</strong>."
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-[#FAF7F2] border-t border-[#E5E0D8] flex items-center justify-between">
          <button
            onClick={() => setShowAiAssistant(true)}
            className="flex-1 bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-bold py-3 px-4 rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-xs"
          >
            <Bot className="w-4 h-4 text-[#D4AF37]" /> {dict.askAiAssistant}
          </button>
          <button
            onClick={() => setShowGeMModal(true)}
            className="ml-2 bg-[#D4AF37]/20 text-[#1E1B4B] font-bold p-3 rounded-2xl border border-[#D4AF37]/40 text-xs flex items-center gap-1"
            title="GeM Ready Portal"
          >
            <ShieldCheck className="w-4 h-4 text-amber-700" /> GeM Ready
          </button>
        </div>
      </div>

      {showAiAssistant && (
        <KarigarAiAssistantModal language={language} onClose={() => setShowAiAssistant(false)} />
      )}
      {activeInquiry && (
        <B2BNegotiationModal
          inquiry={activeInquiry}
          onClose={() => setActiveInquiry(null)}
          onAccept={() => {
            alert('B2B Bulk Order Accepted! Invoice generated for Heritage Hotels Pvt. Ltd.');
            setActiveInquiry(null);
          }}
          onSendCounter={(counter) => {
            alert(`Counter offer of ₹${counter}/unit submitted to Heritage Hotels Pvt. Ltd.!`);
            setActiveInquiry(null);
          }}
        />
      )}
      {showGeMModal && (
        <GeMReadyModal product={productsList[0]} onClose={() => setShowGeMModal(false)} />
      )}
    </div>
  );
};
