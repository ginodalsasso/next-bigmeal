import { useState, useEffect } from "react";
import { getCsrfToken } from "next-auth/react";

export const useCsrfToken = () => {
    const [csrfToken, setCsrfToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const token = await getCsrfToken();
            setCsrfToken(token);
        };
        fetchCsrfToken();
    }, []);

    return csrfToken;
};