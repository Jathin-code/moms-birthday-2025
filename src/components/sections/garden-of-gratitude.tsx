"use client";

import React, { useRef } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import { shortMessages } from '@/lib/content';
import { Card, CardContent } from '@/components/ui/card';

const Blossom = ({ message, delay }: { message: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-2 bg-primary/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: `${delay}ms`}}></div>
      <Card className="w-72 h-48 m-4 backdrop-blur-lg bg-card/80 border-primary/20 shadow-2xl shadow-primary/10 transition-transform hover:scale-105 duration-300">
        <CardContent className="flex items-center justify-center h-full p-6">
          <p className="text-center font-display text-xl text-card-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
};

const GardenOfGratitude = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-200px');

  return (
    <section id="garden-of-gratitude" ref={ref} className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
       <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background opacity-50"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 z-10">
        <h2 className={`text-center font-display text-4xl md:text-6xl mb-4 text-foreground transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          The Garden of Gratitude
        </h2>
        <p className={`text-center text-lg md:text-xl text-foreground/70 mb-16 transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          For all the seeds of kindness you've sown in my life.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {shortMessages.map((msg, index) => (
            <Blossom key={index} message={msg} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GardenOfGratitude;
