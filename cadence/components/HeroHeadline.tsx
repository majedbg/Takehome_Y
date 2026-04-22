/**
 * @file HeroHeadline.tsx
 * @description The landing-page headline — "Words on cue. / Eyes on lens."
 *              Extracted so the same mark can appear as the page hero and
 *              inside the HeroDemo preview card without duplicating styles.
 *              Size scales fluidly via clamp() so it reads as either a full
 *              hero or a title strip depending on its container width.
 */
'use client';

interface HeroHeadlineProps {
  /** Visual size tier. "hero" is the full landing headline; "compact" is a
   *  smaller variant suited to embedding inside the demo card. */
  size?: 'hero' | 'compact';
  /** Optional override for the text alignment. Defaults to centered, which
   *  matches both existing call-sites. */
  align?: 'center' | 'left';
  className?: string;
}

export default function HeroHeadline({
  size = 'hero',
  align = 'center',
  className = '',
}: HeroHeadlineProps) {
  const fontSize =
    size === 'hero'
      ? 'clamp(2.5rem, 6vw, 4.5rem)'
      : 'clamp(1.5rem, 2.8vw, 2.25rem)';

  return (
    <h1
      className={`font-semibold tracking-tight ${className}`}
      style={{
        fontSize,
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        textAlign: align,
        margin: 0,
      }}
    >
      Words on cue.
      <br />
      <span style={{ color: 'rgba(229,134,58,0.95)' }}>Eyes on lens.</span>
    </h1>
  );
}
