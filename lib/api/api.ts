import axios from "axios";
import { type Note } from "@/types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

if (!baseURL) {
  console.warn('NEXT_PUBLIC_API_URL is not set. Using default localhost:3000');
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

interface GetResponse {
  notes: Note[],
  totalPages: number
}

export async function fetchNotes(query: string, page: number, tag?: string): Promise<GetResponse> {
  const response = await api.get<GetResponse>("/notes", {
    params: {
      search: query,
      tag: tag,
      page: page,
      perPage: 12
    }
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(title: string, content: string, tag: string): Promise<Note> {
  const response = await api.post<Note>("/notes", {
    title,
    content,
    tag
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}