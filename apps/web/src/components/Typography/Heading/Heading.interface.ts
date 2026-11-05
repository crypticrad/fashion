import { HTMLAttributes } from 'react';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingWeight = 'bold' | 'semibold' | 'regular' | 'semi500';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level. Each maps to a default px on the 10→48 (step 2) scale. */
  type?: HeadingType;
  weight?: HeadingWeight;
  /** Optional explicit font-size in px that overrides the `type` default. */
  size?: number;
  color?: string;
  innerRef?: React.LegacyRef<HTMLHeadingElement>;
}
