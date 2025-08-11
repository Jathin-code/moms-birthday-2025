"use client";

import React, { useState, useEffect } from 'react';

const ConfettiParticle = ({ style, shape }: { style: React.CSSProperties, shape: string }) => {
  return <div style={style} className="text-2xl">{shape}</div>;
};

const FloatingParticles = ({ count = 50 }: { count?: number }) => {
  const [particles, setParticles] = useState<{style: React.CSSProperties, shape: string}[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const shapes = ['🎉', '✨', '💖', '⭐', '🎊'];
      return Array.from({ length: count }).map(() => {
        const duration = Math.random() * 3 + 4; // 4s to 7s
        const delay = Math.random() * 0.2; // Start burst very quickly
        const angle = Math.random() * 360;
        const velocity = Math.random() * 300 + 300; // Distance of travel

        const endX = Math.cos(angle * Math.PI / 180) * velocity;
        const endY = Math.sin(angle * Math.PI / 180) * velocity + 400; // Add gravity
        const rotation = Math.random() * 1080 - 540;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        return {
          shape,
          style: {
            position: 'absolute',
            top: `50%`,
            left: `50%`,
            opacity: 1,
            animation: `burst-realistic ${duration}s cubic-bezier(0.1, 0.5, 0.3, 1) ${delay}s forwards`,
            '--end-x': `${endX}px`,
            '--end-y': `${endY}px`,
            '--rotation-start': `${rotation / 2}deg`,
            '--rotation-end': `${rotation}deg`,
          } as React.CSSProperties
        };
      });
    };
    setParticles(generateParticles());
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <style>
        {`
          @keyframes burst-realistic {
            0% {
              transform: translate(-50%, -50%) rotate(var(--rotation-start)) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) rotate(var(--rotation-end)) scale(0);
              opacity: 0;
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
