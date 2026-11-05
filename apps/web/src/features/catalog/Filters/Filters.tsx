import { useState } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Slider } from 'antd';
import { Body } from '@/components/Typography/Body';
import { Icon } from '@/components/Icon';
import {
  CATEGORIES,
  COLORS,
  DRESS_STYLES,
  PRICE_RANGE,
  SIZES
} from '../catalog.data';
import { FiltersProps as Props } from './Filters.interface';

const Divider = () => <hr className="border-t border-black/10" />;

/**
 * Collapsible titled section — bold header with a chevron that rotates to point
 * up when open and down when collapsed, hiding/showing its children.
 */
const Section = ({
  title,
  open,
  onToggle,
  children
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-5">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex items-center justify-between"
    >
      <Body type="large" weight="bold" color="#000">
        {title}
      </Body>
      <Icon
        iconType="chevron down outlined"
        className={classNames('text-black transition-transform', {
          'rotate-180': open
        })}
      />
    </button>
    {open && children}
  </div>
);

/**
 * Catalog filter sidebar — pixel-matched to the SHOP.CO design.
 *
 * Category and Dress Style are tappable text rows with a chevron; Colors are
 * circular swatches; Size is a row of pills; Price is a range slider. Selections
 * are multi-select (except the single price range) and seed from the URL on
 * mount. "Apply Filter" serialises everything back into the query string and
 * pushes it onto the URL; empty facets are dropped so the URL stays clean.
 */
export const Filters = (_props: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const readList = (key: string) =>
    searchParams.get(key)?.split(',').filter(Boolean) ?? [];

  const [category, setCategory] = useState<string[]>(() =>
    readList('category')
  );
  const [colors, setColors] = useState<string[]>(() => readList('color'));
  const [sizes, setSizes] = useState<string[]>(() => readList('size'));
  const [styles, setStyles] = useState<string[]>(() => readList('style'));
  const [price, setPrice] = useState<[number, number]>(() => [
    Number(searchParams.get('minPrice') ?? PRICE_RANGE[0]),
    Number(searchParams.get('maxPrice') ?? PRICE_RANGE[1])
  ]);

  // Which titled sections are expanded. All open by default, matching the design.
  const [open, setOpen] = useState({
    price: true,
    colors: true,
    size: true,
    style: true
  });
  const toggleSection = (key: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggle = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) =>
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (category.length) params.set('category', category.join(','));
    if (colors.length) params.set('color', colors.join(','));
    if (sizes.length) params.set('size', sizes.join(','));
    if (styles.length) params.set('style', styles.join(','));
    if (price[0] !== PRICE_RANGE[0]) params.set('minPrice', String(price[0]));
    if (price[1] !== PRICE_RANGE[1]) params.set('maxPrice', String(price[1]));

    const query = params.toString();
    navigate(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <aside className="flex flex-col gap-6 rounded-[20px] border border-black/10 px-6 py-5">
      {/* Title */}
      <div className="flex items-center justify-between">
        <Body type="large" weight="bold" color="#000">
          Filters
        </Body>
        <Icon iconType="sliders outlined" className="text-black/40" />
      </div>

      <Divider />

      {/* Category — text rows with chevron */}
      <ul className="flex flex-col gap-5">
        {CATEGORIES.map((item) => {
          const active = category.includes(item);
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => toggle(item, setCategory)}
                className="flex w-full items-center justify-between"
              >
                <Body
                  type="normal"
                  weight={active ? 'semibold' : 'regular'}
                  color={active ? '#000' : 'rgba(0,0,0,0.6)'}
                >
                  {item}
                </Body>
                <Icon
                  iconType="chevron down outlined"
                  className="-rotate-90 text-black/40"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <Divider />

      {/* Price — range slider */}
      <Section
        title="Price"
        open={open.price}
        onToggle={() => toggleSection('price')}
      >
        <Slider
          range
          min={PRICE_RANGE[0]}
          max={PRICE_RANGE[1]}
          value={price}
          onChange={(value) => setPrice(value as [number, number])}
          tooltip={{ formatter: (v) => `$${v}` }}
        />
        <div className="flex items-center justify-between">
          <Body type="small" weight="semi500" color="#000">
            ${price[0]}
          </Body>
          <Body type="small" weight="semi500" color="#000">
            ${price[1]}
          </Body>
        </div>
      </Section>

      <Divider />

      {/* Colors — circular swatches */}
      <Section
        title="Colors"
        open={open.colors}
        onToggle={() => toggleSection('colors')}
      >
        <div className="flex flex-wrap gap-4">
          {COLORS.map(({ name, hex }) => {
            const active = colors.includes(name);
            return (
              <button
                key={name}
                type="button"
                aria-label={name}
                aria-pressed={active}
                onClick={() => toggle(name, setColors)}
                className="flex size-9.25 items-center justify-center rounded-full border border-black/20"
                style={{ backgroundColor: hex }}
              >
                {active && (
                  <Icon
                    iconType="arrow right outlined"
                    width={16}
                    height={16}
                    className={name === 'White' ? 'text-black' : 'text-white'}
                  />
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <Divider />

      {/* Size — pills */}
      <Section
        title="Size"
        open={open.size}
        onToggle={() => toggleSection('size')}
      >
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggle(size, setSizes)}
                className={classNames(
                  'rounded-full px-5 py-2.5 transition-colors',
                  active ? 'bg-black' : 'bg-[#F0F0F0]'
                )}
              >
                <Body
                  type="small"
                  weight={active ? 'semi500' : 'regular'}
                  color={active ? '#FFF' : 'rgba(0,0,0,0.6)'}
                  className="leading-none whitespace-nowrap"
                >
                  {size}
                </Body>
              </button>
            );
          })}
        </div>
      </Section>

      <Divider />

      {/* Dress Style — text rows with chevron */}
      <Section
        title="Dress Style"
        open={open.style}
        onToggle={() => toggleSection('style')}
      >
        <ul className="flex flex-col gap-5">
          {DRESS_STYLES.map((item) => {
            const active = styles.includes(item);
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => toggle(item, setStyles)}
                  className="flex w-full items-center justify-between"
                >
                  <Body
                    type="normal"
                    weight={active ? 'semibold' : 'regular'}
                    color={active ? '#000' : 'rgba(0,0,0,0.6)'}
                  >
                    {item}
                  </Body>
                  <Icon
                    iconType="chevron down outlined"
                    className="-rotate-90 text-black/40"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Apply */}
      <button
        type="button"
        onClick={applyFilters}
        className="flex h-12 w-full items-center justify-center rounded-full bg-black transition-opacity hover:opacity-90"
      >
        <Body type="small" weight="semi500" color="#FFF" className="leading-none">
          Apply Filter
        </Body>
      </button>
    </aside>
  );
};
