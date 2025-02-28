import { signOut } from "next-auth/react";
import API_ROUTES from "../constants/api_routes";


export async function fetchUserProfileAPI() {
    try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
            throw new Error("Utilisateur non trouvé");
        }
        return await response.json();
    } catch (error) {
        console.error("[API_ERROR] fetchUserProfileAPI", error);
        throw error;
    }
}


export async function deleteProfileAPI(userId: string, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.user.profile, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({ id: userId }),
        });

        if (response.ok) {
            signOut();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Une erreur est survenue lors de la suppression.");
        }
    } catch (error) {
        console.error("[API_ERROR] deleteProfileAPI", error);
        throw error;
    }
}

export async function resetPasswordAPI(password: string, newPassword: string, confirmNewPassword: string, csrfToken: string) {
    try {
        const response = await fetch( API_ROUTES.user.profile, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({ password, newPassword, confirmNewPassword }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Une erreur est survenue lors de la modification du mot de passe.");
        }
    } catch (error) {
        console.error("[API_ERROR] resetPasswordAPI", error);
        throw error;
    }
}

export async function verifyResetTokenAPI(token: string | string[]) {
    try {
        const response = await fetch( API_ROUTES.resetPassword.verifyToken, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            throw new Error("Token invalide ou expiré");
        }
    } catch (error) {
        console.error("[API_ERROR] verifyResetTokenAPI", error);
        throw error;
    }
}

export async function resetForgottenPasswordAPI(token: string | string[], password: string) {
    try {
        const response = await fetch( API_ROUTES.resetPassword.resetPassword, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la réinitialisation du mot de passe");
        }
    } catch (error) {
        console.error("[API_ERROR] resetForgottenPasswordAPI", error);
        throw error;
    }
}

