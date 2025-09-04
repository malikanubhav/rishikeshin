// components/Hero.tsx
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [muted, setMuted] = useState(true);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onCanPlay = () => setReady(true);
        v.addEventListener("canplay", onCanPlay, { once: true });
        return () => v.removeEventListener("canplay", onCanPlay);
    }, []);

    return (
        <section className="relative isolate overflow-hidden bg-slate-950">
            {/* Background video */}
            <div className="absolute inset-0 -z-10">
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted={muted}
                    loop
                    playsInline
                    preload="auto"
                    poster="/hero-poster.jpg"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>


                <div className="absolute inset-0" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/600 to-transparent" />
            </div>


            <div
                aria-hidden="true"
                className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"
            />


            <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
                <div className="mb-4 flex items-center gap-3">
                    <span className={`text-xs ${ready ? "text-emerald-300" : "text-slate-300"}`}>
                        {ready ? "Live motion background" : "Loading video…"}
                    </span>
                    <button
                        onClick={() => {
                            setMuted(m => !m);
                            const v = videoRef.current;
                            if (v) v.muted = !v.muted;
                        }}
                        className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        aria-pressed={!muted ? true : false}
                        aria-label={muted ? "Unmute background video" : "Mute background video"}
                    >
                        {muted ? "Unmute" : "Mute"}
                    </button>
                </div>
                {/* bg-white/5 p-6 backdrop-blur-md */}
                <div className="max-w-3xl rounded-2xl ">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        Discover <span className="text-sky-300">Rishikesh</span> — Yoga, Adventure & Spirituality
                    </h1>
                    <p className="mt-4 text-slate-200">
                        Plan rafting, yoga retreats, Ganga Aarti, and airport transfers — curated & simplified.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3 ">
                        <Link
                            href="/rafting-in-rishikesh"
                            className="inline-flex items-center rounded-xl bg-sky-500 px-5 py-3 font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        >
                            Book Rafting
                        </Link>
                        <Link
                            href="/yoga-retreats"
                            className="inline-flex items-center rounded-xl bg-white/10 px-5 py-3 font-medium text-white hover:bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            Find Yoga Retreats
                        </Link>
                        <Link
                            href="/airport-taxi"
                            className="inline-flex items-center rounded-xl bg-white/10 px-5 py-3 font-medium text-white hover:bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            Airport Taxi
                        </Link>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300 ">
                        <div className="inline-flex items-center gap-2 rounded-lg bg-black/20 px-3 py-1">
                            <span>✓</span> Licensed operators
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-lg bg-black/20 px-3 py-1">
                            <span>✓</span> Real-time tips
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-lg bg-black/20 px-3 py-1">
                            <span>✓</span> Local concierge
                        </div>
                    </div>
                </div>

                {/* Secondary section: quick chips */}
                <div className="mt-7 flex flex-wrap gap-2">
                    {["Rafting", "Bungee", "Camping", "Ganga Aarti", "Yoga Retreats", "Cafes"].map(x => (
                        <span key={x} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-200">
                            {x}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scroll cue */}
            <div className="pb-6 text-center">
                <a
                    href="#main"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 rounded-xl px-3 py-1"
                    aria-label="Scroll to content"
                >
                    <span className="text-sm">Explore more</span>
                    <span aria-hidden>▾</span>
                </a>
            </div>
        </section>
    );
}
