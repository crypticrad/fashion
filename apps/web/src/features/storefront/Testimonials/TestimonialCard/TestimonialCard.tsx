import classNames from 'classnames';
import { Rate } from 'antd';
import { Body } from '@/components/Typography/Body';
import { TestimonialCardProps as Props } from './TestimonialCard.interface';

/**
 * Single testimonial card — Figma node 24:771.
 *
 * Frame: 400×~240, 1px border rgba(0,0,0,0.1), 20px radius, 32px x / 28px y
 * padding. Stack: 5 gold stars (antd Rate) → name (20px Satoshi Bold) + green
 * verified badge → quote (16px Satoshi Regular, rgba(0,0,0,0.6)).
 */
const VerifiedBadge = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="10" cy="10" r="10" fill="#01AB31" />
    <path
      d="M6 10.2L8.6 12.8L14 7.4"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TestimonialCard = ({ testimonial, width = 'fixed' }: Props) => {
  const { name, rating, quote, postedOn } = testimonial;

  return (
    <article
      className={classNames(
        'flex h-full flex-col gap-[15px] rounded-[20px] border border-black/10 px-8 py-7',
        width === 'fixed' ? 'w-[400px] shrink-0' : 'w-full'
      )}
    >
      <Rate
        disabled
        allowHalf
        value={rating}
        className="leading-none"
        style={{ fontSize: 20 }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Body type="large" weight="bold" color="#000" className="leading-[22px]">
            {name}
          </Body>
          <VerifiedBadge />
        </div>
        <Body
          type="normal"
          weight="regular"
          color="rgba(0,0,0,0.6)"
          className="leading-[22px]"
        >
          {quote}
        </Body>
      </div>
      {postedOn && (
        <Body type="normal" weight="regular" color="rgba(0,0,0,0.6)" className="mt-auto">
          {postedOn}
        </Body>
      )}
    </article>
  );
};
