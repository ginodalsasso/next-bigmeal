import React, { createContext, useContext, useEffect, useState } from "react";

const CsrfContext = createContext("");

export const CsrfProvider = ({ children }: { children: React.ReactNode }) => {
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch("/api/csrf-token");
                if (!response.ok) {
                    throw new Error(`Failed to fetch CSRF token. Status: ${response.status}`);
                }
                const data = await response.json();
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };
        fetchCsrfToken();
    }, []);

    return (
        <CsrfContext.Provider value={csrfToken}>
            {children}
        </CsrfContext.Provider>
    );
};

export const useCsrfToken = () => {
    return useContext(CsrfContext);
};
