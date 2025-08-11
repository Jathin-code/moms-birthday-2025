
"use client";

import React, { useRef } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import Image from 'next/image';

const VirtualBouquet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-300px');

  return (
    <section ref={ref} className="relative w-full py-24 md:py-48 bg-background text-center overflow-hidden">
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <h2 className={`font-display text-4xl md:text-6xl text-foreground mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          A Bouquet of Love
        </h2>
        <p className={`font-body text-lg md:text-xl text-foreground/80 mb-16 max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          A real bouquet for the most special person.
        </p>
        
        <div className={`relative w-full max-w-md h-96 md:h-[500px] transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Image
            src="https://placehold.co/600x800.png"
            alt="A beautiful bouquet of flowers"
            data-ai-hint="flower bouquet"
            fill
            className="object-contain rounded-lg shadow-2xl shadow-primary/20"
          />
        </div>
      </div>
    </section>
  );
};

export default VirtualBouquet;
