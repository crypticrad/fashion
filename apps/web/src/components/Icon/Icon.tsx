import { IconProps as Props } from './Icon.interface';
import { ICONS } from './Icons';

export const Icon = (props: Props) => {
  const { iconType, ...svgProps } = props;
  const SVGIcon = ICONS[iconType] ?? ICONS['cart'];
  // `data-icon` is a DOM-accepted, SEO-neutral attribute kept for testing.
  return <SVGIcon {...svgProps} data-icon={iconType} />;
};
