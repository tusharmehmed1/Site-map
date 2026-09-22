import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { FileCode2, Heart, Shield } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="border-t border-slate-200 bg-white py-12 mt-16 text-slate-500 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Attribution */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold">
            <FileCode2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800">{t.appName}</p>
            <p className="text-xs text-slate-400">
              Inspired by Amit Agarwal&#39;s Labnol.org XML Sitemap specification
            </p>
          </div>
        </div>

        {/* Informative Note */}
        <div className="text-center md:text-right max-w-md">
          <p className="text-xs text-slate-500">{t.footerNote}</p>
          <div className="mt-2 flex items-center justify-center md:justify-end gap-3 text-xs text-slate-400">
            <span>Standard robots.txt protocol</span>
            <span>&bull;</span>
            <span>Google Search Console ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
