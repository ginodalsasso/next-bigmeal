import { getUser } from "@/lib/dal";

export async function GET() {
    try {
        const user = await getUser();

        if (!user) {
            return new Response(
                JSON.stringify({ isAuth: false, message: "Utilisateur non authentifié" }), { status: 200 }
            );
        }

        return new Response(
            JSON.stringify({ isAuth: true, user }), { status: 200 }
        );
    } catch (error) {
        console.error("Erreur dans l'API /api/auth/status :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}