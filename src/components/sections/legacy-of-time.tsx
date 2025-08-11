"use client";

import React, { useRef } from 'react';
import AgeTimer from '@/components/age-timer';
import { useOnScreen } from '@/components/use-on-screen';

const LegacyOfTime = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-200px');

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 bg-secondary/30 text-center">
        <div className="container mx-auto px-4 z-10 flex flex-col items-center">
            <h2 className={`font-display text-4xl md:text-6xl text-foreground mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                A Legacy of Time
            </h2>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <AgeTimer />
            </div>

            <p className={`font-body text-base md:text-xl text-foreground/80 mt-12 max-w-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                Every second is a testament to the incredible person you are becoming. This is your journey, unfolding in real-time.
            </p>
        </div>
    </section>
  );
};

export default LegacyOfTime;
