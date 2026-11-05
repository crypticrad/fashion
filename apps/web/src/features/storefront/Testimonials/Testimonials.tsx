'use client';

import { useState } from 'react';
import { Heading } from '@/components/Typography/Heading';
import { Icon } from '@/components/Icon';
import { TestimonialsProps as Props } from './Testimonials.interface';
import { TestimonialCard } from './TestimonialCard';
import { Marquee } from './Marquee';
import { TESTIMONIALS } from './testimonials.data';

/**
 * "OUR HAPPY CUSTOMERS" section — Figma node 24:713.
 *
 * Header row: 48px Integral CF bold uppercase title on the left, two arrow
 * controls on the right. Below, an auto-scrolling marquee of testimonial cards
 * (motion). The arrows flip the marquee's travel direction; hovering the belt
 * pauses it.
 */
export const Testimonials = (_props: Props) => {
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  return (
    <section className="my-[80px] mb-[170px] w-full overflow-hidden">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4">
        <Heading
          type="h2"
          size={48}
          weight="bold"
          className="uppercase leading-none tracking-normal"
        >
          Our Happy Customers
        </Heading>
        <div className="flex items-center gap-3 text-black">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => setDirection('right')}
            className="grid size-6 place-items-center transition-opacity hover:opacity-60"
          >
            <Icon iconType="arrow left outlined" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => setDirection('left')}
            className="grid size-6 place-items-center transition-opacity hover:opacity-60"
          >
            <Icon iconType="arrow right outlined" />
          </button>
        </div>
      </div>

      <div className="mt-10">
        <Marquee direction={direction} durationSeconds={50}>
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={`${testimonial.name}-${i}`}
              testimonial={testimonial}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
};
