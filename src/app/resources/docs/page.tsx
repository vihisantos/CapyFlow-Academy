import Link from 'next/link';
import { ArrowLeft, FileText, BookOpen, Code } from 'lucide-react';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">
                <nav>
                    <Link href="/" className="text-gray-400 hover:text-primary flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> Voltar para Início
                    </Link>
                </nav>

                <div className="glass p-12 rounded-3xl border border-white/5 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-primary/20 rounded-2xl text-primary">
                            <BookOpen size={40} />
                        </div>
                        <h1 className="text-5xl font-bold">Documentação</h1>
                    </div>

                    <p className="text-xl text-gray-400">
                        Aprenda como tirar o máximo proveito do CapyFlow Academy.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <DocCard
                            title="Como funciona a Arena"
                            desc="Entenda o cálculo de WPM, Precisão e XP."
                        />
                        <DocCard
                            title="Sistema de Níveis"
                            desc="Tabela de XP necessária para cada nível."
                        />
                        <DocCard
                            title="Atalhos de Teclado"
                            desc="Domine o editor com keybindings profissionais."
                        />
                        <DocCard
                            title="Temas & Personalização"
                            desc="Como desbloquear e criar seus próprios temas."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DocCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all cursor-pointer group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-gray-400">{desc}</p>
        </div>
    )
}
