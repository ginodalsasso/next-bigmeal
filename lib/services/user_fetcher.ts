"use server";

import { cookies } from "next/headers";
import API_ROUTES from "../constants/api_routes";

export async function getUsers() {
    try {
        const cookie = await cookies();
        const response = await fetch(API_ROUTES.user.user, {
            cache: "no-store",
            headers: {
                'Cookie': cookie.toString()
            }
        });
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs.");
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Impossible de récupérer les utilisateurs.");
    }
}
