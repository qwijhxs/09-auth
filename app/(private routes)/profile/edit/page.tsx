"use client"

import css from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const setUser = useAuthStore(
        (state) => state.setUser
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        setUser(await updateMe({
            username: (event.currentTarget.elements as unknown as { username: HTMLInputElement }).username.value, // New username.
            email: user?.email as string
        }));

        router.push("/profile");
    };

    return (
        <div className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                {user?.avatar &&
                    <Image
                        src={user?.avatar as string}
                        alt={`${user?.username} avatar.`}
                        width={120}
                        height={120}
                        className={css.avatar}
                    />}

                <form className={css.profileInfo} onSubmit={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            defaultValue={user?.username}
                            required
                        />
                    </div>

                    <p>Email: {user?.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton} onClick={() => router.push("/profile")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}