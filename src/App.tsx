import React, { useState, useMemo } from 'react';
import { Language, SitemapConfig, BlogDetectionResult } from './types';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { OutputResults } from './components/OutputResults';
import { TutorialGuide } from './components/TutorialGuide';
import { SitemapChecker } from './components/SitemapChecker';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { generateRobotsTxt, normalizeBlogUrl } from './utils/sitemapGenerator';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');

  const [config, setConfig] = useState<SitemapConfig>({
    blogUrl: 'https://googleblog.blogspot.com',
    totalPosts: 1200,
    batchSize: 500,
    disallowSearch: true,
    allowRoot: true,
    includeStandardSitemap: false,
    includePagesSitemap: false,
    customDirectives: '',
  });

  const [detectionResult, setDetectionResult] = useState<BlogDetectionResult>({
    status: 'idle',
  });

  // Calculate the generated robots.txt and sitemap batches reactively
  const { robotsTxt, batches } = useMemo(() => {
    return generateRobotsTxt(config);
  }, [config]);

  const normalizedUrl = useMemo(() => {
    return normalizeBlogUrl(config.blogUrl);
  }, [config.blogUrl]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-orange-100 selection:text-orange-900 font-sans">
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14">
        {/* Generator Form */}
        <GeneratorForm
          language={language}
          config={config}
          onChangeConfig={setConfig}
          onGenerate={() => {}}
          detectionResult={detectionResult}
          setDetectionResult={setDetectionResult}
        />

        {/* Output Results */}
        <AnimatePresence mode="wait">
          {normalizedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <OutputResults
                language={language}
                robotsTxt={robotsTxt}
                batches={batches}
                blogUrl={normalizedUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step-by-Step Setup Tutorial */}
        <TutorialGuide language={language} />

        {/* Live Sitemap and Feed Checker */}
        <SitemapChecker
          language={language}
          defaultUrl={normalizedUrl || 'https://yourblog.blogspot.com'}
        />

        {/* FAQ Section */}
        <FaqSection language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
