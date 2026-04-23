/**
 * @file WordTicks.tsx
 * @description A subtle row of dots beneath the RSVP word, giving the user a
 *              read on how much time is left for the current word. Tick count
 *              scales with word duration (~1 per 200ms, clamped 1..8).
 *              Depletes right-to-left as time elapses.
 */
'use client';

interface WordTicksProps {
  /** Duration, in ms, allocated to the current word. */
  wordDuration: number;
  /** 0..1 progress through the current word's duration. */
  progress: number;
  /** Hide when not in the synced, word-in-flight state. */
  visible: boolean;
}

const MS_PER_TICK = 200;
const MIN_TICKS = 1;
const MAX_TICKS = 8;

export default function WordTicks({
  wordDuration,
  progress,
  visible,
}: WordTicksProps) {
  if (!visible) return null;

  const tickCount = Math.min(
    MAX_TICKS,
    Math.max(MIN_TICKS, Math.round(wordDuration / MS_PER_TICK))
  );
  const elapsedTicks = Math.min(tickCount, Math.floor(progress * tickCount));
  const remaining = tickCount - elapsedTicks;

  return (
    <div
      className="flex justify-center"
      style={{ gap: '6px', marginTop: '12px' }}
    >
      {Array.from({ length: tickCount }, (_, i) => {
        // Ticks deplete from the right — the rightmost lit tick fades first.
        const isLit = i < remaining;
        return (
          <span
            key={i}
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: isLit
                ? 'rgba(255,255,255,0.55)'
                : 'rgba(255,255,255,0.08)',
              transition: 'background-color 90ms ease',
            }}
          />
        );
      })}
    </div>
  );
}
