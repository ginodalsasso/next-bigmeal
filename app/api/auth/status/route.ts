import { verifySession } from "@/lib/dal";

export async function GET() {
    try {
        const response = await verifySession();

        if (!response.isAuth) {
            return new Response(JSON.stringify({ isAuth: false }), { status: 401 });
        }

        return new Response(JSON.stringify({ isAuth: true, data: "Authorized access" }), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la vérification de la session:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
