"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Terminal, Zap, Trophy, ShieldCheck, ChevronRight, User as UserIcon, LogOut } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";


export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#020617] text-white overflow-hidden relative selection:bg-cyan-500/30">
      {/* Background Mesh */}
      <div className="absolute inset-0 glow-mesh opacity-40 pointer-events-none" />

      {/* Header / Nav */}
      <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <div className="text-2xl font-bold italic tracking-tighter">
          Capy<span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Flow</span>

        </div>

        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-cyan-500/30" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <UserIcon size={16} className="text-cyan-400" />
                </div>
              )}
              <span className="text-sm font-medium hidden md:block text-slate-300">{user.displayName || user.email}</span>
            </div>
            <button onClick={() => logout()} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Sair">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link href="/login" className="px-6 py-2 glass rounded-full text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            Entrar
          </Link>
        )}
      </nav>

      <main className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center space-y-16 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass border border-cyan-500/20 text-cyan-300 text-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <Zap size={14} className="fill-current text-cyan-400" />
            <span className="tracking-wide font-medium">Acelere seu Código em 10x</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-tight">
            CapyFlow <br className="hidden md:block" />
            <span className="text-gradient">Academy</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            Domine a sintaxe real. Digite como um sênior. <br className="hidden md:block" />
            Feedback em tempo real, rankings globais e <span className="text-slate-200 font-medium">gamificação de elite</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8"
        >
          <Link href="/arena" className="group px-10 py-5 cyber-btn rounded-2xl font-bold text-xl flex items-center space-x-3 text-white shadow-2xl shadow-cyan-500/20">
            <span>Começar Treino</span>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/dashboard" className="px-10 py-5 glass rounded-2xl font-semibold text-xl flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-white/5 transition-all border border-white/5 hover:border-white/20">
            <span>Ver Meus Avanços</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-32 px-4">
          <FeatureCard
            icon={<Terminal className="text-cyan-400" />}
            title="Código Real"
            description="Nada de lorem ipsum. Treine com trechos de produção de projetos Open Source reais."
          />
          <FeatureCard
            icon={<Trophy className="text-purple-400" />}
            title="Gamificação"
            description="Suba no ranking global, conquiste badges raras e desafie seus amigos."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-pink-400" />}
            title="Feedback Instantâneo"
            description="Análise precisa de WPM, precisão e consistência a cada keystroke."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}


function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl glass border border-white/5 hover:border-cyan-500/20 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-cyan-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">

        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
