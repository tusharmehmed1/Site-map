import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { Globe, FileCode2, BookOpen, CheckCircle2, HelpCircle } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const t = translations[language];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-xs">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                {t.appName}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                Labnol Compatible
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Digital Inspiration Standard XML &amp; robots.txt Generator
            </p>
          </div>
        </div>

        {/* Navigation & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            <a
              href="#generator"
              className="px-3 py-1.5 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              Generator
            </a>
            <a
              href="#tutorial"
              className="px-3 py-1.5 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              How to Add
            </a>
            <a
              href="#checker"
              className="px-3 py-1.5 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Live Tester
            </a>
            <a
              href="#faq"
              className="px-3 py-1.5 rounded-lg hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-orange-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('bn')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'bn'
                  ? 'bg-white text-orange-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
