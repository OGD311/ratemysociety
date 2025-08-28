'use server';
import { prisma } from "./prisma";

export const getUniversities = async () => {
    return await prisma.university.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};

export const getUniversityName = async (universityId: number) => {
    const uni=  await prisma.university.findFirst({
        select: {
            name: true
        },
        where: {
            id: universityId
        }
    })

    return uni ? uni.name : "";
}


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


export const calculateUniversityRating = async (societyId: number) => {
    const society = await prisma.society.findUnique({
        where: { id: societyId },
        select: { universityId: true }
    });
    if (!society) throw new Error("Society not found");
    const universityId = society.universityId;
    
    const societies = await prisma.society.findMany({
        where: { universityId },
        select: { rating: true }
    });

    const ratings = societies.map(s => s.rating ?? 0);
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = ratings.length ? total / ratings.length : 0;

    await prisma.university.update({
        where: { id: universityId },
        data: { rating: average }
    });
}