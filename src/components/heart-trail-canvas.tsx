
"use client";

import React, { useRef, useEffect, useCallback } from 'react';

export const HeartTrailCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hearts = useRef<any[]>([]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    hearts.current.forEach((heart, index) => {
      heart.alpha -= 0.02;
      if (heart.alpha <= 0) {
        hearts.current.splice(index, 1);
        return;
      }
      heart.y -= heart.velocity;
      ctx.globalAlpha = heart.alpha;
      ctx.fillStyle = heart.color;
      ctx.font = `${heart.size}px serif`;
      ctx.fillText('♥', heart.x, heart.y);
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    const render = () => {
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const colors = ['#E5989B', '#6D98BA'];
        hearts.current.push({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            alpha: 1.0,
            size: Math.random() * 15 + 10,
            velocity: Math.random() * 1.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
        });
    };
    
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    // We only want this effect on desktop, so we check for touch support
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
        document.addEventListener('mousemove', handleMouseMove);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]" />;
};
