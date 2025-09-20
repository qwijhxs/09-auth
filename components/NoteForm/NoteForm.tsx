'use client';

import { useState } from 'react';
import { createNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteCreated: (note: Note) => void;
  onCancel?: () => void;
}

export default function NoteForm({ 
  isOpen, 
  onClose, 
  onNoteCreated, 
  onCancel 
}: NoteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
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
    const newNote = await createNote(title, content, tag || '');
    
    onNoteCreated(newNote);
    onClose();
    e.currentTarget.reset();
  } catch (err) {
    const error = err as {
      response?: {
        data?: {
          message?: string;
        };
      };
      message?: string;
    };
    
    setError(error.response?.data?.message || error.message || 'Failed to create note');
    console.error('Error creating note:', error);
  } finally {
    setIsLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.formContainer}>
        <div className={css.header}>
          <h2 className={css.title}>Create New Note</h2>
          <button
            type="button"
            onClick={handleCancel}
            className={css.closeButton}
            disabled={isLoading}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        {error && (
          <div className={css.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title" className={css.label}>
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className={css.input}
              disabled={isLoading}
              placeholder="Enter note title"
              maxLength={100}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content" className={css.label}>
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={6}
              className={css.textarea}
              disabled={isLoading}
              placeholder="Write your note content here..."
              maxLength={1000}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag" className={css.label}>
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              className={css.input}
              disabled={isLoading}
              placeholder="Optional tag (e.g. work, personal)"
              maxLength={50}
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
              {isLoading ? (
                <>
                  <span className={css.spinner}></span>
                  Creating...
                </>
              ) : (
                'Create Note'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}