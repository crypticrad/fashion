import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconMail = (props: SVGIconProps) => {
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
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.511l-8 5.333-8-5.333V6h16ZM4 18V8.915l7.445 4.963a1 1 0 0 0 1.11 0L20 8.915V18H4Z"
        fill={color}
      />
    </svg>
  );
};
