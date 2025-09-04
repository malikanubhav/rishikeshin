import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const headerToken = req.headers.get("x-token") || "";
        const queryToken = url.searchParams.get("token") || "";
        const token = headerToken || queryToken;

        if (!token || token !== process.env.REVALIDATE_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json().catch(() => ({} as any));
        let { paths } = body as { paths?: string | string[] };

        if (!paths) {
            return NextResponse.json({ error: "No paths provided" }, { status: 400 });
        }

        const list = (Array.isArray(paths) ? paths : [paths])
            .filter(Boolean)
            .map((p) => (p.startsWith("/") ? p : `/${p}`));

        if (list.length === 0) {
            return NextResponse.json({ error: "No valid paths" }, { status: 400 });
        }

        for (const p of list) revalidatePath(p);

        return NextResponse.json({ ok: true, revalidated: list });
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
    }
}
