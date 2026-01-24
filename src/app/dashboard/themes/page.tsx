"use client";

import { useTheme, ThemeId } from "@/contexts/ThemeContext";
import { THEMES } from "@/lib/themes";
import { Lock, Check, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ThemeStore() {
    const { theme: currentTheme, setTheme, isPro, unlockPro } = useTheme();

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pb-32 transition-colors duration-500">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-white/5">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Loja de Temas</h1>
                        <p className="text-gray-400">Personalize seu ambiente de treino.</p>
                    </div>
                    <Link href="/dashboard" className="px-6 py-2 glass rounded-xl text-sm font-bold hover:bg-white/5 transition-all">
                        Voltar ao Dashboard
                    </Link>
                </div>

                {/* Pro Check */}
                {!isPro && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                <Lock className="text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-yellow-400">Desbloqueie o CapyFlow PRO</h3>
                                <p className="text-sm text-yellow-200/70">Acesso instantâneo a todos os temas exclusivos.</p>
                            </div>
                        </div>
                        <button
                            onClick={unlockPro}
                            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <Zap size={18} className="fill-current" />
                            <span>Virar PRO Agora</span>
                        </button>
                    </motion.div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {THEMES.map((t) => {
                        const isLocked = !isPro && t.id !== 'cyber-noir';
                        const isActive = currentTheme === t.id;

                        return (
                            <div
                                key={t.id}
                                className={`relative group p-6 rounded-2xl border transition-all duration-300 ${isActive ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(var(--primary),0.1)]' : 'border-white/5 hover:border-white/10 glass'}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">{t.name}</h3>
                                        <p className="text-sm text-gray-400">{t.description}</p>
                                    </div>
                                    {isActive ? (
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-primary/30">
                                            <Check size={12} /> Ativo
                                        </span>
                                    ) : isLocked ? (
                                        <span className="bg-white/5 text-gray-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-white/10">
                                            <Lock size={12} /> Pro
                                        </span>
                                    ) : null}
                                </div>

                                {/* Preview Palette */}
                                <div className="flex gap-4 mb-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: t.colors.bg }} />
                                        <span className="text-[10px] uppercase text-gray-500 font-bold">BG</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: t.colors.primary }} />
                                        <span className="text-[10px] uppercase text-gray-500 font-bold">Pri</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-full border border-white/10 shadow-lg" style={{ backgroundColor: t.colors.secondary }} />
                                        <span className="text-[10px] uppercase text-gray-500 font-bold">Sec</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setTheme(t.id)}
                                    disabled={isActive}
                                    className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2
                                        ${isActive
                                            ? 'bg-white/5 text-gray-500 cursor-default'
                                            : isLocked
                                                ? 'bg-white/5 text-gray-500 hover:bg-white/10'
                                                : 'bg-primary text-background hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20'
                                        }
                                    `}
                                >
                                    {isActive ? "Ativado" : isLocked ? "Bloqueado (Requer Pro)" : "Aplicar Tema"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
