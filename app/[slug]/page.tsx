import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { canonical } from "@/lib/seo";
const SKIP = !!process.env.SKIP_BUILD_STATIC_GENERATION;

export async function generateStaticParams() {
    if (SKIP) return []; // ← don’t touch DB at build
    const top = await prisma.page.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true },
        take: 50,
    });
    return top.map((p) => ({ slug: p.slug }));
}

async function getPage(slug: string) {
    return prisma.page.findFirst({ where: { slug, status: "PUBLISHED" } });
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const page = await prisma.page.findFirst({ where: { slug: params.slug } });
    if (!page)
        return { title: "Guide — Rishikeshin", description: "Rishikesh travel guide." };
    return {
        title: `${page.title} — Rishikeshin`,
        description: page.summary,
        alternates: { canonical: canonical(`/p/${page.slug}`) },
    };
}

export default async function PageDetail({ params }: { params: { slug: string } }) {
    const page = await getPage(params.slug);
    if (!page) return notFound();

    return (
        <article className="container mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-3xl font-bold">{page.title}</h1>
            <p className="mt-2 text-slate-600">{page.summary}</p>
            <div className="mt-6 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content }} />
            <hr className="my-8 border-slate-200" />
            <div className="text-sm text-slate-500">
                Updated {new Date(page.updatedAt).toDateString()}
            </div>
        </article>
    );
}