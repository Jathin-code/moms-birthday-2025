
"use client";

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useOnScreen } from '@/components/use-on-screen';
import { finalMessage, finalSender, finalSubMessage } from '@/lib/content';
import { Heart, RefreshCw } from 'lucide-react';

const GiftBox = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Box Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-2/3 bg-primary rounded-b-lg shadow-xl" />
      {/* Box Lid */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 w-[110%] h-1/3 bg-primary/90 rounded-t-lg shadow-2xl transition-all duration-1000 ease-in-out ${isOpen ? '-translate-y-24 rotate-12' : 'bottom-2/3'}`}
        style={{ transformOrigin: 'bottom right' }}
      />
      {/* Ribbon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-full bg-accent" />
        <div className="absolute w-full h-4 bg-accent top-1/2 -translate-y-[130%]" />
      </div>
      {/* Glowing Heart */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 delay-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <Heart className="w-24 h-24 text-white animate-pulse" fill="white" style={{filter: 'drop-shadow(0 0 15px white)'}} />
      </div>
    </div>
  );
};

const GiftBoxReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-250px');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center bg-gradient-to-t from-accent via-secondary/50 to-background text-center overflow-hidden px-4">
      <div className="mb-16">
        <GiftBox isOpen={isVisible} />
      </div>
      <h2 className={`font-display text-4xl md:text-6xl text-foreground text-glow transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {finalMessage}
      </h2>
      <p className={`font-body text-lg md:text-xl text-foreground/70 mt-2 transition-opacity duration-1000 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {finalSubMessage}
      </p>
      <p className={`font-display text-xl md:text-2xl text-foreground/80 mt-4 transition-opacity duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {finalSender}
      </p>

      <Button
        onClick={scrollToTop}
        size="lg"
        variant="ghost"
        className={`mt-16 text-foreground/70 hover:text-foreground transition-opacity duration-1000 delay-1200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        Read Again
      </Button>
    </section>
  );
};

export default GiftBoxReveal;
