"use client";

import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Note } from '@/types/note';
import { useRouter } from 'next/navigation';

export default function CreateNote() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/notes');
  };

  const handleNoteCreated = (note: Note) => {
    router.push(`/notes/${note.id}`);
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm 
          isOpen={true} 
          onClose={handleClose} 
          onNoteCreated={handleNoteCreated} 
        />
      </div>
    </main>
  );
}