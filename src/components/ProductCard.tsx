import { Eye } from 'lucide-react';
import { getProductCheckoutUrl } from '../data/checkoutUrls';
import type { ProductGuide } from '../data/products';
import { BookMockup } from './BookMockup';
import { CheckoutButton, type CheckoutSetupPayload } from './CheckoutButton';

interface ProductCardProps {
  product: ProductGuide;
  onViewDetails: (product: ProductGuide) => void;
  onCheckoutSetupNeeded: (payload: CheckoutSetupPayload) => void;
}

export function ProductCard({
  product,
  onViewDetails,
  onCheckoutSetupNeeded,
}: ProductCardProps) {
  const checkoutUrl = getProductCheckoutUrl(product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#101C24]/12 bg-[#FFFFFF] transition-all duration-200 hover:-translate-y-1 hover:border-[#C8A467]/45 hover:shadow-[0_24px_48px_-18px_rgba(16,28,36,0.2)]">
      {/* Gallery Plinth Stage */}
      <button
        type="button"
        onClick={() => onViewDetails(product)}
        aria-label={`View details for ${product.title}`}
        className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#ECE6D9] to-[#E2DACB] px-6 py-11 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#101C24]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#101C24]/10"
        />
        <BookMockup product={product} size="md" />
      </button>

      {/* Editorial Product Body */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#547D78]">
            <span>
              {product.number} · {product.label}
            </span>
            <span className="tabular-nums text-[#101C24]/55">Digital PDF</span>
          </div>

          <h3 className="mt-2.5 font-editorial text-2xl font-semibold leading-snug text-[#101C24]">
            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="text-left transition-colors hover:text-[#17343B] focus:outline-none focus-visible:underline"
            >
              {product.title}
            </button>
          </h3>

          <p className="mt-1.5 text-sm font-medium leading-snug text-[#17343B]">
            {product.subtitle}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-[#101C24]/75">
            {product.description}
          </p>
        </div>

        {/* Baseline Price + Actions */}
        <div className="mt-6 border-t border-[#101C24]/10 pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#101C24]/55">
              Standalone Guide
            </span>
            <span className="text-xl font-semibold tabular-nums text-[#101C24]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-start">
            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#101C24]/20 bg-transparent px-4 py-2.5 text-sm font-medium text-[#101C24] whitespace-nowrap transition-colors hover:bg-[#F7F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101C24]"
            >
              <Eye className="h-4 w-4 text-[#547D78]" aria-hidden="true" />
              <span>View Details</span>
            </button>

            <div className="flex-1">
              <CheckoutButton
                checkoutUrl={checkoutUrl}
                productTitle={product.title}
                price={product.price}
                variant="primary"
                size="md"
                fullWidth
                showSetupHint={false}
                onSetupNeeded={onCheckoutSetupNeeded}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
