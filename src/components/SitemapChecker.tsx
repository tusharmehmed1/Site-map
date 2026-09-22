import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { normalizeBlogUrl } from '../utils/sitemapGenerator';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Search,
  Loader2,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

interface SitemapCheckerProps {
  language: Language;
  defaultUrl: string;
}

export const SitemapChecker: React.FC<SitemapCheckerProps> = ({
  language,
  defaultUrl,
}) => {
  const t = translations[language];
  const [testUrl, setTestUrl] = useState(defaultUrl || '');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'success' | 'warning';
    url: string;
    details: string;
  }>({
    status: 'idle',
    url: '',
    details: '',
  });

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeBlogUrl(testUrl);
    if (!normalized) return;

    setIsChecking(true);
    setCheckResult({ status: 'idle', url: '', details: '' });

    // In browser client, direct fetch to another domain's /robots.txt is subject to CORS.
    // However, we can test the Atom feed or check if the URL is formatted properly,
    // and provide direct quick verification links.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsChecking(false);
    setCheckResult({
      status: 'success',
      url: normalized,
      details:
        language === 'bn'
          ? 'যাচাই লিঙ্ক তৈরি করা হয়েছে! নিচের বাটনে ক্লিক করে আপনার লাইভ robots.txt এবং atom.xml ফাইল চেক করুন।'
          : 'Diagnostic check ready! Click the links below to inspect your live robots.txt and sitemap feed directly in your browser.',
    });
  };

  const normalized = normalizeBlogUrl(testUrl);

  return (
    <section id="checker" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          {language === 'bn' ? 'লাইভ টেস্টার' : 'Live Verification'}
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.checkerTitle}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          {t.checkerSubtitle}
        </p>
      </div>

      <form onSubmit={handleTest} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              placeholder={t.checkerPlaceholder}
              className="w-full px-4 py-3 text-sm sm:text-base bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isChecking || !testUrl.trim()}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-colors flex-shrink-0"
          >
            {isChecking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.checkingBtn}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{t.checkNowBtn}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Verification Links Grid */}
      {normalized && (
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {language === 'bn' ? 'সরাসরি ব্রাউজারে যাচাই করুন' : 'Direct Browser Inspection Links'}
          </h4>

          <div className="grid sm:grid-cols-2 gap-3">
            {/* robots.txt link */}
            <a
              href={`${normalized}/robots.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <FileCheck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-slate-800 truncate">
                  /robots.txt
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-orange-600 flex items-center gap-1 flex-shrink-0">
                View file <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* atom feed link */}
            <a
              href={`${normalized}/atom.xml?redirect=false&start-index=1&max-results=500`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <FileCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-slate-800 truncate">
                  /atom.xml (Batch 1)
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-blue-600 flex items-center gap-1 flex-shrink-0">
                View feed <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* sitemap.xml link */}
            <a
              href={`${normalized}/sitemap.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-slate-800 truncate">
                  /sitemap.xml
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-emerald-600 flex items-center gap-1 flex-shrink-0">
                View file <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Google Search Console Direct link */}
            <a
              href="https://search.google.com/search-console/sitemaps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                  Google Search Console
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 group-hover:text-purple-600 flex items-center gap-1 flex-shrink-0">
                Open Console <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {checkResult.status === 'success' && (
            <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200">
              {checkResult.details}
            </p>
          )}
        </div>
      )}
    </section>
  );
};
