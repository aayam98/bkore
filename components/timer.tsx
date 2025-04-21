import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate:any = new Date("2025-01-01T09:00:00-08:00"); // January 1, 2025, 9 AM PST

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [ticking, setTicking] = useState(false); // State to trigger the tick effect

  function calculateTimeLeft() {
    const now:any = new Date();
    const difference = targetDate - now;

    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center pt-5">
      <div className="flex space-x-6 text-cente font-roboto">
        {/* Days */}
        <div className="text-center">
          <div className="text-6xl font-bold text-red-bc2026 leading-none">{timeLeft.days}</div>
          <div className="text-gray-300 text-sm uppercase font-semibold">Days</div>
        </div>

        {/* Hours */}
        <div className="text-center">
          <div className="text-6xl font-bold text-red-bc2026 leading-none">{timeLeft.hours}</div>
          <div className="text-gray-300 text-sm uppercase font-semibold">Hrs</div>
        </div>

        {/* Minutes */}
        <div className="text-center">
          <div className="text-6xl font-bold text-red-bc2026 leading-none">{timeLeft.minutes}</div>
          <div className="text-gray-300 text-sm uppercase font-semibold">Mins</div>
        </div>

        {/* Seconds */}
        <div className="text-center">
          <div className="text-6xl font-bold text-red-bc2026 leading-none">{timeLeft.seconds}</div>
          <div className="text-gray-300 text-sm uppercase font-semibold">Secs</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
