import { PrismaClient } from '@prisma/client';

// Étendre l'interface globale pour inclure la propriété prisma
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined; 
}

// Créer une instance de PrismaClient
export const db = global.prisma || new PrismaClient();

// Si nous sommes en mode développement, nous assignons l'instance de Prisma à la variable globale
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}