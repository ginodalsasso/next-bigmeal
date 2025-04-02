import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
    loadingText?: string; // Texte affiché pendant le chargement
    defaultText?: string; // Texte par défaut du bouton
    className?: string; // Classes CSS supplémentaires
    variant?: "success" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "edit" | "delete" | "cancel" | null | undefined; // Variantes de style du bouton
}

export default function FormSubmitButton ({
    loadingText = "Chargement...",
    defaultText = "Soumettre",
    className,
    variant = "success",
}: FormSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className={className}
            variant={variant}
        >
            {pending ? loadingText : defaultText}
        </Button>
    );
}
