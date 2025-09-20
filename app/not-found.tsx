import css from "./page.module.css";

export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Not Found - NoteHub",
  description: "The page you are looking for does not exist. Return to NoteHub to manage your notes and continue organizing your ideas.",
  openGraph: {
    title: "Page Not Found - NoteHub",
    description: "The page you are looking for does not exist. Return to NoteHub to manage your notes and continue organizing your ideas.",
    url: "https://your-app-url.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Page Not Found",
      },
    ],
    type: "website",
  },
};