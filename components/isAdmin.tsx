import { useAuth } from "@/app/context/AuthContext";

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuth } = useAuth();

    if (!isAuth || user?.role !== "ADMIN") {
        return <div>Accès refusé. Vous devez être administrateur.</div>;
    }

    return <>{children}</>;
};

export default IsAdmin;