import React, { useEffect, useState } from "react";

/**
 * Typewriter / written text animation.
 * Types characters one by one, optional blink caret.
 */
export default function Typewriter({
  text = "",
  className = "",
  speed = 45,
  startDelay = 300,
  as: Tag = "span",
  showCursor = true,
  onDone,
}) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown("");
    setDone(false);
    let i = 0;
    let intervalId;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setShown(text);
      setDone(true);
      onDone?.();
      return;
    }

    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onDone]);

  return (
    <Tag className={className}>
      {shown}
      {showCursor && !done && (
        <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] animate-pulse bg-brand-teal align-baseline" aria-hidden />
      )}
      {showCursor && done && (
        <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-brand-teal/0 align-baseline" aria-hidden />
      )}
    </Tag>
  );
}
