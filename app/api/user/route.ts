import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/security/getSession";

export async function GET() {
    try {
        // Vérification que l'utilisateur connecté est un administrateur
        await getAdminSession();

        // Récupération de tous les utilisateurs
        const users = await db.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });   

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error("[FETCH_USERS_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}