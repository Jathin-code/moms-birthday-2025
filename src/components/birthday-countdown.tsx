"use client";

import React, { useState, useEffect } from 'react';
import FloatingParticles from './floating-particles';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let year = now.getFullYear();
            let birthday = new Date(year, 9, 9); // Month is 0-indexed, so 9 is October

            if (now > birthday) {
                birthday = new Date(year + 1, 9, 9);
            }

            const difference = birthday.getTime() - now.getTime();
            
            if (difference > 0) {
                setIsBirthday(false);
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setIsBirthday(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <span className="text-2xl font-bold font-display text-primary text-glow">{String(value).padStart(2, '0')}</span>
            <span className="text-xs text-foreground/70 uppercase tracking-widest">{label}</span>
        </div>
    );

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="relative bg-background/50 backdrop-blur-md border border-primary/20 rounded-lg p-3 shadow-lg">
                {isBirthday && <FloatingParticles count={20} />}
                <div className="flex items-center gap-4">
                    <CountdownUnit value={timeLeft.days} label="Days" />
                    <CountdownUnit value={timeLeft.hours} label="Hours" />
                    <CountdownUnit value={timeLeft.minutes} label="Mins" />
                    <CountdownUnit value={timeLeft.seconds} label="Secs" />
                </div>
            </div>
        </div>
    );
};

export default Countdown;
