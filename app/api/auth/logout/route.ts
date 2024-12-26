import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";
import { verifySession } from "@/lib/dal";

export async function POST() {

    const session = await verifySession();

    if (!session) {
        return new Response(null, { status: 401 });
    }

    // // Check if the user has the 'admin' role
    // if (session.user.role !== "admin") {
    //     // User is authenticated but does not have the right permissions
    //     return new Response(null, { status: 403 });
    // }

    await deleteSession();
    return NextResponse.json({ success: true });
}
