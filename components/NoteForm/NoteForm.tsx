"use client"

import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { NoteFormValues } from "@/types/note";

export default function NoteForm() {
    const formId = useId();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value
        });
    }

    const router = useRouter();
    const handleClose = (): void => router.back();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ title, content, tag }: NoteFormValues) => await createNote(title, content, tag),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["notes"] });

            clearDraft();
            handleClose();
        }
    });

    const handleSubmit = (formData: FormData): void => {
        mutation.mutate({
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            tag: formData.get("tag") as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
        });
    };

    return (
        <form className={css.form} action={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${formId}-title`}>Title</label>
                <input className={css.input} id={`${formId}-title`} type="text" name="title" value={draft?.title} onChange={handleChange} minLength={3} maxLength={50} required />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${formId}-content`}>Content</label>
                <textarea
                    className={css.textarea}
                    id={`${formId}-content`}
                    name="content"
                    value={draft?.content}
                    onChange={handleChange}
                    rows={8}
                    maxLength={500}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${formId}-tag`}>Tag</label>
                <select className={css.select} id={`${formId}-tag`} name="tag" value={draft?.tag} onChange={handleChange} required>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button
                    className={css.cancelButton}
                    type="button"
                    onClick={handleClose}
                >
                    Cancel
                </button>
                <button
                    className={css.submitButton}
                    type="submit"
                >
                    Create note
                </button>
            </div>
        </form>
    );
}