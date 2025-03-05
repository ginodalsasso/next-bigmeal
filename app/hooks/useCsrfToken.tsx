// context/CsrfTokenContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { getCsrfToken } from "next-auth/react";

const CsrfTokenContext = createContext<string | null>(null);

export const CsrfTokenProvider = ({ children }: { children: React.ReactNode }) => {
    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            if (!csrfToken) {
                const token = await getCsrfToken();
                setCsrfToken(token);
            }
        };
        fetchCsrfToken();
    }, [csrfToken]); // appel uniquement si csrfToken est null

    return (
        <CsrfTokenContext.Provider value={csrfToken}>
            {children}
        </CsrfTokenContext.Provider>
    );
};

// utilisation du contexte CSRF ex: const csrfToken = useCsrfToken();
export const useCsrfToken = () => {
    return useContext(CsrfTokenContext);
};
