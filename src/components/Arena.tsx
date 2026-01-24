"use client";

import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Zap, Target, Timer } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { Gamification } from '@/lib/gamification';


interface ArenaProps {
    code: string;
    language: string;
    description?: string;
    snippetId: string;
    onComplete?: () => void;
}

export default function Arena({ code, language, description, snippetId, onComplete }: ArenaProps) {
    const { user } = useAuth();
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [glowColor, setGlowColor] = useState('cyan');

    const editorRef = useRef<any>(null);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (startTime && !isFinished) {
            const interval = setInterval(() => {
                calculateMetrics();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startTime, userInput, isFinished]);

    useEffect(() => {
        // Dynamic HUD color based on accuracy
        if (accuracy > 95) setGlowColor('cyan');
        else if (accuracy > 80) setGlowColor('purple');
        else setGlowColor('red');
    }, [accuracy]);

    // ... idle effect ...

    const calculateMetrics = () => {
        if (!startTime) return;

        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const wordsTyped = userInput.length / 5;
        const currentWpm = Math.round(wordsTyped / timeElapsed) || 0;
        setWpm(currentWpm);

        // Accuracy
        let errors = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] !== code[i]) errors++;
        }
        const currentAccuracy = Math.max(0, Math.round(((userInput.length - errors) / userInput.length) * 100)) || 100;
        setAccuracy(currentAccuracy);
    };

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const getCommentRanges = (text: string) => {
        const ranges: { start: number, end: number }[] = [];
        let regex;
        if (language === 'javascript' || language === 'typescript') {
            regex = /\/\/.*(?:\r?\n|$ )|\/\*[\s\S]*?\*\//g;
        } else if (language === 'python' || language === 'sql' || language === 'ruby') {
            regex = /#.*(?:\r?\n|$ )|--.*(?:\r?\n|$ )/g;
        } else if (language === 'java' || language === 'cpp' || language === 'c' || language === 'csharp' || language === 'go' || language === 'rust') {
            regex = /\/\/.*(?:\r?\n|$ )|\/\*[\s\S]*?\*\//g;
        }

        if (regex) {
            let match;
            while ((match = regex.exec(text)) !== null) {
                ranges.push({ start: match.index, end: match.index + match[0].length });
            }
        }
        return ranges;
    };

    const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (!startTime && value.length > 0) {
            setStartTime(Date.now());
        }

        // Combo Logic
        if (value.length > userInput.length) {
            const charTyped = value[value.length - 1];
            // Approximate check: if the typed char matches the code at the new position
            // We need to account for auto-filled comments, but for raw combo feel, 
            // checking if the new string matches the code prefix is safer.
            // However, snippet logic skips comments!
            // Let's use a simpler heuristic for visual combo:
            // If the *entire* typed value matches the beginning of the code (ignoring comments logic for a sec OR relying on how value is constructed)

            // Actually, handleInputChange builds the value. 
            // If we are strictly typing correct chars, value === code.substring(0, value.length).
            // But complex logic helps skip comments.

            // Let's calculate simple correctness for combo *after* processing below?
            // No, needs to be instant.

            // Let's just assume if the user typed ANY char and it wasn't blocked/wrong visual, success?
            // No, let's use the resulting `finalValue` (below) logic.
        }

        let currentPos = userInput.length;
        const charTyped = value[value.length - 1];
        let autoFilledPrefix = '';

        // Check if we can skip one or more comments
        while (true) {
            const commentRanges = getCommentRanges(code);
            const commentAtPos = commentRanges.find(r => r.start === currentPos);

            if (commentAtPos) {
                const charStartOfComment = code[currentPos];
                const charAfterComment = code[commentAtPos.end];

                if (charTyped !== charStartOfComment && charTyped === charAfterComment) {
                    autoFilledPrefix += code.substring(currentPos, commentAtPos.end);
                    currentPos = commentAtPos.end;
                    continue;
                }
            }
            break;
        }

        let finalValue = value;
        if (autoFilledPrefix) {
            finalValue = userInput + autoFilledPrefix + charTyped;
        }

        // COMBO CALCULATION
        const isCorrectSoFar = finalValue === code.substring(0, finalValue.length);
        if (isCorrectSoFar && finalValue.length > userInput.length) {
            setCombo(c => {
                const newC = c + 1;
                if (newC > maxCombo) setMaxCombo(newC);
                return newC;
            });
        } else if (!isCorrectSoFar) {
            setCombo(0);
        }

        setUserInput(finalValue);

        if (finalValue === code) {
            setIsFinished(true);
            handleFinish(finalValue);
        }
    };

    const handleFinish = async (finalValue: string) => {
        // Critical Fix: Ensure we try to save even if transient state is odd, but need user.
        // If !user, try to grab from Storage directly as fallback?
        // useAuth should always be source of truth.
        if (!user) {
            alert("⚠️ Erro: Usuário não encontrado. Seus dados não serão salvos. Faça login novamente.");
            return;
        }

        if (!startTime) return;

        const timeElapsed = (Date.now() - startTime) / 1000;
        const wordsTyped = finalValue.length / 5;
        const currentWpm = Math.round(wordsTyped / (timeElapsed / 60)) || 0;

        let errors = 0;
        for (let i = 0; i < finalValue.length; i++) {
            if (finalValue[i] !== code[i]) errors++;
        }
        const currentAccuracy = Math.max(0, Math.round(((finalValue.length - errors) / finalValue.length) * 100)) || 100;

        // Visual Feedback
        console.log(`[Arena] Completed. WPM: ${currentWpm}, Acc: ${currentAccuracy}%`);

        try {
            // Local Gamification Logic
            const result = Gamification.processSession(currentWpm, currentAccuracy, snippetId, 'Iniciante', timeElapsed);

            console.log('Session sav result:', result);

            if (result.levelUp) {
                // Better Alert
                setTimeout(() => alert(`🎉 LEVEL UP! Nível ${result.newLevel} Alcançado!`), 500);
            }

            if (onComplete) onComplete();
        } catch (error) {
            console.error('Error saving session:', error);
            alert("Erro ao salvar progresso. Verifique o console.");
        }
    };




    const glowClasses = {
        cyan: 'border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]',

        purple: 'border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]',
        red: 'border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)]',
    };

    const textColors = {
        cyan: 'text-cyan-400',

        purple: 'text-purple-400',
        red: 'text-red-400',
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <div className={`flex justify-between items-center mb-8 glass p-6 rounded-2xl border transition-all duration-500 ${glowClasses[glowColor as keyof typeof glowClasses]}`}>
                <div className="flex space-x-8">
                    <MetricItem icon={<Timer className={textColors[glowColor as keyof typeof textColors]} />} label="Tempo" value={startTime ? `${Math.floor((Date.now() - startTime) / 1000)}s` : "0s"} />
                    <MetricItem icon={<Zap className="text-yellow-400" />} label="WPM" value={wpm.toString()} />
                    <MetricItem icon={<Target className="text-blue-400" />} label="Precisão" value={`${accuracy}%`} />
                </div>

                {/* Combo Counter */}
                <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Combo</div>
                    <div className={`text-4xl font-black italic tracking-tighter transition-all ${combo > 10 ? 'text-pink-500 scale-110' : 'text-slate-500'}`}>
                        {combo}x
                    </div>
                </div>
            </div>


            <div className={`relative h-[500px] rounded-2xl overflow-hidden glass border transition-all duration-500 ${glowClasses[glowColor as keyof typeof glowClasses]} ${isIdle ? 'animate-pulse' : ''}`}>
                {/* Background Code (Monaco) */}
                <div className="absolute inset-0 opacity-40">
                    <Editor
                        height="100%"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onMount={handleEditorDidMount}
                        options={{
                            readOnly: true,
                            fontSize: 18,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            lineNumbers: 'on',
                            renderWhitespace: 'all',
                            fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                        }}
                    />
                </div>

                {/* Input Overlay */}
                <textarea
                    autoFocus
                    className="absolute inset-0 w-full h-full bg-transparent font-mono text-[18px] p-[10px] pl-[62px] resize-none focus:outline-none z-20 caret-cyan-500 leading-[23px]"

                    style={{
                        fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
                        whiteSpace: 'pre-wrap',
                        color: 'transparent',
                        caretColor: glowColor === 'cyan' ? '#22d3ee' : glowColor === 'purple' ? '#a855f7' : '#ef4444'

                    }}
                    value={userInput}
                    onChange={handleInputChange}
                    spellCheck={false}
                />

                {/* Render Layer to show correct/incorrect chars */}
                <div
                    className="absolute inset-0 p-[10px] pl-[62px] pointer-events-none font-mono text-[18px] z-10 leading-[23px]"
                    style={{ fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace', whiteSpace: 'pre-wrap' }}
                >
                    {userInput.split('').map((char, i) => (
                        <span key={i} className={char === code[i] ? textColors[glowColor as keyof typeof textColors] : "text-red-500 underline decoration-wavy"}>
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            {isFinished && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
                >
                    <div className="glass p-12 rounded-3xl border border-purple-500/30 text-center max-w-md w-full">
                        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap className="text-purple-400 w-10 h-10 fill-current" />

                        </div>
                        <h2 className="text-4xl font-bold mb-4">Elite Performance!</h2>
                        <p className="text-gray-400 mb-6">Treino finalizado com sucesso.</p>

                        {description && (
                            <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 text-left">
                                <span className="text-purple-400 font-bold block mb-1">Knowledge Drop:</span>

                                {description}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-sm text-gray-400">WPM</div>
                                <div className="text-2xl font-bold text-cyan-400">{wpm}</div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-sm text-gray-400">Precisão</div>
                                <div className="text-2xl font-bold text-blue-400">{accuracy}%</div>
                            </div>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 capy-gradient rounded-xl font-bold text-lg hover:scale-105 transition-transform"
                        >
                            Próximo Desafio
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function MetricItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="text-xs text-gray-500 font-medium">{label}</div>
                <div className="text-xl font-bold">{value}</div>
            </div>
        </div>
    );
}
