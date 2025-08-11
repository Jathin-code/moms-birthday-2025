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
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const delay = Math.random() * 5;
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() - 0.5) * 60;
        const rotation = Math.random() * 720 - 360;

        return {
          position: 'absolute',
          left: `${startX}vw`,
          top: '-5vh',
          animation: `fall ${duration}s linear ${delay}s forwards`,
          '--start-x': `${startX}vw`,
          '--end-x': `${endX}vw`,
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
          @keyframes fall {
            0% {
              transform: translateY(-5vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(105vh) rotate(var(--rotation));
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
