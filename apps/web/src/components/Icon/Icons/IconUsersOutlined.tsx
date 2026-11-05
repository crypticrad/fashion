import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconUsersOutlined = (props: SVGIconProps) => {
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
      <circle cx="10" cy="6.5" r="3" stroke={color} strokeWidth="1.7" />
      <path
        d="M4 16.5c0-3 2.7-5 6-5s6 2 6 5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
