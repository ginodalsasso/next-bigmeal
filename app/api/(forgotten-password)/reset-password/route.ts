import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/lib/services/email_service';


export async function POST(req: NextRequest) {
    
    const body = await req.json();

    const { recipient } = body;
    if (!recipient) {
        return new Response('Veuillez fournir un email', { status: 400 });
    }

    
    const secret = process.env.JWT_SECRET || 'default_secret';
    const generatedToken = jwt.sign(
        { email: recipient },
        secret, 
        { expiresIn: '1h' }
    );

    const resetLink = `${process.env.API_URL}/reset-password/${generatedToken}`;

    const emailResult = await sendEmail(
        recipient,
        'Réinitialisation de votre mot de passe',
        `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
        'Un email de réinitialisation de mot de passe a été envoyé'
    );

    if (emailResult.status === 200) {
        return new Response(JSON.stringify({ message: emailResult.message }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: emailResult.message }), { status: emailResult.status });
    }
}


export async function PUT(req: NextRequest) {

    try {
        const body = await req.json();
        const { token, password } = body;
        
        if (!token || !password) {
            return new Response(JSON.stringify({ 
                message: 'Veuillez fournir un token et un mot de passe' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const secret = process.env.JWT_SECRET || 'default_secret';
        
        // Vérification du token
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (error) {
            console.error('Erreur de vérification du token:', error);
            return new Response(JSON.stringify({ 
                message: 'Token invalide ou expiré' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        if (typeof decoded !== 'string' && 'email' in decoded) {
            const email = decoded.email;
            
            // Vérifier si l'utilisateur existe
            const user = await db.user.findUnique({
                where: { email },
                include: { accounts: true },
            });
            if (!user) {
                return new Response(JSON.stringify({ 
                    message: "Utilisateur introuvable" 
                }), { 
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // Vérifier si l'utilisateur a un compte OAuth
            const providers = ['google', 'github'];
            // pour chaque compte de l'utilisateur, on vérifie si le provider est dans la liste des providers
            const hasOAuthAccount = user.accounts.some(account => account.provider && providers.includes(account.provider));
            if (hasOAuthAccount) {
                return new Response(JSON.stringify({ 
                    message: "Impossible de réinitialiser le mot de passe. Votre compte est lié à Google ou GitHub." 
                }), { 
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // Hash du mot de passe 
            const hashedPassword = await bcrypt.hash(password, 12);

            // Mise à jour du mot de passe
            await db.user.update({
                where: { email },
                data: { password: hashedPassword },
            });

            return new Response(JSON.stringify({ 
                message: 'Mot de passe réinitialisé avec succès' 
            }), { 
                status: 200, 
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ 
                message: 'Token invalide' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('[RESET-PASSWORD_ERROR]', error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
