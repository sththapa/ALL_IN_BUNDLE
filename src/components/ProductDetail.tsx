import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Eye,
  FileText,
  Smartphone,
} from 'lucide-react';
import { BUNDLE_CONFIG } from '../data/bundle';
import { getProductCheckoutUrl } from '../data/checkoutUrls';
import { PRODUCTS, type ProductGuide } from '../data/products';
import { BookMockup } from './BookMockup';
import { CheckoutButton, type CheckoutSetupPayload } from './CheckoutButton';
import type { PreviewModalContext } from './PreviewModal';

interface ProductDetailProps {
  product: ProductGuide;
  onBack: () => void;
  onSelectProduct: (product: ProductGuide) => void;
  onOpenPreview: (context: PreviewModalContext) => void;
  onCheckoutSetupNeeded: (payload: CheckoutSetupPayload) => void;
  onJumpToBundle: () => void;
}

export function ProductDetail({
  product,
  onBack,
  onSelectProduct,
  onOpenPreview,
  onCheckoutSetupNeeded,
  onJumpToBundle,
}: ProductDetailProps) {
  const checkoutUrl = getProductCheckoutUrl(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const openSamplePreview = (initialIndex = 0) => {
    onOpenPreview({
      kind: 'product',
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      checkoutUrl,
      pages: product.samplePages,
      initialIndex,
    });
  };

  return (
    <main className="bg-[#F7F3EA] pb-24 text-[#101C24]">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#101C24]/10 bg-[#FFFFFF]/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-[#101C24]/80 transition-colors hover:text-[#101C24] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101C24] rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to All Guides</span>
          </button>

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs text-[#101C24]/60">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-[#101C24]"
            >
              Collection
            </button>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-[#101C24]">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Contiguous Purchase Module (Left: 3D Cover Gallery, Right: Purchase Details) */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Large Cover Preview + Sample Pages Trigger */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#101C24]/10 bg-[#EFEAE0] px-6 py-12 sm:py-16">
              <BookMockup product={product} size="lg" interactive={false} />

              <button
                type="button"
                onClick={() => openSamplePreview(0)}
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#101C24]/20 bg-[#FFFFFF] px-5 py-2.5 text-sm font-medium text-[#101C24] shadow-sm transition-colors hover:bg-[#F7F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101C24]"
              >
                <Eye className="h-4 w-4 text-[#547D78]" aria-hidden="true" />
                <span>
                  {product.samplePages.length > 0
                    ? `Preview Sample Pages (${product.samplePages.length})`
                    : 'View Sample Preview'}
                </span>
              </button>
            </div>

            {/* Sample Page Thumbnails or Honest Coming Soon Slot */}
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#101C24]/60">
                Sample Pages
              </p>
              {product.samplePages.length > 0 ? (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {product.samplePages.map((page, index) => (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => openSamplePreview(index)}
                      className="overflow-hidden rounded-lg border border-[#101C24]/15 bg-[#FFFFFF] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101C24]"
                    >
                      <img
                        src={page.imageUrl}
                        alt={page.alt}
                        referrerPolicy="no-referrer"
                        className="aspect-[3/4] w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openSamplePreview(0)}
                  className="mt-3 flex w-full items-center justify-between rounded-xl border border-dashed border-[#101C24]/20 bg-[#FFFFFF]/60 px-4 py-3.5 text-left text-xs text-[#101C24]/75 transition-colors hover:bg-[#FFFFFF]"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-[#547D78]" aria-hidden="true" />
                    <span>Preview Coming Soon — Click to open sample viewer</span>
                  </span>
                  <span className="font-medium text-[#17343B]">Inspect</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Title, Price, Checkout CTA, Who It's For, Verified Contents */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[#547D78]">
              Guide {product.number} · {product.label}
            </div>

            <h1 className="mt-3 font-editorial text-4xl font-semibold leading-[1.08] tracking-tight text-[#101C24] sm:text-5xl">
              {product.title}
            </h1>

            <p className="mt-3 text-lg font-medium text-[#17343B]">
              {product.subtitle}
            </p>

            <p className="mt-2 font-editorial text-xl italic text-[#101C24]/75">
              &ldquo;{product.marketingHeadline}&rdquo;
            </p>

            {/* Contiguous Pricing & Checkout Block */}
            <div className="mt-7 rounded-2xl border border-[#101C24]/12 bg-[#FFFFFF] p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs font-medium tracking-[0.12em] uppercase text-[#101C24]/60">
                    Individual Digital Edition
                  </span>
                  <p className="mt-1 text-3xl font-semibold tabular-nums text-[#101C24]">
                    ${product.price.toFixed(2)}{' '}
                    <span className="text-sm font-normal text-[#101C24]/60">USD</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#547D78]">
                  <Smartphone className="h-4 w-4" aria-hidden="true" />
                  <span>Mobile &amp; Offline Ready PDF</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
                <CheckoutButton
                  checkoutUrl={checkoutUrl}
                  productTitle={product.title}
                  price={product.price}
                  variant="primary"
                  size="lg"
                  fullWidth
                  onSetupNeeded={onCheckoutSetupNeeded}
                />
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-[#101C24]/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#101C24]/70">
                  Also included in the Complete Collection (${BUNDLE_CONFIG.bundlePrice.toFixed(2)} for all 5 guides + 42 cheat sheets).
                </p>
                <button
                  type="button"
                  onClick={onJumpToBundle}
                  className="text-left text-xs font-semibold text-[#17343B] underline underline-offset-4 hover:text-[#101C24] whitespace-nowrap shrink-0"
                >
                  Compare Bundle Value
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="mt-10 space-y-4">
              <h2 className="font-editorial text-2xl font-semibold text-[#101C24]">
                About This Guide
              </h2>
              <p className="text-base leading-relaxed text-[#101C24]/80">
                {product.description}
              </p>

              {product.safetyNote && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#C8A467]/40 bg-[#FFFFFF] p-4 text-sm leading-relaxed text-[#101C24]/85">
                  <AlertCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#C8A467]"
                    aria-hidden="true"
                  />
                  <p>{product.safetyNote}</p>
                </div>
              )}
            </div>

            {/* Who This Guide Is For */}
            <div className="mt-10 border-t border-[#101C24]/10 pt-8">
              <h2 className="font-editorial text-2xl font-semibold text-[#101C24]">
                Who This Guide Is For
              </h2>
              <ul className="mt-4 space-y-3">
                {product.whoItIsFor.map((audience) => (
                  <li key={audience} className="flex items-start gap-3 text-sm sm:text-base text-[#101C24]/85">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#547D78]"
                      aria-hidden="true"
                    />
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Contents (Strictly Seller-Configured Only) */}
            <div className="mt-10 border-t border-[#101C24]/10 pt-8">
              <h2 className="font-editorial text-2xl font-semibold text-[#101C24]">
                Verified Contents
              </h2>
              {product.verifiedContents && product.verifiedContents.length > 0 ? (
                <ol className="mt-4 space-y-2.5 text-sm sm:text-base text-[#101C24]/85">
                  {product.verifiedContents.map((chapter, idx) => (
                    <li key={chapter} className="flex items-baseline gap-3">
                      <span className="text-xs font-semibold tabular-nums text-[#547D78]">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span>{chapter}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#101C24]/10 bg-[#FFFFFF]/70 p-4 text-sm leading-relaxed text-[#101C24]/75">
                  <BookOpen
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#547D78]"
                    aria-hidden="true"
                  />
                  <p>
                    The detailed chapter and topic index will appear here once the
                    creator uploads the verified contents list for this edition.
                  </p>
                </div>
              )}
            </div>

            {/* Product-Specific FAQs */}
            <div className="mt-10 border-t border-[#101C24]/10 pt-8">
              <h2 className="font-editorial text-2xl font-semibold text-[#101C24]">
                Guide Questions
              </h2>
              <div className="mt-4 divide-y divide-[#101C24]/10 rounded-xl border border-[#101C24]/10 bg-[#FFFFFF]">
                {product.productFaqs.map((item) => (
                  <div key={item.question} className="p-5">
                    <h3 className="font-sans text-sm sm:text-base font-semibold text-[#101C24]">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#101C24]/75">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="mx-auto mt-20 max-w-7xl border-t border-[#101C24]/10 px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-editorial text-3xl font-semibold text-[#101C24]">
            Related Thailand Guides
          </h2>
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-[#17343B] underline underline-offset-4 hover:text-[#101C24]"
          >
            View all 5 guides
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {relatedProducts.map((related) => (
            <button
              key={related.id}
              type="button"
              onClick={() => onSelectProduct(related)}
              className="group flex items-center gap-4 rounded-xl border border-[#101C24]/10 bg-[#FFFFFF] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101C24]"
            >
              <div className="shrink-0">
                <BookMockup product={related} size="sm" className="!w-20 sm:!w-24" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#547D78]">
                  {related.label}
                </p>
                <h3 className="mt-1 font-editorial text-xl font-semibold leading-snug text-[#101C24] group-hover:text-[#17343B]">
                  {related.title}
                </h3>
                <p className="mt-2 text-sm font-semibold tabular-nums text-[#101C24]">
                  ${related.price.toFixed(2)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
