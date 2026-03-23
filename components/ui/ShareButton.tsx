import { Share2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type ShareButtonProps = {
    className?: string;
    title: string;
    text: string;
    url: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url, className }) => {

    const handleShareData = async (title: string, text: string, url: string) => {
        const shareData = {
            title: title,
            text: text,
            url: url,
        };

        navigator.share(shareData).catch((error) => {
            console.error("Erreur de partage :", error);
            toast.error("Le partage a échoué");
        });
    }

    // _________________________ RENDU _________________________
    return (
        <>
            <Share2 
                size={20}
                className={`cursor-pointer transition-colors ${className}`}
                onClick={() => handleShareData(title, text, url)}
            />
        </>
    )
}

export default ShareButton;

