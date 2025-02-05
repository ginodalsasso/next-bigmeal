'use client';

import { Button } from '@/components/ui/button';
import { ForgotUserPasswordFormType } from '@/lib/types/forms_interfaces';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
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
                const response = await fetch('/api/(forgotten-password)/verify-token', { // route a créer !!!!!!!!!!!!
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (!response.ok) {
                    throw new Error('Token invalide ou expiré');
                }
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
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password: formData.password }),
            });

            if (response.ok) {
                toast.success('Mot de passe réinitialisé avec succès !');
                router.push('/login');
            } else {
                const errorData = await response.json();
                setError({ general: errorData.message || 'Erreur lors de la réinitialisation du mot de passe' });
            }
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe :', error);
            setError({ general: 'Erreur lors de la réinitialisation du mot de passe' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border px-4 py-8 mx-auto mt-[10%] sm:w-[400px] flex flex-col gap-2"
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
