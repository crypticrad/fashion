import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconMastercard = (props: SVGIconProps) => {
  const { height = 30, width = 47 } = props;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 47 30"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="46" height="29" rx="4.5" fill="white" />
      <rect x="0.5" y="0.5" width="46" height="29" rx="4.5" stroke="#D6DCE5" />
      <circle cx="19" cy="15" r="7" fill="#EB001B" />
      <circle cx="28" cy="15" r="7" fill="#F79E1B" />
      <path
        d="M23.5 9.6a7 7 0 0 1 0 10.8 7 7 0 0 1 0-10.8Z"
        fill="#FF5F00"
      />
    </svg>
  );
};
