import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faq';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="bg-[#F7F3EA] py-20 sm:py-24 lg:py-28 text-[#101C24]"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#547D78]">
            Practical Details
          </p>
          <h2 className="mt-3 font-editorial text-3xl font-semibold tracking-tight text-[#101C24] sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#101C24]/75">
            Clear answers on PDF formats, mobile offline access, and digital delivery.
          </p>
        </div>

        <div className="mt-12 divide-y divide-[#101C24]/12 rounded-2xl border border-[#101C24]/12 bg-[#FFFFFF]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F7F3EA]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#101C24] sm:px-7"
                  >
                    <span className="font-sans text-base font-semibold text-[#101C24]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#547D78] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-6 pt-0 text-sm leading-relaxed text-[#101C24]/80 sm:px-7 sm:text-base"
                  >
                    <p>{item.answer}</p>
                    {item.isPolicyConfigurable && (
                      <p className="mt-2 text-xs font-medium text-[#547D78]">
                        Configurable in merchant policies prior to store launch.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
