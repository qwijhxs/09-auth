"use client"

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function AuthProvider({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { success } = await checkSession();
            
            if (success) {
                const user = await getMe();
                if (user) setUser(user);
            } else {
                clearIsAuthenticated();
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [setUser, clearIsAuthenticated]);

    return isLoading ? <Loading /> : children;
}