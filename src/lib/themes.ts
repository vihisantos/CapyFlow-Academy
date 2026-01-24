import { ThemeId } from "@/contexts/ThemeContext";

export interface ThemeDef {
    id: ThemeId;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        bg: string;
    };
    description: string;
}

export const THEMES: ThemeDef[] = [
    {
        id: 'cyber-noir',
        name: 'Cyber Noir',
        description: 'O clássico. Escuro, ciano e roxo.',
        colors: { primary: '#22d3ee', secondary: '#a855f7', bg: '#020617' }
    },
    {
        id: 'matrix',
        name: 'The Matrix',
        description: 'Verde hacker retro. Siga o coelho branco.',
        colors: { primary: '#4ade80', secondary: '#22c55e', bg: '#000000' }
    },
    {
        id: 'dracula',
        name: 'Dracula',
        description: 'Tema gótico suave para vampiros noturnos.',
        colors: { primary: '#ff79c6', secondary: '#bd93f9', bg: '#282a36' }
    },
    {
        id: 'synthwave',
        name: 'Synthwave',
        description: 'Sunset, neon e vibrações dos anos 80.',
        colors: { primary: '#f472b6', secondary: '#facc15', bg: '#2c003e' }
    },
    {
        id: 'naruto',
        name: 'Konoha Force',
        description: 'Chakra laranja e determinação ninja.',
        colors: { primary: '#f97316', secondary: '#000000', bg: '#0f172a' }
    },
    {
        id: 'dbz',
        name: 'Saiyan Spirit',
        description: 'Poder de luta de mais de 8000.',
        colors: { primary: '#fbbf24', secondary: '#3b82f6', bg: '#1e3a8a' }
    },
    {
        id: 'eva',
        name: 'Unit 01',
        description: 'Sincronização 400%. Caos e Mecha.',
        colors: { primary: '#a855f7', secondary: '#22c55e', bg: '#2e1065' }
    }
];

