import { randomBytes } from 'crypto';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export  async function POST(req: NextRequest) {
    
    const body = await req.json();

    const { recipient } = body;
    if (!recipient) {
        return 
    }

    // Configuration de nodemailer pour envoyer un email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const generatedToken = randomBytes(32).toString("hex");
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${generatedToken}`;

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
