"use client";

import { useEffect, useState } from "react";
import { Storage, GameStats, SessionRecord, UserProfile } from "@/lib/storage";
import { Gamification, LEVEL_CURVE } from "@/lib/gamification";

import { motion } from "framer-motion";
import { Trophy, Zap, Clock, Activity, Medal, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<GameStats | null>(null);
    const [sessions, setSessions] = useState<SessionRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localUser = Storage.getUser();
        const localStats = Storage.getStats();
        const localSessions = Storage.getSessions();

        setUser(localUser);
        setStats(localStats);
        setSessions(localSessions);
        setLoading(false);
    }, []);

    if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-cyan-500">Carregando...</div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white space-y-6">
                <h1 className="text-4xl font-bold">Acesso Negado</h1>
                <p className="text-gray-400">Você precisa criar um perfil local primeiro.</p>
                <Link href="/" className="px-8 py-3 cyber-btn rounded-xl font-bold">Voltar</Link>
            </div>
        );
    }

    // Logic for XP Bar
    // XP for current level start: (Level-1)^2 * 100
    // XP for next level start: (Level)^2 * 100
    // Progress = (CurrentXP - LevelStartXP) / (NextLevelXP - LevelStartXP)
    const currentLevel = stats?.level || 1;
    const currentXP = stats?.xp || 0;
    const levelStartXP = Math.pow(currentLevel - 1, 2) * 100;
    const nextLevelXP = Math.pow(currentLevel, 2) * 100;
    const xpNeeded = nextLevelXP - levelStartXP;
    const xpInLevel = currentXP - levelStartXP;
    const progressPercent = Math.min(100, Math.max(0, (xpInLevel / xpNeeded) * 100));

    return (
        <div className="min-h-screen bg-[#020617] text-white p-8 pb-32">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Profile */}
                <div className="flex flex-col md:flex-row justify-between items-end pb-8 border-b border-white/5 space-y-6 md:space-y-0">
                    <div className="flex items-center space-x-6">
                        <img src={user.photoURL} className="w-24 h-24 rounded-full border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]" />
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-2">{user.displayName}</h1>
                            <div className="flex items-center space-x-3 text-sm text-gray-400">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-xs font-bold text-cyan-400">
                                    Nível {currentLevel}
                                </span>
                                <span>{currentXP} XP Total</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/arena" className="px-8 py-3 cyber-btn rounded-xl font-bold flex items-center space-x-2">
                        <span>Nova Sessão</span>
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

                {/* Level Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span className="text-cyan-400">XP Atual: {xpInLevel}</span>
                        <span className="text-gray-500">Próximo Nível: {xpNeeded - xpInLevel} XP</span>
                    </div>
                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-linear-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.4)]"

                        />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard icon={<Trophy className="text-yellow-400" />} label="Sessões Completas" value={stats?.totalSnippetsCompleted || 0} />
                    <StatCard icon={<Zap className="text-cyan-400" />} label="Melhor WPM" value={Math.max(...sessions.map(s => s.wpm), 0)} />
                    <StatCard icon={<Activity className="text-pink-400" />} label="Precisão Média" value={Math.round(sessions.reduce((acc, s) => acc + s.accuracy, 0) / (sessions.length || 1)) + "%"} />
                    <StatCard icon={<Clock className="text-purple-400" />} label="Tempo de Treino" value={Math.round((stats?.totalTimeSpent || 0) / 60) + " min"} />

                </div>

                {/* Recent History */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center space-x-2">
                        <Activity className="text-cyan-500" />
                        <span>Histórico Recente</span>
                    </h2>

                    <div className="grid gap-4">
                        {sessions.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 glass rounded-2xl border border-dashed border-white/10">
                                Nenhuma sessão registrada ainda. Vá para a Arena!
                            </div>
                        ) : (
                            sessions.map((session) => (
                                <motion.div
                                    key={session.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 glass rounded-xl border border-white/5 flex justify-between items-center hover:border-cyan-500/20 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 rounded bg-white/5 text-gray-400 font-mono text-sm uppercase w-16 text-center">
                                            {session.language}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{session.snippetId}</div>
                                            <div className="text-xs text-gray-500">{new Date(session.timestamp).toLocaleDateString()} • {new Date(session.timestamp).toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-6 text-right">
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase">WPM</div>
                                            <div className="text-xl font-bold text-cyan-400">{session.wpm}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase">XP</div>
                                            <div className="text-xl font-bold text-yellow-400">+{session.xpEarned}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <div className="p-6 glass rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                {icon}
            </div>
            <div className="text-sm text-gray-400 mb-1">{label}</div>
            <div className="text-3xl font-bold text-white">{value}</div>
        </div>
    );
}
