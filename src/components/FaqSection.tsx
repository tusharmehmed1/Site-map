import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = translations[language];
  const [openId, setOpenId] = useState<string | null>(t.faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          FAQ
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.faqTitle}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          {t.faqSubtitle}
        </p>
      </div>

      <div className="divide-y divide-slate-200">
        {t.faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="py-4">
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-slate-400 group-hover:text-orange-600 transition-colors">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="mt-3 text-sm text-slate-600 leading-relaxed pl-1 pr-4">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
