'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import { TestimonialCard } from '@/features/storefront/Testimonials/TestimonialCard';
import { ProductTabsProps as Props } from './ProductTabs.interface';

const TABS = ['Product Details', 'Rating & Reviews', 'FAQs'] as const;
type Tab = (typeof TABS)[number];

/**
 * Product detail tabs — Figma node 1:2 (centre band).
 *
 * Three-tab strip (Product Details / Rating & Reviews / FAQs) with the active
 * tab underlined. Only Rating & Reviews is populated for now: an "All Reviews"
 * header with sort + "Write a Review" controls, then a 2-up grid of review
 * cards (reusing the Testimonials TestimonialCard, fluid width + posted date),
 * then a "Load More Reviews" pill. The other two tabs show a short placeholder.
 */
export const ProductTabs = ({ reviews, reviewCount }: Props) => {
  const [active, setActive] = useState<Tab>('Rating & Reviews');

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 border-b border-black/10">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={active === tab}
            onClick={() => setActive(tab)}
            className={classNames(
              'body-large-regular -mb-px pb-5 text-center transition-colors',
              active === tab
                ? 'border-b-2 border-black font-medium text-black'
                : 'text-black/60 hover:text-black'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 'Rating & Reviews' ? (
        <div className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-baseline gap-2.5">
              <Heading type="h3" size={24} weight="bold" color="#000">
                All Reviews
              </Heading>
              <Body type="normal" weight="regular" color="rgba(0,0,0,0.6)">
                ({reviewCount})
              </Body>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Sort reviews"
                className="grid size-12 place-items-center rounded-full bg-[#F0F0F0] transition-colors hover:bg-black/10"
              >
                <Icon iconType="sliders outlined" width={20} height={20} />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#F0F0F0] px-5 py-3.5 transition-colors hover:bg-black/10"
              >
                <span className="body-normal-semi500 text-black">Latest</span>
                <Icon iconType="chevron down outlined" />
              </button>
              <button
                type="button"
                className="body-normal-semi500 rounded-full bg-black px-5 py-3.5 leading-5.5 text-white transition-opacity hover:opacity-90"
              >
                Write a Review
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {reviews.map((review, i) => (
              <TestimonialCard key={`${review.name}-${i}`} testimonial={review} width="fluid" />
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <button
              type="button"
              className="body-normal-semi500 rounded-full border border-black/10 px-13.5 py-4 leading-none transition-colors hover:bg-black hover:text-white"
            >
              Load More Reviews
            </button>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center">
          <Body type="normal" weight="regular" color="rgba(0,0,0,0.6)">
            {active} coming soon.
          </Body>
        </div>
      )}
    </div>
  );
};
