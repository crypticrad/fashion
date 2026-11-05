import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconLogoutOutlined = (props: SVGIconProps) => {
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
      <path
        d="M8 17H4V3h4M13 14l4-4-4-4M17 10H8"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
