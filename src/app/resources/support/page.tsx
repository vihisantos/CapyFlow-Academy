"use client";

import Link from 'next/link';
import { ArrowLeft, LifeBuoy, CheckCircle } from 'lucide-react';

export default function SupportPage() {

    return (
        <div className="min-h-screen bg-background text-foreground p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">
                <nav>
                    <Link href="/" className="text-gray-400 hover:text-primary flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> Voltar para Início
                    </Link>
                </nav>

                <div className="glass p-12 rounded-3xl border border-white/5 space-y-8">
                    <div className="flex items-center gap-4 text-secondary">
                        <LifeBuoy size={48} />
                        <h1 className="text-4xl font-bold text-white">Central de Suporte</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-primary">FAQ (Perguntas Frequentes)</h2>

                            <FAQItem
                                q="Como recupero minha conta?"
                                a="Como o sistema é Local-First, seus dados estão no seu navegador. Se limpar o cache sem backup, os dados somem. Use a função Exportar Save!"
                            />
                            <FAQItem
                                q="O certificado é válido?"
                                a="O CapyFlow foca na habilidade prática. O certificado é simbólico para mostrar sua dedicação."
                            />
                            <FAQItem
                                q="Posso criar meus próprios snippets?"
                                a="Em breve! Estamos trabalhando no recurso 'Arena Creator'."
                            />
                        </div>

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 h-fit">
                            <h3 className="text-xl font-bold mb-4">Precisa de ajuda humana?</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Nossa equipe de capivaras (humanos) responde em até 24h úteis.
                            </p>

                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Mensagem enviada! (Simulação)"); }}>
                                <input type="email" placeholder="Seu email" className="w-full p-3 rounded-lg bg-background border border-white/10 focus:border-primary text-white outline-none" required />
                                <textarea placeholder="Como podemos ajudar?" rows={4} className="w-full p-3 rounded-lg bg-background border border-white/10 focus:border-primary text-white outline-none" required></textarea>
                                <button className="w-full py-3 cyber-btn rounded-lg font-bold">Enviar Mensagem</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ q, a }: { q: string, a: string }) {
    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                {q}
            </h4>
            <p className="text-sm text-gray-400 pl-6">{a}</p>
        </div>
    )
}
