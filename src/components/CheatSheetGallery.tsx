import { useMemo, useState } from 'react';
import { Eye, FileText, Lock, Unlock } from 'lucide-react';
import { BUNDLE_CONFIG } from '../data/bundle';
import {
  CHEAT_SHEETS,
  CHEAT_SHEET_COUNT,
  getCheatSheetCategories,
  type CheatSheetEntry,
} from '../data/cheatSheets';
import { getBundleCheckoutUrl } from '../data/checkoutUrls';
import { CheckoutButton, type CheckoutSetupPayload } from './CheckoutButton';
import type { PreviewModalContext } from './PreviewModal';

interface CheatSheetGalleryProps {
  onOpenPreview: (context: PreviewModalContext) => void;
  onCheckoutSetupNeeded: (payload: CheckoutSetupPayload) => void;
}

type RangeFilter = 'all' | '1-14' | '15-28' | '29-42';

export function CheatSheetGallery({
  onOpenPreview,
  onCheckoutSetupNeeded,
}: CheatSheetGalleryProps) {
  const categories = useMemo(() => getCheatSheetCategories(CHEAT_SHEETS), []);
  const hasCategories = categories.length > 0;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('all');
  const [previewUnlockedState, setPreviewUnlockedState] = useState(false);

  const visibleSheets = useMemo(() => {
    if (hasCategories) {
      if (selectedCategory === 'all') return CHEAT_SHEETS;
      return CHEAT_SHEETS.filter((s) => s.category === selectedCategory);
    }

    switch (rangeFilter) {
      case '1-14':
        return CHEAT_SHEETS.filter((s) => s.index >= 1 && s.index <= 14);
      case '15-28':
        return CHEAT_SHEETS.filter((s) => s.index >= 15 && s.index <= 28);
      case '29-42':
        return CHEAT_SHEETS.filter((s) => s.index >= 29 && s.index <= 42);
      default:
        return CHEAT_SHEETS;
    }
  }, [hasCategories, rangeFilter, selectedCategory]);

  const handleInspectSheet = (sheet: CheatSheetEntry) => {
    const initialIndex = CHEAT_SHEETS.findIndex((s) => s.index === sheet.index);
    onOpenPreview({
      kind: 'cheatSheet',
      sheets: CHEAT_SHEETS,
      initialIndex: Math.max(0, initialIndex),
      bundlePrice: BUNDLE_CONFIG.bundlePrice,
      bundleCheckoutUrl: getBundleCheckoutUrl(),
    });
  };

  return (
    <section
      id="cheat-sheets"
      className="bg-[#101C24] py-20 sm:py-24 lg:py-28 text-[#F7F3EA]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Intro & Prominent 42 Numeral Lockup */}
        <div className="grid items-end gap-10 border-b border-white/10 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C8A467]">
              Pocket Reference Library
            </p>
            <h2 className="mt-3 font-editorial text-3xl font-semibold tracking-tight text-[#FFFFFF] sm:text-4xl lg:text-5xl">
              {CHEAT_SHEET_COUNT} Little Lifesavers for Thailand.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#F7F3EA]/80 sm:text-lg">
              Quick answers for real moments. Right when you need them.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#F7F3EA]/65">
              Quick-reference sheets help travelers prepare for everyday situations
              without digging through long chapters—ideal for pulling up on your
              phone in a taxi, at a market stall, or before stepping off the plane.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <div className="inline-flex flex-col lg:items-end">
              <span className="font-editorial text-6xl font-semibold leading-none tracking-tight tabular-nums text-[#C8A467] sm:text-7xl">
                {CHEAT_SHEET_COUNT}
              </span>
              <span className="mt-2 text-xs font-medium tracking-[0.16em] uppercase text-[#F7F3EA]/75">
                Dedicated Reference Slots
              </span>
              <span className="mt-1 text-xs text-[#F7F3EA]/55">
                Included in the Complete Collection
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Filter Bar & Preview State Toggle */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {hasCategories ? (
            <div
              role="tablist"
              aria-label="Cheat Sheet Categories"
              className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#17343B]/45 p-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`min-h-[40px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#C8A467] text-[#101C24] font-semibold'
                    : 'text-[#F7F3EA]/75 hover:text-[#FFFFFF]'
                }`}
              >
                All {CHEAT_SHEET_COUNT} Sheets
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[40px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#C8A467] text-[#101C24] font-semibold'
                      : 'text-[#F7F3EA]/75 hover:text-[#FFFFFF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#17343B]/45 p-1.5">
              {(
                [
                  { id: 'all', label: 'All 42 Sheets' },
                  { id: '1-14', label: 'Sheets 01–14' },
                  { id: '15-28', label: 'Sheets 15–28' },
                  { id: '29-42', label: 'Sheets 29–42' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRangeFilter(tab.id)}
                  className={`min-h-[40px] rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    rangeFilter === tab.id
                      ? 'bg-[#C8A467] text-[#101C24] font-semibold'
                      : 'text-[#F7F3EA]/75 hover:text-[#FFFFFF]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Locked / Unlocked Visual State Preview Switch */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs text-[#F7F3EA]/60">Preview state:</span>
            <div className="inline-flex rounded-lg border border-white/10 bg-[#17343B]/45 p-1">
              <button
                type="button"
                onClick={() => setPreviewUnlockedState(false)}
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  !previewUnlockedState
                    ? 'bg-[#101C24] text-[#FFFFFF]'
                    : 'text-[#F7F3EA]/65 hover:text-[#FFFFFF]'
                }`}
              >
                <Lock className="h-3.5 w-3.5 text-[#C8A467]" aria-hidden="true" />
                <span>Locked</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewUnlockedState(true)}
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  previewUnlockedState
                    ? 'bg-[#547D78] text-[#FFFFFF]'
                    : 'text-[#F7F3EA]/65 hover:text-[#FFFFFF]'
                }`}
              >
                <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Member View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Note when Titles/Categories are Awaiting Seller Upload */}
        {!hasCategories && (
          <p className="mt-4 text-xs text-[#F7F3EA]/60">
            Category filters activate automatically once individual sheet metadata is
            supplied. Select any miniature card below to inspect the slot.
          </p>
        )}

        {/* Mobile Horizontal Browse Hint */}
        <p className="mt-6 text-xs font-medium text-[#C8A467] sm:hidden">
          Swipe horizontally to browse · Tap any card to enlarge
        </p>

        {/* Interactive Miniature Gallery */}
        <div className="mt-4 sm:mt-8 flex gap-3.5 overflow-x-auto pb-4 no-scrollbar sm:grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 sm:gap-4 sm:overflow-visible sm:pb-0">
          {visibleSheets.map((sheet) => {
            const isSheetUnlocked = previewUnlockedState || !sheet.isLocked;
            return (
              <button
                key={sheet.code}
                type="button"
                onClick={() => handleInspectSheet(sheet)}
                aria-label={`Inspect ${sheet.title ?? sheet.code}`}
                className="group relative flex w-36 shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/12 bg-[#17343B]/45 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8A467]/50 hover:bg-[#17343B]/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] sm:w-auto aspect-[3/4]"
              >
                {sheet.previewImageUrl ? (
                  <>
                    <img
                      src={sheet.previewImageUrl}
                      alt={sheet.title ?? sheet.code}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-200 ${
                        isSheetUnlocked ? 'opacity-90' : 'opacity-45 blur-[1px]'
                      }`}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#101C24]/95 via-[#101C24]/40 to-[#101C24]/50"
                    />
                  </>
                ) : (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-lg border border-white/8"
                  />
                )}

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] uppercase tabular-nums text-[#C8A467]">
                    {String(sheet.index).padStart(2, '0')}
                  </span>
                  {isSheetUnlocked ? (
                    <Unlock
                      className="h-3.5 w-3.5 text-[#547D78]"
                      aria-label="Unlocked state"
                    />
                  ) : (
                    <Lock
                      className="h-3.5 w-3.5 text-[#F7F3EA]/45"
                      aria-label="Included in bundle"
                    />
                  )}
                </div>

                <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2 text-center">
                  <FileText
                    className="h-5 w-5 text-[#F7F3EA]/35 transition-colors group-hover:text-[#C8A467]"
                    aria-hidden="true"
                  />
                  <span className="mt-2 text-[10px] font-medium tracking-wide text-[#F7F3EA]/65">
                    {sheet.previewImageUrl
                      ? 'Tap to enlarge'
                      : 'Placeholder Slot'}
                  </span>
                </div>

                <div className="relative z-10 border-t border-white/10 pt-2">
                  <p className="truncate text-xs font-medium text-[#FFFFFF]">
                    {sheet.title ?? sheet.code}
                  </p>
                  <p className="mt-0.5 flex items-center justify-between text-[10px] text-[#F7F3EA]/55">
                    <span className="truncate">
                      {sheet.category ?? (isSheetUnlocked ? 'Ready on Gumroad' : 'Ready for Upload')}
                    </span>
                    <Eye
                      className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 text-[#C8A467]"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Collection Delivery & Bundle Access Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#C8A467]/35 bg-gradient-to-r from-[#17343B]/65 to-[#101C24] p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C8A467]">
              Protected Digital Fulfillment · All-in-One ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}
            </p>
            <h3 className="mt-1.5 font-editorial text-2xl font-semibold text-[#FFFFFF]">
              All {CHEAT_SHEET_COUNT} Cheat Sheets Are Delivered Securely With the Complete Collection
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#F7F3EA]/75">
              Download files remain protected behind hosted merchant checkout and are
              never exposed publicly.
            </p>
          </div>

          <div className="shrink-0">
            <CheckoutButton
              checkoutUrl={getBundleCheckoutUrl()}
              productTitle="Complete Thailand Travel Collection"
              price={BUNDLE_CONFIG.bundlePrice}
              isBundle
              label="Get All 42 + 5 Guides"
              variant="gold"
              size="md"
              onSetupNeeded={onCheckoutSetupNeeded}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
