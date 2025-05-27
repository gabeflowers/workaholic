import React, { useState, useEffect } from 'react';
import { formatTime, formatDate } from '../utils/helpers';

export const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card p-4 text-center">
      <div className="clock-display text-4xl font-bold mb-1 tracking-wider">
        {formatTime(currentTime)}
      </div>
      <div className="heading-secondary text-sm opacity-80">
        {formatDate(currentTime)}
      </div>
    </div>
  );
}; 