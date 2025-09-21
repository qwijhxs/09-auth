import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";

export async function checkServerSession() {
    const cookieStore = await cookies();
    const response = await nextServer.get("/auth/session", {
        headers: {
            Cookie: cookieStore.toString()
        }
    });

    return response;
}

export async function getServerMe(): Promise<User> {
    const cookieStore = await cookies();
    const response = await nextServer.get<User>("/users/me", {
        headers: {
            Cookie: cookieStore.toString()
        }
    });

    return response.data;
}