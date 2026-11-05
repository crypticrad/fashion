import React from 'react';
import { SVGIconProps } from '../Icon.interface';

export const IconPaypal = (props: SVGIconProps) => {
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
        d="M19.9 9.5h4.4c2.36 0 3.3 1.2 3.13 2.95-.28 2.9-2.03 4.5-4.84 4.5h-1.42c-.39 0-.64.26-.74.78l-.6 3.27h-2.66l1.73-9.42c.07-.4.4-.71.81-.71l.46.0Z"
        fill="#003087"
      />
      <path
        d="M22.7 11.8h4.4c2.36 0 3.3 1.2 3.13 2.95-.28 2.9-2.03 4.5-4.84 4.5h-1.42c-.39 0-.64.26-.74.78l-.6 3.27h-2.66l1.73-9.42c.07-.4.4-.71.81-.71l.46-.0Z"
        fill="#0070E0"
        opacity="0.8"
      />
    </svg>
  );
};
