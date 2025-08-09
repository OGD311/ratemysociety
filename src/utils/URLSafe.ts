export function generateURLSafe(unsafe: string) {
    return unsafe.toLowerCase().replace(/ /g, "_")
}

export function generateOriginal(safe: string): string {
    let unsafe = safe.replace(/_/g, " ").split(" ")

    unsafe.forEach((word: string, index: number) => {
        if (word.toLowerCase() !== "of") {
            unsafe[index] = word.substring(0, 1).toUpperCase() + word.substring(1);
        }
    });

    safe = unsafe.join(" ");

    return safe
}

export function generateDirectURL(indirect_url: string) {
    if (!indirect_url.includes("https") && !indirect_url.includes("http")) {
        indirect_url = "https://" + indirect_url
    } else if (indirect_url.includes("http")) {
        indirect_url.replace("http", "https")
    }

    return indirect_url
}