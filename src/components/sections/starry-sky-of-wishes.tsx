"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mediumWishes } from '@/lib/content';

const StarrySky = ({ starCount = 50, shootingStarCount = 5 }) => {
    const [stars, setStars] = useState<any[]>([]);
    const [shootingStars, setShootingStars] = useState<any[]>([]);

    useEffect(() => {
        const generateStars = () => {
            return Array.from({ length: starCount }).map((_, i) => ({
                id: i,
                size: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
            }));
        };

        const generateShootingStars = () => {
            return Array.from({ length: shootingStarCount }).map((_, i) => ({
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${-20 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${Math.random() * 2 + 1}s`,
            }));
        };
        
        setStars(generateStars());
        setShootingStars(generateShootingStars());

    }, [starCount, shootingStarCount]);


  return (
    <div className="absolute inset-0">
      <style>
        {`
          @keyframes twinkle { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
          @keyframes shooting { 
            0% { transform: rotate(20deg) translateX(0); opacity: 1; }
            100% { transform: rotate(20deg) translateX(150vw); opacity: 0; } 
          }
        `}
      </style>
      {/* Twinkling Stars */}
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: s.left,
            top: s.top,
            animation: `twinkle ${s.animationDuration} infinite alternate`,
          }}
        />
      ))}
      {/* Shooting Stars */}
      {shootingStars.map(s => (
        <div
          key={s.id}
          className="absolute h-0.5 w-24 bg-gradient-to-r from-white/80 to-transparent"
          style={{
            top: s.top,
            left: s.left,
            animation: `shooting ${s.animationDuration} linear ${s.animationDelay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

const StarrySkyOfWishes = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-200px');

  return (
    <section ref={ref} className="relative w-full py-24 md:py-48 bg-[#0a0a18] text-white overflow-hidden">
        <StarrySky />
        <div className="container mx-auto px-4 z-10 relative">
            <h2 className={`text-center font-display text-4xl md:text-6xl mb-4 text-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                The Starry Sky of Wishes
            </h2>
            <p className={`text-center text-lg md:text-xl text-white/70 mb-16 transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                A wish for you upon every star.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {mediumWishes.map((wish, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                           <button className={`fade-in-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 150}ms` }}>
                                <div className="w-4 h-4 rounded-full bg-white animate-pulse shadow-[0_0_12px_4px_rgba(255,255,255,0.5)] cursor-pointer hover:scale-150 transition-transform duration-300" style={{ animationDelay: `${index * 0.2}s`}} />
                           </button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/20 backdrop-blur-md border-primary/50 text-white">
                            <DialogHeader>
                                <DialogTitle className="font-display text-primary text-2xl">A Wish For You</DialogTitle>
                                <DialogDescription className="text-white/80 text-lg pt-4">
                                    {wish}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    </section>
  );
};

export default StarrySkyOfWishes;
