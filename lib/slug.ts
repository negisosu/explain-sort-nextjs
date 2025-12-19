export const slugify = (text: string): string | undefined => {
    const base = text
        .trim()
        .toLowerCase()
        .replace(/[^\w\u00C0-\uFFFF\s-]/g, "")
        .replace(/\s+/g, "-")
    return base || undefined
}

