// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        role?: string;
        status?: UserStatus;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            role: string;
            status: UserStatus;
        };
    }

    interface JWT {
        id: string;
        role: string;
        status: UserStatus;
    }
}
