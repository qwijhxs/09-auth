"use client"

import css from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type AuthRequest } from "@/types/user";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from "@/app/api/api";

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const setUser = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData): Promise<void> => {
        try {
            const formValues = Object.fromEntries(formData) as unknown as AuthRequest;
            const response = await login(formValues);

            if (response) {
                setUser(response);
                router.push("/profile");
            } else {
                setError("Invalid email or password.");
            }
        } catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                (error as ApiError).message ??
                "Something went wrong..."
            );
        }
    };

    return (
        <div className={css.mainContent}>
            <form className={css.form} action={handleSubmit}>
                <h1 className={css.formTitle}>Sign in</h1>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} minLength={6} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Log in
                    </button>
                </div>

                <p className={css.error}>{error}</p>
            </form>
        </div>
    );
}