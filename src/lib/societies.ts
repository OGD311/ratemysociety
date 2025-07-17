'use server';
import { prisma } from "./prisma";


export const getSocieties = async (universityId: number) => {
    return await prisma.society.findMany({
        where: {
            universityId: universityId
        }
    })
}