"use client";

import React, { useState, useEffect } from 'react';

const AgeTimer = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [timeLived, setTimeLived] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const birthDate = new Date('2007-10-09T09:00:00');

        const calculateTimeLived = () => {
            const now = new Date();
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();
            let hours = now.getHours() - birthDate.getHours();
            let minutes = now.getMinutes() - birthDate.getMinutes();
            let seconds = now.getSeconds() - birthDate.getSeconds();

            if (seconds < 0) {
                minutes--;
                seconds += 60;
            }
            if (minutes < 0) {
                hours--;
                minutes += 60;
            }
            if (hours < 0) {
                days--;
                hours += 24;
            }
            if (days < 0) {
                months--;
                // Get the last day of the previous month
                const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            setTimeLived({ years, months, days, hours, minutes, seconds });
        };

        calculateTimeLived();
        const timer = setInterval(calculateTimeLived, 1000);
        return () => clearInterval(timer);
    }, [isMounted]);

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <span className="text-2xl font-bold font-display text-primary text-glow">{String(value).padStart(2, '0')}</span>
            <span className="text-xs text-foreground/70 uppercase tracking-widest">{label}</span>
        </div>
    );
    
    if (!isMounted) {
      return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <div className="relative bg-background/50 backdrop-blur-md border border-primary/20 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-3">
                    <TimeUnit value={timeLived.years} label="Years" />
                    <TimeUnit value={timeLived.months} label="Months" />
                    <TimeUnit value={timeLived.days} label="Days" />
                    <TimeUnit value={timeLived.hours} label="Hours" />
                    <TimeUnit value={timeLived.minutes} label="Mins" />
                    <TimeUnit value={timeLived.seconds} label="Secs" />
                </div>
            </div>
        </div>
    );
};

export default AgeTimer;
