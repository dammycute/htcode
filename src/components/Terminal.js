'use client';

import { useState, useEffect } from 'react';

const Terminal = ({ lines, title = "terminal - zsh" }) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    useEffect(() => {
        if (currentLineIndex < lines.length) {
            const currentLine = lines[currentLineIndex];
            const targetText = typeof currentLine === 'string' ? currentLine : currentLine.text;

            if (currentCharIndex < targetText.length) {
                const timeout = setTimeout(() => {
                    setCurrentCharIndex(prev => prev + 1);
                }, 30); // Speed of typing
                return () => clearTimeout(timeout);
            } else {
                // Line finished typing
                setDisplayedLines(prev => [...prev, currentLine]);
                const timeout = setTimeout(() => {
                    setCurrentLineIndex(prev => prev + 1);
                    setCurrentCharIndex(0);
                }, 500); // Wait before next line
                return () => clearTimeout(timeout);
            }
        }
    }, [currentLineIndex, currentCharIndex, lines]);

    return (
        <div className="relative w-full rounded-lg overflow-hidden shadow-2xl glass-card border border-white/10 group font-mono text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-inner"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-inner"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-inner"></div>
                </div>
                <span className="ml-2 text-[10px] sm:text-xs text-slate-400 font-medium tracking-tight uppercase">{title}</span>
            </div>
            <div className="p-4 sm:p-6 text-slate-300 min-h-[200px] bg-slate-900/40">
                {displayedLines.map((line, idx) => (
                    <div key={idx} className="flex mb-1 whitespace-pre-wrap">
                        {line.prefix && <span className="text-green-400 mr-2">{line.prefix}</span>}
                        <span className={line.color || 'text-slate-300'}>{line.text}</span>
                    </div>
                ))}
                {currentLineIndex < lines.length && (
                    <div className="flex mb-1">
                        {lines[currentLineIndex].prefix && <span className="text-green-400 mr-2">{lines[currentLineIndex].prefix}</span>}
                        <span className={lines[currentLineIndex].color || 'text-slate-300'}>
                            {typeof lines[currentLineIndex] === 'string'
                                ? lines[currentLineIndex].substring(0, currentCharIndex)
                                : lines[currentLineIndex].text.substring(0, currentCharIndex)}
                        </span>
                        <span className="cursor-blink border-l-2 border-primary ml-0.5 h-4 inline-block align-middle"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Terminal;
