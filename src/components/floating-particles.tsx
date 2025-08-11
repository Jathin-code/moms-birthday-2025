"use client";

import React, { useState, useEffect } from 'react';

const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * -25;
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 20;

        return {
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: 'hsl(var(--primary) / 0.7)',
          borderRadius: '50%',
          top: `${Math.random() * 100}%`,
          left: `${startX}vw`,
          animation: `float ${duration}s ease-in-out ${delay}s infinite`,
          boxShadow: `0 0 8px hsl(var(--primary) / 0.5)`,
          '--start-x': `${startX}vw`,
          '--end-x': `${endX}vw`,
        } as React.CSSProperties;
      });
    };
    setParticles(generateParticles());
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(5vh) translateX(var(--start-x)) scale(1);
              opacity: 0;
            }
            10%, 90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-105vh) translateX(var(--end-x)) scale(0.5);
              opacity: 0;
            }
          }
        `}
      </style>
      {particles.map((style, i) => (
        <div key={i} style={style} />
      ))}
    </div>
  );
};

export default FloatingParticles;
