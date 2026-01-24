import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">
                <nav>
                    <Link href="/" className="text-gray-400 hover:text-primary flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> Voltar para Início
                    </Link>
                </nav>

                <div className="glass p-12 rounded-3xl border border-white/5 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <ShieldCheck size={200} />
                    </div>

                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                        Termos de Uso
                    </h1>

                    <div className="space-y-6 text-gray-300 leading-relaxed relative z-10">
                        <p>Bem-vindo ao <strong>CapyFlow Academy</strong>. Ao acessar nossa plataforma, você concorda com os seguintes termos:</p>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">1. Uso da Plataforma</h2>
                            <p>O CapyFlow Academy é uma ferramenta educacional. O uso indevido para spam, ataques ou engenharia reversa é estritamente proibido.</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">2. Conteúdo Pro</h2>
                            <p>Os recursos "Pro" (Temas, Backups) são concedidos mediante pagamento único ou assinatura. O compartilhamento de contas Pro pode resultar em suspensão.</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">3. Propriedade Intelectual</h2>
                            <p>Todo o código fonte dos desafios pertence aos seus respectivos criadores (Projetos Open Source). A marca CapyFlow e os assets gamificados são propriedade da Capybara Holding.</p>
                        </section>

                        <div className="pt-8 border-t border-white/10 text-sm text-gray-500">
                            Última atualização: Janeiro de 2026
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
