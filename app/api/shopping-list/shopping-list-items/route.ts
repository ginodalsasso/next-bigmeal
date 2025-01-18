import { getUserCart } from "@/lib/dal";

export async function GET() {
    try {
        const data = await getUserCart();

        if(!data) {
            return new Response(
                JSON.stringify({ totalCartQuantity: 0 }),
                { status: 200 }
            );
        }
        
        return new Response(
            JSON.stringify({ totalCartQuantity: data }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur dans l'API /api/auth/status :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
