import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
    loadingText?: string; // Texte affiché pendant le chargement
    defaultText?: string; // Texte par défaut du bouton
    className?: string; // Classes CSS supplémentaires
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "edit" | "delete" | "cancel" | null | undefined;
}

export default function FormSubmitButton ({
    loadingText = "Chargement...",
    defaultText = "Soumettre",
    className,
    variant = "default",
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
