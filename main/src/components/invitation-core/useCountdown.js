"use client";

import { useState, useEffect } from "react";

export function getCountdownParts(targetISO) {
  const now = new Date().getTime();
  const target = new Date(targetISO).getTime();
  const diff = Math.max(0, (Number.isNaN(target) ? now : target) - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function useCountdown(targetISO) {
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(targetISO)
  );

  useEffect(() => {
    setCountdown(getCountdownParts(targetISO));
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(targetISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetISO]);

  return countdown;
}
