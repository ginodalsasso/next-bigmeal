import { useSession } from "next-auth/react";

interface IsNotAuthenticatedProps {
    children: React.ReactNode;
}

const IsNotAuthenticated = ({ children }: IsNotAuthenticatedProps) => {
    const { status } = useSession();

    if (status === "unauthenticated") {
        return <>{children}</>;
    };  

    return null;
}

export default IsNotAuthenticated;

