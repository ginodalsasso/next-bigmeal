import { auth } from "@/lib/auth";
import UsersList from "./_component/UsersList";
import { getUsers } from "@/lib/services/data_fetcher";
import { notFound, unauthorized } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default async function Dashboard() {
    const session = await auth();

    if (session?.user.role !== "ADMIN") unauthorized();
    if (!session) return notFound();

    const users = await getUsers();
    if (!users) return notFound();

    return (
        <div className="mx-auto max-w-4xl space-y-6">

            <header className="flex items-center gap-3 rounded-xl border border-warm-border bg-warm-subtle px-5 py-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-warm-accent/15">
                    <ShieldCheck size={20} className="text-warm-accent" aria-hidden="true" />
                </div>
                <div>
                    <h1 className="text-base font-semibold text-warm-primary">Dashboard admin</h1>
                    <p className="text-xs text-warm-secondary">
                        {users.length} utilisateur{users.length > 1 ? "s" : ""} enregistré{users.length > 1 ? "s" : ""}
                    </p>
                </div>
            </header>

            <UsersList fetchedUsers={users} />
        </div>
    );
}
