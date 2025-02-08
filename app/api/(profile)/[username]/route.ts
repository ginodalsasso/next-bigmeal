import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";

type Props = {
    params: Promise<{ username: string }>;
};

export async function GET(req: NextRequest, { params }: Props) {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;
        
        const { username } = await params;

        // Vérification que l'utilisateur connecté correspond au username demandé
        const user = await db.user.findUnique({
            where: { email:  email },
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
        // Si l'utilisateur connecté ne correspond pas à l'utilisateur demandé
        if (user.id !== session.userId) {
            return NextResponse.json(
                { error: "Forbidden: Access denied" },
                { status: 403 }
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
