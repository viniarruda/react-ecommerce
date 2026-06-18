import Link from "next/link";

interface Section {
  heading: string;
  content: string | string[];
}

interface StaticPageProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  sections: Section[];
}

export function StaticPage({ title, subtitle, lastUpdated, sections }: StaticPageProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--shop-bg)" }}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link href="/" className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--shop-muted)] hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          ← Home
        </Link>

        <div className="mt-8 mb-12 pb-8 border-b border-[color:var(--shop-border)]">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold text-gray-900 dark:text-gray-50 leading-tight mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-[color:var(--shop-muted)]">{subtitle}</p>
          )}
          {lastUpdated && (
            <p className="text-xs text-[color:var(--shop-muted)] mt-3 font-mono-price">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {section.heading}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-2">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-[color:var(--shop-muted)] text-sm leading-relaxed">
                      <span className="text-[color:var(--color-primary-600)] mt-0.5 flex-shrink-0">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[color:var(--shop-muted)] text-sm leading-relaxed">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
