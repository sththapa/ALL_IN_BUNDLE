import { useCallback, useEffect, useState } from 'react';
import { BundleSection } from './components/BundleSection';
import type { CheckoutSetupPayload } from './components/CheckoutButton';
import { CheckoutSetupModal } from './components/CheckoutSetupModal';
import { CheatSheetGallery } from './components/CheatSheetGallery';
import { FAQSection } from './components/FAQSection';
import { FinalConversionSection } from './components/FinalConversionSection';
import { Footer } from './components/Footer';
import { GuideFinder } from './components/GuideFinder';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PreviewModal, type PreviewModalContext } from './components/PreviewModal';
import { ProductCollection } from './components/ProductCollection';
import { ProductDetail } from './components/ProductDetail';
import { WhyNepThai } from './components/WhyNepThai';
import { getProductById, type ProductGuide } from './data/products';

const DEFAULT_TITLE = 'NEPTHAI — Thailand Travel PDF Guides & Thai Cheat Sheets';

function resolveProductFromHash(): ProductGuide | null {
  const hash = window.location.hash;
  if (hash.startsWith('#guide/')) {
    const slug = hash.slice('#guide/'.length);
    return getProductById(slug) ?? null;
  }
  return null;
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductGuide | null>(() =>
    resolveProductFromHash()
  );
  const [activeSection, setActiveSection] = useState<string>('guides');
  const [previewContext, setPreviewContext] = useState<PreviewModalContext | null>(null);
  const [checkoutSetupPayload, setCheckoutSetupPayload] =
    useState<CheckoutSetupPayload | null>(null);

  // Sync browser back/forward hash navigation
  useEffect(() => {
    const onHashChange = () => {
      const matched = resolveProductFromHash();
      setSelectedProduct(matched);
      if (matched) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Update SEO document title on view changes
  useEffect(() => {
    document.title = selectedProduct
      ? `${selectedProduct.title} — NEPTHAI`
      : DEFAULT_TITLE;
  }, [selectedProduct]);

  // Track active section in viewport for clean header underline feedback
  useEffect(() => {
    if (selectedProduct) return;

    const sectionIds = ['guides', 'cheat-sheets', 'bundle', 'guide-finder', 'faq'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedProduct]);

  const handleSelectProduct = useCallback((product: ProductGuide) => {
    window.history.pushState(null, '', `#guide/${product.slug}`);
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoHome = useCallback(() => {
    if (window.location.hash.startsWith('#guide/')) {
      window.history.pushState(null, '', '#top');
    }
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    setSelectedProduct(null);
    window.history.replaceState(null, '', `#${sectionId}`);
    setActiveSection(sectionId);

    requestAnimationFrame(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F7F3EA] text-[#101C24]">
      <Header
        activeSection={activeSection}
        isDetailView={Boolean(selectedProduct)}
        onNavigateSection={handleNavigateSection}
        onGoHome={handleGoHome}
      />

      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={() => handleNavigateSection('guides')}
          onSelectProduct={handleSelectProduct}
          onOpenPreview={setPreviewContext}
          onCheckoutSetupNeeded={setCheckoutSetupPayload}
          onJumpToBundle={() => handleNavigateSection('bundle')}
        />
      ) : (
        <main>
          <HeroSection
            onExploreCollection={() => handleNavigateSection('bundle')}
            onDiscoverInside={() => handleNavigateSection('guides')}
            onSelectProduct={handleSelectProduct}
          />

          <ProductCollection
            onViewDetails={handleSelectProduct}
            onCheckoutSetupNeeded={setCheckoutSetupPayload}
            onJumpToBundle={() => handleNavigateSection('bundle')}
          />

          <CheatSheetGallery
            onOpenPreview={setPreviewContext}
            onCheckoutSetupNeeded={setCheckoutSetupPayload}
          />

          <BundleSection
            onSelectProduct={handleSelectProduct}
            onCheckoutSetupNeeded={setCheckoutSetupPayload}
          />

          <GuideFinder
            onSelectProduct={handleSelectProduct}
            onCheckoutSetupNeeded={setCheckoutSetupPayload}
          />

          <WhyNepThai />

          <FAQSection />

          <FinalConversionSection
            onExploreBundle={() => handleNavigateSection('bundle')}
          />
        </main>
      )}

      <Footer
        onNavigateSection={handleNavigateSection}
        onSelectProduct={handleSelectProduct}
      />

      <PreviewModal
        context={previewContext}
        onClose={() => setPreviewContext(null)}
        onCheckoutSetupNeeded={setCheckoutSetupPayload}
      />

      <CheckoutSetupModal
        payload={checkoutSetupPayload}
        onClose={() => setCheckoutSetupPayload(null)}
      />
    </div>
  );
}
