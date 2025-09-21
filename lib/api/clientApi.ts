import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>('/users/me'); // ← Виправлено ендпоінт
    return response.data;
  },

  updateProfile: async (data: { username: string }): Promise<User> => {
    const response = await api.patch<User>('/users/me', data);
    return response.data;
  },
};

export const notesApi = {
  fetchNotes: async (query: string, page: number, tag?: string): Promise<GetNotesResponse> => {
    const response = await api.get<GetNotesResponse>('/notes', {
      params: {
        search: query,
        tag: tag,
        page: page,
        perPage: 12
      }
    });
    return response.data;
  },

  fetchNoteById: async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  createNote: async (title: string, content: string, tag: string): Promise<Note> => {
    const response = await api.post<Note>('/notes', {
      title: title,
      content: content,
      tag: tag
    });
    return response.data;
  },

  deleteNote: async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  }
};

export const login = authApi.login;
export const register = authApi.register;
export const logout = authApi.logout;
export const getCurrentUser = authApi.getCurrentUser;
export const updateProfile = authApi.updateProfile;
export const fetchNotes = notesApi.fetchNotes;
export const fetchNoteById = notesApi.fetchNoteById;
export const createNote = notesApi.createNote;
export const deleteNote = notesApi.deleteNote;