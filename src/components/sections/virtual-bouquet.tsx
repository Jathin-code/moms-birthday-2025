
"use client";

import React, { useRef } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import Image from 'next/image';

const VirtualBouquet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-300px');

  return (
    <section ref={ref} className="relative w-full py-24 md:py-48 bg-background text-center overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} 
            data-ai-hint="floral pattern"
        />
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <h2 className={`font-display text-4xl md:text-6xl text-foreground mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          This is for you, Mummy
        </h2>
        
        <div className={`relative w-full max-w-md h-96 md:h-[500px] transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Image
            src="https://storage.googleapis.com/studiov2-uploads/2024-08-01/5e739951-e737-4d1a-8260-84a51e605d3b.png"
            alt="A beautiful bouquet of blue orchids"
            fill
            className="object-contain rounded-lg shadow-2xl shadow-primary/20"
          />
        </div>
      </div>
    </section>
  );
};

export default VirtualBouquet;
