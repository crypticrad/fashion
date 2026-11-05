import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconTwitter = (props: SVGIconProps) => {
  const { height = 14, width = 14, color = 'currentColor' } = props;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 12"
      fill="none"
    >
      <path
        d="M14 1.42c-.515.23-1.07.385-1.652.455a2.89 2.89 0 0 0 1.265-1.594 5.76 5.76 0 0 1-1.827.702A2.875 2.875 0 0 0 6.91 3.605c0 .226.025.444.075.654A8.16 8.16 0 0 1 1.07.524 2.876 2.876 0 0 0 1.96 4.36a2.86 2.86 0 0 1-1.302-.36v.036a2.877 2.877 0 0 0 2.306 2.82 2.89 2.89 0 0 1-1.298.05 2.879 2.879 0 0 0 2.686 2A5.77 5.77 0 0 1 0 10.094a8.13 8.13 0 0 0 4.404 1.291c5.284 0 8.174-4.378 8.174-8.174 0-.125-.003-.249-.009-.371A5.84 5.84 0 0 0 14 1.42Z"
        fill={color}
      />
    </svg>
  );
};
