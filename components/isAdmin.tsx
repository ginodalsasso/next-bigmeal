import { useAuth } from "@/app/context/AuthContext";

interface IsAdminProps {
    children: React.ReactNode;
}

const IsAdmin = ({ children }: IsAdminProps) => {
    const { user, isAuth } = useAuth();

    // Vérifie si l'utilisateur est authentifié et a le rôle 'ADMIN'
    if (isAuth && user?.role === "ADMIN") {
        // Rend les enfants si l'utilisateur est un administrateur
        return <>{children}</>;
    }

    // Ne rend rien si l'utilisateur n'est pas un administrateur
    return null;
};

export default IsAdmin;
