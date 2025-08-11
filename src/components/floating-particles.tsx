"use client";

import React, { useState, useEffect } from 'react';

const ConfettiParticle = ({ style }: { style: React.CSSProperties }) => {
  const shapes = ['🎉', '✨', '💖', '⭐', '🎊'];
  const [shape] = useState(() => shapes[Math.floor(Math.random() * shapes.length)]);
  
  return <div style={style} className="text-2xl">{shape}</div>;
};

const FloatingParticles = ({ count = 50 }: { count?: number }) => {
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: count }).map((_, i) => {
        const duration = Math.random() * 4 + 3; // 3s to 7s
        const delay = Math.random() * 0.5; // Start burst quickly
        const startY = Math.random() * 100;
        const startX = i % 2 === 0 ? -10 : 110; // Start from left or right off-screen
        const endX = startX < 0 ? Math.random() * 40 + 20 : Math.random() * 40 + 40;
        const endY = startY + (Math.random() - 0.5) * 200;
        const rotation = Math.random() * 720 - 360;

        return {
          position: 'absolute',
          top: `${startY}vh`,
          left: `${startX}vw`,
          animation: `burst ${duration}s ease-out ${delay}s forwards`,
          '--end-x': `${endX}vw`,
          '--end-y': `${endY}vh`,
          '--rotation': `${rotation}deg`,
        } as React.CSSProperties;
      });
    };
    setParticles(generateParticles());
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <style>
        {`
          @keyframes burst {
            0% {
              transform: translate(0, 0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translate(var(--end-x), var(--end-y)) rotate(var(--rotation));
              opacity: 0;
            }
          }
        `}
      </style>
      {particles.map((style, i) => (
        <ConfettiParticle key={i} style={style} />
      ))}
    </div>
  );
};

export default FloatingParticles;
