/* ===========================================================
   app/admin/pages/page.tsx   (Admin: create/edit + revalidate)
   =========================================================== */
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// --------- helpers ----------
function requireAdminFromParams(
    sp: Record<string, string | string[] | undefined> | undefined
) {
    const raw = sp?.token;
    const token = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");
    if (token !== process.env.ADMIN_TOKEN) {
        redirect("/?err=unauthorized");
    }
}

async function getData() {
    const pages = await prisma.page.findMany({
        orderBy: { updatedAt: "desc" },
    });
    return { pages };
}

export const runtime = "nodejs";


// ---------- Server Actions ----------
async function upsertPage(formData: FormData) {
    "use server";
    const id = String(formData.get("id") || "");
    const slug = String(formData.get("slug") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const summary = String(formData.get("summary") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const status = String(formData.get("status") || "DRAFT") as "DRAFT" | "PUBLISHED";

    if (!slug || !title || !summary) {
        throw new Error("Missing required fields: slug, title, summary");
    }

    if (id) {
        await prisma.page.update({
            where: { id },
            data: { slug, title, summary, content, status },
        });
    } else {
        await prisma.page.create({
            data: { slug, title, summary, content, status },
        });
    }

    // Revalidate affected static paths instantly
    revalidatePath("/p");
    revalidatePath(`${slug}`);
}

async function deletePage(formData: FormData) {
    "use server";
    const id = String(formData.get("id") || "");
    const slug = String(formData.get("slug") || "");
    if (!id) throw new Error("Missing id");
    await prisma.page.delete({ where: { id } });
    revalidatePath("/p");
    if (slug) revalidatePath(`/p/${slug}`);
}

export default async function AdminPages({
    _searchParams,
}: {
    _searchParams?: Record<string, string | string[] | undefined>;
}) {

    const { pages } = await getData();

    return (
        <section className="container mx-auto max-w-6xl px-4 py-10">
            <h1 className="text-2xl font-bold">Admin · Pages</h1>
            <p className="text-slate-600">Create or edit pages. Publishing revalidates static routes.</p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {/* Create / Update form */}
                <form action={upsertPage} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h2 className="text-lg font-semibold">Create / Update</h2>
                    <div className="mt-3 grid gap-3">
                        <input name="id" placeholder="(leave blank to create)" className="hidden" />
                        <label className="block text-sm">
                            Slug
                            <input
                                name="slug"
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                placeholder="best-places-to-visit"
                            />
                        </label>
                        <label className="block text-sm">
                            Title
                            <input
                                name="title"
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                placeholder="Best Places to Visit in Rishikesh"
                            />
                        </label>
                        <label className="block text-sm">
                            Summary
                            <input
                                name="summary"
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                placeholder="A curated guide to the must-see spots in Rishikesh."
                            />
                        </label>
                        <label className="block text-sm">
                            Content (HTML allowed) — keep it clean & semantic
                            <textarea
                                name="content"
                                rows={10}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                placeholder="<h2>Overview</h2><p>...</p>"
                            />
                        </label>
                        <label className="block text-sm">
                            Status
                            <select
                                name="status"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                defaultValue="DRAFT"
                            >
                                <option value="DRAFT">DRAFT</option>
                                <option value="PUBLISHED">PUBLISHED</option>
                            </select>
                        </label>

                        <button className="mt-2 rounded-xl bg-slate-900 px-4 py-2 font-medium text-white hover:bg-black">
                            Save & Revalidate
                        </button>
                    </div>
                </form>

                {/* Existing pages table */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 overflow-auto">
                    <h2 className="text-lg font-semibold">All Pages</h2>
                    <table className="mt-3 w-full text-sm">
                        <thead className="text-slate-500">
                            <tr>
                                <th align="left">Title</th>
                                <th align="left">Slug</th>
                                <th>Status</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map((p) => (
                                <tr key={p.id} className="border-t border-slate-200">
                                    <td className="py-2">{p.title}</td>
                                    <td className="py-2 text-slate-600">{p.slug}</td>
                                    <td className="py-2">{p.status}</td>
                                    <td className="py-2 text-slate-500">
                                        {new Date(p.updatedAt).toLocaleString()}
                                    </td>
                                    <td className="py-2">
                                        <form action={deletePage} className="inline">
                                            <input type="hidden" name="id" value={p.id} />
                                            <input type="hidden" name="slug" value={p.slug} />
                                            <button className="rounded-lg bg-red-600/90 px-3 py-1 text-white hover:bg-red-600">
                                                Delete
                                            </button>
                                        </form>
                                        <a
                                            href={`/admin/pages?token=${encodeURIComponent(process.env.ADMIN_TOKEN || "")}#edit-${p.id}`}
                                            className="ml-3 text-sky-700 underline"
                                        >
                                            Edit (copy fields)
                                        </a>
                                        <a href={`${p.slug}`} className="ml-3 text-slate-700 underline" target="_blank">
                                            View
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* helper blocks */}
                    <div className="mt-6 text-xs text-slate-500 space-y-3">
                        {pages.map((p) => (
                            <div id={`edit-${p.id}`} key={p.id} className="border border-slate-200 p-3 rounded-lg">
                                <div><b>Slug:</b> {p.slug}</div>
                                <div><b>Title:</b> {p.title}</div>
                                <div><b>Summary:</b> {p.summary}</div>
                                <div><b>Status:</b> {p.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
