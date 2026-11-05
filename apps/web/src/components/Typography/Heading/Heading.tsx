import React from 'react';
import classNames from 'classnames';
import { HeadingProps as Props } from './Heading.interface';

export const Heading: React.FC<Props> = (props) => {
  const {
    type = 'h1',
    weight = 'bold',
    size,
    color = 'inherit',
    style,
    className,
    innerRef,
    ...restProps
  } = props;

  // Preset class exposed in typography.css (Integral CF + size + weight).
  const presetClass = `heading-${type}-${weight}`;

  return React.createElement(type, {
    ...restProps,
    ref: innerRef,
    style: { ...style, color, ...(size ? { fontSize: `${size}px` } : null) },
    className: classNames(presetClass, className)
  });
};
