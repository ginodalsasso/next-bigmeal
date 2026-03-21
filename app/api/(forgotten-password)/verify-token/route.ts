import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    const { token } = await req.json();
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET non configuré");

    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded !== 'string' && 'email' in decoded) {
            return new Response(JSON.stringify({
                valid: true,
                email: decoded.email
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            throw new Error('Invalid token payload');
        }
    } catch {
        // Ne pas exposer les détails de l'erreur JWT au client
        return new Response(JSON.stringify({
            message: "Token invalide ou expiré"
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
