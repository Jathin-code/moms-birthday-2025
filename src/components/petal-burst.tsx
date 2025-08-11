"use client";

import React, { useState, useEffect } from 'react';
import { Petal } from './petal';
import { shortMessages } from '@/lib/content';

// Manages a collection of petals for the burst effect
export const PetalBurst = ({ isBursting, targetRect }: { isBursting: boolean; targetRect: DOMRect | null }) => {
  const [petals, setPetals] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    if (isBursting && targetRect) {
      const newPetals = Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 15 + 10;
        const animationDuration = Math.random() * 2 + 3; // 3s to 5s
        const animationDelay = Math.random() * 0.5;
        const initialRotation = Math.random() * 360;
        const finalRotation = (Math.random() - 0.5) * 720;
        const endX = (Math.random() - 0.5) * 400;
        const endY = Math.random() * -300 - 100;
        const message = shortMessages[i % shortMessages.length];

        const style: React.CSSProperties & { [key: string]: any } = {
          position: 'fixed',
          width: `${size}px`,
          height: `${size * 2}px`,
          left: `${targetRect.left + targetRect.width / 2}px`,
          top: `${targetRect.top + targetRect.height / 2}px`,
          opacity: 0,
          '--initial-rotation': `${initialRotation}deg`,
          '--final-rotation': `${finalRotation}deg`,
          '--end-x': `${endX}px`,
          '--end-y': `${endY}px`,
          animation: `petal-fall ${animationDuration}s ease-out ${animationDelay}s forwards`,
        };
        return <Petal key={i} style={style} message={message} />;
      });
      setPetals(newPetals);

      // Clean up petals after animation
      setTimeout(() => {
        setPetals([]);
      }, 5500);
    }
  }, [isBursting, targetRect]);

  return (
    <div className="pointer-events-none">
      <style>
        {`
          @keyframes petal-fall {
            0% {
              transform: translate(0, 0) rotate(var(--initial-rotation));
              opacity: 1;
            }
            100% {
              transform: translate(var(--end-x), var(--end-y)) rotate(var(--final-rotation));
              opacity: 0;
            }
          }
        `}
      </style>
      {petals}
    </div>
  );
};
