import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Compass, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { BUNDLE_CONFIG } from '../data/bundle';
import { getBundleCheckoutUrl, getProductCheckoutUrl } from '../data/checkoutUrls';
import { PRODUCTS, type GuideInterestTag, type ProductGuide } from '../data/products';
import { BookMockup } from './BookMockup';
import { CheckoutButton, type CheckoutSetupPayload } from './CheckoutButton';

interface GuideFinderProps {
  onSelectProduct: (product: ProductGuide) => void;
  onCheckoutSetupNeeded: (payload: CheckoutSetupPayload) => void;
}

type TripExperience = 'first-time' | 'returning' | 'long-stay';
type PrimaryConcern = 'arrival' | 'scams' | 'food' | 'language' | 'everyday';
type InterestChoice = GuideInterestTag | 'everything';

interface RecommendationItem {
  product: ProductGuide;
  reason: string;
}

export function GuideFinder({
  onSelectProduct,
  onCheckoutSetupNeeded,
}: GuideFinderProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [experience, setExperience] = useState<TripExperience>('first-time');
  const [concern, setConcern] = useState<PrimaryConcern>('arrival');
  const [interests, setInterests] = useState<InterestChoice[]>(['arrival']);

  const toggleInterest = (choice: InterestChoice) => {
    if (choice === 'everything') {
      setInterests(['everything']);
      return;
    }
    setInterests((prev) => {
      const cleaned = prev.filter((item) => item !== 'everything');
      if (cleaned.includes(choice)) {
        return cleaned.length > 1 ? cleaned.filter((i) => i !== choice) : cleaned;
      }
      return [...cleaned, choice];
    });
  };

  const recommendations = useMemo<{
    recommendBundle: boolean;
    bundleReason: string;
    items: RecommendationItem[];
  }>(() => {
    const wantsEverything = interests.includes('everything');
    const selectedTags = new Set<GuideInterestTag>();

    if (wantsEverything) {
      PRODUCTS.forEach((p) => p.interestTags.forEach((t) => selectedTags.add(t)));
    } else {
      selectedTags.add(concern);
      interests.forEach((i) => {
        if (i !== 'everything') selectedTags.add(i);
      });
      if (experience === 'first-time') {
        selectedTags.add('arrival');
      }
      if (experience === 'long-stay') {
        selectedTags.add('everyday');
      }
    }

    const items: RecommendationItem[] = [];
    for (const product of PRODUCTS) {
      const matches = product.interestTags.some((tag) => selectedTags.has(tag));
      if (!matches) continue;

      let reason = '';
      if (product.id === 'first-72-hours') {
        reason =
          experience === 'first-time'
            ? 'Recommended because you are preparing for your first visit and initial arrival days.'
            : 'Matched to your arrival preparation focus.';
      } else if (product.id === 'survival-bible') {
        reason =
          experience === 'long-stay'
            ? 'Recommended for extended stays, health, local rules, and everyday Thai culture.'
            : 'Matched to your interest in everyday Thailand life and cultural context.';
      } else if (product.id === 'scams-and-mistakes') {
        reason =
          'Matched to your concern about avoiding tourist traps and preparing practical scripts.';
      } else if (product.id === 'food-ordering-kit') {
        reason =
          'Matched to your focus on Thai street food, restaurant ordering, and dietary communication.';
      } else if (product.id === 'essential-thai-words') {
        reason =
          'Matched to your goal of speaking essential everyday Thai words with confidence.';
      }
      items.push({ product, reason });
    }

    const recommendBundle = wantsEverything || items.length >= 2;
    const bundlePriceText = `$${BUNDLE_CONFIG.bundlePrice.toFixed(2)}`;
    const standaloneText = `$${BUNDLE_CONFIG.standaloneTotal.toFixed(2)}`;
    const bundleReason = wantsEverything
      ? `You selected full coverage across all topics—the Complete Collection includes all 5 guides plus 42 cheat sheets for ${bundlePriceText} (saving ${BUNDLE_CONFIG.discountPercentage}% off the ${standaloneText} individual total).`
      : `Since ${items.length} guides match your trip priorities, the Complete Collection (${bundlePriceText}) gives you every guide plus all 42 cheat sheets for less than a single guide.`;

    return { recommendBundle, bundleReason, items };
  }, [concern, experience, interests]);

  const resetQuiz = () => {
    setStep(1);
    setExperience('first-time');
    setConcern('arrival');
    setInterests(['arrival']);
  };

  return (
    <section
      id="guide-finder"
      className="bg-[#F7F3EA] py-20 sm:py-24 lg:py-28 text-[#101C24]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#547D78]">
            Personalized Recommendation
          </p>
          <h2 className="mt-3 font-editorial text-3xl font-semibold tracking-tight text-[#101C24] sm:text-4xl lg:text-5xl">
            Not Sure Where to Start?
          </h2>
          <p className="mt-3 text-base text-[#101C24]/75 sm:text-lg">
            Find the right Thailand guide for your journey.
          </p>
        </motion.div>

        <div className="mt-10 rounded-3xl border border-[#101C24]/10 bg-[#FFFFFF] p-6 sm:p-10 shadow-[0_24px_56px_-24px_rgba(16,28,36,0.14)]">
          {/* Transparent 3-Step Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#101C24]/10 pb-5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#547D78]">
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span className="tabular-nums">
                {step <= 3 ? `Step ${step} of 3` : 'Your Matched Guides'}
              </span>
            </div>

            <div className="flex items-center gap-2" aria-hidden="true">
              {[1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  className={`h-1.5 w-8 rounded-full transition-colors duration-200 ${
                    step >= idx ? 'bg-[#C8A467]' : 'bg-[#101C24]/15'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step 1: First Trip? */}
            {step === 1 && (
              <div className="mt-8">
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#101C24]">
                  1. Is this your first trip to Thailand?
                </h3>
                <p className="mt-2 text-sm text-[#101C24]/70">
                  Your travel stage helps us prioritize arrival basics versus deeper daily life context.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {(
                    [
                      {
                        id: 'first-time',
                        title: 'Yes, first visit',
                        desc: 'I want clear guidance from airport arrival onward.',
                      },
                      {
                        id: 'returning',
                        title: "I've visited before",
                        desc: 'I know the basics and want deeper confidence.',
                      },
                      {
                        id: 'long-stay',
                        title: 'Extended stay or move',
                        desc: 'Planning a longer digital nomad or expat stay.',
                      },
                    ] as const
                  ).map((option) => {
                    const selected = experience === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setExperience(option.id)}
                        className={`flex flex-col items-start rounded-xl border p-5 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101C24] ${
                          selected
                            ? 'border-[#101C24] bg-[#F7F3EA] shadow-sm'
                            : 'border-[#101C24]/12 bg-[#FFFFFF] hover:border-[#101C24]/30'
                        }`}
                      >
                        <span className="text-base font-semibold text-[#101C24]">
                          {option.title}
                        </span>
                        <span className="mt-1.5 text-xs leading-relaxed text-[#101C24]/70">
                          {option.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#101C24] px-6 py-2.5 text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#17343B]"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Biggest Concern */}
            {step === 2 && (
              <div className="mt-8">
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#101C24]">
                  2. What concerns you most?
                </h3>
                <p className="mt-2 text-sm text-[#101C24]/70">
                  Choose the situation where having a practical guide on your phone would help most.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(
                    [
                      { id: 'arrival', label: 'Landing smoothly and navigating the first 72 hours' },
                      { id: 'scams', label: 'Recognizing tourist scams and avoiding costly mistakes' },
                      { id: 'food', label: 'Ordering street food and communicating allergies or spice' },
                      { id: 'language', label: 'Knowing essential Thai words for polite interactions' },
                      { id: 'everyday', label: 'Understanding Thai culture, health, laws, and daily life' },
                    ] as const
                  ).map((option) => {
                    const selected = concern === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setConcern(option.id)}
                        className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-all duration-150 ${
                          selected
                            ? 'border-[#101C24] bg-[#F7F3EA] text-[#101C24]'
                            : 'border-[#101C24]/12 bg-[#FFFFFF] text-[#101C24]/80 hover:border-[#101C24]/30'
                        }`}
                      >
                        <span>{option.label}</span>
                        {selected && (
                          <Check className="h-4 w-4 shrink-0 text-[#547D78]" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#101C24]/20 px-5 py-2.5 text-sm font-medium text-[#101C24] hover:bg-[#F7F3EA]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#101C24] px-6 py-2.5 text-sm font-semibold text-[#FFFFFF] hover:bg-[#17343B]"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Interests Multi-Select */}
            {step === 3 && (
              <div className="mt-8">
                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#101C24]">
                  3. What would you like help with?
                </h3>
                <p className="mt-2 text-sm text-[#101C24]/70">
                  Select one or more topics—or choose Everything for full-trip preparation.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(
                    [
                      { id: 'arrival', label: 'Arrival preparation' },
                      { id: 'scams', label: 'Tourist scams' },
                      { id: 'everyday', label: 'Everyday Thailand life' },
                      { id: 'food', label: 'Thai food' },
                      { id: 'language', label: 'Thai language' },
                      { id: 'everything', label: 'Everything' },
                    ] as const
                  ).map((topic) => {
                    const selected = interests.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => toggleInterest(topic.id)}
                        aria-pressed={selected}
                        className={`flex min-h-[52px] items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-150 ${
                          selected
                            ? 'border-[#101C24] bg-[#101C24] text-[#FFFFFF]'
                            : 'border-[#101C24]/15 bg-[#FFFFFF] text-[#101C24] hover:bg-[#F7F3EA]'
                      }`}
                      >
                        <span>{topic.label}</span>
                        {selected && (
                          <Check className="h-4 w-4 shrink-0 text-[#C8A467]" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#101C24]/20 px-5 py-2.5 text-sm font-medium text-[#101C24] hover:bg-[#F7F3EA]"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C8A467] px-6 py-2.5 text-sm font-semibold text-[#101C24] hover:bg-[#d6b57a]"
                  >
                    <span>See My Recommendations</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Transparent Rule-Based Results */}
            {step === 4 && (
              <div className="mt-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#101C24]">
                      Recommended for Your Trip
                    </h3>
                    <p className="mt-1 text-sm text-[#101C24]/70">
                      Rule-based match from your trip stage, top concern, and selected topics.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex min-h-[40px] items-center gap-1.5 self-start rounded-lg border border-[#101C24]/15 px-3.5 py-2 text-xs font-medium text-[#101C24]/80 hover:bg-[#F7F3EA]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Start Over</span>
                  </button>
                </div>

                {/* Bundle Recommendation Banner when 2+ guides or Everything matched */}
                {recommendations.recommendBundle && (
                  <div className="mt-6 rounded-2xl border border-[#C8A467]/40 bg-[#17343B] p-6 text-[#F7F3EA]">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                      <div className="max-w-xl">
                        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#C8A467]">
                          Best Overall Match · Complete Collection
                        </p>
                        <h4 className="mt-1.5 font-editorial text-2xl font-semibold text-[#FFFFFF]">
                          All 5 Guides + 42 Cheat Sheets for ${BUNDLE_CONFIG.bundlePrice.toFixed(2)}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#F7F3EA]/80">
                          {recommendations.bundleReason}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <CheckoutButton
                          checkoutUrl={getBundleCheckoutUrl()}
                          productTitle="Complete Thailand Travel Collection"
                          price={BUNDLE_CONFIG.bundlePrice}
                          isBundle
                          label="Get Complete Collection"
                          variant="gold"
                          size="md"
                          onSetupNeeded={onCheckoutSetupNeeded}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Individual Matched Guides */}
                <div className="mt-6 space-y-4">
                  {recommendations.items.map(({ product, reason }) => (
                    <div
                      key={product.id}
                      className="flex flex-col justify-between gap-5 rounded-2xl border border-[#101C24]/10 bg-[#F7F3EA]/65 p-5 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:block shrink-0">
                          <BookMockup
                            product={product}
                            size="sm"
                            className="!w-20"
                            interactive={false}
                          />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#547D78]">
                            {product.number} · {product.label}
                          </p>
                          <h4 className="mt-1 font-editorial text-2xl font-semibold text-[#101C24]">
                            {product.title}
                          </h4>
                          <p className="mt-1 text-sm text-[#101C24]/75">{reason}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#101C24]/20 bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#101C24] hover:bg-[#F7F3EA]"
                        >
                          View Details
                        </button>
                        <CheckoutButton
                          checkoutUrl={getProductCheckoutUrl(product.id)}
                          productTitle={product.title}
                          price={product.price}
                          variant="primary"
                          size="md"
                          showSetupHint={false}
                          onSetupNeeded={onCheckoutSetupNeeded}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
