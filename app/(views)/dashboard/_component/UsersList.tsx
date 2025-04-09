import { UserType } from "@/lib/types/schemas_interfaces";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UpdateUserStatus from "./UpdateUserStatus";

export default function UserTable({
    fetchedUsers,
}: {
    fetchedUsers: UserType[];
}) {

    return (
        <div className="my-6">
            <h2 className="mb-4 text-xl font-bold">Liste des utilisateurs</h2>
            <Table>
                <TableCaption>
                    Liste des utilisateurs enregistrés dans l&apos;application
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date de création</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fetchedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <UpdateUserStatus userId={user.id} currentStatus={user.status} />
                            </TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
