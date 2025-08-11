"use client";

import React, { useRef } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import { longLetter, finalScrollMessage } from '@/lib/content';
import Typewriter from '@/components/typewriter';

const ScrollOfForeverLove = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-300px');

  return (
    <section id="scroll-of-love" ref={ref} className="relative w-full py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <h2 className={`text-center font-display text-4xl md:text-6xl mb-16 text-primary-foreground transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          A Scroll of Forever Love
        </h2>
        
        <div className="w-full max-w-4xl p-8 md:p-12 bg-secondary/50 rounded-lg shadow-2xl shadow-primary/10 border border-primary/20">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <Typewriter text={longLetter} speed={20} start={isVisible} className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed" />
                <p className="font-display text-2xl md:text-3xl text-primary text-center mt-12 text-glow">
                    <Typewriter text={finalScrollMessage} speed={80} start={isVisible} />
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollOfForeverLove;
