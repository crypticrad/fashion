import { InputHTMLAttributes } from 'react';

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Placeholder text shown when the field is empty. */
  placeholder?: string;
}
