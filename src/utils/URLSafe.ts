export function generateURLSafe(unsafe: string) {
    return unsafe.toLowerCase().replace(/ /g, "_")
}