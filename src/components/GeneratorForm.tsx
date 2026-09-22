import React, { useState } from 'react';
import { Language, SitemapConfig, BlogDetectionResult } from '../types';
import { translations } from '../utils/translations';
import { normalizeBlogUrl, detectBloggerPostCount } from '../utils/sitemapGenerator';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Globe2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Layers,
} from 'lucide-react';

interface GeneratorFormProps {
  language: Language;
  config: SitemapConfig;
  onChangeConfig: (newConfig: SitemapConfig) => void;
  onGenerate: () => void;
  detectionResult: BlogDetectionResult;
  setDetectionResult: (res: BlogDetectionResult) => void;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  language,
  config,
  onChangeConfig,
  onGenerate,
  detectionResult,
  setDetectionResult,
}) => {
  const t = translations[language];
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sampleUrls = [
    'https://googleblog.blogspot.com',
    'https://news.blogspot.com',
    'https://blogger.googleblog.com',
  ];

  const handleUrlChange = (value: string) => {
    setErrorMessage('');
    onChangeConfig({
      ...config,
      blogUrl: value,
    });
  };

  const handleSelectSample = (url: string) => {
    setErrorMessage('');
    onChangeConfig({
      ...config,
      blogUrl: url,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeBlogUrl(config.blogUrl);

    if (!normalized || normalized === 'https://' || normalized === 'http://') {
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে আপনার ব্লগের সঠিক লিংক (যেমন: yourblog.blogspot.com) লিখুন।'
          : 'Please enter a valid Blogger URL (e.g. yourblog.blogspot.com).'
      );
      return;
    }

    setErrorMessage('');
    setIsDetecting(true);
    setDetectionResult({ status: 'loading' });

    // Attempt to detect post count via Blogger Atom JSONP API
    try {
      const result = await detectBloggerPostCount(normalized);
      setDetectionResult(result);
      if (result.status === 'success' && result.totalPosts && result.totalPosts > 0) {
        onChangeConfig({
          ...config,
          blogUrl: normalized,
          totalPosts: result.totalPosts,
        });
      } else {
        onChangeConfig({
          ...config,
          blogUrl: normalized,
        });
      }
    } catch {
      setDetectionResult({
        status: 'not_found',
        message: 'Could not auto-fetch blog feed, generating standard sitemap.',
      });
      onChangeConfig({
        ...config,
        blogUrl: normalized,
      });
    } finally {
      setIsDetecting(false);
      onGenerate();
    }
  };

  return (
    <div id="generator" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
      {/* Title & Badge */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          {t.badge}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {t.heroTitle}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.heroSubtitle}
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto">
        {/* Input Field */}
        <div className="mb-4">
          <label
            htmlFor="blog-url-input"
            className="block text-sm font-semibold text-slate-800 mb-2"
          >
            {t.inputLabel}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <input
              id="blog-url-input"
              type="text"
              value={config.blogUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-900 placeholder:text-slate-400 font-mono"
            />
          </div>
          {errorMessage && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Quick Sample Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-slate-500">
          <span className="font-medium text-slate-600">{t.sampleSitesLabel}</span>
          {sampleUrls.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => handleSelectSample(url)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono transition-colors"
            >
              {url.replace('https://', '')}
            </button>
          ))}
        </div>

        {/* Live Detection Info Banner */}
        {detectionResult.status === 'loading' && (
          <div className="mb-6 p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 text-xs sm:text-sm text-blue-700">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600 flex-shrink-0" />
            <span>{t.autoDetecting}</span>
          </div>
        )}

        {detectionResult.status === 'success' && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-900">
              <p className="font-semibold">{t.detectedSuccess}</p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-emerald-800">
                {detectionResult.title && (
                  <span>
                    Blog: <strong>{detectionResult.title}</strong>
                  </span>
                )}
                <span>
                  {t.postsDetected}: <strong>{detectionResult.totalPosts?.toLocaleString()}</strong>
                </span>
                <span>
                  {t.chunksNeeded}:{' '}
                  <strong>{Math.ceil((detectionResult.totalPosts || 1) / 500)}</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={isDetecting}
          className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-base shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {isDetecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t.generatingBtn}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>{t.generateBtn}</span>
            </>
          )}
        </button>

        {/* Advanced Options Toggle */}
        <div className="mt-6 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              {t.advancedOptionsToggle}
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-sm">
              {/* Post Count Selector */}
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  {t.totalPostsLabel}:{' '}
                  <span className="text-orange-600 font-mono">
                    {config.totalPosts.toLocaleString()} posts (
                    {Math.ceil(config.totalPosts / (config.batchSize || 500))} sitemaps)
                  </span>
                </label>
                <p className="text-xs text-slate-500 mb-2">{t.totalPostsHelper}</p>
                <div className="flex flex-wrap gap-2">
                  {[500, 1000, 2500, 5000, 10000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() =>
                        onChangeConfig({
                          ...config,
                          totalPosts: preset,
                        })
                      }
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        config.totalPosts === preset
                          ? 'bg-orange-600 text-white border-orange-600 font-semibold'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-orange-300'
                      }`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-500">Custom:</span>
                    <input
                      type="number"
                      min="1"
                      max="100000"
                      value={config.totalPosts}
                      onChange={(e) =>
                        onChangeConfig({
                          ...config,
                          totalPosts: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      className="w-24 px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-slate-200 space-y-2.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.disallowSearch}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        disallowSearch: e.target.checked,
                      })
                    }
                    className="mt-1 rounded text-orange-600 focus:ring-orange-500 h-4 w-4 border-slate-300"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                      {t.disallowSearchLabel}
                    </span>
                    <p className="text-xs text-slate-500">{t.disallowSearchDesc}</p>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.allowRoot}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        allowRoot: e.target.checked,
                      })
                    }
                    className="mt-1 rounded text-orange-600 focus:ring-orange-500 h-4 w-4 border-slate-300"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                      {t.allowRootLabel}
                    </span>
                    <p className="text-xs text-slate-500">{t.allowRootDesc}</p>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.includePagesSitemap}
                    onChange={(e) =>
                      onChangeConfig({
                        ...config,
                        includePagesSitemap: e.target.checked,
                      })
                    }
                    className="mt-1 rounded text-orange-600 focus:ring-orange-500 h-4 w-4 border-slate-300"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                      {t.includePagesXmlLabel}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
