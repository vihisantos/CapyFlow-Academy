"use client";

// Types
export interface UserProfile {
    displayName: string;
    photoURL?: string;
    joinedAt: number;
}

export interface GameStats {
    xp: number;
    level: number;
    totalSnippetsCompleted: number;
    totalTimeSpent: number; // seconds
    snippetsCompletedIds: string[];
}

export interface SessionRecord {
    id: string;
    snippetId: string;
    language: string;
    wpm: number;
    accuracy: number;
    timestamp: number;
    xpEarned: number;
}

// Keys
const KEYS = {
    USER: 'capy_user',
    STATS: 'capy_stats',
    SESSIONS: 'capy_sessions'
};

// Initial State
const INITIAL_STATS: GameStats = {
    xp: 0,
    level: 1,
    totalSnippetsCompleted: 0,
    totalTimeSpent: 0,
    snippetsCompletedIds: []
};

// --- Storage Engine ---

export const Storage = {
    // User Profile
    getUser: (): UserProfile | null => {
        if (typeof window === 'undefined') return null;
        const data = localStorage.getItem(KEYS.USER);
        return data ? JSON.parse(data) : null;
    },

    saveUser: (user: UserProfile) => {
        localStorage.setItem(KEYS.USER, JSON.stringify(user));
    },

    clearUser: () => {
        localStorage.removeItem(KEYS.USER);
        localStorage.removeItem(KEYS.STATS);
        localStorage.removeItem(KEYS.SESSIONS);
    },

    // Stats (XP, Level)
    getStats: (): GameStats => {
        if (typeof window === 'undefined') return INITIAL_STATS;
        const data = localStorage.getItem(KEYS.STATS);
        return data ? JSON.parse(data) : INITIAL_STATS;
    },

    updateStats: (partialStats: Partial<GameStats>) => {
        const current = Storage.getStats();
        const updated = { ...current, ...partialStats };
        localStorage.setItem(KEYS.STATS, JSON.stringify(updated));
        return updated;
    },

    // Sessions (History)
    getSessions: (): SessionRecord[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(KEYS.SESSIONS);
        return data ? JSON.parse(data) : [];
    },

    addSession: (session: Omit<SessionRecord, 'id' | 'timestamp'>) => {
        const sessions = Storage.getSessions();
        const newSession: SessionRecord = {
            ...session,
            id: crypto.randomUUID(),
            timestamp: Date.now()
        };
        // Keep last 50 sessions only to save space
        const updatedSessions = [newSession, ...sessions].slice(0, 50);
        localStorage.setItem(KEYS.SESSIONS, JSON.stringify(updatedSessions));
        return newSession;
    },

    // Backup System (Pro Feature)
    exportData: (): string => {
        if (typeof window === 'undefined') return '';
        const data = {
            user: JSON.parse(localStorage.getItem(KEYS.USER) || 'null'),
            stats: JSON.parse(localStorage.getItem(KEYS.STATS) || 'null'),
            sessions: JSON.parse(localStorage.getItem(KEYS.SESSIONS) || '[]'),
            theme: localStorage.getItem('capy_theme') || 'cyber-noir',
            timestamp: Date.now(),
            version: 1
        };
        return btoa(JSON.stringify(data)); // Base64 encode for simple obfuscation
    },

    importData: (base64Data: string): boolean => {
        try {
            const json = atob(base64Data);
            const data = JSON.parse(json);

            // Basic Validation
            if (!data.user || !data.stats || !data.version) {
                throw new Error("Invalid Save File");
            }

            // Restore
            if (data.user) localStorage.setItem(KEYS.USER, JSON.stringify(data.user));
            if (data.stats) localStorage.setItem(KEYS.STATS, JSON.stringify(data.stats));
            if (data.sessions) localStorage.setItem(KEYS.SESSIONS, JSON.stringify(data.sessions));
            if (data.theme) localStorage.setItem('capy_theme', data.theme);

            // Force reload to apply changes
            window.location.reload();
            return true;
        } catch (e) {
            console.error("Import failed:", e);
            return false;
        }
    }
};

