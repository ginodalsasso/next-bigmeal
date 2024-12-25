import { db } from "@/lib/db";
// import { createSession } from "@/lib/session";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { username, password } = body;
        const hashedPassword = await hash(password, 10);

        const user = await db.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        });
        
        if(!user) {
            return new NextResponse("User not created", {status: 500});
        }
        
        // await createSession(user.id);
        
        return NextResponse.json(user, {status: 201});

    } catch(error) {
        console.log("[REGISTER]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
