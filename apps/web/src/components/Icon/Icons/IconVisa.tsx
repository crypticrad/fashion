import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconVisa = (props: SVGIconProps) => {
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
      <path
        d="M20.74 18.86h-2.05l1.28-7.74h2.05l-1.28 7.74Zm-3.78-7.74-1.96 5.32-.23-1.17-.69-3.55a.88.88 0 0 0-.96-.6H9.84l-.04.13c.7.18 1.32.43 1.86.74l1.78 6.87h2.14l3.27-7.74h-2.13l-.66-.0Zm17.04 7.74h1.88l-1.64-7.74h-1.65c-.76 0-.95.59-.95.59l-3.06 7.15h2.14l.43-1.17h2.61l.24 1.17Zm-2.26-2.79.94-2.58.53 2.58h-1.47Zm-2.05-3.05.29-1.69s-.9-.34-1.84-.34c-1.02 0-3.44.45-3.44 2.61 0 2.04 2.84 2.07 2.84 3.14 0 1.07-2.55.88-3.39.2l-.31 1.77s.92.45 2.32.45c1.4 0 3.51-.73 3.51-2.7 0-2.05-2.86-2.24-2.86-3.14 0-.9 2-.78 2.88-.3Z"
        fill="#1434CB"
      />
    </svg>
  );
};
