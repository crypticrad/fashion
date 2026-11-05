'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { ProductGalleryProps as Props } from './ProductGallery.interface';

/**
 * Product image gallery — Figma node 1:2 (left of the detail panel).
 *
 * A column of thumbnail tiles beside one large main tile, all on the neutral
 * #F0EEED ground with 20px radius. The thumbnail column and the main tile share
 * the same height (Figma: 152px thumbs / 444px main, 530px tall). Selecting a
 * thumbnail swaps the main image and rings it black. Images are optional so the
 * layout renders placeholder tiles until product photography lands.
 */
export const ProductGallery = ({ images, name }: Props) => {
  const [activeId, setActiveId] = useState(images[0]?.id);
  const active = images.find((img) => img.id === activeId) ?? images[0];

  const tileStyle = (image?: string) =>
    image ? { backgroundImage: `url(${image})` } : undefined;

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-3.5">
      <div className="flex gap-3 sm:w-[25%] sm:flex-col sm:gap-3.5">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            aria-label={`Show ${name} view`}
            aria-pressed={img.id === active?.id}
            onClick={() => setActiveId(img.id)}
            style={tileStyle(img.image)}
            className={classNames(
              'aspect-square min-w-0 flex-1 rounded-[20px] bg-[#F0EEED] bg-cover bg-center transition-shadow',
              img.id === active?.id
                ? 'ring-2 ring-black ring-inset'
                : 'ring-1 ring-transparent hover:ring-black/20'
            )}
          />
        ))}
      </div>

      <div
        role="img"
        aria-label={name}
        style={tileStyle(active?.image)}
        className="aspect-square w-full rounded-[20px] bg-[#F0EEED] bg-cover bg-center sm:aspect-444/530 sm:flex-1"
      />
    </div>
  );
};
