"use client";

import { motion } from "framer-motion";
import { SNIPPETS, Snippet } from "@/lib/snippets";
import { Code2, ChevronRight, CheckCircle2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getCompletedSnippetIds } from "@/lib/api";

interface ChallengeSelectProps {
    onSelect: (snippet: Snippet) => void;
}

export default function ChallengeSelect({ onSelect }: ChallengeSelectProps) {
    const [completedIds, setCompletedIds] = useState<string[]>([]);
    const languages = Array.from(new Set(SNIPPETS.map(s => s.language)));

    useEffect(() => {
        const token = localStorage.getItem('capy_token');
        if (token) {
            getCompletedSnippetIds(token).then(setCompletedIds).catch(console.error);
        }
    }, []);

    return (
        <div className="space-y-12">
            {languages.map((lang) => (
                <div key={lang} className="space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <Code2 className="text-emerald-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold capitalize">{lang}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SNIPPETS.filter(s => s.language === lang).map((snippet, idx) => {
                            const isCompleted = completedIds.includes(snippet.id);
                            return (
                                <motion.button
                                    key={snippet.id}
                                    whileHover={{ scale: 1.02, translateY: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onSelect(snippet)}
                                    className={`glass p-6 rounded-2xl border text-left group transition-all relative overflow-hidden ${isCompleted ? 'border-emerald-500/40 bg-emerald-500/[0.02]' : 'border-white/5 hover:border-emerald-500/30'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        {isCompleted ? <CheckCircle2 size={40} className="text-emerald-400" /> : <Star size={40} className="text-emerald-400" />}
                                    </div>

                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-2">
                                            <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/10 ${snippet.difficulty === 'Iniciante' ? 'text-blue-400' :
                                                    snippet.difficulty === 'Intermediário' ? 'text-yellow-400' : 'text-red-400'
                                                }`}>
                                                {snippet.difficulty}
                                            </span>
                                            {isCompleted && (
                                                <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                                                    Completado
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-emerald-500/0 group-hover:text-emerald-500 transition-all">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-400 transition-colors">{snippet.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">{snippet.description}</p>

                                    <div className="mt-6 flex items-center text-[11px] font-mono text-gray-500 uppercase tracking-tighter">
                                        {snippet.category}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
