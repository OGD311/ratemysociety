export function generateURLSafe(unsafe: string) {
    return unsafe.toLowerCase().replace(/ /g, "_")
}

export function generateUniName(safe: string): string {
    let unsafe = safe.replace(/_/g, " ").split(" ")

    unsafe.forEach((word: string, index: number) => {
        if (word.toLowerCase() !== "of") {
            unsafe[index] = word.substring(0, 1).toUpperCase() + word.substring(1);
        }
    });

    safe = unsafe.join(" ");

    return safe
}