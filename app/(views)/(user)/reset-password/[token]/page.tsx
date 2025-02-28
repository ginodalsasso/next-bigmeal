'use client';

// Bibliothèques tierces
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Composants UI
import { Button } from '@/components/ui/button';

// Types
import { ForgotUserPasswordFormType } from '@/lib/types/forms_interfaces';

// Services
import { resetForgottenPasswordAPI, verifyResetTokenAPI } from '@/lib/services/user_service';


// _________________________ COMPONENT _________________________
const ResetPasswordPage = () => {

    // _________________________ ETATS _________________________
    const { token } = useParams(); 
    const router = useRouter();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<ForgotUserPasswordFormType>({});
    const [isLoading, setIsLoading] = useState(false);

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
    }, [token]);

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        if (formData.password !== formData.confirmPassword) {
            setError({ confirmPassword: 'Les mots de passe ne correspondent pas' });
            setIsLoading(false);
            return;
        }

        try {
            if (token) {
                resetForgottenPasswordAPI(token, formData.password);
            } else {
                setError({ general: 'Token invalide' });
            }
            toast.success('Mot de passe réinitialisé avec succès !');
            router.push('/login');

        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe :', error);
            setError({ general: 'Erreur lors de la réinitialisation du mot de passe' });
        } finally {
            setIsLoading(false);
        }
    };


    // _________________________ RENDU __________________
    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-[10%] flex flex-col gap-2 border px-4 py-8 sm:w-[400px]"
        >
            <h1 className="text-2xl font-bold">Réinitialiser le mot de passe</h1>
            {error.general && <p className="error-form">{error.general}</p>}

            <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-text-select"
                required
            />
            {error.password && <p className="error-form">{error.password}</p>}

            <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input-text-select"
                required
            />
            {error.confirmPassword && <p className="error-form">{error.confirmPassword}</p>}

            <Button
                type="submit"
                disabled={isLoading}
                variant={isLoading ? 'ghost' : 'success'}
            >
                {isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
            </Button>
        </form>
    );
};

export default ResetPasswordPage;
