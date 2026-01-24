import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiesPage() {
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
                        <Cookie size={200} />
                    </div>

                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                        Política de Cookies
                    </h1>

                    <div className="space-y-6 text-gray-300 leading-relaxed relative z-10">
                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">O que são Cookies?</h2>
                            <p>Cookies são pequenos arquivos de texto salvos no seu navegador para "lembrar" de você.</p>
                        </section>

                        <section className="space-y-2">
                            <h2 className="text-xl font-bold text-primary">Como usamos?</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Essenciais:</strong> Para manter você logado.</li>
                                <li><strong>Preferências:</strong> Para salvar seu Tema escolhido (Ex: Cyber Noir, Naruto).</li>
                                <li><strong>Analíticos:</strong> Não utilizamos cookies de rastreamento de terceiros nesta versão.</li>
                            </ul>
                        </section>

                        <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
                            <p className="text-primary font-bold">Você está no controle.</p>
                            <p className="text-sm">Você pode limpar seus cookies a qualquer momento nas configurações do seu navegador, mas isso irá resetar suas preferências locais.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
