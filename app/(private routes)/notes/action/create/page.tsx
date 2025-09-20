import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Note } from '@/types/note';

export const metadata: Metadata = {
  title: "Create New Note - NoteHub",
  description: "Create a new note in NoteHub. Write and organize your thoughts with our easy-to-use note creation form.",
  openGraph: {
    title: "Create New Note - NoteHub",
    description: "Create a new note in NoteHub. Write and organize your thoughts with our easy-to-use note creation form.",
    url: "https://your-app-url.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Create New Note",
      },
    ],
    type: "website",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } onNoteCreated={function (note: Note): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
    </main>
  );
}