import { FormEvent } from "react";
import { useCrudForm } from "@/app/hooks/useCrudForm";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import { Button } from "@/components/ui/button";
import { ChangeEmailConstraints } from "@/lib/constraints/forms_constraints";
import { updateEmailAPI } from "@/lib/services/user_service";

type ChangeEmailFormType = { userId: string; email: string };

const ChangeEmailForm = ({
    user,
    onSubmit,
    onBackToProfile,
}: {
    user: { id: string; email: string };
    onSubmit: (updatedEmail: string) => void;
    onBackToProfile: () => void;
}) => {
    const { error, submit, isLoading } = useCrudForm<ChangeEmailFormType>(
        ChangeEmailConstraints,
        ["email", "userId"]
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString() || "";
        await submit({
            form: { userId: user.id, email },
            apiCall: updateEmailAPI,
            onSuccess: () => onSubmit(email),
            successMessage: "Votre email a bien été modifié.",
            errorMessage: "Impossible de modifier l'email. Veuillez réessayer plus tard.",
            onClose: onBackToProfile,
        });
    };

    return (
        <div className="my-2">
            <p className="font-medium">Modification de l&apos;email</p>
            <form onSubmit={handleSubmit}>
                <FormErrorMessage message={error?.general} />

                <div className="flex flex-col gap-2">
                    <input
                        className="input-text-select"
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={user.email}
                        placeholder="Nouvel email"
                        autoComplete="off"
                        required
                    />
                    <FormErrorMessage message={error?.email} />

                    <div className="mt-2 flex gap-2">
                        <Button type="submit" className="flex-1" disabled={isLoading}>Enregistrer</Button>
                        <Button variant="cancel" onClick={onBackToProfile} className="flex-1">
                            Annuler
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangeEmailForm;
