import { Zap, Github, Twitter, Linkedin, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full relative z-50 mt-20">
            {/* Gradient Line Top */}
            <div className="w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-50" />

            <div className="bg-surface/50 backdrop-blur-xl pt-16 pb-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                        {/* Brand Column */}
                        <div className="space-y-6">
                            <div className="text-2xl font-bold italic tracking-tighter flex items-center gap-2">
                                <span className="text-white">Capy</span>
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Flow</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                A plataforma definitiva para dominar a arte do código através da prática deliberada e gamificação de elite.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={<Github size={18} />} href="https://github.com/vihisantos" />
                                <SocialIcon icon={<Linkedin size={18} />} href="https://www.linkedin.com/company/capybara-holding/" />
                            </div>
                        </div>


                        {/* Links Column 1 */}
                        <div>
                            <h4 className="font-bold text-white mb-6">Plataforma</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="/arena" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight /> Arena de Treino</Link></li>
                                <li><Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight /> Dashboard</Link></li>
                                <li><Link href="/dashboard/themes" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight /> Loja de Temas</Link></li>
                                <li><span className="text-gray-600 cursor-not-allowed">Leaderboard (Em breve)</span></li>
                            </ul>
                        </div>

                        {/* Links Column 2 */}
                        <div>
                            <h4 className="font-bold text-white mb-6">Recursos</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="/resources/docs" className="hover:text-primary transition-colors">Documentação</Link></li>
                                <li><Link href="/resources/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                                <li><Link href="/resources/community" className="hover:text-primary transition-colors">Comunidade</Link></li>
                                <li><Link href="/resources/support" className="hover:text-primary transition-colors">Suporte</Link></li>
                            </ul>
                        </div>

                        {/* Legal Column */}
                        <div>
                            <h4 className="font-bold text-white mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
                                <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacidade</Link></li>
                                <li><Link href="/legal/cookies" className="hover:text-primary transition-colors">Cookies</Link></li>
                            </ul>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500">
                            © 2026 CapyFlow Academy. Todos os direitos reservados.
                        </div>

                        <a
                            href="https://vihisantos.github.io/My.Portfolio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/5 transition-all mb-10 md:mb-0"
                        >
                            <span className="text-xs text-gray-400 group-hover:text-gray-300">Made with</span>
                            <Heart size={12} className="text-red-500 fill-current animate-pulse" />
                            <span className="text-xs text-gray-400">by</span>
                            <span className="text-sm font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary group-hover:opacity-80 transition-opacity">
                                Capybara Holding
                            </span>
                            <ExternalLink size={12} className="text-gray-500 group-hover:text-primary transition-colors" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all hover:scale-110"
        >
            {icon}
        </a>
    );
}

function ChevronRight() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right opacity-50"><path d="m9 18 6-6-6-6" /></svg>
    )
}
