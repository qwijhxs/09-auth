import { api } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface SessionResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface NoteResponse {
  note: Note;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface UserResponse {
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

const getServerCookies = async (): Promise<string> => {
  const cookieStore = cookies();
  return cookieStore.toString();
};

export const checkSession = async (): Promise<ApiResponse<SessionResponse>> => {
  const serverCookies = await getServerCookies();
  
  return api.get<SessionResponse>('/auth/session', {
    headers: {
      Cookie: serverCookies,
    },
  });
};

export const serverAuthApi = {
  getCurrentUser: async (): Promise<UserResponse> => {
    const serverCookies = await getServerCookies();

    const response = await api.get<UserResponse>('/users/me', {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  login: async (credentials: LoginData): Promise<UserResponse> => {
    const serverCookies = await getServerCookies();

    const response = await api.post<UserResponse>('/auth/login', credentials, {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  register: async (userData: RegisterData): Promise<UserResponse> => {
    const serverCookies = await getServerCookies();

    const response = await api.post<UserResponse>('/auth/register', userData, {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    const serverCookies = await getServerCookies();

    await api.post('/auth/logout', {}, {
      headers: {
        Cookie: serverCookies,
      },
    });
  },
};

export const serverNotesApi = {
  getNotes: async (query: string = '', page: number = 1, tag?: string): Promise<NotesResponse> => {
    const serverCookies = await getServerCookies();
    
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    params.append('page', page.toString());
    if (tag) params.append('tag', tag);

    const response = await api.get<NotesResponse>(`/notes?${params.toString()}`, {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  getNoteById: async (id: string): Promise<NoteResponse> => {
    const serverCookies = await getServerCookies();

    const response = await api.get<NoteResponse>(`/notes/${id}`, {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  createNote: async (noteData: Partial<Note>): Promise<NoteResponse> => {
    const serverCookies = await getServerCookies();

    const response = await api.post<NoteResponse>('/notes', noteData, {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  updateNote: async (id: string, noteData: Partial<Note>): Promise<NoteResponse> => {
    const serverCookies = await getServerCookies();

    const response = await api.patch<NoteResponse>(`/notes/${id}`, noteData, {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  deleteNote: async (id: string): Promise<void> => {
    const serverCookies = await getServerCookies();

    await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: serverCookies,
      },
    });
  },

  getTags: async (): Promise<{ tags: string[] }> => {
    const serverCookies = await getServerCookies();

    const response = await api.get<{ tags: string[] }>('/notes/tags', {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },
};

export const serverUserApi = {
  updateProfile: async (userData: Partial<User>): Promise<UserResponse> => {
    const serverCookies = await getServerCookies();

    const response = await api.patch<UserResponse>('/users/me', userData, {
      headers: {
        Cookie: serverCookies,
      },
    });
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    const serverCookies = await getServerCookies();

    await api.patch('/users/me/password', {
      currentPassword,
      newPassword,
    }, {
      headers: {
        Cookie: serverCookies,
      },
    });
  },
};

export const serverApi = {
  auth: serverAuthApi,
  notes: serverNotesApi,
  user: serverUserApi,
};

export default serverApi;