import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
    loadingText?: string;
    defaultText?: string;
    className?: string;
    isPending?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "edit" | "delete" | "cancel" | null | undefined;
}

export default function FormSubmitButton ({
    loadingText = "Chargement...",
    defaultText = "Soumettre",
    className,
    isPending,
    variant = "default",
}: FormSubmitButtonProps) {
    const { pending } = useFormStatus();
    const isSubmitting = isPending ?? pending;

    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            className={className}
            variant={variant}
        >
            {isSubmitting ? loadingText : defaultText}
        </Button>
    );
}
