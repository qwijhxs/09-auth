'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteCreated?: (note: Note) => void;
}

interface NoteFormData {
  title: string;
  content: string;
  tag: string;
}

export default function NoteForm({ 
  isOpen, 
  onClose, 
  onNoteCreated 
}: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    content: '',
    tag: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteData: NoteFormData) =>
      createNote(noteData.title, noteData.content, noteData.tag),
    onSuccess: (newNote: Note) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setFormData({ title: '', content: '', tag: '' });
      onNoteCreated?.(newNote);
      onClose();
      router.back();
    },
    onError: (err: unknown) => {
      const error = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };
      setError(error.response?.data?.message || error.message || 'Failed to create note');
      console.error('Error creating note:', err);
    }
  });

  const handleCancel = () => {
    setFormData({ title: '', content: '', tag: '' });
    onClose();
    router.back();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    mutation.mutate(formData);
  };

  const handleInputChange = (field: keyof NoteFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
            disabled={mutation.isPending}
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
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              className={css.input}
              disabled={mutation.isPending}
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
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              required
              rows={6}
              className={css.textarea}
              disabled={mutation.isPending}
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
              value={formData.tag}
              onChange={(e) => handleInputChange('tag', e.target.value)}
              className={css.input}
              disabled={mutation.isPending}
              placeholder="Optional tag (e.g. work, personal)"
              maxLength={50}
            />
          </div>

          <div className={css.buttons}>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className={css.submitButton}
            >
              {mutation.isPending ? (
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