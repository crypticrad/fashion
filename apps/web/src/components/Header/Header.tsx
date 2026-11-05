import { Link, useNavigate } from 'react-router-dom';
import { HeaderProps as Props } from './Header.interface';
import { SearchBar } from '../SearchBar';
import { Icon } from '../Icon';

const navLinks = [
  { label: 'Shop', href: '/catalog' },
  { label: 'On Sale', href: '/catalog?type=onsale' },
  { label: 'New Arrivals', href: '/catalog?type=arrivals' },
  { label: 'Brands', href: '/brands' }
];

export const Header = (props: Props) => {
  const brandName = props.brandName ?? import.meta.env.VITE_BRAND ?? 'SHOP.CO';
  const navigate = useNavigate();
  const onClickCard = () => {
    navigate('/cart');
  };
  return (
    <header className="mx-auto flex h-24 w-full max-w-[1240px] items-center gap-10 border-b border-black/10 px-4 xl:px-0">
      <Link to="/" className="heading-h3-bold h-12">
        {brandName}
      </Link>
      <nav className="flex items-center gap-6 h-12">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="body-normal-regular text-black "
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <SearchBar />
      <div className="flex gap-x-3.5">
        <Icon
          iconType="cart"
          className="cursor-pointer"
          onClick={onClickCard}
        />
        <Icon iconType="user" className="cursor-pointer" />
      </div>
    </header>
  );
};
