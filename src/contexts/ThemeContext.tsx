"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage } from '@/lib/storage';

export type ThemeId = 'cyber-noir' | 'matrix' | 'dracula' | 'synthwave';

interface ThemeContextType {
    theme: ThemeId;
    setTheme: (theme: ThemeId) => void;
    isPro: boolean;
    unlockPro: () => void;
    checkoutUrl: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeId>('cyber-noir');
    const [isPro, setIsPro] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

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
        // Mock Payment Flow for GitHub Pages
        const confirm = window.confirm("Você será redirecionado para o Mercado Pago (Simulação). Confirmar pagamento?");
        if (confirm) {
            setIsPro(true);
            localStorage.setItem('capy_pro', 'true');
            alert("Pagamento Aprovado! Você agora é PRO! 🏆");
        }
    };

    // Ensure theme is applied on initial load
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

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
