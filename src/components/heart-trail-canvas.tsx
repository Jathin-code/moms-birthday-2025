"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useOnScreen } from './use-on-screen';

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
      ctx.fillStyle = `hsl(45, 100%, 70%)`; // Gold
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

    const handleMove = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      hearts.current.push({
        x: x - rect.left,
        y: y - rect.top,
        alpha: 1.0,
        size: Math.random() * 15 + 10,
        velocity: Math.random() * 1.5 + 0.5,
      });
    };
    
    const handleMouseMove = (event: MouseEvent) => handleMove(event.clientX, event.clientY);
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      handleMove(event.touches[0].clientX, event.touches[0].clientY);
    };

    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]" />;
};
