export function generateURLSafe(string: string) {
    return string.toLowerCase().replace(/ /g, "_")
}