'use server';
import { verifyTurnstile } from "@/utils/Turnstile";
import { prisma } from "./prisma";
import { headers } from "next/headers";
import { calculateSocietyRating } from "./societies";
import { Filter } from "bad-words";
import { getUserOrCreate } from "./user";
import { createHash } from "crypto";

const filter = new Filter();

export const getReviews = async (societyId: number) => {
    return await prisma.review.findMany({
        orderBy: { posted_at: 'desc' },
        where: {
            societyId: societyId
        }
    })
}

export const submitReview = async (societyId: number, review: { rating: number, comment?: string }, turnstileToken: string, fingerprint: string) => {
    const headersList = await headers()
    let ip = headersList.get("CF-Connecting-IP") || ""
    const isValidToken = await verifyTurnstile(turnstileToken, ip);  
    
    if (!isValidToken) {
        throw new Error("Security Verification Failed - Please Refresh")
    }

    const hash = createHash("sha256").update(ip + fingerprint).digest("hex");
    const user = await getUserOrCreate(hash, fingerprint);
    if (user.is_banned) { throw new Error("IP Banned for breaching TOS")}
    
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
        
        if (comment.length === 0) { throw new Error("Comment cannot be blank"); }

        if (comment && comment != filter.clean(comment)) { throw new Error("No Profanity Allowed"); }
    } else {
        throw new Error("Review Comment cannot be blank");
    }

    try {
        await prisma.review.create({
            data: {
                rating: rating,
                comment: comment,
                posted_at: new Date(),
                societyId: societyId,
                userId: user.id
            }
        });
    } catch (err: any) {
        if (err.code === "P2002") {
            const existingReview = await prisma.review.findUnique({
                where: {
                    userId_societyId: {
                        userId: user.id,
                        societyId: societyId,
                    }
                }
            });

            if (existingReview) {
                await prisma.review.update({
                    where: { id: existingReview.id },
                    data: {
                        rating: rating,
                        comment: comment,
                        updated_at: new Date()
                    },
                });
            }
        } else {
            throw new Error("Could not submit - Please try again");
        }
    }
    return await calculateSocietyRating(societyId);
}