import React from "react";

/**
 * Decorative paw print SVG.
 * Use with Tailwind color + size classes: `className="h-8 w-8 text-brand-gold"`.
 */
export default function PawDecoration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="42" rx="14" ry="12" />
      <circle cx="16" cy="24" r="6.5" />
      <circle cx="32" cy="18" r="6.5" />
      <circle cx="48" cy="24" r="6.5" />
      <circle cx="10" cy="40" r="5" />
      <circle cx="54" cy="40" r="5" />
    </svg>
  );
}
