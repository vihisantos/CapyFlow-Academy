import Link from 'next/link';
import { ArrowLeft, Rss } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">
                <nav>
                    <Link href="/" className="text-gray-400 hover:text-primary flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> Voltar para Início
                    </Link>
                </nav>

                <div className="glass p-12 rounded-3xl border border-white/5 space-y-8 text-center">
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent mb-4">
                        <Rss size={40} />
                    </div>
                    <h1 className="text-5xl font-bold">Blog do CapyFlow</h1>
                    <p className="text-xl text-gray-400">
                        Artigos sobre produtividade, typing speed e carreira dev.
                    </p>

                    <div className="grid grid-cols-1 gap-6 text-left mt-8">
                        <BlogPost
                            title="Por que digitar rápido importa?"
                            excerpt="Não é sobre velocidade, é sobre reduzir a latência entre seu cérebro e o editor."
                            date="24 Jan 2026"
                        />
                        <BlogPost
                            title="O poder da repetição espaçada no código"
                            excerpt="Como a técnica de 'Snippets' ajuda a memorizar sintaxe complexa."
                            date="18 Jan 2026"
                        />
                        <BlogPost
                            title="Setup 2026: O que os devs estão usando?"
                            excerpt="Teclados mecânicos, monitores verticais e temas Cyber Noir."
                            date="10 Jan 2026"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function BlogPost({ title, excerpt, date }: { title: string, excerpt: string, date: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{title}</h3>
                <span className="text-xs text-gray-500 uppercase tracking-widest">{date}</span>
            </div>
            <p className="text-gray-400">{excerpt}</p>
        </div>
    )
}
