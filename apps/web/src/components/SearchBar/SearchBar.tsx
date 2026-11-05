import { Icon } from '../Icon';
import { SearchBarProps as Props } from './SearchBar.interface';

export const SearchBar = ({
  placeholder = 'Search for products...',
  className = '',
  ...rest
}: Props) => {
  return (
    <label
      className={`flex flex-1 items-center gap-3 rounded-[62px] bg-[#F0F0F0] px-4 py-3 text-black/40 ${className}`}
    >
      <Icon iconType="search" width={24} height={24} color="currentColor" />
      <input
        type="search"
        placeholder={placeholder}
        className="body-medium-regular w-full bg-transparent leading-none text-black placeholder:text-black/40 focus:outline-none"
        {...rest}
      />
    </label>
  );
};
