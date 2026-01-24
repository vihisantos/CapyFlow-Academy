"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage } from '@/lib/storage';

export type ThemeId = 'cyber-noir' | 'matrix' | 'dracula' | 'synthwave';

interface ThemeContextType {
    theme: ThemeId;
    setTheme: (theme: ThemeId) => void;
    isPro: boolean;
    unlockPro: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeId>('cyber-noir');
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        // Load from storage
        const savedTheme = localStorage.getItem('capy_theme') as ThemeId;
        const savedPro = localStorage.getItem('capy_pro') === 'true';

        if (savedTheme) setThemeState(savedTheme);
        if (savedPro) setIsPro(true);
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
        setIsPro(true);
        localStorage.setItem('capy_pro', 'true');
        alert("PARABÉNS! Você agora é um CapyFlow PRO! 🏆");
    };

    // Ensure theme is applied on initial load
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, isPro, unlockPro }}>
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
