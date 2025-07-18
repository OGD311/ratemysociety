'use server';
import { prisma } from "./prisma";


export const getSocieties = async (universityId: number) => {
    return await prisma.society.findMany({
        where: {
            universityId: universityId
        }
    })
}


export const getSocietyDetails = async (universityName: string, societyName: string) => {
    return await prisma.society.findFirstOrThrow({
        where: {
            name: {
                equals: societyName,
            },
            university: {
                name: {
                    equals: universityName,
                }
            }
        }
    })
}
