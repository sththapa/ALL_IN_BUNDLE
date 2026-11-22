import { ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/brand';
import { MERCHANT_POLICIES } from '../data/policies';
import { PRODUCTS, type ProductGuide } from '../data/products';
import { SOCIAL_LINKS } from '../data/socialLinks';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectProduct: (product: ProductGuide) => void;
}

export function Footer({ onNavigateSection, onSelectProduct }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const configuredSocials = SOCIAL_LINKS.filter((s) => Boolean(s.url));

  return (
    <footer className="border-t border-white/10 bg-[#101C24] text-[#F7F3EA]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Summary */}
          <div className="md:col-span-4">
            <p className="font-editorial text-2xl font-semibold tracking-[0.14em] text-[#FFFFFF]">
              {BRAND_INFO.name}
            </p>
            <p className="mt-2 text-sm font-medium text-[#C8A467]">
              {BRAND_INFO.tagline}
            </p>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[#F7F3EA]/70">
              {BRAND_INFO.supportingMessage} Practical Thailand travel PDF guides and
              essential Thai language cheat sheets for confident journeys.
            </p>
          </div>

          {/* The Five Guides */}
          <div className="md:col-span-4">
            <h3 className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#C8A467]">
              Travel Guides
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="text-left text-[#F7F3EA]/75 transition-colors hover:text-[#FFFFFF]"
                  >
                    {product.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Storefront Navigation & Fulfillment */}
          <div className="md:col-span-4">
            <h3 className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#C8A467]">
              Collection &amp; Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F7F3EA]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('cheat-sheets')}
                  className="hover:text-[#FFFFFF]"
                >
                  42 Thailand Cheat Sheets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('bundle')}
                  className="hover:text-[#FFFFFF]"
                >
                  Complete Collection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('guide-finder')}
                  className="hover:text-[#FFFFFF]"
                >
                  Interactive Guide Finder
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-[#FFFFFF]"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>

            <div className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#F7F3EA]/60">
              <p>
                Fulfillment via {MERCHANT_POLICIES.fulfillmentPlatform} hosted checkout.
              </p>
              {MERCHANT_POLICIES.supportEmail && (
                <p className="mt-1">
                  Support:{' '}
                  <a
                    href={`mailto:${MERCHANT_POLICIES.supportEmail}`}
                    className="text-[#F7F3EA]/85 underline hover:text-[#FFFFFF]"
                  >
                    {MERCHANT_POLICIES.supportEmail}
                  </a>
                </p>
              )}
              {configuredSocials.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {configuredSocials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#F7F3EA]/80 hover:text-[#FFFFFF]"
                    >
                      <span>{s.platform}</span>
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#F7F3EA]/55 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {BRAND_INFO.name}. All rights reserved.
          </p>
          <p>
            Digital PDF Travel Resources · {MERCHANT_POLICIES.currencyCode} Pricing
          </p>
        </div>
      </div>
    </footer>
  );
}
