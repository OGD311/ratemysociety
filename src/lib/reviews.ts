'use server';
import { REVIEW } from "@/constants/interfaces";
import { prisma } from "./prisma";

export const getReviews = async (societyId: number) => {
    return await prisma.review.findMany({
        where: {
            societyId: societyId
        }
    })
}

export const submitReview = async (societyId: number, review: any) => {

    return await prisma.review.create({
        data: {
            rating: review.rating,
            comment: review.comment,
            posted_at: review.posted_at,
            societyId: societyId,
        }
    });
}