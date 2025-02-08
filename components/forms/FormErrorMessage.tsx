"use client";

import React from "react";

interface FormErrorMessageProps {
    message?: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return <p className="error-form">{message}</p>;
};

export default FormErrorMessage;
