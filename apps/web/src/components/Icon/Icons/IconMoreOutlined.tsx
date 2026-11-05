import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconMoreOutlined = (props: SVGIconProps) => {
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
      <circle cx="4.5" cy="10" r="1.5" fill={color} />
      <circle cx="10" cy="10" r="1.5" fill={color} />
      <circle cx="15.5" cy="10" r="1.5" fill={color} />
    </svg>
  );
};
