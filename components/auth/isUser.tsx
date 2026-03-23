import { useSession } from "next-auth/react";

interface IsUserProps {
    children: React.ReactNode;
}

const IsUser = ({ children }: IsUserProps) => {
    const { data: session, status } = useSession();
    const user = session?.user;

    // Vérifie si l'utilisateur est authentifié et a le rôle 'USER' ou 'ADMIN'
    if (status === "authenticated" && user?.role === "USER" || user?.role === "ADMIN") {
        // Rend les enfants si l'utilisateur est un administrateur
        return <>{children}</>;
    }

    // Ne rend rien si l'utilisateur n'est pas un administrateur
    return null;
};  

export default IsUser;
