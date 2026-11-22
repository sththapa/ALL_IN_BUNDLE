export interface MerchantPolicies {
  supportEmail: string | null;
  fulfillmentPlatform: string;
  deliverySummary: string;
  offlineUsageNote: string;
  refundPolicySummary: string | null;
  currencyCode: string;
}

/**
 * Merchant support and fulfillment policies.
 * Fields set to `null` display clear configurable placeholders until confirmed by the seller.
 */
export const MERCHANT_POLICIES: MerchantPolicies = {
  supportEmail: null,
  fulfillmentPlatform: 'Gumroad',
  deliverySummary:
    'Digital downloads are delivered securely through our hosted Gumroad checkout and receipt email immediately after order confirmation.',
  offlineUsageNote:
    'Once downloaded to your phone, tablet, or laptop, every PDF guide and cheat sheet is available offline without mobile data or Wi-Fi.',
  refundPolicySummary: null,
  currencyCode: 'USD',
};
