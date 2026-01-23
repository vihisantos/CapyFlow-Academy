"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Terminal, Zap, Trophy, ShieldCheck, ChevronRight, User as UserIcon, LogOut } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#0a0a0a] text-white">
      {/* Header / Nav */}
      <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20">
        <div className="text-2xl font-bold italic">Capy<span className="text-emerald-400">Flow</span></div>

        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full border border-white/10">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-emerald-500/30" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <UserIcon size={16} className="text-emerald-400" />
                </div>
              )}
              <span className="text-sm font-medium hidden md:block">{user.displayName || user.email}</span>
            </div>
            <button onClick={() => logout()} className="p-2 text-gray-500 hover:text-red-400 transition-colors" title="Sair">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link href="/login" className="px-6 py-2 glass rounded-full border border-emerald-500/20 text-emerald-400 font-semibold hover:bg-emerald-500/5 transition-all">
            Entrar
          </Link>
        )}
      </nav>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-700/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass border border-emerald-500/20 text-emerald-400 text-sm mb-4">
            <Zap size={14} className="fill-current" />
            <span>Acelere seu Código em 10x</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            CapyFlow <span className="text-gradient">Academy</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Domine a sintaxe real. Digite como um sênior. Aprenda as linguagens mais quentes com feedback em tempo real e gamificação.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link href="/arena" className="group px-8 py-4 capy-gradient rounded-xl font-bold text-lg flex items-center space-x-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform active:scale-95">
            <span>Começar Treino</span>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/dashboard" className="px-8 py-4 glass rounded-xl font-semibold text-lg flex items-center space-x-2 border border-white/10 hover:bg-white/5 transition-colors">
            <span>Ver Meus Avanços</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24">
          <FeatureCard
            icon={<Terminal className="text-emerald-400" />}
            title="Código Real"
            description="Trechos de produção de Python, JS, Go e mais."
          />
          <FeatureCard
            icon={<Trophy className="text-emerald-400" />}
            title="Gamificação"
            description="Suba no ranking e conquiste badges exclusivas."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-emerald-400" />}
            title="Feedback Instantâneo"
            description="Métricas precisas de WPM e acurácia de sintaxe."
          />
        </div>
      </main>

      <footer className="mt-32 text-gray-600 text-sm text-center">
        © 2026 CapyFlow Academy. Built for the Elite.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl glass border border-white/5 hover:border-emerald-500/20 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
