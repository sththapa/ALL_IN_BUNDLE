import { ArrowRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { BUNDLE_CONFIG } from '../data/bundle';
import { CHEAT_SHEET_COUNT } from '../data/cheatSheets';
import { PRODUCTS, type ProductGuide } from '../data/products';
import type { CheckoutSetupPayload } from './CheckoutButton';
import { ProductCard } from './ProductCard';

interface ProductCollectionProps {
  onViewDetails: (product: ProductGuide) => void;
  onCheckoutSetupNeeded: (payload: CheckoutSetupPayload) => void;
  onJumpToBundle: () => void;
}

export function ProductCollection({
  onViewDetails,
  onCheckoutSetupNeeded,
  onJumpToBundle,
}: ProductCollectionProps) {
  return (
    <section
      id="guides"
      className="bg-[#F7F3EA] py-20 sm:py-24 lg:py-28 text-[#101C24]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 border-b border-[#101C24]/10 pb-10 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#547D78]">
              Curated Digital Guides
            </p>
            <h2 className="mt-3 font-editorial text-3xl font-semibold tracking-tight text-[#101C24] sm:text-4xl lg:text-5xl">
              Five Guides. One Extraordinary Journey.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#101C24]/75 sm:text-lg">
              Thoughtfully created resources for the moments that matter in Thailand.
            </p>
          </div>

          <div className="text-sm text-[#101C24]/70 tabular-nums">
            <span>5 Individual PDFs</span>
            <span aria-hidden="true" className="mx-2 text-[#C8A467]">
              ·
            </span>
            <span>${BUNDLE_CONFIG.standaloneTotal.toFixed(2)} Combined</span>
          </div>
        </motion.div>

        {/* 3-Column Balanced Product Grid (5 Unique Guides + 1 Complete Library Invitation Card) */}
        <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
              onCheckoutSetupNeeded={onCheckoutSetupNeeded}
            />
          ))}

          {/* 6th Grid Card: All-in-One $9.99 Complete Library Invitation */}
          <aside className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#C8A467]/45 bg-gradient-to-br from-[#101C24] via-[#13262E] to-[#17343B] p-7 sm:p-8 text-[#F7F3EA] shadow-[0_24px_48px_-18px_rgba(16,28,36,0.38)]">
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C8A467]">
                <span>All-In-One Collection</span>
                <Layers className="h-4 w-4" aria-hidden="true" />
              </div>

              <h3 className="mt-4 font-editorial text-3xl font-semibold leading-tight text-[#FFFFFF]">
                Get All Five Guides Plus {CHEAT_SHEET_COUNT} Cheat Sheets for ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}.
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[#F7F3EA]/80">
                Download every NEPTHAI travel PDF and the complete{' '}
                {CHEAT_SHEET_COUNT}-sheet quick-reference library together in one
                curated digital edition.
              </p>

              <dl className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-[#F7F3EA]/70">5 Individual PDFs Total</dt>
                  <dd className="tabular-nums text-[#F7F3EA]/70 line-through">
                    ${BUNDLE_CONFIG.standaloneTotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-medium text-[#FFFFFF]">All-in-One Bundle</dt>
                  <dd className="text-2xl font-semibold tabular-nums text-[#C8A467]">
                    ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between text-xs text-[#C8A467]">
                  <dt>Total Savings</dt>
                  <dd className="tabular-nums">
                    Save ${BUNDLE_CONFIG.savingsAmount.toFixed(2)} ({BUNDLE_CONFIG.discountPercentage}% off)
                  </dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              onClick={onJumpToBundle}
              className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#C8A467] px-5 py-3 text-sm font-semibold text-[#101C24] transition-all duration-200 hover:bg-[#d8b87d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F3EA]"
            >
              <span>Explore the ${BUNDLE_CONFIG.bundlePrice.toFixed(2)} Bundle</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
