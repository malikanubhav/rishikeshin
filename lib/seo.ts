export function canonical(path = "/") {
    const base = process.env.SITE_URL || "https://example.com";
    return `${base}${path}`;
}