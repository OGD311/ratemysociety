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
                contains: searchString,
            },
        },
        select: {
            name: true,
        },
    })
}

export const getUniversityDetails = async (universityName: string) => {
    return await prisma.university.findFirstOrThrow({
        where: {
            name: {
                equals: universityName,
            }
        }
    })
}



export const updateSocietyCount = async () => {
    const universities = await prisma.university.findMany();
    
    for (const uni of universities) {
        const count = await prisma.society.count({
            where: { universityId: uni.id },
        });
    
        await prisma.university.update({
            where: { id: uni.id },
            data: { societyCount: count },
        });
    }
}