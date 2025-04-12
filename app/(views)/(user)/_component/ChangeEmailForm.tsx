import { useFormValidation } from "@/app/hooks/useFormValidation";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { Button } from "@/components/ui/button";
import { ChangeEmailConstraints } from "@/lib/constraints/forms_constraints";
import { updateEmailAPI } from "@/lib/services/user_service";
import { UserType } from "@/lib/types/schemas_interfaces";
import { getCsrfToken } from "next-auth/react";
import { toast } from "sonner";

const ChangeEmailForm = ({
    user,
    onSubmit,
    onBackToProfile,
}: {
    user: UserType;
    onSubmit: (updatedEmail: string) => void;
    onBackToProfile: () => void;
}) => {
    // _________________________ ETATS _________________________
    // Utilisation du hook de validation
    const { error, setError, validate } = useFormValidation(
        ChangeEmailConstraints,
        ["email"] // Liste des champs à valider
    );

    const handlesumbit = async (formData: FormData) => {
        const newEmail = formData.get("email")?.toString() || "";
        
        const form = {
            userId: user.id,
            email: newEmail,
        };
    
        if (!validate(form)) {
            setError({ general: "Veuillez saisir un email valide." });
            return;
        }
    
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("CSRF token invalide");
                return;
            }
            
            await updateEmailAPI(form, csrfToken);
            
            // Utiliser l'email du formulaire pour mettre à jour l'état
            onSubmit(newEmail);
            
            toast.success("Votre email a bien été modifié.");
            onBackToProfile();
        } catch (error) {
            console.error("Erreur lors de la modification de l'email :", error);
            setError({
                general: "Impossible de modifier l'email. Veuillez réessayer plus tard.",
            });
        }
    };

    return (
        <div className="my-2">
            <p className="font-medium">Modification de l&apos;email</p>
            <form action={handlesumbit}>
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

                    <div className="flex gap-2 mt-2">
                        <Button type="submit" className="flex-1">
                            Enregistrer
                        </Button>
                        <Button
                            variant="cancel"
                            onClick={onBackToProfile}
                            className="flex-1"
                        >
                            Annuler
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangeEmailForm;
