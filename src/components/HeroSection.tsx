import { useState } from 'react';
import { ArrowRight, BookOpen, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_INFO } from '../data/brand';
import { BUNDLE_CONFIG } from '../data/bundle';
import { CHEAT_SHEET_COUNT } from '../data/cheatSheets';
import { SITE_MEDIA } from '../data/productAssets';
import { PRODUCTS, type ProductGuide } from '../data/products';
import { BookMockup } from './BookMockup';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onDiscoverInside: () => void;
  onSelectProduct: (product: ProductGuide) => void;
}

export function HeroSection({
  onExploreCollection,
  onDiscoverInside,
  onSelectProduct,
}: HeroSectionProps) {
  const [bgError, setBgError] = useState(false);
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  const activeBook = PRODUCTS[activeBookIndex] ?? PRODUCTS[0];
  const prevBook = PRODUCTS[(activeBookIndex - 1 + PRODUCTS.length) % PRODUCTS.length];
  const nextBook = PRODUCTS[(activeBookIndex + 1) % PRODUCTS.length];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#101C24] text-[#F7F3EA]"
    >
      {/* Cinematic Thailand Backdrop Photography with Measured Scrim */}
      {!bgError && (
        <img
          src={SITE_MEDIA.heroBackdrop.url}
          alt={SITE_MEDIA.heroBackdrop.alt}
          referrerPolicy="no-referrer"
          onError={() => setBgError(true)}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#101C24] via-[#101C24]/90 to-[#17343B]/75"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#101C24] via-transparent to-[#101C24]/55"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-22 lg:px-8 lg:py-26">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Editorial Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#C8A467]">
              The NEPTHAI Travel Collection
            </p>

            <h1 className="mt-4 font-editorial text-4xl font-semibold leading-[1.04] tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-[3.75rem]">
              Thailand Is Better When You&rsquo;re Prepared.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F7F3EA]/85 sm:text-lg">
              Five practical travel guides. {CHEAT_SHEET_COUNT} essential cheat sheets.
              Everything designed to help you explore Thailand with greater confidence.
            </p>

            {/* Unboxed Editorial Metadata Line */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#F7F3EA]/80">
              <span>{BRAND_INFO.tagline}</span>
              <span aria-hidden="true" className="text-[#C8A467]">
                ·
              </span>
              <span className="tabular-nums">{PRODUCTS.length} Digital PDF Guides</span>
              <span aria-hidden="true" className="text-[#C8A467]">
                ·
              </span>
              <span className="tabular-nums">{CHEAT_SHEET_COUNT} Quick-Reference Sheets</span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-lg bg-[#C8A467] px-7 py-3.5 text-sm font-semibold text-[#101C24] whitespace-nowrap shrink-0 shadow-[0_12px_30px_-8px_rgba(200,164,103,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d8b87d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F3EA]"
              >
                <span>Explore the Collection · ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onDiscoverInside}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-medium text-[#FFFFFF] whitespace-nowrap shrink-0 backdrop-blur-sm transition-colors duration-200 hover:border-[#C8A467]/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467]"
              >
                <BookOpen className="h-4 w-4 text-[#C8A467]" aria-hidden="true" />
                <span>Discover What&rsquo;s Inside</span>
              </button>
            </div>

            {/* Clear All-In-One $9.99 Offer Context */}
            <p className="mt-5 text-xs text-[#F7F3EA]/70 tabular-nums">
              All 5 guides + {CHEAT_SHEET_COUNT} cheat sheets for{' '}
              <span className="font-semibold text-[#C8A467]">
                ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}
              </span>{' '}
              ({BUNDLE_CONFIG.discountPercentage}% off the ${BUNDLE_CONFIG.standaloneTotal.toFixed(2)} standalone total)
            </p>
          </motion.div>

          {/* Interactive 5-Edition Floating 3D Stage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-white/10 bg-[#101C24]/55 p-5 sm:p-7 backdrop-blur-md shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)]">
              {/* Warm Champagne Spotlight Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-10 h-52 w-52 rounded-full bg-[#C8A467]/15 blur-3xl"
              />

              {/* 3-Volume Interactive Stage */}
              <div className="relative flex w-full items-end justify-center py-4 sm:py-6">
                {/* Left Flanking Book */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveBookIndex(
                      (activeBookIndex - 1 + PRODUCTS.length) % PRODUCTS.length
                    )
                  }
                  aria-label={`Select ${prevBook.title}`}
                  className="group relative -mr-12 sm:-mr-14 mb-4 -rotate-6 scale-[0.84] opacity-75 transition-all duration-200 hover:z-30 hover:opacity-100 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] rounded-lg"
                >
                  <BookMockup product={prevBook} size="sm" />
                </button>

                {/* Center Active Edition */}
                <button
                  type="button"
                  onClick={() => onSelectProduct(activeBook)}
                  aria-label={`Open details for ${activeBook.title}`}
                  className="group relative z-20 transition-transform duration-200 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] rounded-lg"
                >
                  <BookMockup product={activeBook} size="md" />
                </button>

                {/* Right Flanking Book */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveBookIndex((activeBookIndex + 1) % PRODUCTS.length)
                  }
                  aria-label={`Select ${nextBook.title}`}
                  className="group relative -ml-12 sm:-ml-14 mb-4 rotate-6 scale-[0.84] opacity-75 transition-all duration-200 hover:z-30 hover:opacity-100 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] rounded-lg"
                >
                  <BookMockup product={nextBook} size="sm" />
                </button>
              </div>

              {/* Active Volume Editorial Caption + Quick Inspect */}
              <div className="mt-2 flex w-full flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-center sm:flex-row sm:text-left">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#C8A467]">
                    {activeBook.number} · {activeBook.label} · ${activeBook.price.toFixed(2)}
                  </p>
                  <p className="truncate font-editorial text-xl font-semibold text-[#FFFFFF]">
                    {activeBook.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct(activeBook)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-medium text-[#FFFFFF] whitespace-nowrap shrink-0 transition-colors hover:border-[#C8A467] hover:bg-white/10"
                >
                  <Eye className="h-3.5 w-3.5 text-[#C8A467]" aria-hidden="true" />
                  <span>Inspect Guide</span>
                </button>
              </div>

              {/* 5-Volume Selector Strip */}
              <div
                role="tablist"
                aria-label="Select featured guide"
                className="mt-4 grid w-full grid-cols-5 gap-1.5"
              >
                {PRODUCTS.map((guide, index) => {
                  const isActive = index === activeBookIndex;
                  return (
                    <button
                      key={guide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveBookIndex(index)}
                      className={`min-h-[38px] rounded-md px-2 py-1.5 text-center text-xs font-medium tabular-nums transition-colors ${
                        isActive
                          ? 'bg-[#C8A467] text-[#101C24] font-semibold'
                          : 'bg-white/5 text-[#F7F3EA]/70 hover:bg-white/10 hover:text-[#FFFFFF]'
                      }`}
                    >
                      {guide.number}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
