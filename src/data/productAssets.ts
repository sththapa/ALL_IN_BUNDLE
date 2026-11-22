export interface SamplePageAsset {
  id: string;
  label: string;
  imageUrl: string;
  alt: string;
}

export interface ProductVisualAsset {
  coverImageUrl: string;
  coverImageAlt: string;
  samplePages: SamplePageAsset[];
}

export const SITE_MEDIA = {
  heroBackdrop: {
    url: '/src/assets/images/hero_thailand_twilight_1795311642201.jpg',
    alt: 'Twilight view of Wat Arun and the Chao Phraya River in Bangkok, Thailand',
  },
  whyNepThai: {
    url: '/src/assets/images/editorial_thai_craft_1795311641726.jpg',
    alt: 'Traditional wooden canal boat gliding past riverside homes in Bangkok at golden hour',
  },
  finalBanner: {
    url: '/src/assets/images/banner_thailand_horizon_1795311642502.jpg',
    alt: 'Limestone cliffs and longtail boat on the Andaman Sea in southern Thailand at sunset',
  },
} as const;

/**
 * Seller-configurable product cover images and PDF sample preview pages.
 * Add verified sample page objects into `samplePages` when real PDF extracts are ready.
 * Empty `samplePages` renders an honest "Preview Coming Soon" placeholder in the preview modal.
 */
export const PRODUCT_ASSETS: Record<string, ProductVisualAsset> = {
  'first-72-hours': {
    coverImageUrl: '/src/assets/images/luxury_cover_first_72_hours_1795312163478.jpg',
    coverImageAlt: 'Twilight aerial view of Bangkok Chao Phraya river and glowing temple spire',
    samplePages: [],
  },
  'survival-bible': {
    coverImageUrl: '/src/assets/images/luxury_cover_survival_bible_1795312163844.jpg',
    coverImageAlt: 'Sunlit classical Thai royal pavilion colonnade in warm morning light',
    samplePages: [],
  },
  'scams-and-mistakes': {
    coverImageUrl: '/src/assets/images/luxury_cover_scams_mistakes_1795312164515.jpg',
    coverImageAlt: 'Rain-slicked Bangkok heritage lane illuminated by warm amber lanterns at night',
    samplePages: [],
  },
  'food-ordering-kit': {
    coverImageUrl: '/src/assets/images/luxury_cover_food_kit_1795312163400.jpg',
    coverImageAlt: 'Authentic Thai tom yum broth with fresh lime, basil, and chilies on honed slate',
    samplePages: [],
  },
  'essential-thai-words': {
    coverImageUrl: '/src/assets/images/luxury_cover_thai_words_1795312163618.jpg',
    coverImageAlt: 'Deckle-edge cotton paper, brushed brass pen, and celadon tea vessel on travertine',
    samplePages: [],
  },
};
