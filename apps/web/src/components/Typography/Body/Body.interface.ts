import { HTMLAttributes } from 'react';

export type BodyType =
  | 'extralarge'
  | 'large'
  | 'medium'
  | 'normal'
  | 'small'
  | 'extrasmall';

export type BodyWeight = 'bold' | 'semibold' | 'regular' | 'semi500';

export interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Named size token. Each maps to a default px on the 10→48 (step 2) scale. */
  type?: BodyType;
  weight?: BodyWeight;
  /** Optional explicit font-size in px that overrides the `type` default. */
  size?: number;
  color?: string;
  innerRef?: React.LegacyRef<HTMLParagraphElement>;
}
