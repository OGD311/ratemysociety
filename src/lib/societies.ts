'use server';
import { SOCIETY } from "@/constants/interfaces";
import { prisma } from "./prisma";


export const getSocieties = async (universityId: number) => {
    return await prisma.society.findMany({
        where: {
            universityId: universityId
        },
        include: {
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
        SELECT s.* FROM Society s
        INNER JOIN University u ON s.universityId = u.id
        WHERE LOWER(s.name) = LOWER(${societyName}) AND LOWER(u.name) = LOWER(${universityName})
        LIMIT 1
    `;

    if (!results.length) {
        throw new Error('Society not found');
    }

    return results[0];
}
