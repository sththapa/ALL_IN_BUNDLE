export interface SocialLinkItem {
  id: string;
  platform: string;
  handle: string | null;
  url: string | null;
}

/**
 * Configure verified NEPTHAI social channel URLs here.
 * Leave `url` as `null` until official handles are published.
 */
export const SOCIAL_LINKS: SocialLinkItem[] = [
  { id: 'instagram', platform: 'Instagram', handle: null, url: null },
  { id: 'tiktok', platform: 'TikTok', handle: null, url: null },
  { id: 'youtube', platform: 'YouTube', handle: null, url: null },
];
