import { CHEAT_SHEET_COUNT } from './cheatSheets';
import { PRODUCTS, STANDALONE_TOTAL } from './products';

export interface BundleConfig {
  id: string;
  headline: string;
  subheadline: string;
  bundlePrice: number;
  standaloneTotal: number;
  savingsAmount: number;
  discountPercentage: number;
  includedHighlights: string[];
}

/**
 * Configurable bundle price.
 * Standalone PDF total is computed directly from the 5 individual guides ($69.95).
 * No invented monetary value is assigned to the 42 cheat sheets.
 */
const CONFIGURED_BUNDLE_PRICE = 9.99;

const savingsAmount = Number(
  Math.max(0, STANDALONE_TOTAL - CONFIGURED_BUNDLE_PRICE).toFixed(2)
);

const discountPercentage =
  STANDALONE_TOTAL > 0
    ? Math.round(((STANDALONE_TOTAL - CONFIGURED_BUNDLE_PRICE) / STANDALONE_TOTAL) * 100)
    : 0;

export const BUNDLE_CONFIG: BundleConfig = {
  id: 'complete-thailand-collection',
  headline: 'Your Complete Thailand Travel Library.',
  subheadline:
    'Five essential guides and 42 quick-reference cheat sheets, brought together in one convenient collection.',
  bundlePrice: CONFIGURED_BUNDLE_PRICE,
  standaloneTotal: STANDALONE_TOTAL,
  savingsAmount,
  discountPercentage,
  includedHighlights: [
    `${PRODUCTS.length} Premium PDF Guides`,
    `${CHEAT_SHEET_COUNT} Essential Cheat Sheets`,
    'Digital Download Collection',
    'Practical Thailand Travel Resources',
  ],
};
