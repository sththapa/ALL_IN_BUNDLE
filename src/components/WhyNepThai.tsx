import { useState } from 'react';
import { ArrowUpRight, Compass, Users } from 'lucide-react';
import { BRAND_INFO } from '../data/brand';
import { SITE_MEDIA } from '../data/productAssets';
import { SOCIAL_LINKS } from '../data/socialLinks';

export function WhyNepThai() {
  const [imgError, setImgError] = useState(false);
  const configuredSocials = SOCIAL_LINKS.filter((s) => Boolean(s.url));

  return (
    <section
      id="why-nepthai"
      className="bg-[#FFFFFF] py-20 sm:py-24 lg:py-28 text-[#101C24]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Authentic Editorial Thailand Photography */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-[#101C24]/10 bg-[#17343B]">
              {!imgError ? (
                <img
                  src={SITE_MEDIA.whyNepThai.url}
                  alt={SITE_MEDIA.whyNepThai.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover lg:absolute lg:inset-0"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-[#101C24] to-[#17343B] p-8 text-center">
                  <Compass className="h-10 w-10 text-[#C8A467]/60" aria-hidden="true" />
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101C24]/60 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 text-xs tracking-wide text-[#F7F3EA]/90">
                <p className="font-medium">{BRAND_INFO.tagline}</p>
                <p className="mt-0.5 text-[#F7F3EA]/70">{BRAND_INFO.supportingMessage}</p>
              </div>
            </div>
          </div>

          {/* Right: Authentic Brand Story & Configurable Creator / Community Slots */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#547D78]">
                Why NEPTHAI
              </p>

              <h2 className="mt-3 font-editorial text-3xl font-semibold leading-[1.12] tracking-tight text-[#101C24] sm:text-4xl lg:text-[2.75rem]">
                {BRAND_INFO.storyHeadline}
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#101C24]/80">
                {BRAND_INFO.storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Configurable Creator Introduction & Verified Metrics Grid */}
            <div className="mt-10 space-y-6 border-t border-[#101C24]/10 pt-8">
              {/* Creator Slot */}
              <div className="rounded-xl border border-[#101C24]/10 bg-[#F7F3EA]/75 p-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#547D78]">
                  Creator Note
                </p>
                {BRAND_INFO.creatorSection.name ? (
                  <div className="mt-2">
                    <p className="font-editorial text-xl font-semibold text-[#101C24]">
                      {BRAND_INFO.creatorSection.name}
                      {BRAND_INFO.creatorSection.role && (
                        <span className="ml-2 font-sans text-xs font-medium text-[#101C24]/60">
                          · {BRAND_INFO.creatorSection.role}
                        </span>
                      )}
                    </p>
                    {BRAND_INFO.creatorSection.bio && (
                      <p className="mt-2 text-sm leading-relaxed text-[#101C24]/75">
                        {BRAND_INFO.creatorSection.bio}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-[#101C24]/70">
                    Creator biography and authentic community notes are configurable
                    in brand settings and appear here once provided.
                  </p>
                )}
              </div>

              {/* Real Collection / Audience Metrics (Zero Fake Numbers) */}
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {BRAND_INFO.audienceStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#101C24]/10 bg-[#FFFFFF] p-4"
                  >
                    <dt className="text-xs font-medium text-[#101C24]/65">
                      {stat.label}
                    </dt>
                    <dd className="mt-1.5 font-editorial text-2xl font-semibold tabular-nums text-[#101C24]">
                      {stat.value ?? 'Configurable'}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Verified Community Milestones & Social Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#101C24]/70">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#547D78]" aria-hidden="true" />
                  <span>
                    {BRAND_INFO.communityMilestones &&
                    BRAND_INFO.communityMilestones.length > 0
                      ? BRAND_INFO.communityMilestones.join(' · ')
                      : 'Verified community milestones appear here as they are published.'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {configuredSocials.length > 0 ? (
                    configuredSocials.map((social) => (
                      <a
                        key={social.id}
                        href={social.url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-[#101C24] hover:text-[#17343B] underline underline-offset-4"
                      >
                        <span>{social.platform}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ))
                  ) : (
                    <span className="text-[#101C24]/55">
                      Social channels configurable in socialLinks.ts
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
