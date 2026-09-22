import { Language, StepGuide, FaqItem } from '../types';

export interface TranslationData {
  appName: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  generateBtn: string;
  generatingBtn: string;
  sampleSitesLabel: string;
  autoDetecting: string;
  detectedSuccess: string;
  postsDetected: string;
  chunksNeeded: string;
  advancedOptionsToggle: string;
  advancedOptionsTitle: string;
  totalPostsLabel: string;
  totalPostsHelper: string;
  disallowSearchLabel: string;
  disallowSearchDesc: string;
  allowRootLabel: string;
  allowRootDesc: string;
  includeStandardXmlLabel: string;
  includePagesXmlLabel: string;
  resultsTitle: string;
  resultsSubtitle: string;
  copyRobotsBtn: string;
  copiedTooltip: string;
  downloadRobotsBtn: string;
  gscTitle: string;
  gscSubtitle: string;
  gscCopyItem: string;
  gscOpenConsole: string;
  stepsTitle: string;
  stepsSubtitle: string;
  steps: StepGuide[];
  checkerTitle: string;
  checkerSubtitle: string;
  checkerPlaceholder: string;
  checkNowBtn: string;
  checkingBtn: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: FaqItem[];
  footerNote: string;
}

export const translations: Record<Language, TranslationData> = {
  en: {
    appName: 'Blogger XML Sitemap Generator',
    badge: 'Standard XML & robots.txt Tool',
    heroTitle: 'XML Sitemap Generator for Blogger',
    heroSubtitle:
      'Generate a 100% Google-compliant XML sitemap and custom robots.txt for your Blogger / Blogspot website. Enable search engines to discover and index every single blog post.',
    inputLabel: 'Enter your Blogger Blog URL',
    inputPlaceholder: 'https://myblog.blogspot.com or https://www.yourdomain.com',
    generateBtn: 'Generate XML Sitemap',
    generatingBtn: 'Scanning Blog Feed...',
    sampleSitesLabel: 'Quick Examples:',
    autoDetecting: 'Connecting to Blogger feed to detect total posts...',
    detectedSuccess: 'Connected to blog successfully!',
    postsDetected: 'Total posts found',
    chunksNeeded: 'Sitemap chunks required',
    advancedOptionsToggle: 'Sitemap Configuration & Post Count Settings',
    advancedOptionsTitle: 'Advanced SEO & Sitemap Options',
    totalPostsLabel: 'Estimated Number of Blog Posts',
    totalPostsHelper: 'Blogger caps each Atom feed sitemap at 500 items. Multiple sitemaps are generated automatically.',
    disallowSearchLabel: 'Disallow /search pages (Recommended)',
    disallowSearchDesc: 'Prevents search engines from indexing internal search results, saving crawl budget and avoiding duplicate content.',
    allowRootLabel: 'Allow root crawler access (Allow: /)',
    allowRootDesc: 'Explicitly grants Googlebot and Bingbot access to crawl all content pages.',
    includeStandardXmlLabel: 'Include /sitemap.xml directive',
    includePagesXmlLabel: 'Include /sitemap-pages.xml directive (for Blogger static pages)',
    resultsTitle: 'Generated Custom robots.txt Code',
    resultsSubtitle: 'Copy this complete block into your Blogger Dashboard (Settings > Crawlers and indexing > Custom robots.txt)',
    copyRobotsBtn: 'Copy robots.txt Code',
    copiedTooltip: 'Copied to Clipboard!',
    downloadRobotsBtn: 'Download robots.txt',
    gscTitle: 'Submit to Google Search Console',
    gscSubtitle: 'In Google Search Console, navigate to Sitemaps and submit each of the following paths individually:',
    gscCopyItem: 'Copy Path',
    gscOpenConsole: 'Open Google Search Console',
    stepsTitle: 'How to Add Sitemap to Blogger',
    stepsSubtitle: 'Follow these straightforward steps to set up crawling and indexing in under 2 minutes.',
    steps: [
      {
        number: 1,
        title: 'Generate and Copy Code',
        description:
          'Enter your blog URL above, click "Generate XML Sitemap", and click the "Copy robots.txt Code" button.',
        tip: 'The generator splits blogs with over 500 posts into multiple 500-post feed batches automatically.',
      },
      {
        number: 2,
        title: 'Open Blogger Settings',
        description:
          'Log in to blogger.com, select your blog from the top-left dropdown, and click "Settings" on the left menu.',
        tip: 'Ensure you are signed in with the Google account that owns the blog.',
      },
      {
        number: 3,
        title: 'Enable Custom robots.txt',
        description:
          'Scroll down to the "Crawlers and indexing" section. Find "Enable custom robots.txt" and toggle the switch to ON.',
        tip: 'Leave custom robots header tags alone unless you specifically want custom meta tags.',
      },
      {
        number: 4,
        title: 'Paste and Save',
        description:
          'Click on "Custom robots.txt", paste the copied code into the dialog box, and click "Save".',
        tip: 'You can verify it immediately by visiting yourblog.blogspot.com/robots.txt in a browser.',
      },
      {
        number: 5,
        title: 'Submit to Google Search Console',
        description:
          'Go to Google Search Console, select your property, open "Sitemaps" in the left sidebar, and submit atom.xml?redirect=false&start-index=1&max-results=500.',
        tip: 'If your blog has more than 500 posts, repeat submission for each generated batch (501, 1001, etc.).',
      },
    ],
    checkerTitle: 'Live Blogger Robots & Sitemap Validator',
    checkerSubtitle: 'Test if your blog already has a valid robots.txt or atom feed published online.',
    checkerPlaceholder: 'https://myblog.blogspot.com',
    checkNowBtn: 'Test Live Status',
    checkingBtn: 'Testing...',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about Blogger XML sitemaps, Atom feeds, and SEO.',
    faqs: [
      {
        id: 'why-needed',
        question: 'Why does Blogger need an XML sitemap generator?',
        answer:
          'By default, Blogger only provides a standard RSS/Atom feed that lists the latest 25 or 26 posts. If your blog has more than 25 posts, search engine spiders may fail to discover your older articles. By appending start-index and max-results=500 parameters, search engines can crawl up to 500 posts per file.',
      },
      {
        id: '500-limit',
        question: 'What if my blog has more than 500 posts?',
        answer:
          'Blogger imposes a strict limit of 500 entries per Atom feed request. To cover all your articles, this generator creates sequential batches (1–500, 501–1,000, 1,001–1,500, etc.). All batches are listed inside the single robots.txt file, which Googlebot reads completely.',
      },
      {
        id: 'custom-domain',
        question: 'Does this work for custom domains (e.g., example.com)?',
        answer:
          'Yes! Whether your blog uses the default .blogspot.com subdomain or a custom top-level domain (like .com, .org, or .net), Blogger routes the /atom.xml feed identically.',
      },
      {
        id: 'disallow-search',
        question: 'Why is Disallow: /search included?',
        answer:
          'Blogger generates search and label result URLs whenever readers search on your site. Having search engines index internal search results creates low-value thin pages and duplicate content penalties. Adding Disallow: /search is an official SEO best practice recommended by Google.',
      },
      {
        id: 'indexing-time',
        question: 'How long does it take for Google to index my posts?',
        answer:
          'Google Search Console usually crawls newly submitted sitemaps within 24 to 72 hours. Actual indexing in search results depends on your content quality and blog crawl frequency.',
      },
    ],
    footerNote: 'Built for bloggers worldwide. Compatible with Google, Bing, Yahoo, and DuckDuckGo search crawlers.',
  },
  bn: {
    appName: 'ব্লগার এক্সএমএল সাইটম্যাপ জেনারেটর',
    badge: 'স্ট্যান্ডার্ড এক্সএমএল এবং robots.txt টুল',
    heroTitle: 'ব্লগারের জন্য ফ্রি এক্সএমএল সাইটম্যাপ জেনারেটর',
    heroSubtitle:
      'আপনার ব্লগার / ব্লগস্পট ওয়েবসাইটের জন্য ১০০% গুগল-বান্ধব এক্সএমএল সাইটম্যাপ এবং কাস্টম robots.txt তৈরি করুন। যাতে গুগল ও বিং আপনার প্রতিটি পোস্ট সহজে খুঁজে পেতে এবং ইনডেক্স করতে পারে।',
    inputLabel: 'আপনার ব্লগার ওয়েবসাইটের লিংক (URL) লিখুন',
    inputPlaceholder: 'https://myblog.blogspot.com অথবা https://www.yourdomain.com',
    generateBtn: 'সাইটম্যাপ তৈরি করুন',
    generatingBtn: 'ব্লগের ফিড যাচাই করা হচ্ছে...',
    sampleSitesLabel: 'নমুনা সাইট:',
    autoDetecting: 'মোট পোস্টের সংখ্যা শনাক্ত করার জন্য ব্লগে কানেক্ট করা হচ্ছে...',
    detectedSuccess: 'ব্লগের সাথে সফলভাবে কানেক্ট হয়েছে!',
    postsDetected: 'মোট পোস্ট পাওয়া গেছে',
    chunksNeeded: 'প্রয়োজনীয় সাইটম্যাপ ব্যাচ',
    advancedOptionsToggle: 'সাইটম্যাপ কনফিগারেশন ও পোস্ট সংখ্যা সেটিংস',
    advancedOptionsTitle: 'উন্নত এসইও ও সাইটম্যাপ অপশন',
    totalPostsLabel: 'আপনার ব্লগে আনুমানিক পোস্ট সংখ্যা',
    totalPostsHelper: 'ব্লগার প্রতি অ্যাটম ফিডে সর্বোচ্চ ৫০০টি পোস্ট সাপোর্ট করে। ৫০০ এর বেশি পোস্ট থাকলে স্বয়ংক্রিয়ভাবে একাধিক সাইটম্যাপ তৈরি হবে।',
    disallowSearchLabel: 'Disallow: /search পৃষ্ঠা ব্লক করুন (প্রস্তাবিত)',
    disallowSearchDesc: 'এটি গুগলকে অভ্যন্তরীণ সার্চ রেজাল্ট ইনডেক্স করা থেকে বিরত রাখে, যা ডুপ্লিকেট কনটেন্ট সমস্যা রোধ করে।',
    allowRootLabel: 'মেইন পৃষ্ঠা ক্রল করার অনুমতি দিন (Allow: /)',
    allowRootDesc: 'গুগলবট এবং বিংবটকে ব্লগের সব পোস্ট ক্রল করার অ্যাক্সেস প্রদান করে।',
    includeStandardXmlLabel: '/sitemap.xml ডিরেক্টিভ যুক্ত করুন',
    includePagesXmlLabel: '/sitemap-pages.xml যুক্ত করুন (ব্লগার স্ট্যাটিক পেজের জন্য)',
    resultsTitle: 'তৈরিকৃত কাস্টম robots.txt কোড',
    resultsSubtitle: 'এই সম্পূর্ণ কোডটি কপি করে আপনার ব্লগার ড্যাশবোর্ডে যুক্ত করুন (Settings > Crawlers and indexing > Custom robots.txt)',
    copyRobotsBtn: 'robots.txt কোড কপি করুন',
    copiedTooltip: 'কপি করা হয়েছে!',
    downloadRobotsBtn: 'robots.txt ফাইল ডাউনলোড করুন',
    gscTitle: 'গুগল সার্চ কনসোলে জমা দিন',
    gscSubtitle: 'Google Search Console-এ গিয়ে Sitemaps অপশনে ক্লিক করে নিচের লিংকগুলো একটি একটি করে সাবমিট করুন:',
    gscCopyItem: 'পাথ কপি করুন',
    gscOpenConsole: 'গুগল সার্চ কনসোল খুলুন',
    stepsTitle: 'ব্লগারে সাইটম্যাপ যুক্ত করার নিয়ম',
    stepsSubtitle: 'মাত্র ২ মিনিটে আপনার ব্লগারে robots.txt এবং সাইটম্যাপ সেটআপ করতে এই সহজ ধাপগুলো অনুসরণ করুন।',
    steps: [
      {
        number: 1,
        title: 'কোড জেনারেট এবং কপি করুন',
        description: 'উপরে আপনার ব্লগের লিংক দিয়ে "সাইটম্যাপ তৈরি করুন" বাটনে চাপ দিন এবং তৈরিকৃত কোডটি কপি করে নিন।',
        tip: 'আপনার ব্লগে ৫০০ টির বেশি পোস্ট থাকলে স্বয়ংক্রিয়ভাবে একাধিক পার্ট তৈরি হবে।',
      },
      {
        number: 2,
        title: 'ব্লগার সেটিংসে যান',
        description: 'blogger.com এ লগইন করুন, বাম পাশের মেনু থেকে "Settings" (সেটিংস) এ ক্লিক করুন।',
        tip: 'যে জিমেইল দিয়ে ব্লগার অ্যাকাউন্ট খোলা সেই জিমেইলে লগইন থাকতে হবে।',
      },
      {
        number: 3,
        title: 'কাস্টম robots.txt চালু করুন',
        description: 'নিচের দিকে স্ক্রল করে "Crawlers and indexing" সেকশনে যান। সেখানে "Enable custom robots.txt" অপশনটি চালু (ON) করুন।',
        tip: 'যদি আগে থেকেই অন্য কোড থাকে, তবে তা সরিয়ে নতুন কোড পেস্ট করুন।',
      },
      {
        number: 4,
        title: 'কোড পেস্ট করে সেভ করুন',
        description: '"Custom robots.txt"-এ ক্লিক করুন এবং কপি করা কোডটি পেস্ট করে "Save" বাটনে চাপ দিন।',
        tip: 'আপনার ব্রাউজারে yourblog.blogspot.com/robots.txt লিখে ব্রাউজ করলেই দেখতে পাবেন কোডটি কাজ করছে কিনা।',
      },
      {
        number: 5,
        title: 'গুগল সার্চ কনসোলে সাইটম্যাপ জমা দিন',
        description: 'Google Search Console-এ যান, বাম পাশের মেনু থেকে Sitemaps-এ ক্লিক করুন এবং atom.xml?redirect=false&start-index=1&max-results=500 লিখে Submit এ ক্লিক করুন।',
        tip: 'আপনার ৫০০ টির বেশি পোস্ট থাকলে পরবর্তী পার্টগুলোও (৫০১, ১০০১) একইভাবে সাবমিট করুন।',
      },
    ],
    checkerTitle: 'ব্লগার সাইটম্যাপ ও robots.txt লাইভ টেস্টার',
    checkerSubtitle: 'আপনার ব্লগে সাইটম্যাপ ও robots.txt সক্রিয়ভাবে কাজ করছে কিনা তা অনলাইনে যাচাই করুন।',
    checkerPlaceholder: 'https://myblog.blogspot.com',
    checkNowBtn: 'লাইভ স্ট্যাটাস চেক করুন',
    checkingBtn: 'চেক করা হচ্ছে...',
    faqTitle: 'সাধারণ জিজ্ঞাসা (FAQ)',
    faqSubtitle: 'ব্লগার সাইটম্যাপ, অ্যাটম ফিড এবং গুগল ইনডেক্সিং সম্পর্কিত গুরুত্বপূর্ণ তথ্যাবলী।',
    faqs: [
      {
        id: 'why-needed',
        question: 'ব্লগারের জন্য আলাদা এক্সএমএল সাইটম্যাপ কেন প্রয়োজন?',
        answer:
          'স্বাভাবিকভাবে ব্লগার শুধুমাত্র সাম্প্রতিক ২৫টি পোস্টের জন্য RSS ফিড প্রদান করে। আপনার ব্লগে যদি ২৫টির বেশি পোস্ট থাকে, তাহলে গুগল পুরোনো পোস্টগুলো খুঁজে নাও পেতে পারে। এই টুলের মাধ্যমে ৫০০টি করে পোস্টের অ্যাটম ফিড সাইটম্যাপ তৈরি হয় যা সব পোস্ট ইনডেক্স করতে সাহায্য করে।',
      },
      {
        id: '500-limit',
        question: 'আমার ব্লগে ৫০০ টির বেশি পোস্ট থাকলে কী হবে?',
        answer:
          'ব্লগার প্রতিটি অ্যাটম ফিডে সর্বোচ্চ ৫০০টি পোস্ট সরবরাহ করতে পারে। তাই ৫০০ এর বেশি পোস্ট থাকলে এই টুলটি ধাপে ধাপে একাধিক লিংক তৈরি করে (যেমন ১-৫০০, ৫০১-১০০০ ইত্যাদি)। এই সবগুলো লিংক আপনার robots.txt ফাইলে যুক্ত থাকে।',
      },
      {
        id: 'custom-domain',
        question: 'কাস্টম ডোমেইনের (যেমন .com, .net) ক্ষেত্রেও কি এটি কাজ করবে?',
        answer:
          'হ্যাঁ, আপনার ব্লগে ব্লগস্পট সাবডোমেন থাকুক কিংবা নিজস্ব কাস্টম ডোমেন থাকুক, উভয় ক্ষেত্রেই এটি নিখুঁতভাবে কাজ করে।',
      },
      {
        id: 'disallow-search',
        question: 'Disallow: /search কেন যোগ করা হয়?',
        answer:
          'ব্লগারে পাঠকরা সার্চ করলে সার্চ রেজাল্ট পেজ তৈরি হয়। সার্চ ইঞ্জিন এই পাতাগুলো ইনডেক্স করলে ডুপ্লিকেট কন্টেন্ট সমস্যা হতে পারে। তাই গুগলের সুপারিশ অনুযায়ী সার্চ পেজগুলো ব্লক করে রাখা হয়।',
      },
      {
        id: 'indexing-time',
        question: 'গুগলে পোস্ট ইনডেক্স হতে কত সময় লাগে?',
        answer:
          'সাধারণত সার্চ কনসোলে সাইটম্যাপ জমা দেওয়ার পর ২৪ থেকে ৭২ ঘণ্টার মধ্যে গুগল ক্রল শুরু করে। ব্লগের নিয়মিত আপডেট এবং কনটেন্ট কোয়ালিটির উপর ভিত্তি করে দ্রুত ইনডেক্স হয়।',
      },
    ],
    footerNote: 'ব্লগারদের জন্য নির্মিত একটি নির্ভরযোগ্য টুল। গুগল, বিং এবং অন্যান্য সার্চ ইঞ্জিনে সাইটম্যাপ প্রস্তুত করতে সাহায্য করে।',
  },
};
