import { nextServer } from "./api";
import { type Note } from "@/types/note";
import { type User, type AuthRequest } from "@/types/user";

interface GetNoteResponse {
    notes: Note[],
    totalPages: number
}

interface CheckSessionRequest {
    success: boolean
}

export async function fetchNotes(query: string, page: number, tag?: string): Promise<GetNoteResponse> {
    const response = await nextServer.get<GetNoteResponse>("/notes", {
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
    const response = await nextServer.get<Note>(`/notes/${id}`);
    return response.data;
}

export async function createNote(title: string, content: string, tag: string): Promise<Note> {
    const response = await nextServer.post<Note>("/notes", {
        title: title,
        content: content,
        tag: tag
    });

    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await nextServer.delete<Note>(`/notes/${id}`);
    return response.data;
}

export async function register(body: AuthRequest): Promise<User> {
    const response = await nextServer.post<User>("/auth/register", body);
    return response.data;
}

export async function login(body: AuthRequest): Promise<User> {
    const response = await nextServer.post<User>("/auth/login", body);
    return response.data;
}

export async function logout(): Promise<void> {
    await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<CheckSessionRequest> {
    const response = await nextServer.get<CheckSessionRequest>("/auth/session");
    return response.data;
}

export async function getMe(): Promise<User> {
    const response = await nextServer.get<User>("/users/me");
    return response.data;
}

export async function updateMe(body: User): Promise<User> {
    const response = await nextServer.patch<User>("/users/me", body);
    return response.data;
}