import { Unit } from "@prisma/client";
import { UserType } from "./schemas_interfaces";

export type MessageResponse = { message: string };
export type UserListItem = Pick<UserType, 'id' | 'email' | 'role' | 'status' | 'createdAt'>;

export type UserProfileResponse = {
    id: string;
    email: string | null;
    role: string | null;
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
