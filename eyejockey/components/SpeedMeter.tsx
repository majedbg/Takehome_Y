/**
 * @file SpeedMeter.tsx
 * @description Analog VU-style speed meter. Flat horizontal strip with
 *              calibrated tick marks and a needle indicator. The needle
 *              translates across the track via `transform` (GPU-cheap),
 *              not by animating width. Color zones: teal (slow) / lime
 *              (in-zone) / oxblood (over speed).
 *
 * COGNITIVE DEBT NOTICE:
 *   - speedRatio is 0–2. 1.0 = exactly on target, anchored at center of the
 *     scale (the "0" tick). The ratio → percent mapping clamps to [0, 100].
 *   - The track zone tints (teal/lime/oxblood) are intentionally very muted
 *     (≤0.22 alpha) so the needle reads as the primary signal. Zone boundaries
 *     are at ratio = 0.75 and 1.25, matching SpeedMeter's earlier semantics
 *     and the WPMResultCard gradient thresholds.
 */
'use client';

interface SpeedMeterProps {
  speedRatio: number;
}

const SLOW_BOUND = 0.75;
const FAST_BOUND = 1.25;
const METER_WIDTH_PX = 280;

function getNeedleColor(ratio: number): string {
  if (ratio < SLOW_BOUND) return '#2AB9C4';
  if (ratio <= FAST_BOUND) return '#88CC4D';
  return '#BF3A27';
}

function ratioToPercent(ratio: number): number {
  return Math.min(100, Math.max(0, ratio * 50));
}

export default function SpeedMeter({ speedRatio }: SpeedMeterProps) {
  const needleColor = getNeedleColor(speedRatio);
  const needlePct = ratioToPercent(speedRatio);
  const slowPct = ratioToPercent(SLOW_BOUND);
  const fastPct = ratioToPercent(FAST_BOUND);

  return (
    <div
      className="fixed top-3 left-1/2 z-50 font-mono"
      style={{
        transform: 'translateX(-50%)',
        width: `${METER_WIDTH_PX}px`,
      }}
      role="meter"
      aria-valuenow={speedRatio}
      aria-valuemin={0}
      aria-valuemax={2}
      aria-label="Speaking speed relative to target WPM"
    >
      {/* Tick-mark scale */}
      <div
        className="relative"
        style={{ height: '10px' }}
      >
        {/* Baseline */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.25)',
          }}
        />
        {/* Zone tints along the baseline */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            height: '1px',
            width: `${slowPct}%`,
            backgroundColor: 'rgba(42,185,196,0.55)',
          }}
        />
        <div
          className="absolute bottom-0"
          style={{
            left: `${slowPct}%`,
            height: '1px',
            width: `${fastPct - slowPct}%`,
            backgroundColor: 'rgba(136,204,77,0.65)',
          }}
        />
        <div
          className="absolute bottom-0"
          style={{
            left: `${fastPct}%`,
            height: '1px',
            width: `${100 - fastPct}%`,
            backgroundColor: 'rgba(191,58,39,0.6)',
          }}
        />
        {/* Tick marks — 11 total, center tick is tallest */}
        {Array.from({ length: 11 }).map((_, i) => {
          const pct = i * 10;
          const isCenter = i === 5;
          const isMajor = i % 5 === 0;
          return (
            <div
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${pct}%`,
                transform: 'translateX(-0.5px)',
                width: '1px',
                height: isCenter ? '10px' : isMajor ? '7px' : '4px',
                backgroundColor: isCenter
                  ? 'rgba(255,255,255,0.55)'
                  : 'rgba(255,255,255,0.22)',
              }}
            />
          );
        })}

        {/* Needle — translates via transform (not width) */}
        <div
          className="absolute bottom-0 pointer-events-none"
          style={{
            left: 0,
            width: '2px',
            height: '14px',
            transform: `translateX(${(needlePct / 100) * METER_WIDTH_PX - 1}px)`,
            backgroundColor: needleColor,
            boxShadow: `0 0 4px ${needleColor}`,
            transition:
              'transform 240ms cubic-bezier(0.22, 1, 0.36, 1), background-color 400ms ease',
          }}
        />
      </div>

      {/* Labels — small, tracked, mono. Only three anchors: slow / on-pace / fast. */}
      <div
        className="relative mt-0.5"
        style={{ height: '10px' }}
      >
        <span
          className="absolute text-[9px] uppercase tabular-nums"
          style={{
            left: 0,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          slow
        </span>
        <span
          className="absolute text-[9px] uppercase tabular-nums"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.08em',
          }}
        >
          0
        </span>
        <span
          className="absolute text-[9px] uppercase tabular-nums"
          style={{
            right: 0,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          fast
        </span>
      </div>
    </div>
  );
}
