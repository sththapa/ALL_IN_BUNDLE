import { BUNDLE_CONFIG } from './bundle';
import { MERCHANT_POLICIES } from './policies';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isPolicyConfigurable?: boolean;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'included',
    question: 'What is included in the collection?',
    answer: `The Complete Collection brings together all five NEPTHAI digital PDF guides—Thailand: Your First 72 Hours, Thailand Survival Bible, Thailand Scams & Tourist Mistakes, Thailand Food Ordering Survival Kit, and 120 Essential Thai Words—together with all ${BUNDLE_CONFIG.includedHighlights[1].toLowerCase()}.`,
  },
  {
    id: 'digital-pdfs',
    question: 'Are these digital PDF downloads?',
    answer:
      'Yes. Every NEPTHAI guide and cheat sheet is delivered as a digital download so you can access your resources immediately without waiting for physical shipping.',
  },
  {
    id: 'phone-reading',
    question: 'Can I read them on my phone?',
    answer:
      'Yes. Standard PDF files open cleanly on iPhone, Android devices, tablets, and laptops—making them easy to reference in airports, taxis, restaurants, or markets.',
  },
  {
    id: 'first-time-visitors',
    question: 'Are the guides suitable for first-time visitors?',
    answer:
      'Yes. The collection is designed specifically with first-time visitors in mind, while also offering practical everyday, culinary, and language value for repeat travelers, solo visitors, couples, and longer-stay expats.',
  },
  {
    id: 'cheat-sheets-included',
    question: 'Are the 42 cheat sheets included in the bundle?',
    answer:
      'Yes. All 42 Thailand quick-reference cheat sheets are included when you purchase the Complete Collection.',
  },
  {
    id: 'buy-individually',
    question: 'Can I buy guides individually?',
    answer: `Yes. Each of the five PDF guides is available individually ($6.99 to $19.99, totaling $${BUNDLE_CONFIG.standaloneTotal.toFixed(2)} separately), or you can choose the Complete Collection for $${BUNDLE_CONFIG.bundlePrice.toFixed(2)}.`,
  },
  {
    id: 'delivery',
    question: 'How do I receive my downloads?',
    answer: MERCHANT_POLICIES.deliverySummary,
  },
  {
    id: 'offline',
    question: 'Can I use the guides offline after downloading?',
    answer: MERCHANT_POLICIES.offlineUsageNote,
  },
  {
    id: 'support',
    question: 'What if I need help?',
    answer: MERCHANT_POLICIES.supportEmail
      ? `If you experience any issue accessing your downloads or have a question about a guide, please contact us at ${MERCHANT_POLICIES.supportEmail} or reply to your ${MERCHANT_POLICIES.fulfillmentPlatform} order receipt.`
      : `Support contact details are configurable in merchant policies. Once live, customers can reach support directly via their ${MERCHANT_POLICIES.fulfillmentPlatform} receipt email or the storefront support address.`,
    isPolicyConfigurable: !MERCHANT_POLICIES.supportEmail,
  },
  {
    id: 'refund-policy',
    question: 'What is the refund policy?',
    answer: MERCHANT_POLICIES.refundPolicySummary
      ? MERCHANT_POLICIES.refundPolicySummary
      : 'Refund terms for digital downloads will be published here once confirmed by the merchant prior to store launch.',
    isPolicyConfigurable: !MERCHANT_POLICIES.refundPolicySummary,
  },
];
