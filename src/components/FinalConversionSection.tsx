import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BUNDLE_CONFIG } from '../data/bundle';
import { SITE_MEDIA } from '../data/productAssets';

interface FinalConversionSectionProps {
  onExploreBundle: () => void;
}

export function FinalConversionSection({
  onExploreBundle,
}: FinalConversionSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#101C24] py-24 sm:py-28 lg:py-32 text-[#F7F3EA]">
      {!imgError && (
        <img
          src={SITE_MEDIA.finalBanner.url}
          alt={SITE_MEDIA.finalBanner.alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#101C24] via-[#101C24]/75 to-[#17343B]/80"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C8A467]">
          Know Thailand. Travel Confidently.
        </p>

        <h2 className="mt-4 font-editorial text-4xl font-semibold leading-[1.08] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-[3.5rem]">
          Your Thailand Adventure Deserves a Confident Start.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#F7F3EA]/85 sm:text-lg">
          Prepare for the unexpected, communicate with greater confidence, and spend
          more time enjoying Thailand.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={onExploreBundle}
            className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-lg bg-[#C8A467] px-8 py-3.5 text-sm sm:text-base font-semibold text-[#101C24] whitespace-nowrap transition-colors duration-200 hover:bg-[#d6b57a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F3EA]"
          >
            <span>Explore the Complete Collection</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-2 text-xs tabular-nums text-[#F7F3EA]/75">
            5 PDF Guides + 42 Cheat Sheets · ${BUNDLE_CONFIG.bundlePrice.toFixed(2)} USD ({BUNDLE_CONFIG.discountPercentage}% off ${BUNDLE_CONFIG.standaloneTotal.toFixed(2)} separately)
          </p>
        </div>
      </div>
    </section>
  );
}
