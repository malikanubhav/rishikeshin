import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { canonical } from "@/lib/seo";

export const revalidate = 60 * 60;

export const metadata: Metadata = {
    title: "Pages — Rishikeshin",
    description: "Guides and evergreen pages created from the admin.",
    alternates: { canonical: canonical("/p") },
};

export default async function PagesList() {
    const pages = await prisma.page.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
        select: { slug: true, title: true, summary: true, updatedAt: true },
    });

    return (
        <section className="container mx-auto max-w-4xl px-4 py-10">
            <h1 className="text-3xl font-bold">Guides</h1>
            <p className="mt-2 text-slate-600">All published guides & pages.</p>
            <div className="mt-6 space-y-4">
                {pages.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/${p.slug}`}
                        className="block rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
                    >
                        <div className="text-lg font-semibold">{p.title}</div>
                        <p className="mt-1 text-slate-600">{p.summary}</p>
                        <div className="mt-2 text-xs text-slate-500">
                            Updated {new Date(p.updatedAt).toDateString()}
                        </div>
                    </Link>
                ))}
                {pages.length === 0 && <div className="text-slate-500">No published pages yet.</div>}
            </div>
        </section>
    );
}
