export interface BrandMilestone {
  label: string;
  value: string | null;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  supportingMessage: string;
  storyHeadline: string;
  storyParagraphs: string[];
  creatorSection: {
    name: string | null;
    role: string | null;
    bio: string | null;
  };
  /**
   * Supply verified audience statistics only when confirmed.
   * Null entries display as clean configurable slots without inventing numbers.
   */
  audienceStats: BrandMilestone[];
  communityMilestones: string[] | null;
}

export const BRAND_INFO: BrandConfig = {
  name: 'NEPTHAI',
  tagline: 'Know Thailand. Travel Confidently.',
  supportingMessage: 'Your Thailand journey deserves more than guesswork.',
  storyHeadline:
    'Created for People Who Want to Experience Thailand, Not Just Visit It.',
  storyParagraphs: [
    'NEPTHAI exists for travelers who want practical Thai communication and grounded local context before they step onto a Bangkok street, board an overnight train, or order from a neighborhood food cart.',
    'Instead of overwhelming you with dense encyclopedia pages or outdated forum advice, our guides focus on the everyday realities travelers actually encounter—arrival logistics, cultural awareness, fair interactions, ordering food clearly, and speaking key Thai words with respect.',
  ],
  creatorSection: {
    name: null,
    role: null,
    bio: null,
  },
  audienceStats: [
    { label: 'Curated PDF Travel Guides', value: '5' },
    { label: 'Quick-Reference Cheat Sheets', value: '42' },
    { label: 'Verified Reader Metrics', value: null },
  ],
  communityMilestones: null,
};
