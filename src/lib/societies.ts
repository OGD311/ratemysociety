'use server';
import { SOCIETY } from "@/constants/interfaces";
import { prisma } from "./prisma";
import { calculateUniversityRating } from "./universities";


export const getSocieties = async (universityId: number) => {
    return await prisma.society.findMany({
        where: {
            universityId: universityId
        },
        include: {
            category: true,
            _count: {
                select: {
                    reviews: true
                }
            }
        }
    })
}


export const getSocietyDetails = async (universityName: string, societyName: string) => {
    const results: SOCIETY[] = await prisma.$queryRaw`
        SELECT s.*, c.name as category_name, c.colour as category_colour
        FROM Society s
        INNER JOIN University u ON s.universityId = u.id
        LEFT JOIN Category c ON s.categoryId = c.id
        WHERE LOWER(s.name) = LOWER(${societyName}) AND LOWER(u.name) = LOWER(${universityName})
        LIMIT 1
    `;

    if (!results.length) {
        throw new Error('Society not found');
    }

    const societyDetails = results[0];
    societyDetails.category = {
        // @ts-ignore
        name: societyDetails.category_name,
        // @ts-ignore
        colour: societyDetails.category_colour
    };

    // @ts-ignore
    delete societyDetails.category_name;
    // @ts-ignore
    delete societyDetails.category_colour;

    return societyDetails;
}


export const calculateSocietyRating = async (societyId: number) => {
    const reviews = await prisma.review.findMany({
        where: {
            societyId: societyId
        },
        select: {
            rating: true
        }
    });
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = reviews.length ? total / reviews.length : 0;
    await prisma.society.update({
        where: { id: societyId },
        data: { rating: average }
    });

    return await calculateUniversityRating(societyId);
}