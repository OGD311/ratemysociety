'use server';
import { verifyTurnstile } from "@/utils/Turnstile";
import { prisma } from "./prisma";
import { headers } from "next/headers";
import { calculateSocietyRating } from "./societies";
import { Filter } from "bad-words";

const filter = new Filter();

export const getReviews = async (societyId: number) => {
    return await prisma.review.findMany({
        orderBy: { posted_at: 'desc' },
        where: {
            societyId: societyId
        }
    })
}

export const submitReview = async (societyId: number, review: { rating: number, comment?: string }, turnstileToken: string) => {
    const headersList = await headers()
    let ip = headersList.get("CF-Connecting-IP") || ""
    const isValidToken = await verifyTurnstile(turnstileToken, ip);  
    
    if (!isValidToken) {
        throw new Error("Security Verification Failed - Please Refresh")
    }
    
    if (typeof societyId !== "number" || societyId <= 0) {
        throw new Error("Invalid society ID");
    }

    let rating = review.rating;
    if (typeof(rating) != "number") throw new Error("Rating must be a number");
    rating = Math.min(Math.max(rating, 1), 5);
    
    let comment = review.comment;
    if (comment) {

        comment = comment.replace(/<[^>]*>/g, '');
        comment = comment.replace(/[<>\"'&]/g, '');
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
        
        if (comment.length === 0) {
            comment = undefined;
        }

        if (comment && comment != filter.clean(comment)) { throw new Error("No Profanity Allowed"); }
    }

    await prisma.review.create({
        data: {
            rating: rating,
            comment: comment ?? null,
            posted_at: new Date(),
            societyId: societyId,
        }
    });

    return await calculateSocietyRating(societyId);
}