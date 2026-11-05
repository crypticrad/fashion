import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconChevronDownOutlined = (props: SVGIconProps) => {
  const { height = 16, width = 16, color = 'currentColor' } = props;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
