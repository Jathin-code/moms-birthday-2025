"use client";

import React from 'react';

// A single petal with its own animation
export const Petal = ({ style, message }: { style: React.CSSProperties; message: string }) => {
  return (
    <div
      title={message}
      className="absolute text-primary"
      style={style}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 40"
        style={{ transform: 'rotate(var(--rotation))' }}
      >
        <path
          fill="currentColor"
          d="M10 0C20 10 20 30 10 40C0 30 0 10 10 0Z"
        ></path>
      </svg>
    </div>
  );
};
