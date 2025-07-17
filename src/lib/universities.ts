'use server';
import { prisma } from "./prisma";

export const getUniversities = async () => {
    return await prisma.university.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};


export const searchUniversities = async (searchString: string) => {
    return await prisma.university.findMany({
        take: 5,
        orderBy: { name: 'asc' },
        where: {
            name: {
                startsWith: searchString,
            },
        },
        select: {
            name: true,
        },
    })
}