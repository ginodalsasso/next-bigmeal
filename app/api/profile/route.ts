import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";

export async function GET() {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;

        // Vérification que l'utilisateur connecté correspond au username demandé
        const user = await db.user.findUnique({
            where: { email:  session.user.email },
            include: { 
                shoppingList: { 
                    include: { 
                        items: {
                            include: {
                                ingredient: true
                            }
                        }
                    }, 
                    orderBy: { createdAt: "desc" }
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
