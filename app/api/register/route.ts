import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { username, password } = body;

        const user = await db.user.create({
            data: {
                username,
                password: await hash(password, 10),
            }
        });
        return NextResponse.json(user, {status: 201});
    } catch(error) {
        console.log("[REGISTER]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
