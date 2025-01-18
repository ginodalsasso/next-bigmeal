import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/dal";

type Props = {
    params: Promise<{ username: string }>;
};

export async function GET(req: NextRequest, { params }: Props) {
    try {
        // Vérification de la session utilisateur
        const session = await verifySession();
        if (!session || !session.isAuth) {
            return NextResponse.json(
                { error: "Unauthorized: You must be logged in" },
                { status: 401 }
            );
        }

        // Récupération du paramètre username
        const { username } = await params;
        if (!username) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Vérification que l'utilisateur connecté correspond au username demandé
        const user = await db.user.findUnique({
            where: { username: username },
            include: { 
                shoppingList: { 
                    include: { 
                        items: {
                            include: {
                                ingredient: true
                            }
                        }
                    } 
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
