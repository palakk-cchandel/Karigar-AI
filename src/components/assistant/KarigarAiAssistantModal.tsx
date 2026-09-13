import React, { useState } from 'react';
import { Bot, X, Send, Mic, Sparkles } from 'lucide-react';
import type { Language } from '../../types';

interface KarigarAiAssistantModalProps {
  language: Language;
  onClose: () => void;
}

export const KarigarAiAssistantModal: React.FC<KarigarAiAssistantModalProps> = ({ language, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text:
        language === 'hi'
          ? 'नमस्ते मीना जी! मैं आपका कारीगर AI व्यापार सलाहकार हूँ। मुझसे उत्पाद की कीमत, बाजार की मांग, या बिक्री बढ़ाने के तरीके के बारे में कुछ भी पूछें।'
          : 'Namaste Meena! I am your Karigar AI Business Assistant. Ask me anything about pricing your products, inventory demand, or connecting with hotel buyers.',
    },
  ]);

  const quickQuestions =
    language === 'hi'
      ? [
          'मेरे बैग की कीमत कितनी रखनी चाहिए?',
          'कौन सा उत्पाद ज्यादा बनाना चाहिए?',
          'होटल खरीदारों को क्या बेचना चाहिए?',
          'मेरी बिक्री कैसे बढ़ाई जा सकती है?',
        ]
      : [
          'How should I price my handcrafted bag?',
          'Which product should I produce more of?',
          'What products are hotels looking for?',
          'How can I improve my product catalog quality?',
        ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: query }];
    setMessages(newMsgs);
    setInput('');

    setTimeout(() => {
      let reply = '';
      if (query.includes('कीमत') || query.includes('price')) {
        reply =
          language === 'hi'
            ? 'आपकी कॉटन बैग की कुल निर्माण लागत ₹750 है। जयपुर और दिल्ली बाजार डेटा के अनुसार ₹999 एक संतुलित कीमत है, जिससे लगभग 24.9% का लाभ (₹249) मिलेगा।'
            : 'Your total production cost for the handcrafted cotton bag is ₹750. Based on comparable market signals, ₹999 is recommended, delivering a 24.9% margin (₹249 profit).';
      } else if (query.includes('उत्पाद') || query.includes('produce') || query.includes('more')) {
        reply =
          language === 'hi'
            ? 'आपके कढ़ाई वाले कॉटन बैग की मांग में इस महीने 18% का उछाल आया है। हम सलाह देते हैं कि आप 15-20 बैग और बनाएं और ₹1,199 का एक प्रीमियम वेरिएंट भी पेश करें।'
            : 'Your embroidered cotton bags show high market demand (+18% this month). We recommend producing 15–20 more units and introducing a premium variant priced at ₹1,199.';
      } else if (query.includes('होटल') || query.includes('hotel') || query.includes('B2B')) {
        reply =
          language === 'hi'
            ? 'हेरिटेज होटल्स प्राइवेट लिमिटेड को 200 कॉटन गिफ्ट बैग की आवश्यकता है। वे प्रति बैग ₹900-₹1,100 दे सकते हैं। अपनी B2B पूछताछ में ₹979 का काउंटर ऑफर भेजें।'
            : 'Heritage Hotels Pvt. Ltd. is looking for 200 handcrafted bags for guest welcome kits (Budget: ₹900–₹1,100/unit). You can send a counter offer of ₹979/unit.';
      } else {
        reply =
          language === 'hi'
            ? 'कारीगर AI द्वारा आपके व्यवसाय डेटा का विश्लेषण किया गया है। आपकी डिजिटल बिजनेस तत्परता स्कोर 82/100 है। B2B थोक अवसरों को स्वीकार करके आप अपनी मासिक आय दोगुनी कर सकती हैं।'
            : 'Based on your catalog and sales velocity, your Digital Readiness is 82/100. Fulfilling the 200-unit B2B hotel opportunity can increase your revenue by ₹1.99 Lakhs.';
      }
      setMessages([...newMsgs, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E5E0D8] h-[85vh] sm:h-[600px] flex flex-col overflow-hidden">
        <div className="bg-[#1E1B4B] text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C85A32] text-white rounded-full flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                Karigar AI Assistant <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </h3>
              <span className="text-[11px] text-gray-300">Multilingual Business Mentor (Hindi / English)</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF7F2]">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#C85A32] text-white rounded-br-none shadow-md'
                    : 'bg-white text-[#1E1B4B] rounded-bl-none border border-[#E5E0D8] shadow-sm font-medium'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-white border-t border-[#E5E0D8] flex gap-2 overflow-x-auto text-[11px] no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="bg-[#FAF7F2] hover:bg-[#C85A32] hover:text-white text-[#1E1B4B] font-semibold px-3 py-1.5 rounded-full border border-[#E5E0D8] whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="p-3 bg-white border-t border-[#E5E0D8] flex items-center gap-2">
          <button
            onClick={() => handleSend(quickQuestions[0])}
            className="p-2.5 bg-[#FAF7F2] text-[#C85A32] rounded-xl border border-[#E5E0D8] hover:bg-orange-50"
            title="Voice Assistant"
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'hi' ? 'कारीगर AI से पूछें...' : 'Ask Karigar AI...'}
            className="flex-1 bg-[#FAF7F2] border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E1B4B]"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-[#1E1B4B] text-white rounded-xl hover:bg-[#2E1065] transition shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
