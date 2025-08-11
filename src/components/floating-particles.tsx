"use client";

import React, { useState, useEffect } from 'react';

const ConfettiParticle = ({ style, shape }: { style: React.CSSProperties, shape: string }) => {
  return <div style={style} className="text-2xl">{shape}</div>;
};

const FloatingParticles = ({ count = 100 }: { count?: number }) => {
  const [particles, setParticles] = useState<{style: React.CSSProperties, shape: string}[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const shapes = ['🎉', '✨', '💖', '⭐', '🎊', '🌸', '🎂'];
      return Array.from({ length: count }).map(() => {
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const delay = Math.random() * 5; 
        const initialX = Math.random() * 100;
        const initialRotation = Math.random() * 360;
        const finalRotation = initialRotation + (Math.random() - 0.5) * 720;
        const sway = Math.random() * 100 - 50;

        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        return {
          shape,
          style: {
            position: 'absolute',
            top: '-5vh',
            left: `${initialX}vw`,
            opacity: 1,
            animation: `fall ${duration}s linear ${delay}s forwards`,
            '--initial-rotation': `${initialRotation}deg`,
            '--final-rotation': `${finalRotation}deg`,
            '--sway': `${sway}px`,
          } as React.CSSProperties
        };
      });
    };
    setParticles(generateParticles());
  }, [count]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-20">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(var(--initial-rotation));
              opacity: 1;
            }
            100% {
              transform: translateY(105vh) translateX(var(--sway)) rotate(var(--final-rotation));
              opacity: 0.5;
            }
          }
        `}
      </style>
      {particles.map((p, i) => (
        <ConfettiParticle key={i} style={p.style} shape={p.shape} />
      ))}
    </div>
  );
};

export default FloatingParticles;
