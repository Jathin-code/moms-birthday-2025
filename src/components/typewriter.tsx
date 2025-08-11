"use client";
import { useState, useEffect } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
  className?: string;
  start?: boolean;
  as?: React.ElementType;
};

const Typewriter = ({ text, speed = 50, className, start = true, as: Component = 'p' }: TypewriterProps) => {
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

  return <Component className={className}>{displayedText}</Component>;
};

export default Typewriter;
