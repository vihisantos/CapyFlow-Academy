"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage } from '@/lib/storage';
import { useAuth } from '@/hooks/useAuth';
import { createPreference } from '@/lib/mercadopago';


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
    const prevUserRef = React.useRef(user);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('capy_theme') as ThemeId;

        if (savedTheme) {
            setThemeState(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            document.documentElement.setAttribute('data-theme', 'cyber-noir');
        }

        // Check for Payment Success in URL
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const status = params.get('status');
            if (status === 'approved' && user && !user.isPro) {
                // Payment Successful! Unlock Pro.
                updateProfile({ isPro: true });
                alert("🎉 Pagamento Confirmado! Bem-vindo ao CapyFlow PRO! 🏆");
                // Clean URL
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    }, [user]);

    // Effect: Reset theme on Logout (User -> Null transition)
    useEffect(() => {
        if (prevUserRef.current && !user) {
            setThemeState('cyber-noir');
            localStorage.setItem('capy_theme', 'cyber-noir');
            document.documentElement.setAttribute('data-theme', 'cyber-noir');
        }
        prevUserRef.current = user;
    }, [user]);

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

    const unlockPro = async () => {
        if (!user) {
            alert("Faça login ou crie uma conta para virar PRO!");
            return;
        }

        // Real Checkout
        const confirm = window.confirm("Você será redirecionado para o Mercado Pago para finalizar a compra segura. Vamos lá?");
        if (confirm) {
            const url = await createPreference();
            if (url) {
                window.location.href = url;
            } else {
                alert("Erro ao conectar com Mercado Pago. Tente novamente.");
            }
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
