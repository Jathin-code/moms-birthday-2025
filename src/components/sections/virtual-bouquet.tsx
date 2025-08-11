"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useOnScreen } from '@/components/use-on-screen';

const VirtualBouquet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-200px');

  return (
    <section ref={ref} className="relative w-full py-24 md:py-32 bg-background text-center">
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <h2 className={`font-display text-4xl md:text-6xl text-foreground mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          A Bouquet for You
        </h2>
        <p className={`font-body text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          To the most beautiful Mummy, a flower for every time you've made my world brighter.
        </p>
        
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <Image
                src="https://placehold.co/600x400.png"
                alt="A beautiful bouquet of flowers"
                width={600}
                height={400}
                data-ai-hint="flower bouquet"
                className="rounded-lg shadow-2xl"
            />
        </div>
      </div>
    </section>
  );
};

export default VirtualBouquet;
