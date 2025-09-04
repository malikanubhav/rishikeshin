// app/components/WhyRishikeshin.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ReactNode } from "react";

type Pill = { label: string };
type Card = {
    t: string;
    d: string;
    href: string;
    pills: Pill[];
    icon: ReactNode; // ✅ works for inline SVGs or components
  };
function IconAdventure() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            <path
                d="M3 20h18M5 20l6-14 6 14M7 15h10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function IconSpiritual() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            <path
                d="M12 3v4M8 7h8M6 12h12M8 17h8M12 21v-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}
function IconEssentials() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            <path
                d="M3 6h18M3 12h12M3 18h8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function IconStays() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            <path
                d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function WhyRishikeshin() {
    const cards: Card[] = useMemo(
        () => [
            {
                t: "Adventure",
                d: "Signature thrills on the Ganga & cliffs.",
                href: "/rafting-in-rishikesh",
                pills: [{ label: "Rafting" }, { label: "Bungee" }, { label: "Camping" }],
                icon: <IconAdventure />,
            },
            {
                t: "Spiritual",
                d: "Ashrams, Aarti, and calm corners to reset.",
                href: "/ganga-aarti",
                pills: [{ label: "Ganga Aarti" }, { label: "Temples" }, { label: "Retreats" }],
                icon: <IconSpiritual />,
            },
            {
                t: "Essentials",
                d: "How to reach, get around, and stay safe.",
                href: "/how-to-reach-rishikesh",
                pills: [{ label: "Airport Taxi" }, { label: "Buses/Trains" }, { label: "Local Tips" }],
                icon: <IconEssentials />,
            },
            {
                t: "Stays",
                d: "Pick the right area for your vibe & budget.",
                href: "/where-to-stay",
                pills: [{ label: "Tapovan" }, { label: "Swarg Ashram" }, { label: "Riverside" }],
                icon: <IconStays />,
            },
        ],
        []
    );

    return (
        <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="why-title">
            <div className="flex items-end justify-between gap-4">
                <h2 id="why-title" className="text-2xl md:text-3xl font-semibold">
                    Why Rishikeshin
                </h2>
                <p className="hidden md:block text-sm text-slate-500">
                    Clean guides · Local insight · Book with confidence
                </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
                {cards.map((c) => (
                    <article
                        key={c.t}
                        className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition
                       hover:shadow-md focus-within:shadow-md"
                    >
                        {/* Accent line */}
                        <div className="pointer-events-none absolute inset-x-0 -top-px h-1 rounded-t-2xl bg-gradient-to-r from-sky-400/40 via-sky-600/60 to-sky-400/40 opacity-75" />

                        {/* Header */}
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl border border-slate-200 p-2 text-slate-700 group-hover:text-sky-600 transition">
                                {c.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">{c.t}</h3>
                        </div>

                        {/* Copy */}
                        <p className="mt-2 text-slate-600">{c.d}</p>

                        {/* Pills */}
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {c.pills.map((p) => (
                                <li
                                    key={p.label}
                                    className="text-xs rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700
                             group-hover:border-sky-200 group-hover:text-sky-700 transition"
                                >
                                    {p.label}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <div className="mt-5">
                            <Link
                                href={c.href}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5
                           text-sm font-medium text-slate-900 hover:bg-slate-50 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-sky-400"
                                aria-label={`Open ${c.t} guide`}
                            >
                                Explore
                                <svg
                                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M5 12h14M13 5l7 7-7 7"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </div>

                        {/* Subtle hover ring */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-200/0 group-hover:ring-2 group-hover:ring-sky-200/60 transition" />
                    </article>
                ))}
            </div>
        </section>
    );
}
