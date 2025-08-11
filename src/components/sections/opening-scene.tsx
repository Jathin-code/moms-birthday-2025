"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Gift } from 'lucide-react';
import Typewriter from '@/components/typewriter';
import FloatingParticles from '@/components/floating-particles';
import { PetalBurst } from '@/components/petal-burst';

const OpeningScene = () => {
  const [gateOpen, setGateOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [isBursting, setIsBursting] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const magicWord = 'love';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gateOpen) return;

      let newTyped = typed + e.key.toLowerCase();
      if (magicWord.startsWith(newTyped)) {
        setTyped(newTyped);
        if (newTyped === magicWord) {
          setGateOpen(true);
          setTyped('');
        }
      } else {
        setTyped(e.key.toLowerCase() === magicWord[0] ? e.key.toLowerCase() : '');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typed, gateOpen]);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
      setIsBursting(true);
      // Reset after a short delay to allow re-triggering
      setTimeout(() => setIsBursting(false), 100);
    }
    scrollToNext();
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('garden-of-gratitude');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="opening-scene" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden p-4 bg-gradient-to-br from-accent via-background to-background">
      <FloatingParticles count={30} />
      <PetalBurst isBursting={isBursting} targetRect={buttonRect} />
      
      <div className="z-10 text-center flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-8xl text-foreground text-glow mb-2 drop-shadow-lg">
          Happy Birthday, Mummy
        </h1>
        <div className="font-display text-2xl md:text-4xl text-foreground/80 mb-8">
            <Typewriter text="My Queen, My Strength, My Everything" speed={100} />
        </div>
        <Button 
          ref={buttonRef}
          onClick={handleButtonClick}
          size="lg"
          variant="outline"
          className="bg-background/20 text-foreground hover:bg-background/40 backdrop-blur-sm border-foreground/30 rounded-full transition-all duration-300 group shadow-lg"
        >
          Step Inside
          <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
        </Button>
        <p className="text-sm text-foreground/50 mt-8 animate-pulse">Try typing the magic word</p>
      </div>

      {/* Golden Gate Easter Egg */}
      <div 
        className={`absolute top-0 left-0 w-1/2 h-full bg-primary/80 backdrop-blur-md transition-transform duration-1000 ease-in-out ${gateOpen ? '-translate-x-full' : 'translate-x-0'}`} 
        style={{clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'}}
      />
      <div 
        className={`absolute top-0 right-0 w-1/2 h-full bg-primary/80 backdrop-blur-md transition-transform duration-1000 ease-in-out ${gateOpen ? 'translate-x-full' : 'translate-x-0'}`}
        style={{clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)'}}
      />
       {gateOpen && <div className="absolute z-20 text-white text-4xl font-headline animate-ping"><Gift size={64}/></div>}
    </section>
  );
};

export default OpeningScene;
