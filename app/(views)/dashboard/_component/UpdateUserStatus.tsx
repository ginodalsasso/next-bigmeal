"use client";

import { useState } from "react";
import { UserStatus } from "@/lib/types/enums";
import { updateUserStatusAPI } from "@/lib/services/user_service";
import { useCsrfToken } from "@/app/hooks/useCsrfToken";

interface UpdateUserStatusProps {
    userId: string; 
    currentStatus: UserStatus;
}

export default function UpdateUserStatus({ userId, currentStatus }: UpdateUserStatusProps) {
    const csrfToken = useCsrfToken(); 
    const [status, setStatus] = useState<UserStatus>(currentStatus); 
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus: UserStatus) => {
        setLoading(true);

        if (!csrfToken) {
            console.error("CSRF token invalide");
            return;
        }

        try {
        
            await updateUserStatusAPI(userId, newStatus, csrfToken);
            const updatedStatus = newStatus;
    
            setStatus(updatedStatus);
        
        } catch (error) {
            console.error("[UPDATE_USER_STATUS]", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as UserStatus)}
                className="input-text-select"
                disabled={loading}
            >
                {Object.values(UserStatus).map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}  
            </select>
            {loading && <span className="text-sm text-gray-500">Mise à jour...</span>}
        </div>
    );
}
