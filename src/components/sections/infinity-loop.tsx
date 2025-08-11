"use client";

import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { infinityLoopMessages } from '@/lib/content';
import { useOnScreen } from '@/components/use-on-screen';

const InfinityLoop = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-200px');
  
  useEffect(() => {
    if (!api || !isVisible) return;
    
    const interval = setInterval(() => {
        if (api.canScrollNext()) {
            api.scrollNext();
        } else {
            api.scrollTo(0);
        }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, isVisible]);

  return (
    <section ref={ref} className="w-full py-24 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto">
        <h2 className={`text-center font-display text-4xl md:text-6xl mb-16 text-foreground transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          An Infinity of Love
        </h2>
        <Carousel 
            setApi={setApi}
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
          <CarouselContent>
            {infinityLoopMessages.map((message, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-56 bg-primary/90 text-primary-foreground shimmer shadow-lg border-none">
                    <CardContent className="flex h-full items-center justify-center p-6">
                      <p className="text-2xl font-display text-center">{message}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default InfinityLoop;
