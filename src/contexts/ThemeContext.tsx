"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage } from '@/lib/storage';
import { useAuth } from '@/hooks/useAuth';

export type ThemeId = 'cyber-noir' | 'matrix' | 'dracula' | 'synthwave' | 'naruto' | 'dbz' | 'eva';

interface ThemeContextType {
    theme: ThemeId;
    setTheme: (theme: ThemeId) => void;
    isPro: boolean;
    unlockPro: () => void;
    checkoutUrl: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Fix: Initialize with default values to avoid Hydration Error (server vs client mismatch)
    const [theme, setThemeState] = useState<ThemeId>('cyber-noir');
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    // Auth Integration for User-Specific Pro Status
    const { user, updateProfile } = useAuth();
    const isPro = !!user?.isPro; // Derived State from User Profile

    useEffect(() => {
        setMounted(true);
        // Load only THEME from storage (theme is arguably global device pref, but better per user? 
        // User asked for PRO to be per user. Let's start with Theme being local device pref first for simplicity, 
        // or migrate theme to user profile too? Let's stick to fixing PRO first as requested).

        const savedTheme = localStorage.getItem('capy_theme') as ThemeId;

        if (savedTheme) {
            setThemeState(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            document.documentElement.setAttribute('data-theme', 'cyber-noir');
        }
    }, []);

    const setTheme = (newTheme: ThemeId) => {
        // Guard: Check if Pro is required for non-default themes
        if (newTheme !== 'cyber-noir' && !isPro) {
            alert("Este tema é exclusivo para PROs! 🔒");
            return;
        }

        setThemeState(newTheme);
        localStorage.setItem('capy_theme', newTheme);

        // Apply to HTML tag for CSS variables
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const unlockPro = () => {
        if (!user) {
            alert("Faça login ou crie uma conta para virar PRO!");
            return;
        }

        // Mock Payment Flow for GitHub Pages
        const confirm = window.confirm("Você será redirecionado para o Mercado Pago (Simulação). Confirmar pagamento?");
        if (confirm) {
            // Update User Profile via Auth Context (Persists to capy_user specifically)
            updateProfile({ isPro: true });

            // Cleanup legacy global key if exists
            localStorage.removeItem('capy_pro');

            alert("Pagamento Aprovado! Você agora é PRO! 🏆 (Status salvo no seu perfil)");
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isPro, unlockPro, checkoutUrl }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
