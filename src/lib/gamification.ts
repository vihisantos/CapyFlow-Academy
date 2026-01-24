import { Storage } from "./storage";

export const LEVEL_CURVE = 1000; // XP needed for first level up (+10% each level)

export const Gamification = {
    // Calculate Level based on Total XP
    // Formula: Level = Math.floor(XP / 1000) + 1 (Simplified linear for now, or use sqrt for curve)
    getLevelFromXP: (xp: number) => {
        // Curve: 0-1000 = Lvl 1, 1000-2500 = Lvl 2, etc.
        // Let's use a simple quadratic curve: XP = Level^2 * 100
        // Level = Sqrt(XP / 100)
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    },

    calculateXP: (wpm: number, accuracy: number, difficulty: string) => {
        let base = wpm * 5; // 50 WPM = 250 XP

        // Accuracy Multiplier
        const accMult = accuracy / 100; // 100% = 1.0x, 50% = 0.5x

        // Difficulty Multiplier
        let diffMult = 1;
        if (difficulty === 'Intermediário') diffMult = 1.5;
        if (difficulty === 'Avançado') diffMult = 2.0;

        return Math.floor(base * accMult * diffMult);
    },

    // Process a finished session and update everything
    processSession: (wpm: number, accuracy: number, snippetId: string, difficulty: string, timeSpentSeconds: number) => {
        const xpEarned = Gamification.calculateXP(wpm, accuracy, difficulty);

        const currentStats = Storage.getStats();

        // Update IDs if unique
        const newCompletedIds = new Set(currentStats.snippetsCompletedIds);
        newCompletedIds.add(snippetId);

        const newTotalXP = currentStats.xp + xpEarned;
        const newLevel = Gamification.getLevelFromXP(newTotalXP);

        // Save Stats
        const updatedStats = Storage.updateStats({
            xp: newTotalXP,
            level: newLevel,
            totalSnippetsCompleted: currentStats.totalSnippetsCompleted + 1,
            totalTimeSpent: currentStats.totalTimeSpent + timeSpentSeconds,
            snippetsCompletedIds: Array.from(newCompletedIds)
        });

        // Save History
        Storage.addSession({
            snippetId,
            language: snippetId.split('-')[0], // Extract 'js' from 'js-basic-var'
            wpm,
            accuracy,
            xpEarned
        });

        return { xpEarned, newLevel, levelUp: newLevel > currentStats.level };
    }
};
