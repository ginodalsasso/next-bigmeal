// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import type { Status } from "@prisma/client";
import type { Role } from "@/lib/types/schemas_interfaces";

declare module "next-auth" {
    interface User {
        role?: Role | null;
        status?: Status;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            role: Role;
            status: Status;
        };
    }

    interface JWT {
        id: string;
        role: Role;
        status: Status;
    }
}
