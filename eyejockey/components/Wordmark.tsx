/**
 * @file Wordmark.tsx
 * @description EyeJockey wordmark — lockup of a small VU-needle glyph + the name.
 *              Sits top-left on each screen so the product has a point of view
 *              instead of reading as a generic dark-mode utility.
 *
 * COGNITIVE DEBT NOTICE:
 *   - The glyph is a 16px inline SVG: a baseline with tick marks and a needle
 *     pointing slightly past center (at +1 "on pace"). It is intentionally
 *     static — a motion-animated needle here would compete with the live
 *     SpeedMeter in the session screen.
 *   - Tone is set by `tone` prop. "bold" is the default (full-weight name).
 *     "quiet" reduces the wordmark opacity for the session screen where it
 *     must not steal focus from the RSVP word.
 */
'use client';

interface WordmarkProps {
  tone?: 'bold' | 'quiet';
}

export default function Wordmark({ tone = 'bold' }: WordmarkProps) {
  const nameColor =
    tone === 'bold' ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)';
  const glyphColor =
    tone === 'bold' ? 'rgba(229,134,58,0.95)' : 'rgba(229,134,58,0.75)';
  const tickColor =
    tone === 'bold' ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.22)';

  return (
    <div
      className="inline-flex items-center gap-2 select-none"
      aria-label="EyeJockey"
    >
      <svg
        width="28"
        height="16"
        viewBox="0 0 28 16"
        fill="none"
        aria-hidden="true"
      >
        {/* baseline */}
        <line
          x1="2"
          y1="13"
          x2="26"
          y2="13"
          stroke={tickColor}
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* five tick marks — three short, center tall */}
        {[4, 9, 14, 19, 24].map((x, i) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={i === 2 ? 8 : 10}
            y2="13"
            stroke={tickColor}
            strokeWidth="1"
            strokeLinecap="round"
          />
        ))}
        {/* needle pivot + sweep — points slightly past 12 o'clock (on pace) */}
        <line
          x1="14"
          y1="13"
          x2="17"
          y2="3"
          stroke={glyphColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="14" cy="13" r="1.5" fill={glyphColor} />
      </svg>
      <span
        className="font-semibold"
        style={{
          color: nameColor,
          fontSize: '14px',
          letterSpacing: '-0.01em',
        }}
      >
        EyeJockey
      </span>
    </div>
  );
}
