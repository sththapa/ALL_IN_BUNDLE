import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { ProductGuide } from '../data/products';

interface BookMockupProps {
  product: ProductGuide;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
}

export function BookMockup({
  product,
  size = 'md',
  className = '',
  interactive = true,
}: BookMockupProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-36 sm:w-40 aspect-[3/4]',
    md: 'w-48 sm:w-56 aspect-[3/4]',
    lg: 'w-60 sm:w-72 md:w-80 aspect-[3/4]',
  }[size];

  const titleClasses = {
    sm: 'text-sm leading-[1.1]',
    md: 'text-[1.22rem] sm:text-[1.35rem] leading-[1.08]',
    lg: 'text-2xl sm:text-[1.85rem] leading-[1.06]',
  }[size];

  return (
    <div className={`book-stage relative select-none ${sizeClasses} ${className}`}>
      {/* Deep Studio Ambient Penumbra & Contact Floor Shadows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 left-2 -right-2 h-8 rounded-full bg-[#080E12]/45 blur-xl transition-transform duration-200 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 left-4 right-1 h-3 rounded-full bg-[#050A0D]/55 blur-sm"
      />

      {/* Right-Edge Recessed Multi-Layered Paper Page Block */}
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 -right-2.5 w-3 rounded-r-[4px] border-y border-r border-[#101C24]/25 bg-[repeating-linear-gradient(90deg,#F5F0E4_0px,#F5F0E4_1px,#D8CEBA_1px,#D8CEBA_2px)] shadow-[inset_3px_0_6px_rgba(16,28,36,0.28),4px_6px_14px_rgba(8,14,18,0.28)]"
      />

      {/* Bottom Board Overhang & Page Edge */}
      <div
        aria-hidden="true"
        className="absolute -bottom-1.5 left-2 right-0 h-2 rounded-b-[3px] border-x border-b border-[#101C24]/20 bg-gradient-to-b from-[#EDE6D6] via-[#DDD2BE] to-[#C8BAA0] shadow-[0_4px_10px_rgba(8,14,18,0.3)]"
      />

      {/* Hardcover Monograph Front Board */}
      <div
        className={`book-volume relative h-full w-full overflow-hidden rounded-r-[6px] rounded-l-[2px] border border-[#C8A467]/40 ring-1 ring-inset ring-white/20 ${
          interactive ? 'book-volume-interactive' : ''
        }`}
        style={{ backgroundColor: product.coverTheme.surface }}
      >
        {/* High-Resolution Luxury Cover Photography */}
        {!imgError ? (
          <img
            src={product.coverImageUrl}
            alt={product.coverImageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(155deg, ${product.coverTheme.surface} 0%, #17343B 100%)`,
            }}
          >
            <BookOpen className="h-10 w-10 text-[#C8A467]/40" aria-hidden="true" />
          </div>
        )}

        {/* Editorial Chiaroscuro Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#080F14]/96 via-[#101C24]/30 to-[#101C24]/65"
        />

        {/* Subtle Archival Paper / Linen Micro-Grain Texture */}
        <div
          aria-hidden="true"
          className="book-grain-texture pointer-events-none absolute inset-0"
        />

        {/* Satin Laminate Gloss Overlay */}
        <div
          aria-hidden="true"
          className="book-gloss-overlay pointer-events-none absolute inset-0"
        />

        {/* Dynamic Specular Sheen Sweep on Hover */}
        {interactive && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
        )}

        {/* Realistic 3-Band Book Spine Wrap & French-Groove Hinge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/65 via-white/18 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-3 w-[1.5px] bg-black/50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-3.5 w-[1px] bg-white/18"
        />

        {/* Inner Champagne Gold Foil Border Frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 rounded-[2px] border border-[#C8A467]/50"
        />

        {/* Cover Editorial Typography Lockup */}
        <div className="relative z-10 flex h-full flex-col justify-between p-4 pl-5 sm:p-5 sm:pl-6 text-left">
          <div className="flex items-center justify-between border-b border-[#C8A467]/45 pb-2">
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.26em] uppercase text-[#E9CC95] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              NEPTHAI
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] tabular-nums text-[#F7F3EA]/90">
              VOL. {product.number}
            </span>
          </div>

          <div className="space-y-1.5 pt-2">
            <p className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.18em] uppercase text-[#D6B477] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {product.label}
            </p>
            <h4
              className={`font-editorial font-semibold tracking-tight text-[#FFFFFF] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] ${titleClasses}`}
            >
              {product.title}
            </h4>
            {size === 'lg' && (
              <p className="line-clamp-2 pt-1 text-xs leading-relaxed text-[#F7F3EA]/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]">
                {product.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
