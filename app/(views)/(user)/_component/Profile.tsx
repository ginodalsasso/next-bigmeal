"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogOut, User } from "lucide-react";
import { Unit } from "@prisma/client";
import UserInformation from "./UserInformation";
import ShoppingLists from "./ShoppingLists";

type ProfileUser = {
    id: string;
    email: string;
    role: string;
    createdAt: Date;
    shoppingList: {
        id: string;
        comment: string | null;
        createdAt: Date;
        items: {
            id: string;
            quantity: number;
            unit: Unit | null;
            ingredient: { id: string; name: string } | null;
            meal: { id: string; name: string } | null;
            product: { id: string; name: string } | null;
        }[];
    }[];
};

export default function Profile({ user: initialUser }: { user: ProfileUser }) {
    const [email, setEmail] = useState(initialUser.email);

    return (
        <div className="mx-auto max-w-2xl space-y-4">

            <div className="flex items-center justify-between rounded-xl border border-warm-border bg-warm-subtle p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-warm-accent/15">
                        <User size={22} className="text-warm-accent" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-warm-primary">Mon profil</p>
                        <p className="text-xs text-warm-secondary">{email}</p>
                    </div>
                </div>
                <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    size="sm"
                    className="text-warm-danger hover:bg-warm-danger/10 hover:text-warm-danger"
                >
                    <LogOut size={15} aria-hidden="true" />
                    Déconnexion
                </Button>
            </div>

            <Tabs defaultValue="profile">
                <TabsList className="mb-2 w-full">
                    <TabsTrigger value="profile" className="flex-1">
                        Informations
                    </TabsTrigger>
                    <TabsTrigger value="shoppingList" className="flex-1">
                        Listes de courses
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <UserInformation
                        user={{ ...initialUser, email }}
                        onEmailUpdate={setEmail}
                    />
                </TabsContent>
                <TabsContent value="shoppingList">
                    <ShoppingLists shoppingLists={initialUser.shoppingList} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
