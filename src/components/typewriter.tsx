"use client";
import { useState, useEffect } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
  className?: string;
  start?: boolean;
};

const Typewriter = ({ text, speed = 50, className, start = true }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (start) {
      let i = 0;
      setDisplayedText('');
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i > text.length - 1) {
          clearInterval(intervalId);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed, start]);

  return <p className={className}>{displayedText}</p>;
};

export default Typewriter;
