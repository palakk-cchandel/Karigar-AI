import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, ArrowRight, RefreshCw, Languages, Sparkles } from 'lucide-react';
import type { VoiceNLPResult } from '../../types';
import { transcribeSpeechApi } from '../../services/api';

interface VoicePipelineModalProps {
  onComplete: (result: VoiceNLPResult) => void;
  onCancel: () => void;
}

export const VoicePipelineModal: React.FC<VoicePipelineModalProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<'idle' | 'recording' | 'processing' | 'result'>('idle');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [result, setResult] = useState<VoiceNLPResult | null>(null);

  const pipelineSteps = [
    { title: 'VOICE INPUT', subtitle: 'Capturing Audio' },
    { title: 'SPEECH TO TEXT', subtitle: 'Transcribing Speech' },
    { title: 'LANGUAGE DETECTION', subtitle: 'Hindi Detected' },
    { title: 'TRANSLATION', subtitle: 'English Translation' },
    { title: 'PRODUCT UNDERSTANDING', subtitle: 'Extracting Specs' },
  ];

  const handleStartDemoVoice = async () => {
    setStep('recording');

    setTimeout(async () => {
      setStep('processing');

      for (let i = 0; i < pipelineSteps.length; i++) {
        setActiveStepIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      const res = await transcribeSpeechApi();
      setResult(res);
      setStep('result');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 shadow-2xl border border-[#E5E0D8] max-w-lg w-full">
        {step === 'idle' && (
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-[#FAF7F2] text-[#C85A32] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#E5E0D8]">
              <Mic className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-[#1E1B4B]">Tell us about your product</h3>
              <p className="text-gray-600 text-sm mt-1">You can speak naturally in Hindi or regional languages. No typing needed.</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl text-left border border-[#E5E0D8] text-sm text-gray-700">
              <span className="font-semibold text-[#1E1B4B] block mb-1">Demo Voice Input (Hindi):</span>
              <p className="italic">"यह हाथ से बनी हुई कॉटन की बैग है। इसमें ट्रेडिशनल कढ़ाई है और इसे बनाने में तीन दिन लगे हैं।"</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleStartDemoVoice}
                className="w-full bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-4 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-3 text-lg"
              >
                <Mic className="w-6 h-6" /> 🎙 Tap to Speak (Play Demo Voice)
              </button>
              <button
                onClick={onCancel}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium py-2"
              >
                Type instead
              </button>
            </div>
          </div>
        )}

        {step === 'recording' && (
          <div className="text-center space-y-6 py-8">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 bg-[#C85A32]/20 rounded-full animate-ping"></div>
              <div className="w-20 h-20 bg-[#C85A32] text-white rounded-full flex items-center justify-center shadow-xl z-10">
                <Volume2 className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#1E1B4B]">Listening to your voice...</h3>
              <p className="text-xs text-[#C85A32] font-semibold mt-1">Recording Hindi Audio Stream</p>
            </div>

            <div className="flex justify-center items-center gap-1.5 h-12">
              {[40, 80, 50, 90, 100, 70, 85, 45, 95, 60, 80, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-[#C85A32] rounded-full animate-pulse"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="space-y-6 py-6 text-center">
            <div className="w-16 h-16 bg-[#1E1B4B] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-[#1E1B4B]">Understanding your description...</h3>
              <p className="text-xs text-gray-500">AI Multilingual NLP Pipeline</p>
            </div>

            <div className="space-y-3 text-left">
              {pipelineSteps.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
                    idx <= activeStepIndex
                      ? 'bg-[#1E1B4B] text-white border-[#1E1B4B]'
                      : 'bg-gray-50 text-gray-400 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                        idx <= activeStepIndex ? 'bg-[#C85A32] text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-xs tracking-wider">{s.title}</h4>
                      <p className="text-[11px] opacity-80">{s.subtitle}</p>
                    </div>
                  </div>
                  {idx <= activeStepIndex && <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && result && (
          <div className="space-y-5 py-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl text-[#1E1B4B] flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Extracted Product Info
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Languages className="w-3.5 h-3.5" /> {result.detectedLanguage}
              </span>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5E0D8] space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-[#E5E0D8]">
                  <span className="text-gray-500 block text-[11px]">Product</span>
                  <span className="font-bold text-[#1E1B4B] text-sm">{result.extractedInfo.product}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E5E0D8]">
                  <span className="text-gray-500 block text-[11px]">Material</span>
                  <span className="font-bold text-[#1E1B4B] text-sm">{result.extractedInfo.material}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E5E0D8]">
                  <span className="text-gray-500 block text-[11px]">Craft</span>
                  <span className="font-bold text-[#1E1B4B] text-sm">{result.extractedInfo.craft}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E5E0D8]">
                  <span className="text-gray-500 block text-[11px]">Production Time</span>
                  <span className="font-bold text-[#1E1B4B] text-sm">{result.extractedInfo.productionTime}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#E5E0D8] text-xs">
                <span className="text-gray-500 block text-[11px]">English Translation</span>
                <p className="text-gray-700 italic mt-0.5">{result.translatedText}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onComplete(result)}
                className="flex-1 bg-[#C85A32] hover:bg-[#b04d29] text-white font-bold py-3.5 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
              >
                Continue to Catalog <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStep('idle')}
                className="bg-[#FAF7F2] hover:bg-[#f2ece1] text-[#1E1B4B] p-3.5 rounded-2xl border border-[#E5E0D8]"
                title="Re-record voice"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
