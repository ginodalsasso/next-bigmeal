import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export  async function POST(req: NextRequest) {
    
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
        console.error('Erreur lors de l\'envoi de l\'email :', error);
    }
}

// const storeResetToken = async (recipient: string, token: string): Promise<void> => {
//     // Stocke le token dans la base de données
// };
