// app/sitemap.xml/route.ts
import { prisma } from "@/lib/prisma";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export async function GET() {
    const baseUrl = process.env.SITE_URL || "http://localhost:3000";

    // Fetch dynamic pages from DB
    const pages = await prisma.page.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
    });

    // You can also add blog posts or static routes
    const staticRoutes = [
        { url: "/", changefreq: "daily", priority: 1.0 },
        { url: "/p", changefreq: "weekly", priority: 0.8 },
        { url: "/ganga-aarti", changefreq: "monthly", priority: 0.6 },
        { url: "/where-to-stay", changefreq: "monthly", priority: 0.6 },
        { url: "/best-time-to-visit", changefreq: "monthly", priority: 0.6 },
    ];

    const smStream = new SitemapStream({ hostname: baseUrl });

    // Add static routes
    for (const r of staticRoutes) smStream.write(r);

    // Add dynamic /p/[slug] pages
    for (const p of pages) {
        smStream.write({
            url: `${p.slug}`,
            lastmod: p.updatedAt,
            changefreq: "monthly",
            priority: 0.7,
        });
    }

    smStream.end();
    const xml = await streamToPromise(Readable.from(smStream)).then((data) =>
        data.toString()
    );

    return new Response(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "s-maxage=3600, stale-while-revalidate", 
        },
    });
}
