import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { BUNDLE_CONFIG } from '../data/bundle';
import { CHEAT_SHEET_COUNT } from '../data/cheatSheets';
import { getBundleCheckoutUrl } from '../data/checkoutUrls';
import { PRODUCTS, type ProductGuide } from '../data/products';
import { BookMockup } from './BookMockup';
import { CheckoutButton, type CheckoutSetupPayload } from './CheckoutButton';

interface BundleSectionProps {
  onSelectProduct: (product: ProductGuide) => void;
  onCheckoutSetupNeeded: (payload: CheckoutSetupPayload) => void;
}

export function BundleSection({
  onSelectProduct,
  onCheckoutSetupNeeded,
}: BundleSectionProps) {
  const [showComparison, setShowComparison] = useState(true);
  const [spotlightIndex, setSpotlightIndex] = useState<number>(2);
  const bundleCheckoutUrl = getBundleCheckoutUrl();
  const spotlightProduct = PRODUCTS[spotlightIndex] ?? PRODUCTS[2];

  return (
    <section
      id="bundle"
      className="bg-[#FFFFFF] py-20 sm:py-24 lg:py-28 text-[#101C24]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-3xl border border-[#101C24]/10 bg-gradient-to-br from-[#13262E] via-[#17343B] to-[#101C24] text-[#F7F3EA] shadow-[0_32px_70px_-24px_rgba(16,28,36,0.42)]"
        >
          <div className="grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
            {/* Left: Interactive Overlapping Five-Cover Composition */}
            <div className="lg:col-span-6">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101C24]/75 px-4 py-10 sm:px-6 sm:py-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-12 h-48 w-72 rounded-full bg-[#C8A467]/12 blur-3xl"
                />

                <div className="relative flex items-end justify-center">
                  {PRODUCTS.map((product, index) => {
                    const isFocused = spotlightIndex === index;
                    const offsetClasses = [
                      'z-10 -mr-12 sm:-mr-14 scale-[0.82] -rotate-6',
                      'z-20 -mr-12 sm:-mr-14 scale-[0.9] -rotate-3',
                      'z-30 scale-100',
                      'z-20 -ml-12 sm:-ml-14 scale-[0.9] rotate-3',
                      'z-10 -ml-12 sm:-ml-14 scale-[0.82] rotate-6',
                    ][index];

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onMouseEnter={() => setSpotlightIndex(index)}
                        onFocus={() => setSpotlightIndex(index)}
                        onClick={() => onSelectProduct(product)}
                        aria-label={`Inspect ${product.title}`}
                        className={`group relative transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] rounded-md ${offsetClasses} ${
                          isFocused
                            ? 'z-40 -translate-y-3 opacity-100'
                            : 'opacity-90 hover:z-40 hover:-translate-y-2 hover:opacity-100'
                        }`}
                      >
                        <BookMockup
                          product={product}
                          size="sm"
                          className="!w-24 sm:!w-32 md:!w-36"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Live Spotlight Caption */}
                <div className="mt-7 w-full border-t border-white/10 pt-4 text-center">
                  <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#C8A467] tabular-nums">
                    Guide {spotlightProduct.number} · ${spotlightProduct.price.toFixed(2)} individually
                  </p>
                  <p className="mt-1 font-editorial text-lg font-semibold text-[#FFFFFF]">
                    {spotlightProduct.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#F7F3EA]/65">
                    Included in the ${BUNDLE_CONFIG.bundlePrice.toFixed(2)} All-in-One Collection · Click any cover to open guide
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Bundle Headline, $9.99 Offer Lockup & CTAs */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#C8A467]">
                <Layers className="h-4 w-4" aria-hidden="true" />
                <span>All-in-One Complete Collection</span>
              </div>

              <h2 className="mt-3 font-editorial text-3xl font-semibold leading-tight tracking-tight text-[#FFFFFF] sm:text-4xl lg:text-5xl">
                {BUNDLE_CONFIG.headline}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#F7F3EA]/85">
                {BUNDLE_CONFIG.subheadline}
              </p>

              {/* Four Clear Inclusion Bullets */}
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {BUNDLE_CONFIG.includedHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-[#FFFFFF]"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-[#C8A467]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Transparent $9.99 Price & Accurate Discount Math */}
              <div className="mt-8 rounded-2xl border border-[#C8A467]/35 bg-[#101C24]/80 p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#F7F3EA]/65">
                      All-in-One Bundle Price
                    </p>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="text-4xl sm:text-5xl font-semibold tabular-nums text-[#C8A467]">
                        ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}
                      </span>
                      <span className="text-lg tabular-nums text-[#F7F3EA]/50 line-through">
                        ${BUNDLE_CONFIG.standaloneTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold tabular-nums text-[#FFFFFF]">
                      Save ${BUNDLE_CONFIG.savingsAmount.toFixed(2)} ({BUNDLE_CONFIG.discountPercentage}% off)
                    </p>
                    <p className="mt-0.5 text-xs text-[#F7F3EA]/65">
                      Calculated against the ${BUNDLE_CONFIG.standaloneTotal.toFixed(2)} standalone PDF total
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
                  <CheckoutButton
                    checkoutUrl={bundleCheckoutUrl}
                    productTitle="Complete Thailand Travel Collection"
                    price={BUNDLE_CONFIG.bundlePrice}
                    isBundle
                    label="Get the Complete Collection"
                    variant="gold"
                    size="lg"
                    onSetupNeeded={onCheckoutSetupNeeded}
                  />

                  <button
                    type="button"
                    onClick={() => setShowComparison((prev) => !prev)}
                    aria-expanded={showComparison}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-medium text-[#FFFFFF] whitespace-nowrap transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467]"
                  >
                    <span>See Everything Included</span>
                    {showComparison ? (
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transparent Individual Guides vs Complete Collection Comparison */}
          {showComparison && (
            <div className="border-t border-white/10 bg-[#101C24] px-6 py-10 sm:px-10 lg:px-14">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h3 className="font-editorial text-2xl font-semibold text-[#FFFFFF]">
                    Individual Guides vs. Complete Collection
                  </h3>
                  <p className="mt-2 text-sm text-[#F7F3EA]/70">
                    Buy only the specific guide you need, or bundle all five PDFs and the {CHEAT_SHEET_COUNT} cheat sheets together for ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}.
                  </p>

                  <div className="mt-5 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#17343B]/30">
                    {PRODUCTS.map((guide) => (
                      <div
                        key={guide.id}
                        className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                      >
                        <button
                          type="button"
                          onClick={() => onSelectProduct(guide)}
                          className="text-left font-medium text-[#F7F3EA] hover:text-[#C8A467] transition-colors"
                        >
                          {guide.number}. {guide.title}
                        </button>
                        <span className="shrink-0 tabular-nums text-[#F7F3EA]/80">
                          ${guide.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-[#FFFFFF]">
                      <span>Standalone Total (5 PDF Guides)</span>
                      <span className="tabular-nums">${BUNDLE_CONFIG.standaloneTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-[#C8A467]/35 bg-[#17343B]/45 p-6">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C8A467]">
                        Complete Collection Summary
                      </p>
                      <ul className="mt-4 space-y-3 text-sm text-[#F7F3EA]/85">
                        <li className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A467]" aria-hidden="true" />
                          <span>All 5 NEPTHAI travel PDF guides (${BUNDLE_CONFIG.standaloneTotal.toFixed(2)} standalone total)</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A467]" aria-hidden="true" />
                          <span>All {CHEAT_SHEET_COUNT} Little Lifesavers quick-reference cheat sheets</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A467]" aria-hidden="true" />
                          <span>Single organized download package for offline phone &amp; tablet access</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-[#F7F3EA]/75">All-in-One Price</span>
                        <span className="text-3xl font-semibold tabular-nums text-[#C8A467]">
                          ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs tabular-nums text-[#F7F3EA]/65">
                        You save ${BUNDLE_CONFIG.savingsAmount.toFixed(2)} ({BUNDLE_CONFIG.discountPercentage}% discount on the 5 guides)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
