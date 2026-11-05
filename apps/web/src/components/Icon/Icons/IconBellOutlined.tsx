import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconBellOutlined = (props: SVGIconProps) => {
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
        d="M10 3a5 5 0 0 1 5 5c0 4 2 5 2 5H3s2-1 2-5a5 5 0 0 1 5-5zM8 16a2 2 0 0 0 4 0"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
