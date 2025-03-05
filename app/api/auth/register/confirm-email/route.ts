import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    if (!token) {
        return new Response('Token manquant', { status: 400 });
    }

    const secret = process.env.JWT_SECRET || 'default_secret';

    try {
        const decoded = jwt.verify(token, secret) as { email: string }; // Récupérer l'email du token décodé
        const user = await db.user.findUnique({ where: { email: decoded.email } }); // Récupérer l'utilisateur avec l'email du token
        if (!user) {
            return new Response('Utilisateur non trouvé', { status: 404 });
        }

        const currentDate = new Date();

        await db.user.update({
            where: { email: decoded.email },
            data: { emailVerified: currentDate },
        });

        return NextResponse.json({ message: "Email confirmé avec succès" }, { status: 200 });
    } catch (error) {
        console.error('[TOKEN_ERROR]', error);
        return NextResponse.json({ message: "Token invalide ou expiré" }, { status: 400 });
    
    }
}
