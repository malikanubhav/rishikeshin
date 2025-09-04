// app/api/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RevalidateBody = {
    paths?: string | string[];
};

async function parseBody(req: Request): Promise<unknown> {
    try {
        return await req.json();
    } catch {
        return {};
    }
}

function normalizePaths(input: unknown): string[] {
    const paths: string[] = Array.isArray(input)
        ? input
        : typeof input === "string"
            ? [input]
            : [];

    return paths
        .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
        .map((p) => (p.startsWith("/") ? p : `/${p}`));
}

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const headerToken = req.headers.get("x-token") ?? "";
        const queryToken = url.searchParams.get("token") ?? "";
        const token = headerToken || queryToken;

        if (!token || token !== (process.env.REVALIDATE_TOKEN ?? "")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const raw = (await parseBody(req)) as RevalidateBody;
        const list = normalizePaths(raw.paths);

        if (list.length === 0) {
            return NextResponse.json({ error: "No valid paths provided" }, { status: 400 });
        }

        for (const p of list) {
            revalidatePath(p);
        }

        return NextResponse.json({ ok: true, revalidated: list });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
