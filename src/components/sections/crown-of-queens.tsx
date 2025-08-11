"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import FloatingParticles from '@/components/floating-particles';

const CrownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.467 5.342C19.373 5.143 19.188 5 18.976 5h-2.153a.5.5 0 01-.48-.65l.7-2.3c.063-.207.01-.437-.144-.593a.53.53 0 00-.603-.09l-3.32 2.193a.5.5 0 01-.553 0L9.103 3.46a.53.53 0 00-.603.09c-.154.156-.207.386-.144.593l.7 2.3a.5.5 0 01-.48.65H6.024c-.212 0-.397.143-.49.342L3.11 11.23a.5.5 0 00.197.618l2.9 1.922a.5.5 0 01.18.61L5.1 19.5c-.09.202-.03.435.137.585.168.15.406.18.607.07l3.22-1.78a.5.5 0 01.472 0l3.22 1.78c.2.11.439.08.607-.07a.516.516 0 00.137-.585l-1.287-5.13a.5.5 0 01.18-.61l2.9-1.922a.5.5 0 00.197-.618l-2.424-5.888z" />
    </svg>
);


const CrownOfQueens = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-200px');
    const [spin, setSpin] = useState(false);
    const [showHeroText, setShowHeroText] = useState(false);
    const [typed, setTyped] = useState('');
    const magicWord = "mummy";

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (showHeroText) return;
            let newTyped = (typed + e.key.toLowerCase()).slice(-magicWord.length);
            setTyped(newTyped);
            
            if (newTyped === magicWord) {
                setSpin(true);
                setShowHeroText(true);
                setTimeout(() => setSpin(false), 2000);
                setTimeout(() => {
                    setShowHeroText(false);
                    setTyped('');
                }, 4000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [typed, showHeroText]);

    return (
        <section ref={ref} className="relative w-full py-24 md:py-48 bg-secondary/30 overflow-hidden">
            <FloatingParticles count={20} />
            <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
                <div className="relative group mb-8">
                    <CrownIcon 
                        className={`w-32 h-32 md:w-48 md:h-48 text-primary drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110 ${spin ? 'animate-spin' : ''}`}
                        style={{animationDuration: spin ? '1s' : '20s', animationName: 'spin', animationTimingFunction: 'linear', animationIterationCount: 'infinite'}}
                    />
                     <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                        <FloatingParticles count={15} />
                    </div>
                </div>

                <h2 className={`font-display text-2xl md:text-4xl text-primary-foreground max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    To the most incredible woman I know — my Mummy, my forever queen.
                </h2>
                {showHeroText && (
                    <p className="font-display text-3xl md:text-5xl text-primary mt-4 text-glow animate-pulse">You're my hero.</p>
                )}
            </div>
        </section>
    );
};

export default CrownOfQueens;
