/* eslint-disable @typescript-eslint/no-explicit-any */
import { SVGProps } from 'react';
import { Icons } from './Icons';

export type SVGIconProps = SVGProps<any>;

export interface IconProps extends SVGIconProps {
  iconType: `${Icons}`;
}
