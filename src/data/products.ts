import { PRODUCT_ASSETS, type SamplePageAsset } from './productAssets';

export type GuideInterestTag =
  | 'arrival'
  | 'scams'
  | 'everyday'
  | 'food'
  | 'language';

export interface CoverTheme {
  surface: string;
  accent: string;
  text: string;
  spine: string;
}

export interface ProductGuide {
  id: string;
  slug: string;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  marketingHeadline: string;
  description: string;
  price: number;
  formatLabel: string;
  coverConcept: string;
  coverImageUrl: string;
  coverImageAlt: string;
  coverTheme: CoverTheme;
  whoItIsFor: string[];
  interestTags: GuideInterestTag[];
  /**
   * Seller-supplied verified contents list.
   * Keep as `null` until actual verified section/chapter titles are confirmed.
   */
  verifiedContents: string[] | null;
  samplePages: SamplePageAsset[];
  safetyNote?: string;
  productFaqs: Array<{ question: string; answer: string }>;
}

export const PRODUCTS: ProductGuide[] = [
  {
    id: 'first-72-hours',
    slug: 'thailand-your-first-72-hours',
    number: '01',
    label: 'The Arrival Guide',
    title: 'Thailand: Your First 72 Hours',
    subtitle: 'The Step-by-Step Arrival Companion for First-Time Travelers',
    marketingHeadline: 'Your First 72 Hours. Completely Prepared.',
    description:
      'A practical arrival companion designed to help first-time travelers navigate their initial days in Thailand with greater confidence.',
    price: 12.99,
    formatLabel: 'Digital PDF Guide',
    coverConcept:
      'Premium Bangkok airport and city imagery, midnight teal, gold typography, elegant travel editorial layout.',
    coverImageUrl: PRODUCT_ASSETS['first-72-hours'].coverImageUrl,
    coverImageAlt: PRODUCT_ASSETS['first-72-hours'].coverImageAlt,
    coverTheme: {
      surface: '#101C24',
      accent: '#C8A467',
      text: '#F7F3EA',
      spine: '#0B141A',
    },
    whoItIsFor: [
      'First-time visitors landing in Thailand who want calm, clear next steps',
      'Solo travelers and couples organizing their initial transit and check-in',
      'Travelers who prefer having key arrival details offline on their phone',
    ],
    interestTags: ['arrival'],
    verifiedContents: null,
    samplePages: PRODUCT_ASSETS['first-72-hours'].samplePages,
    productFaqs: [
      {
        question: 'When should I download Thailand: Your First 72 Hours?',
        answer:
          'Download the PDF to your phone or tablet before your flight so you can read it offline right after landing, even before setting up local mobile data.',
      },
      {
        question: 'Is this guide included in the Complete Collection?',
        answer:
          'Yes. Thailand: Your First 72 Hours is included alongside all four other guides and the 42 cheat sheets in the Complete Collection.',
      },
    ],
  },
  {
    id: 'survival-bible',
    slug: 'thailand-survival-bible',
    number: '02',
    label: 'The Everyday Essential',
    title: 'Thailand Survival Bible',
    subtitle: 'The Complete Field Guide to Thai Health, Law, Culture & Daily Life',
    marketingHeadline: 'Thailand, Without the Guesswork.',
    description:
      'A comprehensive practical resource for understanding everyday life, cultural expectations, and important travel considerations in Thailand.',
    price: 14.99,
    formatLabel: 'Digital PDF Guide',
    coverConcept:
      'Sophisticated Thai architecture, everyday street life, warm ivory and deep teal.',
    coverImageUrl: PRODUCT_ASSETS['survival-bible'].coverImageUrl,
    coverImageAlt: PRODUCT_ASSETS['survival-bible'].coverImageAlt,
    coverTheme: {
      surface: '#17343B',
      accent: '#C8A467',
      text: '#F7F3EA',
      spine: '#102429',
    },
    whoItIsFor: [
      'Travelers who want to understand and respect Thai cultural norms',
      'Digital nomads and expats settling into daily routines in Thailand',
      'Longer-stay visitors seeking practical context on health, etiquette, and local rules',
    ],
    interestTags: ['everyday'],
    verifiedContents: null,
    samplePages: PRODUCT_ASSETS['survival-bible'].samplePages,
    productFaqs: [
      {
        question: 'Who benefits most from Thailand Survival Bible?',
        answer:
          'Both short-term travelers wanting respectful cultural awareness and extended-stay visitors or digital nomads navigating everyday life in Thailand.',
      },
      {
        question: 'Does this replace official legal or medical advice?',
        answer:
          'No. It is a practical travel and cultural reference guide. Always consult qualified medical professionals or official local authorities for personal health or legal matters.',
      },
    ],
  },
  {
    id: 'scams-and-mistakes',
    slug: 'thailand-scams-and-tourist-mistakes',
    number: '03',
    label: 'The Smart Traveler Guide',
    title: 'Thailand Scams & Tourist Mistakes',
    subtitle: 'The 32 Real Scams, Tourist Traps & Exact Scripts to Avoid Them',
    marketingHeadline: 'Know the Traps Before They Find You.',
    description:
      'A practical guide to recognizing common tourist traps, understanding avoidable mistakes, and preparing useful responses.',
    price: 19.99,
    formatLabel: 'Digital PDF Guide',
    coverConcept:
      'Cinematic Bangkok street imagery with elegant black, dark teal, and gold accents.',
    coverImageUrl: PRODUCT_ASSETS['scams-and-mistakes'].coverImageUrl,
    coverImageAlt: PRODUCT_ASSETS['scams-and-mistakes'].coverImageAlt,
    coverTheme: {
      surface: '#11161A',
      accent: '#C8A467',
      text: '#F7F3EA',
      spine: '#090C0E',
    },
    whoItIsFor: [
      'Travelers concerned about common tourist traps and pricing misunderstandings',
      'Solo travelers and first-time visitors navigating busy hubs and transport',
      'Anyone who wants clear, polite responses ready before awkward moments arise',
    ],
    interestTags: ['scams'],
    verifiedContents: null,
    samplePages: PRODUCT_ASSETS['scams-and-mistakes'].samplePages,
    productFaqs: [
      {
        question: 'Does this guide encourage confrontation?',
        answer:
          'No. It focuses on calm awareness, recognizing patterns early, and using respectful, practical responses to step away smoothly.',
      },
      {
        question: 'Can I keep the scripts handy on my phone?',
        answer:
          'Yes. As a standard digital PDF, it opens cleanly on mobile devices for quick offline reference whenever needed.',
      },
    ],
  },
  {
    id: 'food-ordering-kit',
    slug: 'thailand-food-ordering-survival-kit',
    number: '04',
    label: 'The Food Explorer Guide',
    title: 'Thailand Food Ordering Survival Kit',
    subtitle: 'The Complete Street Food & Allergy Communication Guide',
    marketingHeadline: 'Order With Confidence. Discover More.',
    description:
      'A practical food-ordering and communication guide for navigating Thai restaurants, street-food stalls, and dietary questions.',
    price: 14.99,
    formatLabel: 'Digital PDF Guide',
    coverConcept:
      'Beautiful editorial Thai food photography, warm ivory, deep green, and gold.',
    coverImageUrl: PRODUCT_ASSETS['food-ordering-kit'].coverImageUrl,
    coverImageAlt: PRODUCT_ASSETS['food-ordering-kit'].coverImageAlt,
    coverTheme: {
      surface: '#1A302B',
      accent: '#C8A467',
      text: '#F7F3EA',
      spine: '#12211E',
    },
    whoItIsFor: [
      'Food lovers eager to explore Thai street stalls and neighborhood kitchens',
      'Travelers with dietary restrictions or ingredient questions',
      'Visitors who want clearer communication around spice levels and dish choices',
    ],
    interestTags: ['food'],
    verifiedContents: null,
    samplePages: PRODUCT_ASSETS['food-ordering-kit'].samplePages,
    safetyNote:
      'Important dietary notice: Communication aids are designed to help you express ingredient questions and dietary preferences more clearly, but they cannot guarantee allergen-free food or prevent cross-contact in kitchens or street stalls. Travelers with severe allergies should always exercise personal medical caution.',
    productFaqs: [
      {
        question: 'Can allergy communication cards guarantee allergen-free meals?',
        answer:
          'No. While clear communication helps staff understand your request, shared woks, sauces, and street-stall setups mean allergen-free preparation can never be guaranteed.',
      },
      {
        question: 'Is this useful if I do not have food allergies?',
        answer:
          'Yes. It is also built for food travelers who want greater confidence ordering beyond picture menus at local restaurants and markets.',
      },
    ],
  },
  {
    id: 'essential-thai-words',
    slug: '120-essential-thai-words',
    number: '05',
    label: 'The Language Essential',
    title: '120 Essential Thai Words',
    subtitle: '120 Must-Know Thai Words to Speak Confidently in Thailand',
    marketingHeadline: 'Your First Words. Your First Connections.',
    description:
      'A practical collection of essential Thai vocabulary for everyday interactions and travel situations.',
    price: 6.99,
    formatLabel: 'Digital PDF Guide',
    coverConcept:
      'Beautiful Thai typography, minimal ivory and champagne gold design.',
    coverImageUrl: PRODUCT_ASSETS['essential-thai-words'].coverImageUrl,
    coverImageAlt: PRODUCT_ASSETS['essential-thai-words'].coverImageAlt,
    coverTheme: {
      surface: '#243038',
      accent: '#C8A467',
      text: '#F7F3EA',
      spine: '#182127',
    },
    whoItIsFor: [
      'Foreigners learning practical Thai vocabulary before or during a trip',
      'Travelers who want warm, respectful everyday words for greetings and thanks',
      'Visitors seeking a focused, portable word companion without textbook clutter',
    ],
    interestTags: ['language'],
    verifiedContents: null,
    samplePages: PRODUCT_ASSETS['essential-thai-words'].samplePages,
    productFaqs: [
      {
        question: 'Do I need prior knowledge of Thai script to use this guide?',
        answer:
          'No prior Thai experience is required. It is built as a practical traveler vocabulary companion for everyday interactions.',
      },
      {
        question: 'How does this pair with the 42 cheat sheets?',
        answer:
          '120 Essential Thai Words builds your core everyday vocabulary, while the 42 cheat sheets in the Complete Collection provide situation-specific quick reference.',
      },
    ],
  },
];

export const STANDALONE_TOTAL = Number(
  PRODUCTS.reduce((sum, item) => sum + item.price, 0).toFixed(2)
);

export function getProductById(id: string): ProductGuide | undefined {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}
