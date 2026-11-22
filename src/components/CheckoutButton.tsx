import { ArrowUpRight, Lock } from 'lucide-react';
import { CHECKOUT_URLS } from '../data/checkoutUrls';

export interface CheckoutSetupPayload {
  title: string;
  price: number;
  isBundle?: boolean;
}

interface CheckoutButtonProps {
  checkoutUrl: string | null;
  productTitle: string;
  price: number;
  isBundle?: boolean;
  label?: string;
  variant?: 'primary' | 'gold' | 'outline' | 'ivory';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showSetupHint?: boolean;
  onSetupNeeded?: (payload: CheckoutSetupPayload) => void;
  className?: string;
}

export function CheckoutButton({
  checkoutUrl,
  productTitle,
  price,
  isBundle = false,
  label = 'Buy Now',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  showSetupHint = true,
  onSetupNeeded,
  className = '',
}: CheckoutButtonProps) {
  const isConfigured = Boolean(checkoutUrl && checkoutUrl.trim().length > 0);

  const variantStyles = {
    primary:
      'bg-[#101C24] text-[#FFFFFF] hover:bg-[#17343B] border border-[#101C24] focus-visible:ring-[#C8A467]',
    gold:
      'bg-[#C8A467] text-[#101C24] hover:bg-[#d4b378] border border-[#C8A467] font-semibold focus-visible:ring-[#F7F3EA]',
    outline:
      'bg-transparent text-[#101C24] hover:bg-[#101C24]/5 border border-[#101C24]/25 focus-visible:ring-[#101C24]',
    ivory:
      'bg-[#F7F3EA] text-[#101C24] hover:bg-[#FFFFFF] border border-[#F7F3EA] font-semibold focus-visible:ring-[#C8A467]',
  }[variant];

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs min-h-[40px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-7 py-3.5 text-sm sm:text-base min-h-[48px]',
  }[size];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantStyles} ${sizeStyles} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  if (isConfigured && checkoutUrl) {
    return (
      <div className={fullWidth ? 'w-full' : 'inline-flex flex-col items-start'}>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          aria-label={`${label} — ${productTitle} ($${price.toFixed(2)}) via ${CHECKOUT_URLS.providerName}`}
        >
          <span>{label}</span>
          <span className="tabular-nums opacity-85">· ${price.toFixed(2)}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className={fullWidth ? 'w-full' : 'inline-flex flex-col items-start'}>
      <button
        type="button"
        onClick={() =>
          onSetupNeeded?.({
            title: productTitle,
            price,
            isBundle,
          })
        }
        className={baseClasses}
        aria-label={`${label} — ${productTitle} ($${price.toFixed(2)}). Hosted checkout setup pending.`}
      >
        <span>{label}</span>
        <span className="tabular-nums opacity-85">· ${price.toFixed(2)}</span>
        <Lock className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
      </button>
      {showSetupHint && (
        <span className="mt-1.5 text-[11px] leading-snug opacity-70">
          {CHECKOUT_URLS.providerName} checkout URL pending configuration
        </span>
      )}
    </div>
  );
}
