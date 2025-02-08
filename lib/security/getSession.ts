'server-only';

import { NextResponse } from "next/server";
import { auth } from "../auth";

export async function getAdminSession() {
    const session = await auth();
    if (!session) {
        return { error: new NextResponse(null, { status: 302, headers: { Location: "/login" } }) };
    }
    if (session.user.role !== "ADMIN") {
        return { error: new NextResponse("Unauthorized", { status: 401 }) };
    }
    return { session };
}