import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { FileCode2, Facebook, MessageCircle, Mail } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="border-t border-slate-200 bg-white py-12 mt-16 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-100">
          {/* Brand & Attribution */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-xs">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">{t.appName}</p>
              <p className="text-xs text-slate-400">
                Inspired by Amit Agarwal&#39;s Labnol.org XML Sitemap specification
              </p>
            </div>
          </div>

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            {/* Facebook */}
            <a
              href="https://facebook.com/tusharahmedbangla"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-200 transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="font-medium">@tusharahmedbangla</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801779889990"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">+8801779889990</span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@stepskill.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 hover:border-orange-200 transition-colors"
            >
              <Mail className="w-4 h-4 text-orange-600" />
              <span className="font-medium">info@stepskill.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p className="font-medium text-slate-700">
            &copy; {new Date().getFullYear()} <span className="font-bold text-slate-900">Tushar Ahmed Official</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-slate-400">
            <span>Standard robots.txt protocol</span>
            <span>&bull;</span>
            <span>Google Search Console ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
