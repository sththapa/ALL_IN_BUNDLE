import { useEffect } from 'react';
import { Lock, ShieldCheck, X } from 'lucide-react';
import type { CheckoutSetupPayload } from './CheckoutButton';
import { CHECKOUT_URLS } from '../data/checkoutUrls';
import { MERCHANT_POLICIES } from '../data/policies';

interface CheckoutSetupModalProps {
  payload: CheckoutSetupPayload | null;
  onClose: () => void;
}

export function CheckoutSetupModal({ payload, onClose }: CheckoutSetupModalProps) {
  useEffect(() => {
    if (!payload) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [payload, onClose]);

  if (!payload) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101C24]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-setup-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#101C24]/10 bg-[#FFFFFF] p-6 sm:p-8 text-[#101C24] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#101C24]/60 transition-colors hover:bg-[#F7F3EA] hover:text-[#101C24] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101C24]"
          aria-label="Close checkout notice"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.12em] uppercase text-[#547D78]">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Hosted Checkout Configuration</span>
        </div>

        <h3
          id="checkout-setup-title"
          className="mt-3 font-editorial text-2xl sm:text-3xl font-semibold text-[#101C24]"
        >
          {payload.title}
        </h3>

        <p className="mt-1 text-base font-semibold tabular-nums text-[#17343B]">
          ${payload.price.toFixed(2)} USD · Digital PDF{' '}
          {payload.isBundle ? 'Collection' : 'Guide'}
        </p>

        <div className="mt-5 space-y-3 rounded-xl border border-[#101C24]/10 bg-[#F7F3EA] p-4 text-sm leading-relaxed text-[#101C24]/85">
          <p>
            This storefront uses {CHECKOUT_URLS.providerName} hosted checkout for
            secure payment processing and automatic digital file delivery.
          </p>
          <p>
            A live {CHECKOUT_URLS.providerName} checkout URL has not yet been
            connected for this item, so no payment can be initiated from this
            preview state.
          </p>
        </div>

        <div className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-[#101C24]/70">
          <ShieldCheck
            className="mt-0.5 h-4 w-4 shrink-0 text-[#547D78]"
            aria-hidden="true"
          />
          <div>
            <p>{MERCHANT_POLICIES.deliverySummary}</p>
            {MERCHANT_POLICIES.supportEmail && (
              <p className="mt-1">
                Need assistance? Contact{' '}
                <a
                  href={`mailto:${MERCHANT_POLICIES.supportEmail}`}
                  className="underline hover:text-[#101C24]"
                >
                  {MERCHANT_POLICIES.supportEmail}
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#101C24] px-5 py-2.5 text-sm font-medium text-[#FFFFFF] transition-colors hover:bg-[#17343B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A467]"
          >
            Return to Storefront
          </button>
        </div>
      </div>
    </div>
  );
}
