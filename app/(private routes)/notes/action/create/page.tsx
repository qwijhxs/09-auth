import css from "./CreateNote.module.css";
import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
    title: "Create a Note",
    description: "The form for creating a new note.",
    openGraph: {
        title: "Create a Note",
        description: "The form for creating a new note.",
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

export default async function CreateNote() {
    return (
        <div className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </div>
    );
}