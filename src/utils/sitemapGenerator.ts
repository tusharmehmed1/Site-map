import { SitemapConfig, SitemapBatch, BlogDetectionResult } from '../types';

/**
 * Clean and normalize any user entered URL to an origin like https://myblog.blogspot.com
 */
export function normalizeBlogUrl(input: string): string {
  let cleaned = input.trim();
  if (!cleaned) return '';

  // Remove leading/trailing quotes or spaces
  cleaned = cleaned.replace(/^["']|["']$/g, '').trim();

  // If missing protocol, add https://
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'https://' + cleaned;
  }

  try {
    const parsed = new URL(cleaned);
    // Return protocol + host (e.g., https://example.blogspot.com)
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    // If URL parsing fails, clean manually
    cleaned = cleaned.replace(/\/+$/, '');
    return cleaned;
  }
}

/**
 * Calculates sitemap batches for Blogger's 500-post chunks
 */
export function calculateSitemapBatches(
  normalizedUrl: string,
  totalPosts: number,
  batchSize: number = 500
): SitemapBatch[] {
  const batches: SitemapBatch[] = [];
  const effectivePosts = Math.max(1, totalPosts);
  const count = Math.ceil(effectivePosts / batchSize);

  for (let i = 0; i < count; i++) {
    const startIndex = i * batchSize + 1;
    const maxResults = batchSize;
    const path = `atom.xml?redirect=false&start-index=${startIndex}&max-results=${maxResults}`;
    const fullUrl = `${normalizedUrl}/${path}`;

    batches.push({
      index: i + 1,
      startIndex,
      maxResults,
      url: fullUrl,
      searchConsolePath: path,
    });
  }

  return batches;
}

/**
 * Generates the complete robots.txt string formatted according to Google and Labnol standards
 */
export function generateRobotsTxt(config: SitemapConfig): {
  robotsTxt: string;
  batches: SitemapBatch[];
} {
  const normalizedUrl = normalizeBlogUrl(config.blogUrl);
  const batches = calculateSitemapBatches(normalizedUrl, config.totalPosts, config.batchSize || 500);

  const lines: string[] = ['User-agent: *'];

  if (config.disallowSearch) {
    lines.push('Disallow: /search');
  }

  if (config.allowRoot) {
    lines.push('Allow: /');
  }

  lines.push(''); // blank line before sitemaps

  // Standard sitemaps if enabled
  if (config.includeStandardSitemap && normalizedUrl) {
    lines.push(`Sitemap: ${normalizedUrl}/sitemap.xml`);
  }

  if (config.includePagesSitemap && normalizedUrl) {
    lines.push(`Sitemap: ${normalizedUrl}/sitemap-pages.xml`);
  }

  // Atom paginated sitemaps for all posts
  for (const batch of batches) {
    lines.push(`Sitemap: ${batch.url}`);
  }

  if (config.customDirectives && config.customDirectives.trim()) {
    lines.push('');
    lines.push(config.customDirectives.trim());
  }

  return {
    robotsTxt: lines.join('\n'),
    batches,
  };
}

/**
 * Attempts to detect total posts from Blogger feed using JSONP
 */
export function detectBloggerPostCount(blogUrl: string): Promise<BlogDetectionResult> {
  return new Promise((resolve) => {
    const normalized = normalizeBlogUrl(blogUrl);
    if (!normalized) {
      resolve({ status: 'error', message: 'Invalid URL provided' });
      return;
    }

    const callbackName = `blogger_cb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const feedUrl = `${normalized}/feeds/posts/summary?alt=json-in-script&max-results=0&callback=${callbackName}`;

    let resolved = false;
    const timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({
          status: 'not_found',
          message: 'Could not auto-detect posts count (site may be private or CORS protected). Standard 500-post chunk generated.',
        });
      }
    }, 4500);

    const cleanup = () => {
      clearTimeout(timeoutId);
      try {
        delete (window as unknown as Record<string, unknown>)[callbackName];
      } catch {
        // ignore
      }
      const existingScript = document.getElementById(callbackName);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };

    (window as unknown as Record<string, (data: unknown) => void>)[callbackName] = (data: unknown) => {
      if (resolved) return;
      resolved = true;
      cleanup();

      try {
        const feed = (data as { feed?: { title?: { $t?: string }; openSearch$totalResults?: { $t?: string } } })?.feed;
        const total = parseInt(feed?.openSearch$totalResults?.$t || '0', 10);
        const title = feed?.title?.$t || 'Blogger Blog';

        resolve({
          status: 'success',
          title,
          totalPosts: isNaN(total) ? 500 : total,
          feedUrl,
        });
      } catch {
        resolve({
          status: 'not_found',
          message: 'Feed response could not be parsed. You can set the post count manually.',
        });
      }
    };

    const script = document.createElement('script');
    script.id = callbackName;
    script.src = feedUrl;
    script.onerror = () => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({
          status: 'not_found',
          message: 'Feed is inaccessible or CORS blocked. Generated standard sitemaps.',
        });
      }
    };

    document.body.appendChild(script);
  });
}
