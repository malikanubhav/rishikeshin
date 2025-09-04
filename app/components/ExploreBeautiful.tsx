import Image from "next/image";
import Link from "next/link";
export default function ExploreBeautiful() {
    const cards = [
        {
            title: "Parmarth Ganga Aarti",
            loc: "Rishikesh • Spiritual",
            img: "/images/card-1.jpg",
            rating: "4.8",
            href: "/ganga-aarti",
        },
        {
            title: "Shivpuri 16km Rafting",
            loc: "Ganges • Adventure",
            img: "/images/card-2.jpg",
            rating: "4.7",
            href: "/rafting-in-rishikesh",
        },
        {
            title: "Tapovan Cafés & Views",
            loc: "Tapovan • Food & Chill",
            img: "/images/card-3.jpg",
            rating: "4.6",
            href: "/blog/best-cafes-in-rishikesh",
        },
    ];

    return (
        <section className="py-14 md:py-18">
            <div className="text-center">
                <h2 className="text-xl tracking-wide text-slate-500">Explore the</h2>
                <div className="text-3xl md:text-5xl font-semibold -mt-1">beautiful</div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
                {cards.map((c) => (
                    <Link
                        key={c.title}
                        href={c.href}
                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
                    >
                        <div className="relative aspect-[4/5] w-full">
                            <Image
                                src={c.img}
                                alt={c.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                priority={false}
                            />
                            {/* rating badge */}
                            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium shadow">
                                ⭐ {c.rating}
                            </div>
                            {/* caption area */}
                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <div className="rounded-xl bg-black/40 backdrop-blur-sm px-3 py-2 text-white">
                                    <div className="text-sm">{c.loc}</div>
                                    <div className="text-base md:text-lg font-semibold">{c.title}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}