"use client"

import css from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type AuthRequest } from "@/types/user";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from "@/app/api/api";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const setUser = useAuthStore((state) => state.setUser)

    const handleSubmit = async (formData: FormData): Promise<void> => {
        try {
            const formValues = Object.fromEntries(formData) as unknown as AuthRequest;

            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(formValues.email)) {
                setError("Invalid email format.");
                return;
            }

            const response = await register(formValues);
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
            <h1 className={css.formTitle}>Sign up</h1>
	        <form className={css.form} action={handleSubmit}>
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
                        Register
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </div>
    );
}