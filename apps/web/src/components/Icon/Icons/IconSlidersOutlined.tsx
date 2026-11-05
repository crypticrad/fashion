import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconSlidersOutlined = (props: SVGIconProps) => {
  const { height = 24, width = 24, color = 'currentColor' } = props;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 8V3M5 21v-5M12 21v-7M12 11V3M19 21v-5M19 8V3M3 8h4M10 11h4M17 16h4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
