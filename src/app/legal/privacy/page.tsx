import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
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
                        <Lock size={200} />
                    </div>

                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                        Política de Privacidade
                    </h1>

                    <div className="space-y-6 text-gray-300 leading-relaxed relative z-10">
                        <p>Sua privacidade é nossa prioridade na <strong>CapyFlow Academy</strong>.</p>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">1. Coleta de Dados</h2>
                            <p>Nós utilizamos uma arquitetura <strong>Local-First</strong>. Isso significa que a maioria do seu progresso (XP, Snippets, Temas) fica salvo apenas no seu próprio navegador (LocalStorage).</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">2. Dados Externos</h2>
                            <p>Apenas informações essenciais de pagamento são processadas pelo Mercado Pago. Nós não armazenamos números de cartão de crédito em nossos servidores.</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">3. Cookies</h2>
                            <p>Utilizamos cookies estritamente necessários para manter sua sessão (auth) e preferências de tema.</p>
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
