import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_INFO } from '../data/brand';

interface HeaderProps {
  activeSection: string;
  isDetailView: boolean;
  onNavigateSection: (sectionId: string) => void;
  onGoHome: () => void;
}

const NAV_LINKS = [
  { id: 'guides', label: 'Guides' },
  { id: 'cheat-sheets', label: 'Cheat Sheets' },
  { id: 'bundle', label: 'Bundle' },
  { id: 'guide-finder', label: 'Guide Finder' },
  { id: 'faq', label: 'FAQ' },
];

export function Header({
  activeSection,
  isDetailView,
  onNavigateSection,
  onGoHome,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        isScrolled || isDetailView || mobileMenuOpen
          ? 'border-b border-[#101C24]/10 bg-[#F7F3EA]/95 backdrop-blur-md text-[#101C24]'
          : 'border-b border-white/10 bg-[#101C24]/92 backdrop-blur-md text-[#F7F3EA]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            onGoHome();
          }}
          className="font-editorial text-2xl font-semibold tracking-[0.14em] whitespace-nowrap shrink-0 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] rounded"
        >
          {BRAND_INFO.name}
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const isActive = !isDetailView && activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] rounded ${
                  isActive
                    ? 'text-[#C8A467]'
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#C8A467] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('bundle')}
            className={`hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467] ${
              isScrolled || isDetailView || mobileMenuOpen
                ? 'bg-[#101C24] text-[#FFFFFF] hover:bg-[#17343B]'
                : 'bg-[#C8A467] text-[#101C24] hover:bg-[#d6b57a]'
            }`}
          >
            Complete Collection
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg md:hidden transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-[#101C24]/10 bg-[#F7F3EA] px-4 pb-6 pt-3 text-[#101C24] md:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#101C24]/10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="flex min-h-[48px] items-center justify-between py-2.5 text-base font-medium text-[#101C24] hover:text-[#17343B]"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => handleLinkClick('bundle')}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#101C24] px-5 py-3 text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#17343B]"
            >
              Get the Complete Collection
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
