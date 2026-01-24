"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ChallengeSelect from "@/components/ChallengeSelect";
import { Snippet } from "@/lib/snippets";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Lazy Load Arena (Monaco Editor is heavy)
const Arena = dynamic(() => import("@/components/Arena"), {
    loading: () => <div className="h-[500px] glass rounded-2xl animate-pulse flex items-center justify-center text-gray-500">Carregando Editor...</div>,
    ssr: false // Editor triggers browser-only logic usually
});


export default function ArenaPage() {
    const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 lg:p-24">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative">
                <AnimatePresence mode="wait">
                    {!selectedSnippet ? (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="mb-12">
                                <h1 className="text-5xl font-bold mb-4 italic">Escolha seu <span className="text-emerald-400">Treino</span></h1>
                                <p className="text-xl text-gray-400">Selecione uma linguagem e o nível de dificuldade para entrar na arena.</p>
                            </div>
                            <ChallengeSelect onSelect={setSelectedSnippet} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="arena"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8"
                        >
                            <button
                                onClick={() => setSelectedSnippet(null)}
                                className="flex items-center text-gray-500 hover:text-white transition-colors group mb-4"
                            >
                                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                <span>Voltar para Seleção</span>
                            </button>

                            <div className="flex items-center space-x-4 mb-2">
                                <span className="text-emerald-500 font-mono text-sm px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    {selectedSnippet.language.toUpperCase()}
                                </span>
                                <h2 className="text-3xl font-bold">{selectedSnippet.title}</h2>
                            </div>

                            <Arena
                                code={selectedSnippet.code}
                                language={selectedSnippet.language}
                                description={selectedSnippet.description}
                                snippetId={selectedSnippet.id}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
