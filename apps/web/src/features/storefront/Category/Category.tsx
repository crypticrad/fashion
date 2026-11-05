import { Heading } from '@/components/Typography/Heading';
import { CategoryProps as Props } from './Category.interface';

/**
 * "Browse by dress style" mosaic — follows the Figma frame (22:672).
 *
 * Frame: 1239×866, 64px side padding, title at y=70, cards start at y=192
 * (64px below the title), 20px gaps, 289px-tall cards.
 *
 * Rows have mirrored widths (407 narrow / 684 wide), so each row is its own
 * flex track rather than a shared column grid.
 *
 * Each photo uses `cover` so it fills the card with no distortion; the per-card
 * `backgroundPosition` keeps the body / garment in frame and offset to the
 * right, leaving the left clear for the label. `flip` mirrors the two photos
 * whose subject sits on the left of the source so they land on the right.
 */
type Card = {
  label: string;
  image: string;
  /** flex-basis as a % of the 1111px content width. */
  basis: string;
  /** Focus point for `background-position` — frames the body / garment. */
  backgroundPosition: string;
  /** Defaults to `cover`. Override (e.g. `auto 130%`) to allow panning sideways. */
  backgroundSize?: string;
  flip?: boolean;
};

const ROWS: Card[][] = [
  [
    {
      label: 'Casual',
      image: '/images/home/casual.png',
      basis: 'md:basis-[36.63%]', // 407 / 1111
      flip: true,
      backgroundPosition: '30% 25%'
    },
    {
      label: 'Formal',
      image: '/images/home/formal.png',
      basis: 'md:basis-[61.57%]', // 684 / 1111
      flip: true,
      backgroundPosition: '20% 20%'
    }
  ],
  [
    {
      label: 'Party',
      image: '/images/home/party.png',
      basis: 'md:basis-[61.57%]', // 684 / 1111
      backgroundPosition: '70% 25%'
    },
    {
      label: 'Gym',
      image: '/images/home/gym.png',
      basis: 'md:basis-[36.63%]', // 407 / 1111
      // Source is tall/narrow; zoom height so width overflows and the figure
      // can pan fully to the right, clear of the label.
      backgroundSize: 'auto 145%',
      backgroundPosition: '100% 18%'
    }
  ]
];

export const Category = (_props: Props) => {
  return (
    <section className="w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-[1239px] rounded-[40px] bg-[#F0F0F0] px-4 py-12 md:px-16 md:pt-17.5 md:pb-19">
        <Heading
          type="h2"
          size={48}
          weight="bold"
          className="uppercase text-center leading-none tracking-normal"
        >
          Browse by dress style
        </Heading>
        <div className="mt-12 md:mt-16 flex flex-col gap-5">
          {ROWS.map((row, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-5">
              {row.map((card) => (
                <button
                  key={card.label}
                  className={`relative h-[289px] overflow-hidden rounded-[20px] bg-white text-left ${card.basis}`}
                >
                  <div
                    role="img"
                    aria-label={`${card.label} style`}
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: card.backgroundSize ?? 'cover',
                      backgroundPosition: card.backgroundPosition,
                      transform: card.flip ? 'scaleX(-1)' : undefined
                    }}
                  />
                  <span className="absolute left-9 top-6.25 z-10 body-extralarge-bold text-[36px] leading-none text-black">
                    {card.label}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
