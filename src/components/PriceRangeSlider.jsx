import React, { useCallback } from "react";
import { PRICE_LIMITS } from "../config/config.js";

const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

/**
 * Dual-thumb price range slider.
 * Uses two overlaid <input type="range"> for accessibility + keyboard support.
 *
 * Props:
 *  - min, max (numbers): current selected values
 *  - onChange({min, max}) called on any change
 *  - limits (optional): { min, max, step } — defaults to config.PRICE_LIMITS
 */
export default function PriceRangeSlider({
  min,
  max,
  onChange,
  limits = PRICE_LIMITS,
}) {
  const { min: LO, max: HI, step } = limits;

  const handleMin = useCallback(
    (e) => {
      const val = Math.min(Number(e.target.value), max - step);
      onChange({ min: val, max });
    },
    [max, onChange, step]
  );

  const handleMax = useCallback(
    (e) => {
      const val = Math.max(Number(e.target.value), min + step);
      onChange({ min, max: val });
    },
    [min, onChange, step]
  );

  // Percentages for the highlight bar
  const leftPct = ((min - LO) / (HI - LO)) * 100;
  const rightPct = ((max - LO) / (HI - LO)) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-semibold text-brand-charcoalSoft">
        <span className="rounded-full bg-brand-tealLight px-3 py-1 text-brand-teal">
          {formatINR(min)}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-brand-charcoalSoft/70">
          Selected Range
        </span>
        <span className="rounded-full bg-brand-tealLight px-3 py-1 text-brand-teal">
          {formatINR(max)}
        </span>
      </div>

      <div className="relative mt-5 h-10">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-cream" />
        {/* Highlight */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand-teal"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={LO}
          max={HI}
          step={step}
          value={min}
          onChange={handleMin}
          aria-label="Minimum price"
          className="range-thumb absolute inset-0 h-full w-full"
          style={{ zIndex: min > HI - (HI - LO) * 0.5 ? 5 : 3 }}
        />
        {/* Max thumb */}
        <input
          type="range"
          min={LO}
          max={HI}
          step={step}
          value={max}
          onChange={handleMax}
          aria-label="Maximum price"
          className="range-thumb absolute inset-0 h-full w-full"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-brand-charcoalSoft/70">
        <span>{formatINR(LO)}</span>
        <span>{formatINR(HI)}</span>
      </div>
    </div>
  );
}
