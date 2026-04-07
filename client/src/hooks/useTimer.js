import { useEffect, useRef, useState } from "react";

export default function useTimer(defaultSeconds = 1500) {
  const [timeLeft, setTimeLeft] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          hasFinishedRef.current = true;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(defaultSeconds);
    hasFinishedRef.current = false;
  };

  const completeTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    hasFinishedRef.current = true;
  };

  return {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
    sessionMinutes: Math.floor(defaultSeconds / 60),
    hasFinished: hasFinishedRef.current
  };
}