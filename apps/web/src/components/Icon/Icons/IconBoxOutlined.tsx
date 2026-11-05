import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconBoxOutlined = (props: SVGIconProps) => {
  const { height = 20, width = 20, color = 'currentColor' } = props;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x="3"
        y="6.5"
        width="14"
        height="10.5"
        rx="1.5"
        stroke={color}
        strokeWidth="1.7"
      />
      <path
        d="M6.5 6.5V5a3.5 3.5 0 0 1 7 0v1.5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
