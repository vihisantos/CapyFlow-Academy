import { Zap } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-8 border-t border-white/5 bg-[#020617] relative z-50">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                {/* Logo / Copyright */}
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <span className="font-semibold text-slate-300">CapyFlow Academy</span>
                    <span>© 2026</span>
                </div>

                {/* Powered By */}
                <a
                    href="https://vihisantos.github.io/My.Portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 text-sm transition-all hover:opacity-100 opacity-70"
                >
                    <span className="text-slate-500 group-hover:text-slate-400 transition-colors">Powered by</span>
                    <span className="font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-cyan-500 group-hover:from-purple-300 group-hover:to-cyan-400 transition-all flex items-center gap-1">

                        Capybara Holding
                        <Zap size={12} className="text-cyan-400 fill-current group-hover:animate-pulse" />
                    </span>
                </a>
            </div>
        </footer>
    );
}
