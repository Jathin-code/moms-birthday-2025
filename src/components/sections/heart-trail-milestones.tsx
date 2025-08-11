"use client";

import React, { useRef } from 'react';
import { useOnScreen } from '@/components/use-on-screen';
import { milestoneMessages } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const MilestoneCard = ({ title, note, align }: { title: string; note: string; align: 'left' | 'right' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <div
      ref={ref}
      className={`w-full flex my-4 md:my-8 transition-all duration-1000 ease-out md:w-1/2 ${
        align === 'left' ? 'md:mr-auto' : 'md:ml-auto'
      } ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${align === 'left' ? '-translate-x-10' : 'translate-x-10'}`}`}
    >
      <div className="group [perspective:1000px] w-full">
        <div className="relative h-64 w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <Card className="absolute w-full h-full [backface-visibility:hidden] bg-card/80 backdrop-blur-md border-primary/30 shadow-lg flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="font-display text-xl md:text-2xl text-primary">{title}</CardTitle>
            </CardHeader>
          </Card>
          {/* Back */}
          <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary/90 border-primary shadow-xl">
            <CardContent className="flex h-full items-center justify-center p-4 md:p-6">
              <CardDescription className="text-center font-body text-base md:text-lg text-primary-foreground/90">
                {note}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const HeartTrailMilestones = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-200px');
  return (
    <section id="heart-trail" ref={ref} className="relative w-full py-24 md:py-32 container mx-auto px-4">
       <h2 className={`text-center font-display text-4xl md:text-6xl mb-4 text-foreground transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        A Path Paved with Love
      </h2>
      <p className={`text-center text-lg md:text-xl text-foreground/70 mb-16 transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        Remembering the moments that shaped me.
      </p>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/10 rounded-full -translate-x-1/2 md:left-1/2"></div>
        <div className="md:flex md:flex-col md:items-center">
            {milestoneMessages.map((milestone, index) => (
              <div key={index} className="flex md:w-full" style={{ justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                <MilestoneCard
                    title={milestone.title}
                    note={milestone.note}
                    align={index % 2 === 0 ? 'left' : 'right'}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HeartTrailMilestones;
