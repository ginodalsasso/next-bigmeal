import React from "react";

import { useCrudForm } from "@/app/hooks/useCrudForm";
import { Button } from "@/components/ui/button";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import FormSubmitButton from "@/components/ui/FormSubmitButton";
import PasswordInput from "@/components/forms/PasswordInput";

import { ResetPasswordConstraints } from "@/lib/constraints/forms_constraints";
import { resetPasswordAPI } from "@/lib/services/user_service";

type ResetPasswordFormType = { password: string; newPassword: string; confirmNewPassword: string };

const ResetPasswordForm = ({ onBackToProfile }: { onBackToProfile: () => void }) => {
    const { error, setError, submit, isLoading } = useCrudForm<ResetPasswordFormType>(
        ResetPasswordConstraints,
        ["password"]
    );

    const handleResetPassword = async (formData: FormData) => {
        const password = formData.get("password")?.toString() || "";
        const newPassword = formData.get("new-password")?.toString() || "";
        const confirmNewPassword = formData.get("confirm-password")?.toString() || "";

        if (newPassword !== confirmNewPassword) {
            setError({ password: "Les mots de passe ne correspondent pas." });
            return;
        }

        await submit({
            form: { password, newPassword, confirmNewPassword },
            apiCall: (form, csrf) => resetPasswordAPI(form.password, form.newPassword, form.confirmNewPassword, csrf),
            onSuccess: () => {},
            successMessage: "Votre mot de passe a bien été modifié.",
            errorMessage: "Impossible de modifier le mot de passe. Veuillez réessayer plus tard.",
            onClose: onBackToProfile,
        });
    };

    return (
        <div className="space-y-3">
            <form className="card space-y-3" onSubmit={async (e) => { e.preventDefault(); await handleResetPassword(new FormData(e.currentTarget)); }}>
                <FormErrorMessage message={error?.general} />

                <PasswordInput
                    id="password"
                    name="password"
                    label="Mot de passe actuel"
                    placeholder="••••••••"
                    autoComplete="off"
                    required
                    error={error?.password}
                />
                <FormErrorMessage message={error?.password} />

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="new-password" className="text-sm font-medium text-warm-primary">
                        Nouveau mot de passe
                    </label>
                    <input
                        className="input-text-select"
                        type="password"
                        id="new-password"
                        name="new-password"
                        placeholder="••••••••"
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="confirm-password" className="text-sm font-medium text-warm-primary">
                        Confirmer le nouveau mot de passe
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
                </div>

                <FormSubmitButton className="w-full" defaultText="Modifier le mot de passe" isPending={isLoading} />
            </form>

            <Button variant="secondary" className="w-full" onClick={onBackToProfile}>
                Retour au profil
            </Button>
        </div>
    );
};

export default ResetPasswordForm;
