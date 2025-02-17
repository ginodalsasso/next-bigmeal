import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { verifyCSRFToken } from '@/lib/security/csrf';


export async function POST(req: NextRequest) {
    
    const body = await req.json();

    const { recipient } = body;
    if (!recipient) {
        return new Response('Veuillez fournir un email', { status: 400 });
    }

    // Configuration de nodemailer pour envoyer un email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const secret = process.env.JWT_SECRET || 'default_secret';
    const generatedToken = jwt.sign(
        { email: recipient },
        secret, 
        { expiresIn: '1h' }
    );
    const resetLink = `${process.env.BASE_URL}/reset-password/${generatedToken}`;

    // Paramètres de l'email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: 'Réinitialisation de votre mot de passe',
        text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
    };

    // Envoi de l'email
    try {
        await transporter.sendMail(mailOptions);
        return new Response('Email envoyé', { status: 200 });
    } catch (error) {
        console.error('[EMAIL_ERROR]', error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function PUT(req: NextRequest) {

    try {
        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }       

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
