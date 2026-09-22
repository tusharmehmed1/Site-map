export type Language = 'en' | 'bn';

export interface SitemapConfig {
  blogUrl: string;
  totalPosts: number;
  batchSize: number;
  disallowSearch: boolean;
  allowRoot: boolean;
  includeStandardSitemap: boolean;
  includePagesSitemap: boolean;
  customDirectives: string;
}

export interface BlogDetectionResult {
  status: 'idle' | 'loading' | 'success' | 'not_found' | 'error';
  title?: string;
  totalPosts?: number;
  feedUrl?: string;
  message?: string;
}

export interface SitemapBatch {
  index: number;
  startIndex: number;
  maxResults: number;
  url: string;
  searchConsolePath: string;
}

export interface StepGuide {
  number: number;
  title: string;
  description: string;
  tip?: string;
  codeSnippet?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
