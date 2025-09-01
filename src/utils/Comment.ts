import createDOMPurify from 'dompurify';
// @ts-ignore
import { JSDOM } from 'jsdom';
import { Filter } from "bad-words";

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const filter = new Filter();


export const sanitiseAndValidateComment = (comment?: string) => {
    if (!comment) { throw new Error("Review Comment cannot be blank"); }

    comment = DOMPurify.sanitize(comment, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    comment = comment.trim();
        
    if (comment.length > 255) {
        const punctuationRegex = /[.!?]/g;
        let lastPunctuation = -1;
        let match;
        while ((match = punctuationRegex.exec(comment)) !== null) {
            if (match.index < 255) {
                lastPunctuation = match.index;
            } else {
                break;
            }
        }
        if (lastPunctuation !== -1) {
            comment = comment.slice(0, lastPunctuation + 1);
        } else {
            comment = comment.slice(0, 255);
        }
    }
        
        
    if (comment && comment != filter.clean(comment)) { throw new Error("No Profanity Allowed"); }
    else {
        return comment;
    }
}