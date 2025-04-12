import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserSession } from "@/lib/security/getSession";
import { hash, verify } from "argon2";
import { verifyCSRFToken } from "@/lib/security/verifyCsrfToken";
import { ChangeEmailConstraints, idConstraints } from "@/lib/constraints/forms_constraints";

export async function GET() {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;

        // Vérification que l'utilisateur connecté correspond au username demandé
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            include: {
                shoppingList: {
                    include: {
                        items: {
                            include: {
                                ingredient: true,
                                meal: true,
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
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
        console.error("[FETCH_USER_ERROR]", error);
        return new Response(JSON.stringify({ 
            message: 'Erreur serveur, veuillez réessayer plus tard' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();
        const { password, newPassword, confirmNewPassword } = body;

        if (!password || !newPassword || !confirmNewPassword) {
            return new NextResponse("Tous les champs sont requis", { status: 400 });
        }
        
        if (newPassword !== confirmNewPassword) {
            return new NextResponse("Les mots de passe ne correspondent pas", { status: 400 });
        }

        // Vérification que l'utilisateur connecté existe
        const user = await db.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "Utilisateur introuvable" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Vérification du mot de passe actuel
        if (!user.password) {
            return new Response(
                JSON.stringify({ message: "Mot de passe actuel non défini" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        const isPasswordValid = await verify(user.password, password);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: "Mot de passe actuel incorrect" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hash du nouveau mot de passe
        const hashedPassword = await hash(newPassword);

        // Mise à jour du mot de passe
        await db.user.update({
            where: { email: session.user.email },
            data: { password: hashedPassword },
        });

        return new Response(
            JSON.stringify({ message: "Mot de passe mis à jour avec succès" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("UPDATE_PASSWORD_ERROR", error);
        return new Response(
            JSON.stringify({ message: "Erreur serveur, veuillez réessayer plus tard" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { session, error } = await getUserSession();
        if (error) return error;

        const csrfTokenVerified = await verifyCSRFToken(req);
        if (!csrfTokenVerified) {
            return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
        }

        const body = await req.json();
        const { userId, email } = body.userData;        

        const validationResult = ChangeEmailConstraints.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { error: validationResult.error.format() },
                { status: 400 }
            );
        }
        
        if (session.user.id !== userId) {
            return new NextResponse("Vous n'avez pas les droits pour cette action", { status: 403 });
        }

        // Vérifier si l'email existe déjà
        const existingUser = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUser && existingUser.id !== session.user.id) {
            return new NextResponse(
                JSON.stringify({ message: "Cet email est déjà utilisé par un autre compte" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        await db.user.update({
            where: { id: session.user.id },
            data: { email: email },
        });

        return new Response(
            JSON.stringify({ message: "Email mis à jour avec succès" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("UPDATE_EMAIL_ERROR", error);
        return new Response(
            JSON.stringify({ message: "Erreur serveur, veuillez réessayer plus tard" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

}


export async function DELETE(req: NextRequest) {
        try {
            const { session, error } = await getUserSession();
            if (error) return error;
            
            const csrfTokenVerified = await verifyCSRFToken(req);
            if (!csrfTokenVerified) {
                return new NextResponse("CSRF Token is missing or invalid", { status: 403 });
            }
    
            const body = await req.json();

            if (session.user.id !== body.id) {
                return new NextResponse("Vous n'avez pas les droits pour cette action", { status: 403 });
            }
    
            const validationResult = idConstraints.safeParse(body);
    
            if (!validationResult.success) {
                return NextResponse.json(
                    { error: validationResult.error.format() },
                    { status: 400 }
                );
            }
    
            const { id } = validationResult.data;
            await db.user.delete({ where: { id } });
    
            return NextResponse.json({ message: "Utilisateur supprimé" }, {status: 200});
        } catch (error) {
            console.error("[DELETE_USER_ERROR]", error);
            return new Response(JSON.stringify({ 
                message: 'Erreur serveur, veuillez réessayer plus tard' 
            }), { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
    