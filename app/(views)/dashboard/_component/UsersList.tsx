import { UserListItem } from "@/lib/types/api_responses";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UpdateUserStatus from "./UpdateUserStatus";

export default function UsersList({ fetchedUsers }: { fetchedUsers: UserListItem[] }) {
    return (
        <div className="overflow-hidden rounded-xl border border-warm-border bg-warm-subtle">
            <div className="border-b border-warm-border px-4 py-3">
                <h2 className="text-sm font-semibold text-warm-primary">
                    Utilisateurs
                </h2>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Inscription</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fetchedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="text-warm-primary">{user.email}</TableCell>
                            <TableCell>
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                    user.role === "ADMIN"
                                        ? "bg-warm-accent/15 text-warm-primary"
                                        : "bg-warm-border text-warm-secondary"
                                }`}>
                                    {user.role === "ADMIN" ? "Admin" : "Utilisateur"}
                                </span>
                            </TableCell>
                            <TableCell>
                                <UpdateUserStatus userId={user.id} currentStatus={user.status} />
                            </TableCell>
                            <TableCell className="text-warm-secondary">
                                {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
