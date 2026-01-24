"use client";

import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
    const { user, register, loading } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await register(email, password, name);
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass p-10 rounded-3xl border border-white/5 relative z-10"
            >
                <Link href="/login" className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span>Voltar para Login</span>
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold italic mb-2">Crie sua <span className="text-purple-400">Conta</span></h1>
                    <p className="text-gray-400">Junte-se à academia e comece seu treino.</p>

                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Nome de Exibição</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 transition-all"
                                placeholder="Ex: CapyCoder"

                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 transition-all"
                                placeholder="seu@email.com"

                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400 ml-1">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 transition-all"
                                placeholder="••••••••"

                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm ml-1">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 capy-gradient rounded-xl font-bold text-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : "Criar Conta"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Já tem uma conta? <Link href="/login" className="text-cyan-400 hover:underline">Entre aqui</Link>
                </p>

            </motion.div>
        </div>
    );
}
