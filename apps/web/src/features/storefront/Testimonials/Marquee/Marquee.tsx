'use client';

import { Children, useEffect, useRef } from 'react';
import { useAnimate, type AnimationPlaybackControls } from 'motion/react';
import { MarqueeProps as Props } from './Marquee.interface';

/**
 * Auto-scrolling horizontal marquee built on `motion`.
 *
 * The children are rendered twice back-to-back in a single track. The track is
 * animated from x:0 to x:-50% (the width of one copy) on an infinite linear
 * loop, so the second copy seamlessly takes over as the first scrolls off —
 * giving the illusion of an endless belt. Hovering pauses the animation.
 */
export const Marquee = ({
  children,
  durationSeconds = 40,
  gap = 20,
  pauseOnHover = true,
  direction = 'left'
}: Props) => {
  const [scope, animate] = useAnimate();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    // Travel leftward by default; reverse the keyframes to scroll rightward.
    const keyframes = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];
    controls.current = animate(
      scope.current,
      { x: keyframes },
      { duration: durationSeconds, ease: 'linear', repeat: Infinity }
    );
    return () => controls.current?.stop();
  }, [animate, scope, durationSeconds, direction]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => pauseOnHover && controls.current?.pause()}
      onMouseLeave={() => pauseOnHover && controls.current?.play()}
    >
      <div ref={scope} className="flex w-max" style={{ gap }}>
        {/* Two identical copies → seamless loop at -50%. */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }} aria-hidden>
          {Children.toArray(children)}
        </div>
      </div>
    </div>
  );
};
