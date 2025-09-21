"use client"

import css from "./ProfilePage.client.module.css";
import Link from "next/link";
import Image from "next/image";
import { type User } from "@/types/user";

interface Props {
    user: User
}

export default function ProfileClient({ user }: Props) {
    return (
        <div className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
	                <h1 className={css.formTitle}>Profile Page</h1>
	                <Link href="/profile/edit" className={css.editProfileButton}>
	                    Edit Profile
	                </Link>
	            </div>
                <div className={css.avatarWrapper}>
                    {user?.avatar &&
                        <Image
                            src={user?.avatar as string}
                            alt={`${user?.username} avatar.`}
                            width={120}
                            height={120}
                            className={css.avatar}
                        />}
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user?.username}
                    </p>
                    <p>
                        Email: {user?.email}
                    </p>
                </div>
            </div>
        </div>
    );
}