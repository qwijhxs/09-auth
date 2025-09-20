// components/NoteForm/NoteForm.tsx
'use client';

import { useState } from 'react';
import { createNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteCreated: (note: Note) => void;
  onCancel?: () => void; // Додано onCancel
}

export default function NoteForm({ 
  isOpen, 
  onClose, 
  onNoteCreated, 
  onCancel 
}: NoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Функція для закриття форми
  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Викликаємо onCancel якщо він переданий
    } else {
      onClose(); // Інакше викликаємо стандартне onClose
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as string;

    try {
      const newNote = await createNote(title, content, tag);
      onNoteCreated(newNote);
      onClose();
      e.currentTarget.reset();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={handleCancel}>
      <div className={css.formContainer} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>Create New Note</h2>
        
        {error && <div className={css.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className={css.input}
              disabled={isLoading}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              required
              rows={4}
              className={css.textarea}
              disabled={isLoading}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              required
              className={css.input}
              disabled={isLoading}
            />
          </div>

          <div className={css.buttons}>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={css.submitButton}
            >
              {isLoading ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}