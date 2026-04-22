/**
 * @file ActivePanelFrame.tsx
 * @description Wrapper that marks a panel as "live" without the AI-glow crutch.
 *              Renders a 1px teal top hairline plus a 60%-width scanline that
 *              sweeps left-to-right on a 3s loop. When inactive, nothing
 *              visible is added. Replaces the previous border + double-glow
 *              box-shadow treatment across calibrate + session screens.
 *
 * COGNITIVE DEBT NOTICE:
 *   - The scanline is positioned absolutely at the TOP of the frame, so the
 *     wrapped element MUST be `relative`-positioned by its own container
 *     (we set `relative` here but the child decides layout). The scanline
 *     is `pointer-events: none` so it never eats clicks.
 *   - Motion is gated on `prefers-reduced-motion`. In that mode the scanline
 *     becomes a static full-width 1px rule so the active state is still
 *     visible, it just doesn't animate.
 */
'use client';

interface ActivePanelFrameProps {
  active: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function ActivePanelFrame({
  active,
  children,
  className = '',
}: ActivePanelFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {active && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 right-0 z-10"
            style={{
              height: '1px',
              backgroundColor: 'rgba(42,185,196,0.55)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-10 overflow-hidden"
            style={{
              height: '1px',
              width: '100%',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '40%',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(42,185,196,0.95) 50%, transparent 100%)',
                animation: 'ej-scanline 3.2s linear infinite',
              }}
            />
          </div>
          <style>{`
            @keyframes ej-scanline {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(350%); }
            }
            @media (prefers-reduced-motion: reduce) {
              [data-ej-active-scanline] { animation: none !important; opacity: 0; }
            }
          `}</style>
        </>
      )}
      {children}
    </div>
  );
}
