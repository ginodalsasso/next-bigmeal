"use client";

import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface PasswordInputProps {
    id?: string;
    name?: string;
    label?: string | null;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    autoComplete?: string;
}

export default function PasswordInput({
    id = "password",
    name = "password",
    label,
    placeholder = "••••••••",
    value,
    onChange,
    error,
    required = true,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            {label && (
                <label htmlFor={id} className="block font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete="current-password"
                    className="input-text-select mt-1 w-full pr-10 shadow-sm"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-[55%] -translate-y-1/2 text-gray-600"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <FormErrorMessage message={error} />
        </div>
    );
}
