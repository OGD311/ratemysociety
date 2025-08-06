'use server';
import { prisma } from "./prisma";


export const getUserOrCreate = async (ip: string, fingerprint: string) => {
    const user = await prisma.user.upsert({
        where: { ip },
        update: {},
        create: { ip, fingerprint },
    });

    return user;
};