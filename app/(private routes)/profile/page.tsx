import { Metadata } from "next";
import { getServerMe } from "@/lib/api/serverApi";
import ProfileClient from "./ProfilePage.client";

export const metadata: Metadata = {
    title: "Profile",
    description: "Your profile on NoteHub!",
    openGraph: {
        title: "Profile",
        description: "Your profile on NoteHub!",
        url: `${process.env.NEXT_PUBLIC_API_URL}`,
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub icon."
            }
        ]
    }
};

export default async function Profile() {
    return <ProfileClient user={await getServerMe()} />;
}