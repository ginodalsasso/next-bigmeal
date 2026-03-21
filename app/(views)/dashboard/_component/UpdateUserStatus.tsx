"use client";

import { useState } from "react";
import { UserStatus } from "@/lib/types/enums";
import { updateUserStatusAPI } from "@/lib/services/user_service";
import { getCsrfToken } from "next-auth/react";

const statusStyles: Record<UserStatus, string> = {
    APPROVED: "bg-warm-accent/15 text-warm-primary border-warm-accent/30",
    PENDING:  "bg-warm-accent/10 text-warm-primary border-warm-border",
    REJECTED: "bg-warm-danger/10 text-warm-danger border-warm-danger/20",
    BLOCKED:  "bg-warm-border text-warm-secondary border-warm-border-strong",
};

interface UpdateUserStatusProps {
    userId: string;
    currentStatus: UserStatus;
}

export default function UpdateUserStatus({ userId, currentStatus }: UpdateUserStatusProps) {
    const [status, setStatus] = useState<UserStatus>(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus: UserStatus) => {
        setLoading(true);
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) return;
            await updateUserStatusAPI(userId, newStatus, csrfToken);
            setStatus(newStatus);
        } catch (error) {
            console.error("[UPDATE_USER_STATUS]", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as UserStatus)}
                disabled={loading}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-warm-accent disabled:opacity-50 ${statusStyles[status]}`}
            >
                {Object.values(UserStatus).map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
            {loading && (
                <span className="text-xs text-warm-secondary">…</span>
            )}
        </div>
    );
}
