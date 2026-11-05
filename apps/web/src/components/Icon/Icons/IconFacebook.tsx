import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconFacebook = (props: SVGIconProps) => {
  const { height = 13, width = 7, color = 'currentColor' } = props;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 7 13"
      fill="none"
    >
      <path
        d="M6.5 7.125l.347-2.262H4.676V3.395c0-.619.303-1.222 1.275-1.222H6.94V.247S6.054 0 5.207 0C3.439 0 2.283 1.072 2.283 3.012v1.851H.297v2.262h1.986V12.6h2.393V7.125H6.5Z"
        fill={color}
      />
    </svg>
  );
};
