import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
    title: "404 - Page not found",
    description: "The page doesn't exist.",
    openGraph: {
        title: "404 - Page not found",
        description: "The page doesn't exist.",
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

export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
}