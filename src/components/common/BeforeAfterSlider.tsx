import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

interface BeforeAfterSliderProps {
  originalImage: string;
  enhancedImage: string;
  scores: { visibility: number; lighting: number; background: number };
  onConfirm: () => void;
  onTryAgain: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalImage,
  enhancedImage,
  scores,
  onConfirm,
  onTryAgain,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientPositionX: number, rect: DOMRect) => {
    const x = clientPositionX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#E5E0D8] max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#C85A32]" />
          <h3 className="font-bold text-xl text-[#1E1B4B]">AI Studio Enhancer</h3>
        </div>
        <span className="bg-[#FAF7F2] text-[#C85A32] text-xs font-semibold px-3 py-1 rounded-full border border-[#E5E0D8]">
          Before / After Comparison
        </span>
      </div>

      {/* Interactive Slider Container */}
      <div
        className="relative h-80 rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-[#1E1B4B]/10 shadow-inner"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Enhanced Image (Base Layer) */}
        <img
          src={enhancedImage}
          alt="AI Enhanced"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Original Image (Clipped Layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={originalImage}
            alt="Original"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-md">
            BEFORE (Original)
          </div>
        </div>

        <div className="absolute top-3 right-3 bg-[#1E1B4B]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" /> AFTER (AI Enhanced)
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-2xl z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#1E1B4B] text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-white">
            <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </div>
      </div>

      {/* AI Scorecard Breakdown */}
      <div className="mt-5 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] space-y-3">
        <div className="text-xs font-bold text-[#1E1B4B] uppercase tracking-wider flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Image Quality Scorecard
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white p-2.5 rounded-xl border border-[#E5E0D8] shadow-sm">
            <span className="text-xs text-gray-500 block">Visibility</span>
            <span className="text-lg font-bold text-emerald-600">{scores.visibility}%</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-[#E5E0D8] shadow-sm">
            <span className="text-xs text-gray-500 block">Lighting</span>
            <span className="text-lg font-bold text-emerald-600">{scores.lighting}%</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-[#E5E0D8] shadow-sm">
            <span className="text-xs text-gray-500 block">Background</span>
            <span className="text-lg font-bold text-emerald-600">{scores.background}%</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 bg-[#C85A32] hover:bg-[#b04d29] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" /> Use Enhanced Image
        </button>
        <button
          onClick={onTryAgain}
          className="bg-[#FAF7F2] hover:bg-[#f2ece1] text-[#1E1B4B] font-semibold py-3.5 px-5 rounded-2xl border border-[#E5E0D8] transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
