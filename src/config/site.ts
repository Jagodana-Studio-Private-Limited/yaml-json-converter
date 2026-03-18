export const siteConfig = {
  // ====== CUSTOMIZE THESE FOR EACH TOOL ======
  name: "YAML JSON Converter",
  title: "YAML ↔ JSON Converter — Convert YAML to JSON & JSON to YAML Instantly",
  description:
    "Free online YAML to JSON and JSON to YAML converter. Paste your data, get instant results. Supports nested objects, arrays, and multi-document YAML. 100% client-side.",
  url: "https://yaml-json-converter.tools.jagodana.com",
  ogImage: "/opengraph-image",

  // Header
  headerIcon: "FileJson", // lucide-react icon name
  // Brand gradient colors for Tailwind are in globals.css (--brand / --brand-accent)
  brandAccentColor: "#6366f1", // hex accent for OG image gradient (must match --brand-accent in globals.css)

  // SEO
  keywords: [
    "yaml to json",
    "json to yaml",
    "yaml converter",
    "json converter",
    "yaml parser",
    "data format converter",
  ],
  applicationCategory: "DeveloperApplication",

  // Theme
  themeColor: "#3b82f6", // used in manifest and meta tags

  // Branding
  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  // Social Profiles (for Organization schema sameAs)
  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  // Links
  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/yaml-json-converter",
    website: "https://jagodana.com",
  },

  // Footer
  footer: {
    about:
      "A free developer tool for converting between YAML and JSON formats. Built for speed, privacy, and ease of use.",
    featuresTitle: "Features",
    features: [
      "YAML to JSON conversion",
      "JSON to YAML conversion",
      "Multi-document YAML support",
      "Syntax error detection",
    ],
  },

  // Hero Section
  hero: {
    badge: "Free Online Converter",
    titleLine1: "Convert Between",
    titleGradient: "YAML & JSON Instantly",
    subtitle:
      "Paste YAML to get JSON, or JSON to get YAML. Supports nested objects, arrays, comments, and multi-document YAML. 100% client-side — your data never leaves the browser.",
  },

  // Feature Cards (shown on homepage)
  featureCards: [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description:
        "Real-time conversion as you type. No waiting, no button clicks — instant results every time.",
    },
    {
      icon: "🛡️",
      title: "Privacy First",
      description:
        "100% client-side processing. Your data never leaves your browser — no uploads, no server calls.",
    },
    {
      icon: "🗂️",
      title: "Full Support",
      description:
        "Handles nested objects, arrays, multi-document YAML, comments, and complex data structures.",
    },
  ],

  // Related Tools (cross-linking to sibling Jagodana tools for internal SEO)
  relatedTools: [
    {
      name: "Favicon Generator",
      url: "https://favicon-generator.jagodana.com",
      icon: "🎨",
      description: "Generate all favicon sizes + manifest from any image.",
    },
    {
      name: "Sitemap Checker",
      url: "https://sitemap-checker.jagodana.com",
      icon: "🔍",
      description: "Discover and validate sitemaps on any website.",
    },
    {
      name: "Regex Playground",
      url: "https://regex-playground.jagodana.com",
      icon: "🧪",
      description: "Build, test & debug regular expressions in real-time.",
    },
    {
      name: "Screenshot Beautifier",
      url: "https://screenshot-beautifier.jagodana.com",
      icon: "📸",
      description: "Transform screenshots into beautiful images.",
    },
    {
      name: "Color Palette Explorer",
      url: "https://color-palette-explorer.jagodana.com",
      icon: "🎭",
      description: "Extract color palettes from any image.",
    },
    {
      name: "Logo Maker",
      url: "https://logo-maker.jagodana.com",
      icon: "✏️",
      description: "Create a professional logo in 60 seconds.",
    },
  ],

  // HowTo Steps (drives HowTo JSON-LD schema for rich results)
  howToSteps: [
    {
      name: "Paste your data",
      text: "Paste your YAML or JSON into the input panel on the left. The tool automatically detects the format.",
      url: "",
    },
    {
      name: "Get instant conversion",
      text: "The converted output appears in real-time on the right panel. YAML becomes JSON, and JSON becomes YAML automatically.",
      url: "",
    },
    {
      name: "Copy the result",
      text: "Click the Copy button to copy the converted output to your clipboard, ready to use anywhere.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M", // ISO 8601 duration (1 minute)

  // FAQ (drives both the FAQ UI section and FAQPage JSON-LD schema)
  faq: [
    {
      question: "How do I convert YAML to JSON?",
      answer:
        "Simply paste your YAML into the left input panel. The tool automatically detects that it's YAML and instantly shows the equivalent JSON in the right panel. No buttons to click — conversion happens in real-time as you type.",
    },
    {
      question: "How do I convert JSON to YAML?",
      answer:
        "Paste your JSON into the left input panel. The tool detects JSON format automatically and converts it to clean, readable YAML in the right panel. You can also toggle pretty-print to control JSON output formatting.",
    },
    {
      question: "Does this tool support multi-document YAML?",
      answer:
        "Yes! The converter supports multi-document YAML files that use the --- separator. Each document is parsed and converted correctly. Complex nested objects, arrays, anchors, and aliases are all supported.",
    },
    {
      question: "Is my data safe? Does it get sent to a server?",
      answer:
        "Your data never leaves your browser. This tool is 100% client-side — all conversion happens locally using JavaScript. No data is uploaded, stored, or transmitted to any server.",
    },
  ],

  // ====== PAGES (for sitemap + per-page SEO) ======
  pages: {
    "/": {
      title:
        "YAML ↔ JSON Converter — Convert YAML to JSON & JSON to YAML Instantly",
      description:
        "Free online YAML to JSON and JSON to YAML converter. Paste your data, get instant results. Supports nested objects, arrays, and multi-document YAML. 100% client-side.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
