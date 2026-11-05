import React from 'react';
import classNames from 'classnames';
import { BodyProps as Props } from './Body.interface';

export const Body: React.FC<Props> = (props) => {
  const {
    type = 'small',
    weight = 'regular',
    size,
    color = 'inherit',
    style,
    className,
    innerRef,
    ...restProps
  } = props;

  // Preset class exposed in typography.css (Satoshi + size + weight).
  const presetClass = `body-${type}-${weight}`;

  return (
    <p
      {...restProps}
      ref={innerRef}
      style={{ ...style, color, ...(size ? { fontSize: `${size}px` } : null) }}
      className={classNames(presetClass, className)}
    />
  );
};
