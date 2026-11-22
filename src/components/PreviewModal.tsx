import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Lock,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { SamplePageAsset } from '../data/productAssets';
import type { CheatSheetEntry } from '../data/cheatSheets';
import { CheckoutButton, type CheckoutSetupPayload } from './CheckoutButton';

export type PreviewModalContext =
  | {
      kind: 'product';
      title: string;
      subtitle: string;
      price: number;
      checkoutUrl: string | null;
      pages: SamplePageAsset[];
      initialIndex?: number;
    }
  | {
      kind: 'cheatSheet';
      sheets: CheatSheetEntry[];
      initialIndex: number;
      bundlePrice: number;
      bundleCheckoutUrl: string | null;
    };

interface PreviewModalProps {
  context: PreviewModalContext | null;
  onClose: () => void;
  onCheckoutSetupNeeded: (payload: CheckoutSetupPayload) => void;
}

export function PreviewModal({
  context,
  onClose,
  onCheckoutSetupNeeded,
}: PreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!context) return;
    setCurrentIndex(context.initialIndex ?? 0);
    setZoom(1);
  }, [context]);

  const totalItems = context
    ? context.kind === 'product'
      ? Math.max(1, context.pages.length)
      : context.sheets.length
    : 0;

  const canNavigate = totalItems > 1;

  const goPrev = () => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setZoom(1);
  };

  const goNext = () => {
    if (!canNavigate) return;
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setZoom(1);
  };

  useEffect(() => {
    if (!context) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (!context) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !canNavigate) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > 48) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const activeProductPage =
    context.kind === 'product' && context.pages.length > 0
      ? context.pages[currentIndex]
      : null;

  const activeSheet =
    context.kind === 'cheatSheet' ? context.sheets[currentIndex] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101C24]/85 p-3 sm:p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Document Preview Modal"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#101C24] text-[#F7F3EA] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Toolbar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C8A467]">
              {context.kind === 'product'
                ? activeProductPage
                  ? activeProductPage.label
                  : 'Sample Preview'
                : `${activeSheet?.code ?? 'Cheat Sheet'} of 42`}
            </p>
            <h3 className="truncate font-editorial text-xl sm:text-2xl font-semibold text-[#FFFFFF]">
              {context.kind === 'product'
                ? context.title
                : activeSheet?.title ?? `${activeSheet?.code} — Ready for Upload`}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))))}
              disabled={zoom <= 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#F7F3EA]/80 transition-colors hover:bg-white/10 disabled:opacity-35"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="hidden sm:inline-block min-w-[3.25rem] text-center text-xs tabular-nums text-[#F7F3EA]/75">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2, Number((z + 0.25).toFixed(2))))}
              disabled={zoom >= 2}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#F7F3EA]/80 transition-colors hover:bg-white/10 disabled:opacity-35"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#F7F3EA]/80 transition-colors hover:bg-white/10"
                aria-label="Reset zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#FFFFFF] transition-colors hover:bg-white/20"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Viewport Stage with Mobile Touch Swipe */}
        <div
          className="relative flex flex-1 items-center justify-center overflow-auto bg-[#0B141A] p-4 sm:p-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {canNavigate && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 sm:left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#101C24]/90 text-[#F7F3EA] transition-colors hover:bg-[#17343B]"
              aria-label="Previous preview item"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div
            className="transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {context.kind === 'product' && activeProductPage ? (
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#FFFFFF] shadow-2xl">
                <img
                  src={activeProductPage.imageUrl}
                  alt={activeProductPage.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>
            ) : context.kind === 'cheatSheet' && activeSheet?.previewImageUrl ? (
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#FFFFFF] shadow-2xl">
                <img
                  src={activeSheet.previewImageUrl}
                  alt={activeSheet.title ?? activeSheet.code}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>
            ) : (
              /* Honest "Preview Coming Soon" Placeholder — never fabricates PDF content */
              <div className="flex w-full max-w-md flex-col items-center justify-center rounded-xl border border-[#C8A467]/30 bg-[#17343B]/45 px-8 py-12 text-center shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C8A467]/35 bg-[#101C24]">
                  {context.kind === 'cheatSheet' && activeSheet?.isLocked ? (
                    <Lock className="h-6 w-6 text-[#C8A467]" aria-hidden="true" />
                  ) : (
                    <FileText className="h-6 w-6 text-[#C8A467]" aria-hidden="true" />
                  )}
                </div>

                <p className="mt-5 text-xs font-medium tracking-[0.18em] uppercase text-[#C8A467]">
                  Preview Coming Soon
                </p>

                <h4 className="mt-2 font-editorial text-2xl font-semibold text-[#FFFFFF]">
                  {context.kind === 'product'
                    ? context.title
                    : activeSheet?.title ?? `${activeSheet?.code} Placeholder`}
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-[#F7F3EA]/75">
                  {context.kind === 'product'
                    ? 'Verified sample pages for this guide will appear here as soon as the seller uploads preview spreads. No placeholder pages are fabricated.'
                    : 'This slot represents 1 of the 42 Thailand quick-reference cheat sheets included in the Complete Collection. Protected download files are delivered securely after purchase.'}
                </p>

                {context.kind === 'cheatSheet' && (
                  <div className="mt-5 inline-flex items-center gap-2 text-xs text-[#F7F3EA]/70">
                    <span className="tabular-nums">
                      Slot {String(activeSheet?.index ?? 1).padStart(2, '0')} / 42
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {activeSheet?.category ?? 'Category pending upload'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {canNavigate && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 sm:right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#101C24]/90 text-[#F7F3EA] transition-colors hover:bg-[#17343B]"
              aria-label="Next preview item"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 bg-[#101C24] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3 text-xs text-[#F7F3EA]/70">
            <span className="tabular-nums">
              {currentIndex + 1} / {totalItems}
            </span>
            {canNavigate && (
              <>
                <span aria-hidden="true">·</span>
                <span>Swipe or use arrow keys to browse</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            {context.kind === 'product' ? (
              <CheckoutButton
                checkoutUrl={context.checkoutUrl}
                productTitle={context.title}
                price={context.price}
                variant="gold"
                size="sm"
                showSetupHint={false}
                onSetupNeeded={onCheckoutSetupNeeded}
              />
            ) : (
              <CheckoutButton
                checkoutUrl={context.bundleCheckoutUrl}
                productTitle="Complete Thailand Travel Collection"
                price={context.bundlePrice}
                isBundle
                label="Unlock All 42 in Collection"
                variant="gold"
                size="sm"
                showSetupHint={false}
                onSetupNeeded={onCheckoutSetupNeeded}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
