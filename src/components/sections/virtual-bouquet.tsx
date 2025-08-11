
"use client";

import React, { useRef } from 'react';
import { useOnScreen } from '@/components/use-on-screen';

const FlowerPetal = ({ className, rotation }: { className?: string; rotation: number }) => (
    <div
      className={`absolute top-1/2 left-1/2 w-24 h-48 origin-bottom-center ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-full h-full bg-gradient-to-t from-pink-300 to-pink-200 rounded-t-[100%] rounded-b-[10%]" />
    </div>
);

const VirtualBouquet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-300px');

  return (
    <section ref={ref} className="relative w-full py-24 md:py-48 bg-background text-center overflow-hidden">
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        <h2 className={`font-display text-4xl md:text-6xl text-foreground mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          A Flower Grown From Love
        </h2>
        <p className={`font-body text-lg md:text-xl text-foreground/80 mb-24 max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Just as this flower blooms, so does my love for you.
        </p>
        
        <div className={`relative w-64 h-64 transition-transform duration-1000 delay-500 ${isVisible ? 'scale-100' : 'scale-0'}`}>
          {/* Stem */}
          <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-4 h-48 bg-green-700 rounded-t-full" />
          
          {/* Petals */}
          <div className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${isVisible ? 'transform rotate-0' : 'transform rotate-10'}`}>
            <FlowerPetal rotation={0} className={`transition-transform duration-[2000ms] ease-out delay-700 ${isVisible ? 'translate-y-[-70px]' : ''}`} />
            <FlowerPetal rotation={60} className={`transition-transform duration-[2000ms] ease-out delay-900 ${isVisible ? 'translate-y-[-65px]' : ''}`} />
            <FlowerPetal rotation={-60} className={`transition-transform duration-[2000ms] ease-out delay-900 ${isVisible ? 'translate-y-[-65px]' : ''}`} />
            <FlowerPetal rotation={120} className={`transition-transform duration-[2000ms] ease-out delay-1100 ${isVisible ? 'translate-y-[-50px]' : ''}`} />
            <FlowerPetal rotation={-120} className={`transition-transform duration-[2000ms] ease-out delay-1100 ${isVisible ? 'translate-y-[-50px]' : ''}`} />
          </div>

          {/* Center of Flower */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-200 rounded-full transition-all duration-1000 delay-[2500ms] ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            style={{boxShadow: '0 0 40px 20px #fde047'}}
          >
            <div className={`flex items-center justify-center h-full text-center text-yellow-800 font-display text-lg p-2 transition-opacity duration-500 delay-[3000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                My Dearest Mummy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualBouquet;
