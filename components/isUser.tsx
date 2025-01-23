import { useAuth } from "@/app/context/AuthContext";

interface IsUserProps {
    children: React.ReactNode;
}

const IsUser = ({ children }: IsUserProps) => {
    const { user, isAuth } = useAuth();

    // Vérifie si l'utilisateur est authentifié et a le rôle 'USER' ou 'ADMIN'
    if (isAuth && user?.role === "USER" || user?.role === "ADMIN") {
        // Rend les enfants si l'utilisateur est un administrateur
        return <>{children}</>;
    }

    return null;
};  

export default IsUser;

