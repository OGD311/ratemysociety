export function UniNameArticle(uniName: string) {
    if (uniName.split(" ")[0].toLowerCase() == "university") { return "the"}
    else { return "" }
}