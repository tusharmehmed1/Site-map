import React, { useState } from 'react';
import { Language, SitemapBatch } from '../types';
import { translations } from '../utils/translations';
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  FileCode,
  Layers,
  Send,
  Sparkles,
} from 'lucide-react';

interface OutputResultsProps {
  language: Language;
  robotsTxt: string;
  batches: SitemapBatch[];
  blogUrl: string;
}

export const OutputResults: React.FC<OutputResultsProps> = ({
  language,
  robotsTxt,
  batches,
  blogUrl,
}) => {
  const t = translations[language];
  const [copiedRobots, setCopiedRobots] = useState(false);
  const [copiedBatchIndex, setCopiedBatchIndex] = useState<number | null>(null);

  const handleCopyRobots = async () => {
    try {
      await navigator.clipboard.writeText(robotsTxt);
      setCopiedRobots(true);
      setTimeout(() => setCopiedRobots(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = robotsTxt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedRobots(true);
      setTimeout(() => setCopiedRobots(false), 2500);
    }
  };

  const handleCopyBatch = async (path: string, index: number) => {
    try {
      await navigator.clipboard.writeText(path);
      setCopiedBatchIndex(index);
      setTimeout(() => setCopiedBatchIndex(null), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = path;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedBatchIndex(index);
      setTimeout(() => setCopiedBatchIndex(null), 2000);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([robotsTxt], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'robots.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* 1. Robots.txt Code Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-orange-600" />
              <h2 className="font-bold text-slate-900 text-lg">
                {t.resultsTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.resultsSubtitle}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t.downloadRobotsBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyRobots}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                copiedRobots
                  ? 'bg-emerald-600 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
              }`}
            >
              {copiedRobots ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.copiedTooltip}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyRobotsBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content Window */}
        <div className="relative bg-slate-950 text-slate-100 p-5 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed selection:bg-orange-500 selection:text-white">
          <pre className="whitespace-pre">{robotsTxt}</pre>
        </div>

        {/* Card Footer Helper */}
        <div className="p-4 bg-orange-50/60 border-t border-orange-100 text-xs text-orange-900 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0" />
            Paste this directly into{' '}
            <strong>Blogger &gt; Settings &gt; Crawlers and indexing &gt; Custom robots.txt</strong>
          </span>
          {blogUrl && (
            <a
              href={`${blogUrl}/robots.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-700 hover:text-orange-800 font-semibold underline flex items-center gap-1 ml-3 flex-shrink-0"
            >
              Test {blogUrl.replace('https://', '')}/robots.txt
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Google Search Console Submission Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {t.gscTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.gscSubtitle}
            </p>
          </div>

          <a
            href="https://search.google.com/search-console/sitemaps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors flex-shrink-0"
          >
            <span>{t.gscOpenConsole}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Sitemap Chunks list */}
        <div className="space-y-2.5">
          {batches.map((batch) => {
            const isCopied = copiedBatchIndex === batch.index;
            return (
              <div
                key={batch.index}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0">
                    {batch.index}
                  </span>
                  <code className="text-xs sm:text-sm font-mono text-slate-800 truncate select-all">
                    {batch.searchConsolePath}
                  </code>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={batch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open XML feed in new tab"
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyBatch(batch.searchConsolePath, batch.index)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.gscCopyItem}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
