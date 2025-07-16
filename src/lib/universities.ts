'use server';
import { prisma } from "./prisma";

export const getUniversities = async () => {
    return await prisma.university.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};