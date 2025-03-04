import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    // Récupère le token de l'URL pour la confirmation de l'email
    const token = url.pathname.split('/').pop(); // Dernier élément de l'URL ex: /confirm-email/token

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

        return new Response(JSON.stringify({
            message: 'Email confirmé avec succès'
        }), { status: 200 });
    } catch (error) {
        console.error('[TOKEN_ERROR]', error);
        return new Response(JSON.stringify({
            message: 'Token invalide ou expiré'
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
