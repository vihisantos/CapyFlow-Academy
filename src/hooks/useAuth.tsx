"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage, UserProfile } from '@/lib/storage';

interface User extends UserProfile {
    id: string; // For compatibility
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    register: (email: string, password: string, displayName: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hydrate from Storage
        const localUser = Storage.getUser();
        if (localUser) {
            setUser({ ...localUser, id: 'local-user', email: 'local@capy.academy' });
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Simulate API delay
        await new Promise(r => setTimeout(r, 800));

        // For local mode, we just check if a user exists or create a temp one if matches stored logic?
        // Actually, "login" in local-first usually means "load profile".
        // But since we want to simulate the flow, let's just re-load the storage user
        // OR allow "logging in" if we matched a mock credential.

        // Simplification: If a user exists in storage, we log them in. 
        // If not, we throw error "User not found (Register first in Local Mode)"
        const localUser = Storage.getUser();
        if (!localUser) {
            throw new Error('Usuário não encontrado. Por favor, registre-se.');
        }
        setUser({ ...localUser, id: 'local-user', email });
    };

    const register = async (email: string, password: string, displayName: string) => {
        await new Promise(r => setTimeout(r, 1000));

        const newUser: UserProfile = {
            displayName,
            photoURL: `https://api.dicebear.com/7.x/open-peeps/svg?seed=${displayName}`, // Auto-avatar
            joinedAt: Date.now()
        };

        Storage.saveUser(newUser);
        setUser({ ...newUser, id: 'local-user', email });
    };

    const logout = async () => {
        // In local-first, do we clear storage? 
        // Maybe just "lock" the session state in memory?
        // Let's clear user from memory but keep data in storage so they can "login" again.
        setUser(null);
    };

    const updateProfile = (data: Partial<UserProfile>) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };
        Storage.saveUser(updatedUser);
        setUser(updatedUser);
    };


    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

