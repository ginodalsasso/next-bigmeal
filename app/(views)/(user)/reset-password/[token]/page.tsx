'use client';

// Bibliothèques tierces
import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Types
import { ForgotUserPasswordFormType } from '@/lib/types/forms_interfaces';

// Services
import { resetForgottenPasswordAPI, verifyResetTokenAPI } from '@/lib/services/user_service';
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { NewPasswordConstraints } from '@/lib/constraints/forms_constraints';
import FormSubmitButton from '@/components/forms/FormSubmitButton';
import FormErrorMessage from '@/components/forms/FormErrorMessage';
import PasswordInput from '@/components/forms/PasswordInput';


// _________________________ COMPONENT _________________________
const ResetPasswordPage = () => {

    // _________________________ ETATS _________________________
    const { token } = useParams(); 
    const router = useRouter();
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation<ForgotUserPasswordFormType>(
        NewPasswordConstraints,
        ["password", "confirmPassword"] // Liste des champs à valider
    );


    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setError({ general: 'Token invalide' });
                return;
            }

            try {
                await verifyResetTokenAPI(token);
            } catch (error) {
                console.error('Erreur lors de la vérification du token :', error);
                setError({ general: 'Token invalide ou expiré' });
            }
        };

        verifyToken();
    }, [token, setError]);

    
    const handleSubmit = async (formData: FormData) => {
        const password = formData.get('password')?.toString() || '';
        const confirmPassword = formData.get('confirm-password')?.toString() || '';

        if (password !== confirmPassword) {
            setError({ confirmPassword: 'Les mots de passe ne correspondent pas' });
            return;
        }

        if (!validate({ password, confirmPassword })) {
            return;
        }

        try {
            if (!token) {
                setError({ general: 'Token invalide' });
                return;
            }
            await resetForgottenPasswordAPI(token, password);

            toast.success('Mot de passe réinitialisé avec succès !');
            router.push('/login');
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe :', error);
            setError({ general: 'Erreur lors de la réinitialisation du mot de passe' });
        }
    };

    // _________________________ RENDU __________________
    return (
        <form
            action={handleSubmit}
            className="card"
        >
            <h1 className="h1-title">Réinitialiser le mot de passe</h1>
            <FormErrorMessage message={error?.general} />

            <label htmlFor="password" className="mb-2 text-lg font-bold">
                Nouveau mot de passe
            </label>
            <PasswordInput 
                id="password"
                name="password"
                placeholder="••••••••"
                autoComplete="off"
                required
                error={error?.password}
            />
            <FormErrorMessage message={error?.password} />

            <label htmlFor="confirm-password" className="mb-2 text-lg font-bold">
                Confirmer le mot de passe
            </label>
            <input
                className="input-text-select"
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                autoComplete="off"
                required
            />
            <FormErrorMessage message={error?.confirmPassword} />

            <FormSubmitButton
                defaultText='Réinitialiser le mot de passe'
                className='mt-4 w-full'
            />
        </form>
    );
};

export default ResetPasswordPage;
