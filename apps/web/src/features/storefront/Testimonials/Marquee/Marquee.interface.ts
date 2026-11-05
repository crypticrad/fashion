import { ReactNode } from 'react';

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop of the track. Lower = faster. Defaults to 40. */
  durationSeconds?: number;
  /** Gap between items, in px. Defaults to 20. */
  gap?: number;
  /** Pause the scroll while hovering. Defaults to true. */
  pauseOnHover?: boolean;
  /** Travel direction. 'left' scrolls content leftward (default), 'right' reverses. */
  direction?: 'left' | 'right';
}
