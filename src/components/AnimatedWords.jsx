import React, { useEffect, useState } from "react";

/**
 * Premium word-by-word fade / rise reveal for hero headlines.
 */
export default function AnimatedWords({
  text = "",
  className = "",
  as: Tag = "span",
  delay = 200,
  stagger = 90,
}) {
  const words = text.trim().split(/\s+/);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [text]);

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block will-change-transform"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(110%)",
              filter: ready ? "blur(0)" : "blur(6px)",
              transition: `opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}ms,
                transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * stagger}ms,
                filter 0.65s ease ${delay + i * stagger}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
