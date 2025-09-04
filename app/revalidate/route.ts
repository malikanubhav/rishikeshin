import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const token = req.headers.get("x-token") || "";
    // if (token !== process.env.REVALIDATE_TOKEN) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const { paths } = await req.json().catch(() => ({ paths: [] }));
    // if (!Array.isArray(paths) || paths.length === 0) {
    //     return NextResponse.json({ error: "No paths provided" }, { status: 400 });
    // }
    // paths.forEach((p: string) => revalidatePath(p));
    return NextResponse.json({ ok: true, revalidated: "" });
}