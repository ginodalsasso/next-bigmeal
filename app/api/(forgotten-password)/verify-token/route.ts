import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    const { token } = await req.json();
    const secret = process.env.JWT_SECRET || 'default_secret';

    try {
        const decoded = jwt.verify(token, secret); // Vérifie que le token est valide

        // Vérifie que le token contient bien un email de type string
        if (typeof decoded !== 'string' && 'email' in decoded) {
            return new Response(JSON.stringify({ valid: true, email: decoded.email }), { status: 200 });
        } else {
            throw new Error('Invalid token payload');
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: `Token invalide ou expiré: ${error}` }), { status: 400 });
    }
}
