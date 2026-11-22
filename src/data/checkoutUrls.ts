/**
 * Hosted Gumroad Checkout URL Configuration.
 *
 * Replace `null` with your live Gumroad product URL (e.g. "https://nepthai.gumroad.com/l/first-72-hours")
 * once published. Never expose API keys or private fulfillment secrets in client configuration.
 *
 * When a checkout URL is `null`, the storefront displays a clearly labeled setup state
 * instead of a broken link or fabricated checkout flow.
 */
export interface CheckoutUrlConfig {
  products: Record<string, string | null>;
  completeCollection: string | null;
  providerName: string;
}

export const CHECKOUT_URLS: CheckoutUrlConfig = {
  providerName: 'Gumroad',
  products: {
    'first-72-hours': 'https://supadcha.gumroad.com/l/Your_First72_Hours',
    'survival-bible': 'https://supadcha.gumroad.com/l/THAILAND_SURVIVAL_BIBLE',
    'scams-and-mistakes': 'https://supadcha.gumroad.com/l/THAILAND_SCAMS_AND_TOURISTS_MISTAKES',
    'food-ordering-kit': 'https://supadcha.gumroad.com/l/Thai_Food_Survival',
    'essential-thai-words': 'https://supadcha.gumroad.com/l/120_Essential_Thai_Words',
  },
  completeCollection: 'https://supadcha.gumroad.com/l/ALL-IN-ONE-BUNDLE',
};

export function getProductCheckoutUrl(productId: string): string | null {
  const raw = CHECKOUT_URLS.products[productId];
  return raw && raw.trim().length > 0 ? raw.trim() : null;
}

export function getBundleCheckoutUrl(): string | null {
  const raw = CHECKOUT_URLS.completeCollection;
  return raw && raw.trim().length > 0 ? raw.trim() : null;
}
