import Link from 'next/link';
import { ArrowLeft, Users, MessageCircle, Heart } from 'lucide-react';

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-12">
                <nav>
                    <Link href="/" className="text-gray-400 hover:text-primary flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> Voltar para Início
                    </Link>
                </nav>

                <div className="glass p-12 rounded-3xl border border-white/5 text-center space-y-8">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary mb-6">
                        <Users size={48} />
                    </div>

                    <h1 className="text-5xl font-bold">Comunidade Global</h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Junte-se a milhares de desenvolvedores que estão aprimorando suas habilidades diariamente.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <a href="#" className="p-8 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 transition-all group">
                            <h3 className="text-xl font-bold text-[#5865F2] mb-2">Discord</h3>
                            <p className="text-sm text-gray-400">Chat em tempo real, dicas e voice channels.</p>
                        </a>

                        <a href="https://github.com/vihisantos" target="_blank" className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                            <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
                            <p className="text-sm text-gray-400">Reporte bugs, contribua e dê uma estrela.</p>
                        </a>

                        <a href="#" className="p-8 rounded-2xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 hover:bg-[#1DA1F2]/20 transition-all group">
                            <h3 className="text-xl font-bold text-[#1DA1F2] mb-2">Twitter</h3>
                            <p className="text-sm text-gray-400">Fique por dentro das novidades e memes.</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
