import nodemailer from 'nodemailer';

export async function sendEmail(recipient: string, subject: string, text: string, successMessage: string): Promise<{ message: string, status: number }> {
    
    // Configuration de nodemailer pour envoyer un email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Paramètres de l'email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: subject,
        text: text,
    };

    // Envoi de l'email
    try {
        await transporter.sendMail(mailOptions);
        return {
            message: successMessage,
            status: 200
        }
    } catch {
        return {
            message: 'Erreur lors de l\'envoi de l\'email',
            status: 500
        }
    }
}