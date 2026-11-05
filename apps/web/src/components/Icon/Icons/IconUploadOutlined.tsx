import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconUploadOutlined = (props: SVGIconProps) => {
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
        d="M4 13v2.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V13M10 3v9M6.5 6.5 10 3l3.5 3.5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
