export async function registerUserAPI(email: string, password: string) {
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Une erreur est survenue lors de l'inscription.");
        }
    } catch (error) {
        console.error("[API_ERROR] registerUserAPI", error);
        throw error;
    }
}

export async function sendForgotPasswordEmailAPI(email: string) {
    try {
        const response = await fetch("/api/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipient: email }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Une erreur est survenue lors de l'envoi de l'email.");
        }
    } catch (error) {
        console.error("[API_ERROR] sendForgotPasswordEmail", error);
        throw error;
    }
}
