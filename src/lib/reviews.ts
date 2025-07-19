'use server';
import { prisma } from "./prisma";



export const getReviews = async (societyId: number) => {
    return await prisma.review.findMany({
        where: {
            societyId: societyId
        }
    })
}

