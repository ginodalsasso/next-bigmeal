import { verifySession } from "@/lib/dal";

export async function GET() {
    const response = await verifySession();

    if (!response.isAuth) {
        return response;  
    }

    return new Response(JSON.stringify({ data: "Authorized access" }), { status: 200 });
}
