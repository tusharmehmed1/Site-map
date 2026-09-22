import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import {
  BookOpen,
  ArrowRight,
  Settings,
  ToggleRight,
  Save,
  Send,
  ExternalLink,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface TutorialGuideProps {
  language: Language;
}

export const TutorialGuide: React.FC<TutorialGuideProps> = ({ language }) => {
  const t = translations[language];

  const stepIcons = [
    Settings,
    ToggleRight,
    Save,
    Send,
    ExternalLink,
  ];

  return (
    <section id="tutorial" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          {language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorial Guide'}
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.stepsTitle}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          {t.stepsSubtitle}
        </p>
      </div>

      {/* Visual Steps Timeline */}
      <div className="space-y-6">
        {t.steps.map((step, idx) => {
          const Icon = stepIcons[idx % stepIcons.length];
          return (
            <div
              key={step.number}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              {/* Step Number Circle */}
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <h3 className="font-bold text-slate-900 text-base">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-2">
                  {step.description}
                </p>

                {step.tip && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/70">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{step.tip}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual UI Simulation of Blogger Settings */}
      <div className="mt-8 p-5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          {language === 'bn' ? 'ব্লগার ড্যাশবোর্ড প্রিভিউ' : 'Blogger Dashboard Settings Path'}
        </h4>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-slate-200">
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
            blogger.com
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
            Settings (সেটিংস)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">
            Crawlers and indexing
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2.5 py-1 rounded bg-orange-950 text-orange-300 border border-orange-700 font-semibold">
            Custom robots.txt [Enable &gt; Paste &gt; Save]
          </span>
        </div>
      </div>
    </section>
  );
};
