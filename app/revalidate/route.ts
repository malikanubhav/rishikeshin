import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {

    return NextResponse.json({ ok: true, revalidated: "" });
}
