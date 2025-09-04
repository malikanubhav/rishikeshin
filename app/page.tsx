// app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import ExploreBeautiful from "./components/ExploreBeautiful";
import WhyRishikeshin from "./components/WhyRishikeshBharat";

export const metadata: Metadata = {
  title: "Rishikeshin — Discover Rishikesh: Yoga, Adventure & Spirituality",
  description:
    "Plan rafting, yoga retreats, Ganga Aarti, and airport transfers in Rishikesh. Live tips, verified operators, and easy bookings.",
  alternates: { canonical: "https://rishikeshin.com/" },
  openGraph: {
    title: "Rishikeshin — Smart Guide to Rishikesh",
    description:
      "Your destination OS for Rishikesh: rafting, yoga, aarti, stays & transfers.",
    url: "https://rishikeshin.com/",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Rishikeshin" },
};

const WHATSAPP_NUMBER = "+918126653995";
const WA_TAXI_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi! I need a taxi from Dehradun Airport (DED) to Rishikesh."
)}`;

const AFF = {
  viator: "https://www.viator.com/?pid=YOUR_ID",
  gyg: "https://www.getyourguide.com/?partner_id=YOUR_ID",
  booking: "https://www.booking.com/index.html?aid=YOUR_ID",
};

export default function Home() {
  // JSON-LD (TouristDestination, BreadcrumbList, FAQPage)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: "Rishikesh",
      description:
        "Yoga capital & Ganga gateway. Plan rafting, retreats, Ganga Aarti, and transfers.",
      url: "https://rishikeshin.com/",
      geo: { "@type": "GeoCoordinates", latitude: 30.0869, longitude: 78.2676 },
      image: ["https://rishikeshin.com/og.jpg"],
      touristType: ["Adventure traveler", "Pilgrim", "Wellness traveler"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rishikeshin.com/" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "When is rafting season in Rishikesh?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Typically September to June (varies by monsoon). Always check local advisories and book licensed operators.",
          },
        },
        {
          "@type": "Question",
          name: "Where is the Ganga Aarti held?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Daily at Parmarth Niketan (Rishikesh) and Triveni Ghat (Rishikesh). Arrive 30–45 minutes early for a good spot.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get from Dehradun Airport (DED) to Rishikesh?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Private taxi is fastest (45–75 minutes, traffic dependent). You can also take a bus via Dehradun/ Rishikesh ISBT.",
          },
        },
      ],
    },
  ];

  // Simple "live info" — replace with CMS or API data later
  const raftingStatus = { open: true, note: "Prime flows; book early on weekends", updated: "Sep 03, 2025" };
  const aarti = { parmarth: "6:30 PM", triveni: "7:00 PM" };

  return (
    <div>
      {/* Inline JSON-LD (Google recommends JSON-LD for structured data) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV is assumed in layout; include top skip link for a11y */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-black px-3 py-2 rounded">
        Skip to content
      </a>

      {/* HERO (LCP image: priority; don’t lazy-load) */}
      {/* HERO with background video */}
      <Hero />


      <main id="main" className="bg-white text-slate-900">
        {/* QUICK HIGHLIGHTS */}
        <WhyRishikeshin />

        {/* TOP EXPERIENCES */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Top Experiences</h2>
          <p className="mt-2 text-slate-600">Handpicked tours with licensed operators.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Rafting 16 km (Shivpuri → Rishikesh)",
                desc: "Grade II–III rapids. Best Sep–Jun.",
                href: AFF.viator,
                meta: "Affiliate",
              },
              {
                title: "Bungee Jumping (Jumpin Heights)",
                desc: "Certified instructors near Rishikesh.",
                href: AFF.gyg,
                meta: "Affiliate",
              },
              {
                title: "Sunset Ganga Aarti • Parmarth",
                desc: "Daily evening aarti with devotional chants.",
                href: "/ganga-aarti",
                meta: "Guide",
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{x.title}</h3>
                  {x.meta && (
                    <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700">
                      {x.meta}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-slate-600">{x.desc}</p>
                <div className="mt-4">
                  <Link
                    href={x.href}
                    className="inline-flex items-center rounded-xl bg-slate-900 hover:bg-black text-white px-4 py-2 font-medium"
                    aria-label={`Book now: ${x.title}`}
                    data-analytics="affiliate_click"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PLAN YOUR TRIP */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold">Plan Your Trip</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "How to Reach",
                desc: "Flights to DED, trains to Haridwar, buses & taxis.",
                href: "/how-to-reach-rishikesh",
              },
              {
                title: "Where to Stay",
                desc: "Tapovan · Swarg Ashram · near Laxman Jhula.",
                href: "/where-to-stay",
              },
              {
                title: "Best Time to Visit",
                desc: "Oct–Mar best overall; Sep–Jun for rafting.",
                href: "/best-time-to-visit",
              },
            ].map((x) => (
              <Link
                key={x.title}
                href={x.href}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors"
              >
                <div className="text-lg font-semibold">{x.title}</div>
                <p className="mt-1 text-slate-600">{x.desc}</p>
                <span className="mt-3 inline-block text-sky-600">Open →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* LIVE INFO */}
        <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="liveinfo">
          <h2 id="liveinfo" className="text-2xl md:text-3xl font-semibold">
            Live Info
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3" aria-live="polite">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-lg font-semibold">Rafting Status Today</div>
              <p className="mt-2">
                {raftingStatus.open ? "✅ OPEN" : "⛔ CLOSED"} — {raftingStatus.note}
              </p>
              <p className="text-slate-600 text-sm mt-1">Updated {raftingStatus.updated}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-lg font-semibold">Ganga Aarti Today</div>
              <p className="mt-2">Parmarth Niketan: {aarti.parmarth}</p>
              <p className="mt-1">Triveni Ghat: {aarti.triveni}</p>
              <Link href="/ganga-aarti" className="mt-3 inline-block text-sky-600 underline">
                Full guide →
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-lg font-semibold">Safety & Licensing</div>
              <p className="mt-2 text-slate-700">
                We list operators who attest they’re licensed and follow safety norms. Verify on
                ground and always use proper gear.
              </p>
              <Link href="/legal/safety" className="mt-3 inline-block text-sky-600 underline">
                Read more →
              </Link>
            </div>
          </div>
        </section>

        {/* BLOG HIGHLIGHTS */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold">From the Blog</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { slug: "rishikesh-rafting-season-2025", title: "Rafting Season 2025 Guide" },
              { slug: "best-cafes-in-rishikesh", title: "Best Cafes in Tapovan" },
              { slug: "two-to-five-day-itineraries", title: "2–5 Day Itineraries" },
            ].map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50 transition-colors"
              >
                <div className="text-lg font-semibold">{p.title}</div>
                <p className="mt-1 text-slate-600">
                  Practical, current, concise — with links to book.
                </p>
                <span className="mt-3 inline-block text-sky-600">Read →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA BANNER (light) */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xl font-semibold">Need a taxi from Dehradun Airport?</div>
              <p className="text-slate-600">WhatsApp us for a quick quote & confirmation.</p>
            </div>
            <a
              href={WA_TAXI_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 inline-flex items-center rounded-xl bg-slate-900 hover:bg-black text-white px-5 py-3 font-medium"
              aria-label="WhatsApp for taxi quote"
              data-analytics="whatsapp_click"
            >
              WhatsApp Us Now
            </a>
          </div>
        </section>
      </main>


      {/* Sticky WhatsApp FAB (global) */}
      <a
        href={WA_TAXI_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp to book taxi"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center rounded-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 font-medium shadow-lg"
        data-analytics="whatsapp_fab"
      >
        WhatsApp • Taxi
      </a>

      {/* Minimal analytics hooks (optional) */}
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          document.addEventListener('click', (e) => {
            const t = e.target;
            const el = t.closest('[data-analytics]');
            if (el) window.dataLayer.push({event: el.getAttribute('data-analytics')});
          });
        `,
        }}
      />
    </div>
  );
}
