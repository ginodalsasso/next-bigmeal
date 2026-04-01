import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Profile from "../_component/Profile";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user?.id) return notFound();

    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            shoppingList: {
                take: 10,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    comment: true,
                    createdAt: true,
                    items: {
                        orderBy: { ingredient: { categoryIngredient: { name: "asc" } } },
                        select: {
                            id: true,
                            quantity: true,
                            unit: true,
                            ingredient: { select: { id: true, name: true } },
                            meal: { select: { id: true, name: true } },
                            product: { select: { id: true, name: true } },
                        },
                    },
                },
            },
        },
    });

    if (!user) return notFound();

    return (
        <Profile
            user={{
                ...user,
                email: user.email ?? "",
                role: user.role ?? "USER",
            }}
        />
    );
}
