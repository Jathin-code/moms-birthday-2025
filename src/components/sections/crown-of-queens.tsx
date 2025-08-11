"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import FloatingParticles from '@/components/floating-particles';

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
                <h2 className={`font-display text-2xl md:text-4xl text-foreground max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
